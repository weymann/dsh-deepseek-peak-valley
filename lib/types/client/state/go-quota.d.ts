export interface GoQuotaItem {
    status: string;
    percent: number;
    resetsAt: string;
}
export interface GoQuotaUsage {
    rolling: GoQuotaItem;
    weekly: GoQuotaItem;
    monthly: GoQuotaItem;
}
export interface GoQuotaSnapshot {
    usage: GoQuotaUsage | null;
    ok: boolean;
    stale: boolean;
    /** 宿主返回的英文兜底文案（本地化在渲染层按当前语言完成）。 */
    error: string | null;
    /** 与 `error` 配对的稳定机器码，供渲染层本地化。 */
    errorCode: string | null;
    fetchedAt: string | null;
    loading: boolean;
}
export declare function useGoQuota(): GoQuotaSnapshot;
export declare function getGoQuota(): GoQuotaSnapshot;
export declare function startGoQuotaPolling(): () => void;
/** 立即重新拉取一次 Go 套餐用量（供倒计时归零时主动触发）。 */
export declare function refreshGoQuota(): Promise<void>;
/** 工具：限额常量（用于 $x 换算，仅展示用） */
export declare const GO_LIMITS: {
    readonly rolling: 12;
    readonly weekly: 30;
    readonly monthly: 60;
};
export declare function dollars(percent: number, limit: number): string;
