import type { CollapsedProps, ExpandedProps } from './classic';
/** 终端 · 展开态。 */
export declare function TerminalExpanded({ period, priceTableExpanded, onTogglePriceTable, }: ExpandedProps): JSX.Element;
/** 终端 · 收起态（光标 + 峰/闲）。 */
export declare function TerminalCollapsed({ period }: CollapsedProps): JSX.Element;
