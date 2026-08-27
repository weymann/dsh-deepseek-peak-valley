/**
 * 余额 / Go 额度 刷新倒计时（浏览器侧单例）。
 *
 * 与 Node 半场的 60s 轮询对齐：每秒递减，归零时主动触发一次 DeepSeek 余额与
 * Go 套餐用量的刷新，然后重新从 60 计起。组件通过 useCountdown 订阅剩余秒数，
 * 用于页脚「更新频率 · 剩 Ns」的动态倒计时展示。
 */
import { createStore, useStore } from './store'
import { refreshDeepseek } from './deepseek-balance'
import { refreshGoQuota } from './go-quota'

/** 倒计时总时长（秒），与轮询间隔一致。 */
export const COUNTDOWN_SECONDS = 60

interface CountdownState {
  remaining: number
}

const store = createStore<CountdownState>(() => ({ remaining: COUNTDOWN_SECONDS }))
let timer: number | null = null

/** 订阅剩余秒数（归零时组件重渲染）。 */
export function useCountdown(): CountdownState {
  return useStore(store)
}

/**
 * 启动全局倒计时（与插件生命周期绑定，由 client index 的 ctx.effect 调用）。
 * 返回清理函数。每秒递减，到 0 触发一次刷新并重置。
 */
export function startCountdown(): () => void {
  store.set({ remaining: COUNTDOWN_SECONDS })
  timer = window.setInterval(() => {
    const cur = store.getSnapshot().remaining
    if (cur <= 1) {
      // 归零：主动触发一次刷新，然后重新计时
      try {
        void refreshDeepseek()
      } catch {
        /* 忽略单次刷新失败，下次自然重试 */
      }
      try {
        void refreshGoQuota()
      } catch {
        /* 忽略单次刷新失败，下次自然重试 */
      }
      store.set({ remaining: COUNTDOWN_SECONDS })
    } else {
      store.set({ remaining: cur - 1 })
    }
  }, 1000)
  return () => {
    if (timer !== null) clearInterval(timer)
    timer = null
  }
}
