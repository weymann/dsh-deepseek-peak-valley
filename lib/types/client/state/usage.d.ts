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
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client';
import { type PeriodState, type UsageSnapshot } from '../../core/types';
/** token-meter 投影的累计用量（provider 上报，四个桶互斥）。 */
export interface TokenUsageProjection {
    uncachedInputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
}
/** 用量快照（含数据来源标记，便于 UI 显示「示例」）。 */
export interface UsageSnapshotWithSource {
    /** 用量数据。 */
    usage: UsageSnapshot;
    /** true = 真实 token-meter 投影；false = 演示数据。 */
    real: boolean;
    /** 当前会话 id（无会话时为 undefined）。 */
    sessionId: SessionId | undefined;
}
/** 空投影（token-meter 尚未上报）。 */
declare const EMPTY_PROJECTION: TokenUsageProjection;
/**
 * 由 token-meter 投影计算单模型 · 单时段费用（元）。
 * 高峰价 = 空闲 × 2（PRICE_TABLE 权威数值）。
 * 输入费用 = (缓存未命中 + 缓存命中) × 输入单价；输出费用 = 输出 tokens × 输出单价。
 */
export declare function estimateCostForModel(model: 'V4-Flash' | 'V4-Pro', proj: TokenUsageProjection, period: PeriodState): number;
/** 由 token-meter 投影计算两模型合计费用（元）。 */
export declare function estimateCost(proj: TokenUsageProjection, period: PeriodState): number;
/** 组件内读取用量快照。 */
export declare function useUsage(): UsageSnapshotWithSource;
/** 读取当前用量快照（非 hook）。 */
export declare function getUsage(): UsageSnapshotWithSource;
/**
 * 把当前会话的 tokenUsage 投影桥接到本模块 store。
 * 由 apply(ctx) 在 fiber 生命周期内调用；返回 disposer。
 */
export declare function startUsageBridge(ctx: ClientContext): () => void;
/** 导出类型（供测试/类型使用）。 */
export type { SessionId };
export { EMPTY_PROJECTION };
