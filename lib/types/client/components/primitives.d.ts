/**
 * 共享组件原语（对齐 001-前端-页面交互 §2 骨架与 DOM 契约）。
 *
 * 全部展开态风格共用的结构件：徽章 / 时间轴 / 价格表 / 展开切换按钮。
 * 逐款差异由各风格组件提供专属标记（印戳、地铁线路、终端、昼夜、编辑…）。
 */
import type { ReactNode } from 'react';
import { type BillingItem, type ModelName, type PeriodState } from '../../core/types';
import type { DeepseekBalanceData } from '../state/deepseek-balance';
import type { GoQuotaUsage } from '../state/go-quota';
/** 数字渲染：固定两位小数（0.05 / 1.50 / 27.00）。 */
export declare function formatPrice(value: number): string;
/** 计费模型与计费项顺序（价格表行序）。 */
export declare const MODEL_ORDER: readonly ModelName[];
export declare const ITEM_ORDER: readonly BillingItem[];
/** 时段徽章（圆点 + 高峰/空闲 文字）。 */
export declare function Badge({ period }: {
    period: PeriodState;
}): JSX.Element;
/** 双态文字（高峰/空闲；永不共存——仅渲染当前时段）。 */
export declare function PeriodWord({ period, long }: {
    period: PeriodState;
    long?: boolean;
}): ReactNode;
/**
 * 24h 时间轴（5 段轨道 + 当前光标 + 元信息）。
 * @param cursorPercent 实时光标百分比（0–100，按当前北京时间计算）；
 *   缺省时退回设计稿演示常量（TIMELINE_CURSOR，仅作兜底）。
 */
export declare function Timeline({ period, meta, cursorPercent, }: {
    period: PeriodState;
    meta?: string;
    cursorPercent?: number;
}): JSX.Element;
/**
 * Go 模型「近 5 小时（rolling）套餐用量」进度条。
 *
 * 与 Timeline 同构（`.w-tl` / `.tl-bar` / `.tl-track` / `.tl-cur` / `.tl-meta`），
 * 但 **没有高峰/空闲分段标记**——`.tl-track` 仅一条纯轨道 + 用量填充 + 用量光标，
 * 用于展示 Go 模型近 5 小时套餐用量百分比（限额见 GO_LIMITS.rolling）。
 *
 * 数据来自浏览器侧 go-quota 轮询 store（`useGoQuota`，已全局启动轮询）；
 * 上层 Widget 也可直接注入 goQuota / 错误 / 加载态，缺省时回退到 store 取值。
 */
export declare function UsageBar({ goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: {
    goQuota?: GoQuotaUsage | null;
    goQuotaError?: string | null;
    goQuotaStale?: boolean;
    goQuotaLoading?: boolean;
}): JSX.Element;
/** 价格表（`.wt`）：两模型分组 × 3 计费项 × [空闲, 高峰]，当前时段列高亮条。 */
export declare function PriceTable({ period }: {
    period: PeriodState;
}): JSX.Element;
/** 余额查询展开/收起切换按钮（原 价格表，`.w-toggle` + aria-expanded + chevron）。 */
export declare function Toggle({ expanded, onToggle, label, }: {
    expanded: boolean;
    onToggle: () => void;
    label?: string;
}): JSX.Element;
/** 页脚（单位标注）。 */
export declare function UnitFooter({ children, note }: {
    children?: ReactNode;
    note?: string;
}): JSX.Element;
/** 余额查询页脚：动态 60s 倒计时（归零触发刷新，见 state/countdown）。 */
export declare function CountdownFooter({ children }: {
    children?: ReactNode;
}): JSX.Element;
/** 余额查询面板 props（DeepSeek 余额 + Go 周/月额度）。 */
export interface DeepseekBalanceProps {
    deepseek?: DeepseekBalanceData | null;
    deepseekError?: string | null;
    deepseekStale?: boolean;
    deepseekLoading?: boolean;
    /** Go 套餐用量（周/月额度）。 */
    goQuota?: GoQuotaUsage | null;
    goQuotaError?: string | null;
    goQuotaStale?: boolean;
    goQuotaLoading?: boolean;
}
/**
 * 余额查询面板（替换价格表）：DeepSeek 余额 / Go 周额度 / Go 月额度。
 * 已删除「赠送 · 充值 · 可用」三行；样式自适应各风格。
 */
export declare function DeepseekBalance({ deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading, }: DeepseekBalanceProps): JSX.Element;
