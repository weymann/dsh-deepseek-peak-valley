import type { CollapsedProps, ExpandedProps } from './classic';
/** 时刻线 · 展开态。 */
export declare function MetroExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: ExpandedProps): JSX.Element;
/** 时刻线 · 收起态（垂直 mini 线路，列车位置按实时时钟移动）。 */
export declare function MetroCollapsed({ period, cursorPercent }: CollapsedProps): JSX.Element;
