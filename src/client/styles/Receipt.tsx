/**
 * Style 03 · 票据 Receipt · 票根。
 *
 * 独有特征（002-前端-页面交互 §03）：斜盖印戳（当前时段）、锯齿撕线 .w-tear、
 * 页脚条形码 .bcode；价格表虚线/点线分隔（CSS 承担）。
 */
import type { PeriodState } from '../../core/types'
import { DeepseekBalance, Timeline, Toggle, UsageBar, CountdownFooter } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'

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
  return (
    <div className={`w ds-style-03${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <span className="stamp">{period === 'peak' ? '高峰' : '空闲'}</span>
      <div className="w-head">
        <div>
          <div className="w-name">DeepSeek 分时段计费</div>
          <div className="w-sub">凭条 · 北京时间</div>
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
  return (
    <div className="ds-collapsed-03">
      <i className="dot" />
      <span className="lbl">{period === 'peak' ? '峰' : '闲'}</span>
    </div>
  )
}
