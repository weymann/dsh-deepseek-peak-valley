/**
 * 风格 11 · 无人岛 Animal Island · 复刻《动物森友会》UI 语言。
 *
 * 双视图结构：默认「分时段计费」，点按钮切换到「当前会话用量」（带过渡动画）。
 * 展开态可收起价格表 / 明细；收起态跟随当前视图与时段实时变化。
 *
 * 设计稿：animal-island-widgets-v2.html
 */
import type { PeriodState, UsageSnapshot, ViewTab } from '../../core/types';
/** 展开态 props（含双视图切换）。 */
export interface AnimalIslandExpandedProps {
    period: PeriodState;
    priceTableExpanded: boolean;
    onTogglePriceTable: () => void;
    cursorPercent: number;
    /** 当前视图标签页。 */
    viewTab: ViewTab;
    /** 切换视图标签页。 */
    onToggleViewTab: () => void;
    /** 明细展开状态（用量视图）。 */
    usageDetailExpanded: boolean;
    /** 切换明细展开/收起。 */
    onToggleUsageDetail: () => void;
    /** 用量数据（默认 DEMO_USAGE）。 */
    usage?: UsageSnapshot;
    /** true = token-meter 真实投影数据；false = 演示数据。 */
    usageReal?: boolean;
}
/** 收起态 props（含视图状态）。 */
export interface AnimalIslandCollapsedProps {
    period: PeriodState;
    cursorPercent: number;
    /** 当前视图标签页。 */
    viewTab: ViewTab;
    /** 用量数据。 */
    usage?: UsageSnapshot;
}
export declare function AnimalIslandExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, viewTab, onToggleViewTab, usageDetailExpanded, onToggleUsageDetail, usage, usageReal, }: AnimalIslandExpandedProps): JSX.Element;
export declare function AnimalIslandCollapsed({ period, viewTab, usage, }: AnimalIslandCollapsedProps): JSX.Element;
