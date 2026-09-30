export interface DeepseekBalanceInfo {
    currency: string;
    total_balance: string;
    granted_balance: string;
    topped_up_balance: string;
}
export interface DeepseekBalanceData {
    is_available: boolean;
    balance_infos: DeepseekBalanceInfo[];
}
export interface DeepseekSnapshot {
    data: DeepseekBalanceData | null;
    ok: boolean;
    stale: boolean;
    /** 宿主返回的英文兜底文案（本地化在渲染层按当前语言完成）。 */
    error: string | null;
    /** 与 `error` 配对的稳定机器码，供渲染层本地化。 */
    errorCode: string | null;
    fetchedAt: string | null;
    loading: boolean;
}
export declare function useDeepseekBalance(): DeepseekSnapshot;
export declare function getDeepseekBalance(): DeepseekSnapshot;
export declare function startDeepseekPolling(): () => void;
export declare function refreshDeepseek(): void;
