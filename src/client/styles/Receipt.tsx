/**
 * Style 03 · 票据 Receipt · 票根。
 *
 * 独有特征（002-前端-页面交互 §03）：斜盖印戳（当前时段）、锯齿撕线 .w-tear、
 * 页脚条形码 .bcode；价格表虚线/点线分隔（CSS 承担）。
 */
import { DeepseekBalance, Timeline, Toggle, UsageBar, CountdownFooter } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'
import { useT } from '../locale/translator'

/** 票据 · 展开态（余额查询替换价格表）。 */
export function ReceiptExpanded({
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
    <div className={`w ds-style-03${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <span className="stamp">{period === 'peak' ? t('period.peak') : t('period.idle')}</span>
      <div className="w-head">
        <div>
          <div className="w-name">{t('skin.receiptTitle')}</div>
          <div className="w-sub">{t('skin.receiptSub')}</div>
        </div>
      </div>
      <div className="w-tear" />
      <Timeline period={period} cursorPercent={cursorPercent} />
      <UsageBar goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && (
        <DeepseekBalance deepseek={deepseek} deepseekError={deepseekError} deepseekStale={deepseekStale} deepseekLoading={deepseekLoading} goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
      )}
      {priceTableExpanded && (
        <CountdownFooter>
          <div className="bcode" />
        </CountdownFooter>
      )}
    </div>
  )
}

/** 票据 · 收起态（上下锯齿缘由 ::before/::after CSS 承担）。 */
export function ReceiptCollapsed({ period }: CollapsedProps): JSX.Element {
  const t = useT()
  return (
    <div className="ds-collapsed-03">
      <i className="dot" />
      <span className="lbl">{period === 'peak' ? t('period.peakShort') : t('period.idleShort')}</span>
    </div>
  )
}
