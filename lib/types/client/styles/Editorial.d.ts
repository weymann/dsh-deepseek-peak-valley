import type { CollapsedProps, ExpandedProps } from './classic';
/** 编辑 · 展开态。 */
export declare function EditorialExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, }: ExpandedProps): JSX.Element;
/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
export declare function EditorialCollapsed({ period }: CollapsedProps): JSX.Element;
