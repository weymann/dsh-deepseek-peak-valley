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
export type PeriodState = 'peak' | 'idle'

/** 双态状态：expanded = 展开 · 侧边栏 / collapsed = 收起 · 图标栏。 */
export type DualState = 'expanded' | 'collapsed'

/** 模型名。 */
export type ModelName = 'V4-Flash' | 'V4-Pro'

/** 计费项。 */
export type BillingItem = '输入·缓存命中' | '输入·缓存未命中' | '输出'

/** 双视图标签页（Animal Island 等双视图风格使用）。 */
export type ViewTab = 'pricing' | 'usage'

/** 会话用量快照（演示数据，正式接入以真实 API 为准）。 */
export interface UsageSnapshot {
  /** 输入 tokens 总数。 */
  inputTokens: number
  /** 输出 tokens 总数。 */
  outputTokens: number
  /** 输入 · 缓存命中 tokens。 */
  cacheHit: number
  /** 输入 · 缓存未命中 tokens。 */
  cacheMiss: number
  /** 缓存命中率（0–100，缓存命中 / 总输入）。 */
  cacheHitRate: number
  /** 预估费用（元，两模型合计 · 当前时段）。 */
  estimatedCost: number
  /** 分模型 · 分时段预估费用（元）。 */
  costs: Record<ModelName, { idle: number; peak: number }>
}

/** 价格单位：元 / 百万 tokens。 */
export type PriceUnit = '元/百万tokens'

/** 时段规则（北京时间）：工作日 高峰 = 09:00–12:00、14:00–18:00；周末 全天 空闲；空闲 = 其余全部时段。 */
export interface PeriodWindow {
  /** 起始时刻（闭区间，含），HH:mm（24h）。 */
  start: string
  /** 结束时刻（开区间，不含），HH:mm（24h）。 */
  end: string
}

export interface PeriodRule {
  timezone: 'Asia/Shanghai'
  peakWindows: PeriodWindow[]
  // idle = 一日内除去 peakWindows 的全部时段
}

/** 价格口径：高峰 = 空闲 × 2。 */
export interface Pricing {
  unit: PriceUnit
  peakMultiplier: 2
}

/** 价格表：模型 × 计费项 × [空闲, 高峰]。 */
export type PriceTable = Record<ModelName, Record<BillingItem, readonly [idle: number, peak: number]>>

/** 时间轴一段（001-接口契约 §3，24h 5 段）。 */
export interface TimelineSegment {
  /** 时段属性（对应 `.s-idle` / `.s-peak`）。 */
  period: PeriodState
  /** 段起点（当日分钟数，0 = 00:00）。 */
  fromMinutes: number
  /** 段终点（当日分钟数，1440 = 24:00）。 */
  toMinutes: number
  /** 段宽（设计稿 / 契约给定）。 */
  width: string
}

/** 常量：价格表（001-接口契约 §2 权威数值）。 */
export const PRICE_TABLE: PriceTable = {
  'V4-Flash': {
    '输入·缓存命中': [0.05, 0.1],
    '输入·缓存未命中': [1.5, 3.0],
    '输出': [4.5, 9.0],
  },
  'V4-Pro': {
    '输入·缓存命中': [0.15, 0.3],
    '输入·缓存未命中': [4.5, 9.0],
    '输出': [13.5, 27.0],
  },
}

/** 常量：时段规则（001-接口契约 §1）。 */
export const PERIOD_RULE: PeriodRule = {
  timezone: 'Asia/Shanghai',
  peakWindows: [
    { start: '09:00', end: '12:00' },
    { start: '14:00', end: '18:00' },
  ],
}

/** 常量：价格口径（001-接口契约 §1）。 */
export const PRICING: Pricing = {
  unit: '元/百万tokens',
  peakMultiplier: 2,
}

/** 常量：时间轴 5 段（001-接口契约 §3）。 */
export const TIMELINE_SEGMENTS: readonly TimelineSegment[] = [
  { period: 'idle', fromMinutes: 0, toMinutes: 9 * 60, width: '37.5%' },
  { period: 'peak', fromMinutes: 9 * 60, toMinutes: 12 * 60, width: '12.5%' },
  { period: 'idle', fromMinutes: 12 * 60, toMinutes: 14 * 60, width: '8.34%' },
  { period: 'peak', fromMinutes: 14 * 60, toMinutes: 18 * 60, width: '16.66%' },
  { period: 'idle', fromMinutes: 18 * 60, toMinutes: 24 * 60, width: '25%' },
]

/**
 * 常量：当前时段光标位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后光标按实时时钟计算
 * （core/period.ts `cursorPercentAt`，001-接口契约 §3），不得写死。
 */
export const TIMELINE_CURSOR: Record<PeriodState, string> = {
  peak: '43.75%',
  idle: '90%',
}

/**
 * 常量：地铁风格列车位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后列车位置按实时时钟计算
 * （cursorPercentAt，001-接口契约 §3），不得写死。
 */
export const TRAIN_CURSOR: Record<PeriodState, string> = {
  peak: '43.75%',
  idle: '90%',
}

/**
 * 常量：地铁风格收起态列车位置。
 * ⚠️ 设计稿演示值，仅作兜底；接入后按实时时钟计算
 * （cursorPercentAt，001-接口契约 §3），不得写死。
 */
export const TRAIN_CURSOR_COLLAPSED: Record<PeriodState, string> = {
  peak: '37.5%',
  idle: '84%',
}

/** 常量：免责声明（001-接口契约 §6 / 003-接口契约 §6）。 */
export const DISCLAIMER = '价格基于 IT之家公开的 DeepSeek V4 分时段报价（元 / 百万 tokens），仅用于界面演示，正式接入请以官方实时接口为准'

/**
 * 演示用量数据（IT之家公开数据推算）。
 * ⚠️ 接入后以真实 API 为准，此处仅作界面演示占位。
 */
export const DEMO_USAGE: UsageSnapshot = {
  inputTokens: 1200,
  outputTokens: 3400,
  cacheHit: 800,
  cacheMiss: 400,
  cacheHitRate: 66.7, // 800 / 1200
  estimatedCost: 0.42,
  costs: {
    'V4-Flash': { idle: 0.1, peak: 0.2 },
    'V4-Pro': { idle: 0.32, peak: 0.64 },
  },
}

/** 格式化 token 数量（千位缩写：1200 → 1.2k）。 */
export function formatTokenCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}m`
  if (count >= 10_000) return `${(count / 1_000).toFixed(1)}k`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`
  return String(count)
}

/** 格式化费用（¥ + 最多两位小数，省略末尾零）。 */
export function formatCost(yuan: number): string {
  if (yuan < 0.01) return `¥${yuan.toFixed(4)}`
  if (yuan < 1) return `¥${yuan.toFixed(2)}`
  return `¥${yuan.toFixed(2)}`
}

/** 格式化百分比（0–100 → 66.7%）。 */
export function formatRate(rate: number): string {
  return `${rate.toFixed(1)}%`
}
