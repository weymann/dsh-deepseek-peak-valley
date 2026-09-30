/**
 * Go 套餐用量 · 浏览器侧轮询 store（填充三贴纸）。
 *
 * 同源路由 GET /go-quota/usage 由 Node 半场代理官方接口，浏览器每 60s 轮询一次
 *（与 Node 侧 TTL 对齐）。不做弹窗，仅负责三条百分比的实时填充。
 */
import { createStore, useStore } from './store'

export interface GoQuotaItem {
  status: string
  percent: number
  resetsAt: string
}
export interface GoQuotaUsage {
  rolling: GoQuotaItem
  weekly: GoQuotaItem
  monthly: GoQuotaItem
}
export interface GoQuotaSnapshot {
  usage: GoQuotaUsage | null
  ok: boolean
  stale: boolean
  /** 宿主返回的英文兜底文案（本地化在渲染层按当前语言完成）。 */
  error: string | null
  /** 与 `error` 配对的稳定机器码，供渲染层本地化。 */
  errorCode: string | null
  fetchedAt: string | null
  loading: boolean
}

function initial(): GoQuotaSnapshot {
  return { usage: null, ok: false, stale: false, error: null, errorCode: null, fetchedAt: null, loading: true }
}

const store = createStore<GoQuotaSnapshot>(initial)

export function useGoQuota(): GoQuotaSnapshot {
  return useStore(store)
}

export function getGoQuota(): GoQuotaSnapshot {
  return store.getSnapshot()
}

async function fetchOnce(): Promise<void> {
  try {
    const res = await fetch('/go-quota/usage', { cache: 'no-store' } as any)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: any = await res.json()
    if (data?.ok && data?.usage) {
      store.set({
        usage: data.usage as GoQuotaUsage,
        ok: true,
        stale: !!data.stale,
        error: data.error ?? null,
        errorCode: data.errorCode ?? null,
        fetchedAt: data.fetchedAt ?? new Date().toISOString(),
        loading: false,
      })
    } else if (data?.usage && data?.stale) {
      // stale-on-error 仍有旧值
      store.set({
        usage: data.usage as GoQuotaUsage,
        ok: true,
        stale: true,
        error: data.error ?? null,
        errorCode: data.errorCode ?? null,
        fetchedAt: data.fetchedAt ?? new Date().toISOString(),
        loading: false,
      })
    } else {
      store.set({
        usage: data?.usage ?? null,
        ok: false,
        stale: !!data?.stale,
        error: data?.error ?? null,
        errorCode: data?.errorCode ?? 'unknown',
        fetchedAt: data?.fetchedAt ?? new Date().toISOString(),
        loading: false,
      })
    }
  } catch (e: any) {
    const prev = store.getSnapshot()
    // 网络层失败没有宿主码：保留原始 message（如 "HTTP 500" / "Failed to fetch"）
    store.set({
      usage: prev.usage, // 保留旧值避免闪空
      ok: prev.usage ? true : false,
      stale: !!prev.usage,
      error: e?.message ?? String(e),
      errorCode: null,
      fetchedAt: prev.fetchedAt,
      loading: false,
    })
  }
}

let timer: number | null = null

export function startGoQuotaPolling(): () => void {
  fetchOnce()
  timer = window.setInterval(fetchOnce, 60_000)
  return () => {
    if (timer !== null) clearInterval(timer)
    timer = null
  }
}

/** 立即重新拉取一次 Go 套餐用量（供倒计时归零时主动触发）。 */
export function refreshGoQuota(): Promise<void> {
  return fetchOnce()
}

/** 工具：限额常量（用于 $x 换算，仅展示用） */
export const GO_LIMITS = { rolling: 12, weekly: 30, monthly: 60 } as const

export function dollars(percent: number, limit: number): string {
  const v = (percent / 100) * limit
  return `$${v.toFixed(1)}/$${limit}`
}
