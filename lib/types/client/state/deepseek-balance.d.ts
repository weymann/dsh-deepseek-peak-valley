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
    error: string | null;
    fetchedAt: string | null;
    loading: boolean;
}
export declare function useDeepseekBalance(): DeepseekSnapshot;
export declare function getDeepseekBalance(): DeepseekSnapshot;
export declare function startDeepseekPolling(): () => void;
export declare function refreshDeepseek(): void;
