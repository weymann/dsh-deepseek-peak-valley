/**
 * Style 09 · 昼夜 DayNight · 明暗随时段。
 *
 * 独有特征（002-前端-页面交互 §09）：整卡随时段变色——高峰白昼底 / 空闲夜空底
 * （0.35s 过渡）；太阳/月亮图标切换 + 大字「高峰时段 / 空闲时段」；时间轴
 * 暖段=高峰、冷段=空闲。
 */
import { MoonIcon, SunIcon } from '../components/icons'
import { DeepseekBalance, Timeline, Toggle, UsageBar, CountdownFooter } from '../components/primitives'
import { isWeekend } from '../../core/period'
import type { CollapsedProps, ExpandedProps } from './classic'
import { useT } from '../locale/translator'

/** 昼夜 · 展开态（余额查询替换价格表）。 */
export function DayNightExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
  deepseek,
  deepseekError,
  deepseekStale,
  deepseekLoading,
  goQuota,
  goQuotaError,
  goQuotaStale,
  goQuotaLoading,
}: ExpandedProps): JSX.Element {
  const day = period === 'peak'
  const t = useT()
  return (
    <div className={`w ds-style-09${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <span className="sky">
          {day ? <SunIcon className="sun" /> : <MoonIcon className="moon" />}
        </span>
        <span className="w-now">{day ? t('skin.dayNightPeak') : t('skin.dayNightIdle')}</span>
      </div>
      <div className="w-sub">
        {t('skin.dayNightSub', { rule: isWeekend(new Date()) ? t('period.weekend') : t('skin.dayNightWeekend') })}
      </div>
      <Timeline period={period} meta={t('period.dayNightWarmCool')} cursorPercent={cursorPercent} />
      <UsageBar goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && (
        <DeepseekBalance deepseek={deepseek} deepseekError={deepseekError} deepseekStale={deepseekStale} deepseekLoading={deepseekLoading} goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      )}
      {priceTableExpanded && <CountdownFooter />}
    </div>
  )
}

/** 昼夜 · 收起态（太阳/月亮 + 峰/闲）。 */
export function DayNightCollapsed({ period }: CollapsedProps): JSX.Element {
  const day = period === 'peak'
  const t = useT()
  return (
    <div className="ds-collapsed-09">
      {day ? <SunIcon className="sun" /> : <MoonIcon className="moon" />}
      <span className="lbl">{day ? t('period.peakShort') : t('period.idleShort')}</span>
    </div>
  )
}
