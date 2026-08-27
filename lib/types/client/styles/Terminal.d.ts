import type { CollapsedProps, ExpandedProps } from './classic';
import type { DeepseekBalanceData } from '../state/deepseek-balance';
/** 终端 · 展开态 props（兼容余额注入与自轮询）。 */
export interface TerminalExpandedProps extends ExpandedProps {
    /** DeepSeek 余额（ /deepseek/balance ）— 由 Widget 注入；未注入时组件内自取 useDeepseekBalance */
    deepseek?: DeepseekBalanceData | null;
    deepseekError?: string | null;
    deepseekStale?: boolean;
    deepseekLoading?: boolean;
}
/** 终端 · 展开态。 */
export declare function TerminalExpanded({ period, priceTableExpanded, onTogglePriceTable, deepseek: deepseekProp, deepseekError: deepseekErrorProp, deepseekStale: deepseekStaleProp, deepseekLoading: deepseekLoadingProp, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: TerminalExpandedProps): JSX.Element;
/** 终端 · 收起态（光标 + 峰/闲）。 */
export declare function TerminalCollapsed({ period }: CollapsedProps): JSX.Element;
