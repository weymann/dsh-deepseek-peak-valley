/**
 * 风格 11 · 无人岛 Animal Island · 复刻《动物森友会》UI 语言。
 *
 * 双视图结构：默认「分时段计费」，点按钮切换到「当前会话用量」（带过渡动画）。
 * 展开态可收起价格表 / 明细；收起态跟随当前视图与时段实时变化。
 *
 * 设计稿：animal-island-widgets-v2.html
 */
import type { PeriodState, UsageSnapshot, ViewTab } from '../../core/types';
import type { GoQuotaUsage } from '../state/go-quota';
import type { DeepseekBalanceData } from '../state/deepseek-balance';
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
    /** 用量数据（默认 DEMO_USAGE）——保留兼容，Go 套餐优先使用 goQuota */
    usage?: UsageSnapshot;
    /** true = token-meter 真实投影数据；false = 演示数据。 */
    usageReal?: boolean;
    /** Go 套餐真实用量（ /go-quota/usage ），优先于 usage */
    goQuota?: GoQuotaUsage | null;
    goQuotaError?: string | null;
    goQuotaStale?: boolean;
    /** DeepSeek 余额（ /deepseek/balance ） */
    deepseek?: DeepseekBalanceData | null;
    deepseekError?: string | null;
    deepseekStale?: boolean;
    deepseekLoading?: boolean;
}
/** 收起态 props（含视图状态）。 */
export interface AnimalIslandCollapsedProps {
    period: PeriodState;
    cursorPercent: number;
    /** 当前视图标签页。 */
    viewTab: ViewTab;
    /** 用量数据。 */
    usage?: UsageSnapshot;
    goQuota?: GoQuotaUsage | null;
}
/** Go 套餐额度（美元）。 */
export declare const GO_QUOTA: {
    readonly fiveHour: 12;
    readonly weekly: 30;
    readonly monthly: 60;
};
export declare function AnimalIslandExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, viewTab, onToggleViewTab, usageDetailExpanded, onToggleUsageDetail, usage, usageReal, goQuota, goQuotaError, goQuotaStale, deepseek, deepseekError, deepseekStale, deepseekLoading, }: AnimalIslandExpandedProps): JSX.Element;
export declare function AnimalIslandCollapsed({ period, viewTab, usage, }: AnimalIslandCollapsedProps): JSX.Element;
