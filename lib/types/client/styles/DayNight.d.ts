import type { CollapsedProps, ExpandedProps } from './classic';
/** 昼夜 · 展开态（余额查询替换价格表）。 */
export declare function DayNightExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: ExpandedProps): JSX.Element;
/** 昼夜 · 收起态（太阳/月亮 + 峰/闲）。 */
export declare function DayNightCollapsed({ period }: CollapsedProps): JSX.Element;
