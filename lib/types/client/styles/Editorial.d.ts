import type { CollapsedProps, ExpandedProps } from './classic';
/** 编辑 · 展开态（余额查询替换价格表）。 */
export declare function EditorialExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: ExpandedProps): JSX.Element;
/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
export declare function EditorialCollapsed({ period }: CollapsedProps): JSX.Element;
