import type { CollapsedProps, ExpandedProps } from './classic';
/** 票据 · 展开态（余额查询替换价格表）。 */
export declare function ReceiptExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: ExpandedProps): JSX.Element;
/** 票据 · 收起态（上下锯齿缘由 ::before/::after CSS 承担）。 */
export declare function ReceiptCollapsed({ period }: CollapsedProps): JSX.Element;
