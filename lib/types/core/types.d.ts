/**
 * 001-核心引擎 · 共享数据模型（唯一权威类型与数值来源）。
 *
 * 严格对齐 docs/A/A-01-PRD/001-核心引擎/001-接口契约.md：
 * - §1 共享数据模型（类型）
 * - §2 价格表（权威数值，元 / 百万 tokens，高峰 = 空闲 × 2）
 * - §3 时间轴契约（24h 5 段宽度与光标位置）
 * - §6 免责声明
 *
 * 本模块为纯 TS，零运行时外部依赖（可被 host / client / 测试任何一侧引用）。
 */
/** 时段状态：peak = 高峰 / idle = 空闲（北京时间判定）。 */
export type PeriodState = 'peak' | 'idle';
/** 双态状态：expanded = 展开 · 侧边栏 / collapsed = 收起 · 图标栏。 */
export type DualState = 'expanded' | 'collapsed';
/** 模型名。 */
export type ModelName = 'V4-Flash' | 'V4-Pro';
/** 计费项。 */
export type BillingItem = '输入·缓存命中' | '输入·缓存未命中' | '输出';
/** 价格单位：元 / 百万 tokens。 */
export type PriceUnit = '元/百万tokens';
/** 时段规则（北京时间）：高峰 = 09:00–12:00、14:00–18:00；空闲 = 其余全部时段。 */
export interface PeriodWindow {
    /** 起始时刻（闭区间，含），HH:mm（24h）。 */
    start: string;
    /** 结束时刻（开区间，不含），HH:mm（24h）。 */
    end: string;
}
export interface PeriodRule {
    timezone: 'Asia/Shanghai';
    peakWindows: PeriodWindow[];
}
/** 价格口径：高峰 = 空闲 × 2。 */
export interface Pricing {
    unit: PriceUnit;
    peakMultiplier: 2;
}
/** 价格表：模型 × 计费项 × [空闲, 高峰]。 */
export type PriceTable = Record<ModelName, Record<BillingItem, readonly [idle: number, peak: number]>>;
/** 时间轴一段（001-接口契约 §3，24h 5 段）。 */
export interface TimelineSegment {
    /** 时段属性（对应 `.s-idle` / `.s-peak`）。 */
    period: PeriodState;
    /** 段起点（当日分钟数，0 = 00:00）。 */
    fromMinutes: number;
    /** 段终点（当日分钟数，1440 = 24:00）。 */
    toMinutes: number;
    /** 段宽（设计稿 / 契约给定）。 */
    width: string;
}
/** 常量：价格表（001-接口契约 §2 权威数值）。 */
export declare const PRICE_TABLE: PriceTable;
/** 常量：时段规则（001-接口契约 §1）。 */
export declare const PERIOD_RULE: PeriodRule;
/** 常量：价格口径（001-接口契约 §1）。 */
export declare const PRICING: Pricing;
/** 常量：时间轴 5 段（001-接口契约 §3）。 */
export declare const TIMELINE_SEGMENTS: readonly TimelineSegment[];
/**
 * 常量：当前时段光标位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后光标按实时时钟计算
 * （core/period.ts `cursorPercentAt`，001-接口契约 §3），不得写死。
 */
export declare const TIMELINE_CURSOR: Record<PeriodState, string>;
/**
 * 常量：地铁风格列车位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后列车位置按实时时钟计算
 * （cursorPercentAt，001-接口契约 §3），不得写死。
 */
export declare const TRAIN_CURSOR: Record<PeriodState, string>;
/**
 * 常量：地铁风格收起态列车位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后按实时时钟计算
 * （cursorPercentAt，001-接口契约 §3），不得写死。
 */
export declare const TRAIN_CURSOR_COLLAPSED: Record<PeriodState, string>;
/** 常量：免责声明（001-接口契约 §6 / 003-接口契约 §6）。 */
export declare const DISCLAIMER = "\u4EF7\u683C\u57FA\u4E8E IT\u4E4B\u5BB6\u516C\u5F00\u7684 DeepSeek V4 \u5206\u65F6\u6BB5\u62A5\u4EF7\uFF08\u5143 / \u767E\u4E07 tokens\uFF09\uFF0C\u4EC5\u7528\u4E8E\u754C\u9762\u6F14\u793A\uFF0C\u6B63\u5F0F\u63A5\u5165\u8BF7\u4EE5\u5B98\u65B9\u5B9E\u65F6\u63A5\u53E3\u4E3A\u51C6";
