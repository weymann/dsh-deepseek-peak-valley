/**
 * Style 10 · 编辑 Editorial · 杂志。
 *
 * 独有特征（002-前端-页面交互 §10）：眉题「DeepSeek · 报价」+ 衬线大标题
 * 「分时段计费」；等宽数字 + 细分割线；当前列浅色底；页脚含「高峰 = 空闲 × 2」。
 */
import { Badge, DeepseekBalance, Timeline, Toggle, UsageBar, CountdownFooter } from '../components/primitives'
import { isWeekend } from '../../core/period'
import type { CollapsedProps, ExpandedProps } from './classic'
import { useT } from '../locale/translator'

/** 编辑 · 展开态（余额查询替换价格表）。 */
export function EditorialExpanded({
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
  const t = useT()
  return (
    <div className={`w ds-style-10${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <div>
          <div className="w-eyebrow">{t('skin.editorialEyebrow')}</div>
          <div className="w-name">{t('skin.editorialTitle')}</div>
        </div>
        <Badge period={period} />
      </div>
      <Timeline period={period} meta={isWeekend(new Date()) ? t('period.weekend') : t('skin.editorialMeta')} cursorPercent={cursorPercent} />
      <UsageBar goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && (
        <DeepseekBalance deepseek={deepseek} deepseekError={deepseekError} deepseekStale={deepseekStale} deepseekLoading={deepseekLoading} goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      )}
      {priceTableExpanded && <CountdownFooter />}
    </div>
  )
}

/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
export function EditorialCollapsed({ period }: CollapsedProps): JSX.Element {
  const t = useT()
  return (
    <div className="ds-collapsed-10">
      <span className="mark">{period === 'peak' ? t('period.peakShort') : t('period.idleShort')}</span>
      <span className="lbl">NOW</span>
    </div>
  )
}
