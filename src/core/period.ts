/**
 * 001-核心引擎 · 时段判定（纯 TS，零依赖）。
 *
 * 按北京时间（Asia/Shanghai）自动判定当前时段：
 * - 高峰窗口 09:00–12:00、14:00–18:00（闭区间起始、开区间结束 → 09:00 为 peak，
 *   12:00 / 18:00 为 idle）；
 * - 空闲 = 其余全部时段。
 *
 * 对齐 001-测试-验收用例 用例 1：
 *   09:00 / 10:00 / 16:00 → peak；12:00 / 18:00 / 00:00 → idle。
 */
import { PERIOD_RULE, type PeriodState } from './types'

/** 北京时区标识。 */
export const BEIJING_TIMEZONE = 'Asia/Shanghai' as const

/** 重导出时段类型（client 侧从本模块一并取用）。 */
export type { PeriodState } from './types'

/** 一天的分钟数。 */
const MINUTES_PER_DAY = 24 * 60

/** 把 "HH:mm" 解析为当日分钟数（00:00 = 0）。 */
export function minutesOf(hhmm: string): number {
  const [hour = 0, minute = 0] = hhmm.split(':').map((part) => Number.parseInt(part, 10))
  const h = Number.isFinite(hour) ? hour : 0
  const m = Number.isFinite(minute) ? minute : 0
  return Math.min(Math.max(h * 60 + m, 0), MINUTES_PER_DAY - 1)
}

/**
 * 取给定时刻的北京当日分钟数。
 * 用 Intl 按 Asia/Shanghai 归一化，避免依赖本机时区。
 */
export function beijingMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BEIJING_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const map = new Map(parts.map((part) => [part.type, part.value]))
  let hour = Number.parseInt(map.get('hour') ?? '0', 10)
  const minute = Number.parseInt(map.get('minute') ?? '0', 10)
  // 某些实现午夜输出 "24:xx"（h24 表达），等价于次日 00:xx → 归一为 0。
  if (hour === 24) hour = 0
  return hour * 60 + minute
}

/**
 * 判定给定时刻（按北京时区）所处的时段。
 * @param date 待判定的时刻；缺省为当前时刻。
 * @returns 'peak' | 'idle'
 */
export function periodAt(date: Date = new Date()): PeriodState {
  const minutes = beijingMinutes(date)
  for (const window of PERIOD_RULE.peakWindows) {
    if (minutes >= minutesOf(window.start) && minutes < minutesOf(window.end)) {
      return 'peak'
    }
  }
  return 'idle'
}

/** 当前北京时段（便捷函数）。 */
export function currentPeriod(now: Date = new Date()): PeriodState {
  return periodAt(now)
}

/**
 * 当前时段光标百分比（001-接口契约 §3：left = 北京当日分钟数 / 1440 × 100%）。
 * 纯函数、按真实时钟实时计算；演示期手动覆盖时段不影响本值。
 */
export function cursorPercentAt(date: Date = new Date()): number {
  return (beijingMinutes(date) / MINUTES_PER_DAY) * 100
}
