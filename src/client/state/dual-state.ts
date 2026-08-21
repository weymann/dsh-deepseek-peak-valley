/**
 * 小组件浏览器侧 · per-session 双态 store。
 *
 * 001 契约 `DualState`（expanded / collapsed）中由本插件负责的部分是价格表
 * 展开/收起（`.w-toggle`）；按 003 契约 §2 与 003 用例 7，该状态以 SessionId
 * 分桶记忆——两个会话各自独立展开/收起、互不串扰。
 *
 * 侧边栏自身 wide/rail 双态由宿主 shell 持有（`sidebar.footer.action` 的
 * owner props `{ wide }`），不在本 store 内。
 */
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import type { DualState } from '../../core/types'
import { createStore, useStore } from './store'

/** 每会话的双态记录。 */
export interface SessionDualState {
  /** 价格表展开/收起。 */
  dual: DualState
  /** 价格表是否展开（DualState 的布尔面）。 */
  priceTableExpanded: boolean
}

/** 默认记录：收起。 */
const DEFAULT_SESSION_STATE: SessionDualState = {
  dual: 'collapsed',
  priceTableExpanded: false,
}

/** 不可变快照：bucket 集合（Map 只读视图，版本号驱动 React 重渲染）。 */
export interface DualStateSnapshot {
  version: number
  buckets: ReadonlyMap<string, SessionDualState>
}

const dualState = createStore<DualStateSnapshot>(() => ({
  version: 0,
  buckets: new Map<string, SessionDualState>(),
}))

function mutate(mutator: (buckets: Map<string, SessionDualState>) => void): void {
  const prev = dualState.getSnapshot()
  const next = new Map(prev.buckets)
  mutator(next)
  dualState.set({ version: prev.version + 1, buckets: next })
}

/** 取某会话的双态记录（缺省收起）。 */
export function getSessionDualState(sessionId: string): SessionDualState {
  return dualState.getSnapshot().buckets.get(sessionId) ?? DEFAULT_SESSION_STATE
}

/** 设置某会话价格表展开/收起。 */
export function setPriceTableExpanded(sessionId: string, expanded: boolean): void {
  mutate((buckets) => {
    buckets.set(sessionId, {
      dual: expanded ? 'expanded' : 'collapsed',
      priceTableExpanded: expanded,
    })
  })
}

/** 组件内读取某会话的双态记录。 */
export function useSessionDualState(sessionId: SessionId | undefined): SessionDualState {
  const snapshot = useStore(dualState)
  return sessionId === undefined
    ? DEFAULT_SESSION_STATE
    : (snapshot.buckets.get(sessionId) ?? DEFAULT_SESSION_STATE)
}

/** fiber dispose 时清空分桶（003 契约：dispose 清理 controller 状态）。 */
export function resetDualStateBuckets(): void {
  mutate((buckets) => {
    buckets.clear()
  })
}
