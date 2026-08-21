/**
 * 小组件浏览器侧 · 时段 store（自动判定 + 演示手动覆盖）。
 *
 * - 接入后按当前北京时间自动判定 `body[data-period]`（peak / idle）；
 * - 演示期提供手动切换（override），刷新后回到自动判定（001 用例 10）；
 * - 全插件共享单一事实源：多挂载点 / 十款风格同步响应，无独立时段状态。
 *
 * 定时器随 fiber 生命周期（apply 中 ctx.effect 启动/清理）。
 */
import { type PeriodState } from '../../core/period';
/** 时段快照。 */
export interface PeriodSnapshot {
    /** 生效时段（有手动覆盖时为覆盖值，否则为自动判定值）。 */
    period: PeriodState;
    /** 纯自动判定（北京时间）。 */
    auto: PeriodState;
    /** 演示手动覆盖（null = 自动）。 */
    override: PeriodState | null;
    /** 时间轴光标百分比（0–100）：始终按真实时钟计算，手动覆盖时段不影响。 */
    cursorPercent: number;
}
/** 启动自动刷新定时器（幂等；由 fiber 生命周期持有，dispose 时停止）。 */
export declare function startPeriodTimer(): () => void;
/** 演示期手动覆盖时段；null 清除覆盖回到自动判定。 */
export declare function setPeriodOverride(override: PeriodState | null): void;
/** 组件内读取生效时段快照。 */
export declare function usePeriod(): PeriodSnapshot;
