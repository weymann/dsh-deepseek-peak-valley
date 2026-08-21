/**
 * Style 09 · 昼夜 DayNight · 明暗随时段。
 *
 * 独有特征（002-前端-页面交互 §09）：整卡随时段变色——高峰白昼底 / 空闲夜空底
 * （0.35s 过渡）；太阳/月亮图标切换 + 大字「高峰时段 / 空闲时段」；时间轴
 * 暖段=高峰、冷段=空闲。
 */
import type { PeriodState } from '../../core/types'
import { MoonIcon, SunIcon } from '../components/icons'
import { PriceTable, Timeline, Toggle, UnitFooter } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'

/** 昼夜 · 展开态。 */
export function DayNightExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
}: ExpandedProps): JSX.Element {
  const day = period === 'peak'
  return (
    <div className={`w ds-style-09${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <span className="sky">
          {day ? <SunIcon className="sun" /> : <MoonIcon className="moon" />}
        </span>
        <span className="w-now">{day ? '高峰时段' : '空闲时段'}</span>
      </div>
      <div className="w-sub">北京时间 · 高峰 09:00–12:00 / 14:00–18:00</div>
      <Timeline period={period} meta="暖色段 = 高峰　冷色段 = 空闲" cursorPercent={cursorPercent} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && <PriceTable period={period} />}
      {priceTableExpanded && <UnitFooter note="元 / 百万 tokens · 高峰 = 空闲 × 2" />}
    </div>
  )
}

/** 昼夜 · 收起态（太阳/月亮 + 峰/闲）。 */
export function DayNightCollapsed({ period }: CollapsedProps): JSX.Element {
  const day = period === 'peak'
  return (
    <div className="ds-collapsed-09">
      {day ? <SunIcon className="sun" /> : <MoonIcon className="moon" />}
      <span className="lbl">{day ? '峰' : '闲'}</span>
    </div>
  )
}
