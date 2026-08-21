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
import { type PeriodState } from './types';
/** 北京时区标识。 */
export declare const BEIJING_TIMEZONE: "Asia/Shanghai";
/** 重导出时段类型（client 侧从本模块一并取用）。 */
export type { PeriodState } from './types';
/** 把 "HH:mm" 解析为当日分钟数（00:00 = 0）。 */
export declare function minutesOf(hhmm: string): number;
/**
 * 取给定时刻的北京当日分钟数。
 * 用 Intl 按 Asia/Shanghai 归一化，避免依赖本机时区。
 */
export declare function beijingMinutes(date: Date): number;
/**
 * 判定给定时刻（按北京时区）所处的时段。
 * @param date 待判定的时刻；缺省为当前时刻。
 * @returns 'peak' | 'idle'
 */
export declare function periodAt(date?: Date): PeriodState;
/** 当前北京时段（便捷函数）。 */
export declare function currentPeriod(now?: Date): PeriodState;
/**
 * 当前时段光标百分比（001-接口契约 §3：left = 北京当日分钟数 / 1440 × 100%）。
 * 纯函数、按真实时钟实时计算；演示期手动覆盖时段不影响本值。
 */
export declare function cursorPercentAt(date?: Date): number;
