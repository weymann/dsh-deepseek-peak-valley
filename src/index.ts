/**
 * dsh-deepseek-peak-valley · Node 半场（host）+ Go 套餐代理 + DeepSeek 余额代理
 *
 * - 读凭据：优先使用设置页通过 POST /go-quota/config 写入的 ~/.dsh/dsh-deepseek-peak-valley.json，
 *   其次环境变量，其次 auth.json
 * - Go：代理官方接口 GET https://opencode.ai/zen/go/v1/usage
 * - DeepSeek：代理 GET https://api.deepseek.com/user/balance
 * - 缓存 single-flight + TTL 60s + 失败退避 10s + stale-on-error
 * - 注册同源路由 GET /go-quota/usage, GET/POST /go-quota/config, GET /deepseek/balance
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'
import type { IncomingMessage, ServerResponse } from 'node:http'

export const inject = ['webServer']

const GO_ENDPOINT = 'https://opencode.ai/zen/go/v1/usage'
const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/user/balance'
const ERROR_RETRY_GAP_MS = 10_000
const CONFIG_PATH = path.join(os.homedir(), '.dsh', 'dsh-deepseek-peak-valley.json')

interface GoQuotaItem {
  status: string
  percent: number
  resetsAt: string
}
interface GoQuotaUsage {
  rolling: GoQuotaItem
  weekly: GoQuotaItem
  monthly: GoQuotaItem
}

interface CacheState<T> {
  at: number
  data: T | null
  error: string | null
  promise: Promise<T> | null
}

const goCache: CacheState<GoQuotaUsage> = { at: 0, data: null, error: null, promise: null }
const dsCache: CacheState<{ is_available: boolean; balance_infos: Array<{ currency: string; total_balance: string; granted_balance: string; topped_up_balance: string }> }> = { at: 0, data: null, error: null, promise: null }

/** 持久配置（设置页写入） */
interface PersistConfig {
  goKey?: string
  deepseekKey?: string
}

function loadPersistConfig(): PersistConfig {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return {}
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8')
    const obj = JSON.parse(raw) as PersistConfig
    return { goKey: obj.goKey?.trim() || undefined, deepseekKey: obj.deepseekKey?.trim() || undefined }
  } catch {
    return {}
  }
}

function savePersistConfig(patch: Partial<PersistConfig>): PersistConfig {
  const cur = loadPersistConfig()
  const next: PersistConfig = { ...cur }
  if (patch.goKey !== undefined) next.goKey = patch.goKey.trim() ? patch.goKey.trim() : undefined
  if (patch.deepseekKey !== undefined) next.deepseekKey = patch.deepseekKey.trim() ? patch.deepseekKey.trim() : undefined
  // 清空则删键
  if (!next.goKey) delete next.goKey
  if (!next.deepseekKey) delete next.deepseekKey
  try {
    fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true })
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(next, null, 2), 'utf8')
  } catch {}
  return next
}

function maskKey(key?: string): string {
  if (!key) return ''
  if (key.length <= 8) return '***'
  return key.slice(0, 6) + '****' + key.slice(-4)
}

/** 读取 Go Key：设置页配置 > env > auth.json */
function resolveGoKey(): string | undefined {
  const cfg = loadPersistConfig()
  if (cfg.goKey) return cfg.goKey
  const envKey = process.env.OPENCODE_GO_API_KEY || process.env.OPENCODE_API_KEY
  if (envKey && envKey.trim()) return envKey.trim()
  const authContent = process.env.OPENCODE_AUTH_CONTENT
  if (authContent) {
    try {
      const parsed = JSON.parse(authContent)
      for (const k of ['opencode-go', 'opencode']) {
        const ent = parsed?.[k]
        if (ent && ent.type === 'api' && typeof ent.key === 'string' && ent.key.trim()) return ent.key.trim()
      }
    } catch {}
  }
  const candidates: string[] = []
  const xdg = process.env.XDG_DATA_HOME
  if (xdg) candidates.push(path.join(xdg, 'opencode', 'auth.json'))
  if (process.env.LOCALAPPDATA) candidates.push(path.join(process.env.LOCALAPPDATA, 'opencode', 'auth.json'))
  candidates.push(path.join(os.homedir(), '.local', 'share', 'opencode', 'auth.json'))
  candidates.push(path.join(os.homedir(), '.config', 'opencode', 'auth.json'))
  for (const p of candidates) {
    try {
      if (!fs.existsSync(p)) continue
      const raw = fs.readFileSync(p, 'utf8')
      const obj = JSON.parse(raw)
      for (const k of ['opencode-go', 'opencode']) {
        const ent = obj?.[k]
        if (ent && ent.type === 'api' && typeof ent.key === 'string' && ent.key.trim()) return ent.key.trim()
      }
    } catch {}
  }
  return undefined
}

function resolveDeepseekKey(): string | undefined {
  const cfg = loadPersistConfig()
  if (cfg.deepseekKey) return cfg.deepseekKey
  const envKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_KEY || process.env.DEEPSEEK_API_TOKEN
  if (envKey && envKey.trim()) return envKey.trim()
  // auth.json deepseek 条目（虽当前失效但仍作回退）
  const candidates: string[] = []
  const xdg = process.env.XDG_DATA_HOME
  if (xdg) candidates.push(path.join(xdg, 'opencode', 'auth.json'))
  candidates.push(path.join(os.homedir(), '.local', 'share', 'opencode', 'auth.json'))
  candidates.push(path.join(os.homedir(), '.config', 'opencode', 'auth.json'))
  for (const p of candidates) {
    try {
      if (!fs.existsSync(p)) continue
      const raw = fs.readFileSync(p, 'utf8')
      const obj = JSON.parse(raw)
      const ent = obj?.['deepseek']
      if (ent && ent.type === 'api' && typeof ent.key === 'string' && ent.key.trim()) return ent.key.trim()
    } catch {}
  }
  return undefined
}

async function fetchGo(): Promise<GoQuotaUsage> {
  const key = resolveGoKey()
  if (!key) throw new Error('未找到 OpenCode Go API Key（请在设置页“Go套餐 Key”中配置）')
  const res = await fetch(GO_ENDPOINT, {
    headers: { authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(8000),
  } as any)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    let msg = `HTTP ${res.status}`
    if (res.status === 401) msg = 'Go API Key 无效（401）'
    else if (res.status === 403) msg = '未订阅 OpenCode Go（403）'
    else if (body) msg += ` ${body.slice(0, 200)}`
    throw new Error(msg)
  }
  const data: any = await res.json()
  const usage = data?.usage
  if (!usage || !usage.rolling || !usage.weekly || !usage.monthly) throw new Error('返回结构异常：缺少 rolling/weekly/monthly')
  return usage as GoQuotaUsage
}

async function fetchDeepseek(): Promise<{ is_available: boolean; balance_infos: Array<{ currency: string; total_balance: string; granted_balance: string; topped_up_balance: string }> }> {
  const key = resolveDeepseekKey()
  if (!key) throw new Error('未找到 DeepSeek API Key（请在设置页“DeepSeek Key”中配置）')
  const res = await fetch(DEEPSEEK_ENDPOINT, {
    headers: { Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(8000),
  } as any)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    let msg = `HTTP ${res.status}`
    if (res.status === 401) msg = 'DeepSeek API Key 无效（401）'
    else if (body) msg += ` ${body.slice(0, 300)}`
    throw new Error(msg)
  }
  const data: any = await res.json()
  // 期望 { is_available, balance_infos }
  if (data?.balance_infos && Array.isArray(data.balance_infos)) return data
  if (data?.data?.balance_infos) return data.data
  throw new Error('返回结构异常：缺少 balance_infos')
}

async function ensureGo(pollMs: number): Promise<{ ok: boolean; usage?: GoQuotaUsage; error?: string; stale?: boolean; fetchedAt: string }> {
  const now = Date.now()
  if (goCache.data && now - goCache.at < pollMs) return { ok: true, usage: goCache.data, fetchedAt: new Date(goCache.at).toISOString() }
  if (goCache.error && now - goCache.at < ERROR_RETRY_GAP_MS) {
    if (goCache.data) return { ok: true, usage: goCache.data, stale: true, error: goCache.error, fetchedAt: new Date(goCache.at).toISOString() }
    return { ok: false, error: goCache.error, fetchedAt: new Date(goCache.at).toISOString() }
  }
  if (goCache.promise) {
    try {
      const u = await goCache.promise
      return { ok: true, usage: u, fetchedAt: new Date(goCache.at).toISOString() }
    } catch (e: any) {
      if (goCache.data) return { ok: true, usage: goCache.data, stale: true, error: e?.message ?? String(e), fetchedAt: new Date(goCache.at).toISOString() }
      return { ok: false, error: e?.message ?? String(e), fetchedAt: new Date().toISOString() }
    }
  }
  const p = fetchGo()
  goCache.promise = p
  try {
    const u = await p
    goCache.data = u
    goCache.error = null
    goCache.at = Date.now()
    return { ok: true, usage: u, fetchedAt: new Date(goCache.at).toISOString() }
  } catch (e: any) {
    const msg = e?.message ?? String(e)
    goCache.error = msg
    if (goCache.data) return { ok: true, usage: goCache.data, stale: true, error: msg, fetchedAt: new Date(goCache.at).toISOString() }
    goCache.at = Date.now()
    return { ok: false, error: msg, fetchedAt: new Date(goCache.at).toISOString() }
  } finally {
    goCache.promise = null
  }
}

async function ensureDeepseek(pollMs: number): Promise<{ ok: boolean; data?: any; error?: string; stale?: boolean; fetchedAt: string }> {
  const now = Date.now()
  if (dsCache.data && now - dsCache.at < pollMs) return { ok: true, data: dsCache.data, fetchedAt: new Date(dsCache.at).toISOString() }
  if (dsCache.error && now - dsCache.at < ERROR_RETRY_GAP_MS) {
    if (dsCache.data) return { ok: true, data: dsCache.data, stale: true, error: dsCache.error, fetchedAt: new Date(dsCache.at).toISOString() }
    return { ok: false, error: dsCache.error, fetchedAt: new Date(dsCache.at).toISOString() }
  }
  if (dsCache.promise) {
    try {
      const d = await dsCache.promise
      return { ok: true, data: d, fetchedAt: new Date(dsCache.at).toISOString() }
    } catch (e: any) {
      if (dsCache.data) return { ok: true, data: dsCache.data, stale: true, error: e?.message ?? String(e), fetchedAt: new Date(dsCache.at).toISOString() }
      return { ok: false, error: e?.message ?? String(e), fetchedAt: new Date().toISOString() }
    }
  }
  const p = fetchDeepseek()
  dsCache.promise = p as any
  try {
    const d = await p
    dsCache.data = d
    dsCache.error = null
    dsCache.at = Date.now()
    return { ok: true, data: d, fetchedAt: new Date(dsCache.at).toISOString() }
  } catch (e: any) {
    const msg = e?.message ?? String(e)
    dsCache.error = msg
    if (dsCache.data) return { ok: true, data: dsCache.data, stale: true, error: msg, fetchedAt: new Date(dsCache.at).toISOString() }
    dsCache.at = Date.now()
    return { ok: false, error: msg, fetchedAt: new Date(dsCache.at).toISOString() }
  } finally {
    dsCache.promise = null
  }
}

function readJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => {
      if (!body) return resolve({})
      try {
        resolve(JSON.parse(body))
      } catch (e) {
        reject(new Error('JSON 解析失败'))
      }
    })
    req.on('error', reject)
  })
}

function json(res: ServerResponse, obj: any, status = 200): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(obj))
}

export function apply(ctx: any, config: any): () => void {
  const pollMs = typeof config?.pollMs === 'number' && config.pollMs >= 15_000 ? config.pollMs : 60_000

  const disposers: Array<() => void> = []

  disposers.push(
    ctx.webServer.register({
      kind: 'exact',
      path: '/go-quota/usage',
      handler: async (_req: IncomingMessage, res: ServerResponse) => {
        const out = await ensureGo(pollMs)
        json(res, out)
      },
    }),
  )

  disposers.push(
    ctx.webServer.register({
      kind: 'exact',
      path: '/deepseek/balance',
      handler: async (_req: IncomingMessage, res: ServerResponse) => {
        const out = await ensureDeepseek(pollMs)
        json(res, out)
      },
    }),
  )

  disposers.push(
    ctx.webServer.register({
      kind: 'exact',
      path: '/go-quota/config',
      handler: async (req: IncomingMessage, res: ServerResponse) => {
        if (req.method === 'GET') {
          const cfg = loadPersistConfig()
          json(res, {
            goKeyConfigured: !!cfg.goKey,
            deepseekKeyConfigured: !!cfg.deepseekKey,
            goKeyMasked: maskKey(cfg.goKey),
            deepseekKeyMasked: maskKey(cfg.deepseekKey),
          })
          return
        }
        if (req.method === 'POST') {
          try {
            const body = await readJsonBody(req)
            const patch: PersistConfig = {}
            if (typeof body.goKey === 'string') patch.goKey = body.goKey
            if (typeof body.deepseekKey === 'string') patch.deepseekKey = body.deepseekKey
            // 空字符串视为清空
            if (body.goKey === '' || body.goKey === null) patch.goKey = ''
            if (body.deepseekKey === '' || body.deepseekKey === null) patch.deepseekKey = ''

            const next = savePersistConfig(patch)
            // 失效缓存以立即用新 key 重试
            if (patch.goKey !== undefined) {
              goCache.at = 0
              goCache.error = null
              goCache.promise = null
            }
            if (patch.deepseekKey !== undefined) {
              dsCache.at = 0
              dsCache.error = null
              dsCache.promise = null
            }
            json(res, { ok: true, goKeyMasked: maskKey(next.goKey), deepseekKeyMasked: maskKey(next.deepseekKey) })
          } catch (e: any) {
            json(res, { ok: false, error: e?.message ?? String(e) }, 400)
          }
          return
        }
        res.statusCode = 405
        res.setHeader('Allow', 'GET, POST')
        res.end('Method Not Allowed')
      },
    }),
  )

  const timer = setInterval(() => {
    ensureGo(pollMs).catch(() => {})
    ensureDeepseek(pollMs).catch(() => {})
  }, pollMs)
  // @ts-ignore
  timer.unref?.()
  ensureGo(pollMs).catch(() => {})
  ensureDeepseek(pollMs).catch(() => {})

  return () => {
    clearInterval(timer)
    for (const d of disposers) try { d() } catch {}
  }
}
