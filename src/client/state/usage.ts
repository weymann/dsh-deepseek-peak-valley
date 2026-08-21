/**
 * 小组件浏览器侧 · 真实用量 store（当前会话用量）。
 *
 * 数据源：DSH 宿主 `dsh-token-meter` 发布到会话投影的 `tokenUsage`（provider
 * 上报的真实 token 用量，跨完整持久日志累计）。侧边栏 slot 为 root-scope，
 * 拿不到 session-scoped 的 `useProjection`，故在 `apply(ctx)` 里用
 * `ctx.sessions` 桥接当前会话的投影 face 到本模块 store。
 *
 * - 有当前会话且投影已就绪 → 真实数据；会话切换自动跟随；
 * - 无会话 / 投影未就绪（新会话尚未产生用量）→ 回退演示数据（DEMO_USAGE）；
 * - 预估费用 = 真实 token 数 × 价格表（V4-Flash / V4-Pro 分别按空闲/高峰计价）。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import { currentPeriod } from '../../core/period'
import { DEMO_USAGE, PRICE_TABLE, type PeriodState, type UsageSnapshot } from '../../core/types'
import { createStore, useStore } from './store'

/** token-meter 投影的累计用量（provider 上报，四个桶互斥）。 */
export interface TokenUsageProjection {
  uncachedInputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
}

/** 用量快照（含数据来源标记，便于 UI 显示「示例」）。 */
export interface UsageSnapshotWithSource {
  /** 用量数据。 */
  usage: UsageSnapshot
  /** true = 真实 token-meter 投影；false = 演示数据。 */
  real: boolean
  /** 当前会话 id（无会话时为 undefined）。 */
  sessionId: SessionId | undefined
}

/** 空投影（token-meter 尚未上报）。 */
const EMPTY_PROJECTION: TokenUsageProjection = {
  uncachedInputTokens: 0,
  outputTokens: 0,
  cacheReadTokens: 0,
  cacheWriteTokens: 0,
}

/**
 * 由 token-meter 投影计算单模型 · 单时段费用（元）。
 * 高峰价 = 空闲 × 2（PRICE_TABLE 权威数值）。
 * 输入费用 = (缓存未命中 + 缓存命中) × 输入单价；输出费用 = 输出 tokens × 输出单价。
 */
export function estimateCostForModel(
  model: 'V4-Flash' | 'V4-Pro',
  proj: TokenUsageProjection,
  period: PeriodState,
): number {
  const priceIdx = period === 'peak' ? 1 : 0
  const table = PRICE_TABLE[model]
  // 单位：元 / 百万 tokens → 元 / token
  return (
    (proj.uncachedInputTokens / 1_000_000) * table['输入·缓存未命中'][priceIdx] +
    (proj.cacheReadTokens / 1_000_000) * table['输入·缓存命中'][priceIdx] +
    (proj.outputTokens / 1_000_000) * table['输出'][priceIdx]
  )
}

/** 由 token-meter 投影计算两模型合计费用（元）。 */
export function estimateCost(proj: TokenUsageProjection, period: PeriodState): number {
  return (
    estimateCostForModel('V4-Flash', proj, period) +
    estimateCostForModel('V4-Pro', proj, period)
  )
}

/** 由投影构造用量快照（输入 = 未命中 + 命中，输出 = 输出）。 */
function projectionToUsage(proj: TokenUsageProjection, period: PeriodState): UsageSnapshot {
  const inputTokens = proj.uncachedInputTokens + proj.cacheReadTokens
  const cacheHitRate = inputTokens > 0 ? (proj.cacheReadTokens / inputTokens) * 100 : 0
  return {
    inputTokens,
    outputTokens: proj.outputTokens,
    cacheHit: proj.cacheReadTokens,
    cacheMiss: proj.uncachedInputTokens,
    cacheHitRate,
    estimatedCost: estimateCost(proj, period),
    costs: {
      'V4-Flash': {
        idle: estimateCostForModel('V4-Flash', proj, 'idle'),
        peak: estimateCostForModel('V4-Flash', proj, 'peak'),
      },
      'V4-Pro': {
        idle: estimateCostForModel('V4-Pro', proj, 'idle'),
        peak: estimateCostForModel('V4-Pro', proj, 'peak'),
      },
    },
  }
}

/** 初始快照：演示数据（尚未连接会话）。 */
function initialState(): UsageSnapshotWithSource {
  return {
    usage: DEMO_USAGE,
    real: false,
    sessionId: undefined,
  }
}

const usageStore = createStore<UsageSnapshotWithSource>(initialState)

/** 组件内读取用量快照。 */
export function useUsage(): UsageSnapshotWithSource {
  return useStore(usageStore)
}

/** 读取当前用量快照（非 hook）。 */
export function getUsage(): UsageSnapshotWithSource {
  return usageStore.getSnapshot()
}

/** 桥接状态：当前会话、当前投影 face 订阅。 */
interface BridgeState {
  /** 已订阅的会话投影 key（旧订阅的清理用）。 */
  sessionId: SessionId | undefined
  /** 当前会话投影 face 的取消订阅函数。 */
  unsubscribe: (() => void) | null
  /** 上一次读取的会话列表快照（引用比较，避免重复绑定）。 */
  lastList: unknown
}

const bridge: BridgeState = {
  sessionId: undefined,
  unsubscribe: null,
  lastList: undefined,
}

/** 推送一条新快照到 store（会话或投影变化时）。 */
function pushSnapshot(sessionId: SessionId | undefined, proj: TokenUsageProjection | undefined, period: PeriodState): void {
  if (proj === undefined) {
    // 投影未就绪：无会话或新会话尚无用量 → 演示数据
    usageStore.set({ usage: DEMO_USAGE, real: false, sessionId })
    return
  }
  usageStore.set({
    usage: projectionToUsage(proj, period),
    real: true,
    sessionId,
  })
}

/**
 * 把当前会话的 tokenUsage 投影桥接到本模块 store。
 * 由 apply(ctx) 在 fiber 生命周期内调用；返回 disposer。
 */
export function startUsageBridge(ctx: ClientContext): () => void {
  // 1) 监听会话列表（current 变化 → 重新绑定投影 face）
  const listUnsubscribe = ctx.sessions.list.subscribe(() => {
    const list = ctx.sessions.list.getSnapshot()
    const current: SessionId | undefined = list.current
    bridge.lastList = list
    if (current === bridge.sessionId) return
    // 释放旧订阅
    bridge.unsubscribe?.()
    bridge.unsubscribe = null
    bridge.sessionId = current
    if (current === undefined) {
      pushSnapshot(undefined, undefined, currentPeriod())
      return
    }
    const binding = ctx.sessions.binding(current)
    if (!binding) {
      // 会话已列出但绑定尚未就绪：保持演示数据，等下一次通知
      pushSnapshot(current, undefined, currentPeriod())
      return
    }
    const face = binding.session.projections.faceOf('tokenUsage') as unknown as {
      getSnapshot(): TokenUsageProjection | undefined
      subscribe(fn: () => void): () => void
    }
    // 立即推一次，再订阅后续帧
    pushSnapshot(current, face.getSnapshot(), currentPeriod())
    bridge.unsubscribe = face.subscribe(() => {
      pushSnapshot(current, face.getSnapshot(), currentPeriod())
    })
  })

  // 2) 首次执行一次（订阅不会立即回调）
  const list = ctx.sessions.list.getSnapshot()
  bridge.lastList = list
  const current: SessionId | undefined = list.current
  if (current !== undefined) {
    const binding = ctx.sessions.binding(current)
    if (binding) {
      const face = binding.session.projections.faceOf('tokenUsage') as unknown as {
        getSnapshot(): TokenUsageProjection | undefined
        subscribe(fn: () => void): () => void
      }
      pushSnapshot(current, face.getSnapshot(), currentPeriod())
      bridge.unsubscribe = face.subscribe(() => {
        pushSnapshot(current, face.getSnapshot(), currentPeriod())
      })
      bridge.sessionId = current
    }
  }

  // 3) 周期刷新（时段切换时费用重算；用量本身由投影帧驱动）
  const refreshTimer = setInterval(() => {
    pushSnapshot(bridge.sessionId, readProjection(ctx), currentPeriod())
  }, 5_000)

  return () => {
    listUnsubscribe()
    bridge.unsubscribe?.()
    bridge.unsubscribe = null
    clearInterval(refreshTimer)
  }
}

/** 读取当前会话的 tokenUsage 投影（无会话/绑定未就绪 → undefined）。 */
function readProjection(ctx: ClientContext): TokenUsageProjection | undefined {
  const current: SessionId | undefined = bridge.sessionId ?? ctx.sessions.list.getSnapshot().current
  if (current === undefined) return undefined
  const binding = ctx.sessions.binding(current)
  if (!binding) return undefined
  const face = binding.session.projections.faceOf('tokenUsage') as unknown as {
    getSnapshot(): TokenUsageProjection | undefined
  }
  return face.getSnapshot()
}

/** 导出类型（供测试/类型使用）。 */
export type { SessionId }
export { EMPTY_PROJECTION }
