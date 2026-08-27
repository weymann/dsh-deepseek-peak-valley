import type { GoQuotaUsage } from '../state/go-quota';
export declare function GoQuotaPanel(props: {
    goQuota?: GoQuotaUsage | null;
    goQuotaError?: string | null;
    goQuotaStale?: boolean;
    goQuotaLoading?: boolean;
}): JSX.Element;
