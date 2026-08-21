/**
 * 小组件浏览器侧 · 最小响应式 store（自包含，零运行时依赖）。
 *
 * 提供 React 可订阅的可观察快照源（getSnapshot + subscribe，适配
 * useSyncExternalStore），以及模块级单例封装。
 */
import { useSyncExternalStore } from 'react'

/** 可观察快照源（与 DSH runtime 的 ObservableSnapshot 同构）。 */
export interface ReadableStore<T> {
  /** 返回当前快照（更新间保持稳定引用）。 */
  getSnapshot(): T
  /** 订阅快照替换；返回取消订阅。 */
  subscribe(listener: () => void): () => void
}

/** 订阅 store 的 React hook（组件在快照替换时重渲染）。 */
export function useStore<T>(store: ReadableStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot)
}

/** 创建一个内部可变、外部只读的快照 store。 */
export function createStore<T>(init: () => T): ReadableStore<T> & {
  /** 整体替换状态（更新间快照引用稳定）。 */
  set(next: T): void
} {
  let state = init()
  const listeners = new Set<() => void>()
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    set(next: T): void {
      state = next
      for (const listener of listeners) listener()
    },
  }
}

/** 安全 localStorage 读取（无 localStorage / 损坏 JSON / 类型不符 → 返回缺省）。 */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof localStorage === 'undefined') return fallback
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    return parsed as T
  } catch {
    return fallback
  }
}

/** 安全 localStorage 写入（无 localStorage / 序列化失败 → 忽略）。 */
export function writeStorage(key: string, value: unknown): void {
  try {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 隐私模式 / 配额满等：忽略，仅内存态继续可用。
  }
}
