/**
 * Style 06 · 终端 Terminal · CLI 日志。
 *
 * 独有特征（002-前端-页面交互 §06）：终端标题栏「deepseek-rate · v4」+ 三圆点；
 * 正文日志式 `$ ds rate --now` → `▸ 当前：高峰/空闲`（强调色）→ 时段说明；
 * 展开区为 DeepSeek 余额查询（同 AnimalIsland PricingView 复用 /deepseek/balance），
 * 等宽对齐，保持终端 CLI 质感。
 */
import { Toggle, UsageBar } from '../components/primitives'
import { isWeekend } from '../../core/period'
import type { CollapsedProps, ExpandedProps } from './classic'
import type { DeepseekBalanceData } from '../state/deepseek-balance'
import { useDeepseekBalance } from '../state/deepseek-balance'
import { dollars, GO_LIMITS } from '../state/go-quota'
import type { GoQuotaUsage } from '../state/go-quota'
import { useCountdown } from '../state/countdown'
import { useT } from '../locale/translator'

/** 终端 · 展开态 props（兼容余额注入与自轮询）。 */
export interface TerminalExpandedProps extends ExpandedProps {
  /** DeepSeek 余额（ /deepseek/balance ）— 由 Widget 注入；未注入时组件内自取 useDeepseekBalance */
  deepseek?: DeepseekBalanceData | null
  deepseekError?: string | null
  deepseekStale?: boolean
  deepseekLoading?: boolean
}

/** 终端 · 展开态。 */
export function TerminalExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  deepseek: deepseekProp,
  deepseekError: deepseekErrorProp,
  deepseekStale: deepseekStaleProp,
  deepseekLoading: deepseekLoadingProp,
  goQuota,
  goQuotaError,
  goQuotaStale,
  goQuotaLoading,
}: TerminalExpandedProps): JSX.Element {
  // 若上层未注入（经典风格走 components.Expanded 通用路径），则自取轮询 store
  const fallback = useDeepseekBalance()
  const { remaining } = useCountdown()
  const t = useT()
  const deepseek = deepseekProp !== undefined ? deepseekProp : fallback.data
  const deepseekError = deepseekErrorProp !== undefined ? deepseekErrorProp : fallback.error
  const deepseekStale = deepseekStaleProp !== undefined ? deepseekStaleProp : fallback.stale
  const deepseekLoading = deepseekLoadingProp !== undefined ? deepseekLoadingProp : fallback.loading

  return (
    <div className={`w ds-style-06${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="term-bar">
        <i className="tdot" /><i className="tdot" /><i className="tdot" />
        <span className="tname">deepseek-rate · v4</span>
      </div>
      <div className="term-body">
        <div className="tline"><span className="ps">$</span><span className="txt">ds rate --now</span></div>
        <div className="tline"><span className="ps">▸</span><span className="nowv">{t('skin.terminalNow', { period: period === 'peak' ? t('period.peak') : t('period.idle') })}</span></div>
        <div className="tline"><span className="dim">{isWeekend(new Date()) ? t('period.weekend') : t('skin.terminalHours')}</span></div>
        <UsageBar goQuota={goQuota} goQuotaError={goQuotaError} goQuotaStale={goQuotaStale} goQuotaLoading={goQuotaLoading} />
        <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
        {priceTableExpanded && (
          <TerminalBalance
            deepseek={deepseek}
            deepseekError={deepseekError}
            deepseekStale={deepseekStale}
            deepseekLoading={deepseekLoading}
            goQuota={goQuota}
            goQuotaError={goQuotaError}
            goQuotaStale={goQuotaStale}
            goQuotaLoading={goQuotaLoading}
          />
        )}
      </div>
      {priceTableExpanded && (
        <div className="term-foot">
          {t('common.refreshIn', { seconds: remaining })}
        </div>
      )}
    </div>
  )
}

/** 终端等宽余额块（CLI 风格，复用 ttbl 布局）：总余额(DeepSeek) / Go 周·月额度。 */
function TerminalBalance({
  deepseek,
  deepseekError,
  deepseekStale,
  deepseekLoading,
  goQuota,
  goQuotaError,
  goQuotaStale,
  goQuotaLoading,
}: {
  deepseek?: DeepseekBalanceData | null
  deepseekError?: string | null
  deepseekStale?: boolean
  deepseekLoading?: boolean
  goQuota?: GoQuotaUsage | null
  goQuotaError?: string | null
  goQuotaStale?: boolean
  goQuotaLoading?: boolean
}): JSX.Element {
  const hasDeepseek = !!deepseek
  const hasGo = !!goQuota
  const t = useT()
  if (!hasDeepseek && !hasGo) {
    if (deepseekLoading || goQuotaLoading) {
      return (
        <div className="ttbl">
          <div className="tline"><span className="ps">$</span><span className="txt">ds balance</span></div>
          <div className="tt-row"><span className="m" style={{ color: 'oklch(68% 0.02 240)' }}>· {t('common.loading')}</span></div>
        </div>
      )
    }
    const err = deepseekError || goQuotaError
    if (err) {
      return (
        <div className="ttbl">
          <div className="tline"><span className="ps">$</span><span className="txt">ds balance</span></div>
          <div className="tt-row"><span className="m" style={{ color: '#e07a7a' }}>{err}</span></div>
          <div className="tline"><span className="dim">{t('common.configureKeyHint')}</span></div>
        </div>
      )
    }
    return (
      <div className="ttbl">
        <div className="tline"><span className="ps">$</span><span className="txt">ds balance</span></div>
        <div className="tt-row"><span className="m" style={{ color: 'oklch(68% 0.02 240)' }}>{t('common.empty')}</span></div>
      </div>
    )
  }

  // DeepSeek 余额按币种返回数组；优先取人民币条目，避免误取 [0] 的 USD/0.00。
  const entries = deepseek?.balance_infos ?? []
  const pick = entries.find((b) => b.currency === 'CNY') ?? entries[0] ?? null
  const stale = deepseekStale || goQuotaStale
  return (
    <div className="ttbl">
      <div className="tline"><span className="ps">$</span><span className="txt">ds balance</span></div>
      <div className="tt-head">
        <span>{t('skin.terminalColItem')}</span>
        <span>{t('skin.terminalColBalance')}</span>
      </div>
      {hasDeepseek && (
        <div className="tt-row">
          <span className="m">{t('common.deepseekBalance')}</span>
          <span className="p"><span className="n" style={{ width: 'auto', color: 'oklch(88% 0.02 150)' }}>{pick ? `${pick.total_balance ?? '--'} ${pick.currency ?? 'CNY'}` : '--'}</span></span>
        </div>
      )}
      {hasGo && (
        <div className="tt-row">
          <span className="m">{t('common.goWeeklyQuota')}</span>
          <span className="p"><span className="n" style={{ width: 'auto' }}>{goQuota!.weekly.percent.toFixed(1)}% · {dollars(goQuota!.weekly.percent, GO_LIMITS.weekly)}</span></span>
        </div>
      )}
      {hasGo && (
        <div className="tt-row">
          <span className="m">{t('common.goMonthlyQuota')}</span>
          <span className="p"><span className="n" style={{ width: 'auto' }}>{goQuota!.monthly.percent.toFixed(1)}% · {dollars(goQuota!.monthly.percent, GO_LIMITS.monthly)}</span></span>
        </div>
      )}
      {stale && (deepseekError || goQuotaError) && (
        <div className="tline"><span className="dim" style={{ color: '#c07a5a' }}>{t('common.staleWithDetail', { detail: deepseekError ?? goQuotaError ?? '' })}</span></div>
      )}
      {hasDeepseek && !deepseek!.is_available && (
        <div className="tline"><span className="dim">is_available: false</span></div>
      )}
    </div>
  )
}

/** 终端 · 收起态（光标 + 峰/闲）。 */
export function TerminalCollapsed({ period }: CollapsedProps): JSX.Element {
  const t = useT()
  return (
    <div className="ds-collapsed-06">
      <span className="caret">▍</span>
      <span className="lbl">{period === 'peak' ? t('period.peakShort') : t('period.idleShort')}</span>
    </div>
  )
}
