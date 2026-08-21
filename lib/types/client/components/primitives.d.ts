/**
 * 共享组件原语（对齐 001-前端-页面交互 §2 骨架与 DOM 契约）。
 *
 * 全部展开态风格共用的结构件：徽章 / 时间轴 / 价格表 / 展开切换按钮。
 * 逐款差异由各风格组件提供专属标记（印戳、地铁线路、终端、昼夜、编辑…）。
 */
import type { ReactNode } from 'react';
import { type BillingItem, type ModelName, type PeriodState } from '../../core/types';
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
/** 价格表（`.wt`）：两模型分组 × 3 计费项 × [空闲, 高峰]，当前时段列高亮条。 */
export declare function PriceTable({ period }: {
    period: PeriodState;
}): JSX.Element;
/** 价格表展开/收起切换按钮（`.w-toggle` + aria-expanded + chevron）。 */
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
