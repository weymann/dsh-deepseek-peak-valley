/**
 * DeepSeek 余额 · 浏览器侧轮询 store（余额查询面板）。
 *
 * 同源路由 GET /deepseek/balance 由 Node 半场代理 https://api.deepseek.com/user/balance
 */
import { createStore, useStore } from './store'

export interface DeepseekBalanceInfo {
  currency: string
  total_balance: string
  granted_balance: string
  topped_up_balance: string
}
export interface DeepseekBalanceData {
  is_available: boolean
  balance_infos: DeepseekBalanceInfo[]
}
export interface DeepseekSnapshot {
  data: DeepseekBalanceData | null
  ok: boolean
  stale: boolean
  error: string | null
  fetchedAt: string | null
  loading: boolean
}

function initial(): DeepseekSnapshot {
  return { data: null, ok: false, stale: false, error: null, fetchedAt: null, loading: true }
}

const store = createStore<DeepseekSnapshot>(initial)

export function useDeepseekBalance(): DeepseekSnapshot {
  return useStore(store)
}
export function getDeepseekBalance(): DeepseekSnapshot {
  return store.getSnapshot()
}

async function fetchOnce(): Promise<void> {
  try {
    const res = await fetch('/deepseek/balance', { cache: 'no-store' } as any)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: any = await res.json()
    if (data?.ok && data?.data) {
      store.set({ data: data.data as DeepseekBalanceData, ok: true, stale: !!data.stale, error: data.error ?? null, fetchedAt: data.fetchedAt ?? new Date().toISOString(), loading: false })
    } else if (data?.data && data?.stale) {
      store.set({ data: data.data as DeepseekBalanceData, ok: true, stale: true, error: data.error ?? null, fetchedAt: data.fetchedAt ?? new Date().toISOString(), loading: false })
    } else {
      store.set({ data: data?.data ?? null, ok: false, stale: !!data?.stale, error: data?.error ?? '未知错误', fetchedAt: data?.fetchedAt ?? new Date().toISOString(), loading: false })
    }
  } catch (e: any) {
    const prev = store.getSnapshot()
    store.set({ data: prev.data, ok: prev.data ? true : false, stale: !!prev.data, error: e?.message ?? String(e), fetchedAt: prev.fetchedAt, loading: false })
  }
}

let timer: number | null = null
export function startDeepseekPolling(): () => void {
  fetchOnce()
  timer = window.setInterval(fetchOnce, 60_000)
  return () => {
    if (timer !== null) clearInterval(timer)
    timer = null
  }
}
export function refreshDeepseek(): void {
  fetchOnce()
}
