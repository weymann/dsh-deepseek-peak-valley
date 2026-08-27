/**
 * 风格 11 · 无人岛 Animal Island · 复刻《动物森友会》UI 语言。
 *
 * 双视图结构：默认「分时段计费」，点按钮切换到「当前会话用量」（带过渡动画）。
 * 展开态可收起价格表 / 明细；收起态跟随当前视图与时段实时变化。
 *
 * 设计稿：animal-island-widgets-v2.html
 */
import type { PeriodState, UsageSnapshot, ViewTab } from '../../core/types'
import { DEMO_USAGE, formatCost, formatRate, formatTokenCount, PRICE_TABLE } from '../../core/types'
import { ChevronIcon } from '../components/icons'
import { isWeekend, timelineSegmentsAt } from '../../core/period'
import { formatPrice } from '../components/primitives'
import type { GoQuotaUsage } from '../state/go-quota'
import type { DeepseekBalanceData } from '../state/deepseek-balance'

/* ─── Props ────────────────────────────────────────────────────────── */

/** 展开态 props（含双视图切换）。 */
export interface AnimalIslandExpandedProps {
  period: PeriodState
  priceTableExpanded: boolean
  onTogglePriceTable: () => void
  cursorPercent: number
  /** 当前视图标签页。 */
  viewTab: ViewTab
  /** 切换视图标签页。 */
  onToggleViewTab: () => void
  /** 明细展开状态（用量视图）。 */
  usageDetailExpanded: boolean
  /** 切换明细展开/收起。 */
  onToggleUsageDetail: () => void
  /** 用量数据（默认 DEMO_USAGE）——保留兼容，Go 套餐优先使用 goQuota */
  usage?: UsageSnapshot
  /** true = token-meter 真实投影数据；false = 演示数据。 */
  usageReal?: boolean
  /** Go 套餐真实用量（ /go-quota/usage ），优先于 usage */
  goQuota?: GoQuotaUsage | null
  goQuotaError?: string | null
  goQuotaStale?: boolean
  /** DeepSeek 余额（ /deepseek/balance ） */
  deepseek?: DeepseekBalanceData | null
  deepseekError?: string | null
  deepseekStale?: boolean
  deepseekLoading?: boolean
}

/** 收起态 props（含视图状态）。 */
export interface AnimalIslandCollapsedProps {
  period: PeriodState
  cursorPercent: number
  /** 当前视图标签页。 */
  viewTab: ViewTab
  /** 用量数据。 */
  usage?: UsageSnapshot
  goQuota?: GoQuotaUsage | null
}

/* ─── SVG 图标（动森风格） ──────────────────────────────────────────── */

/** 动森叶子图标（高峰=红色，空闲=绿色，CSS 变量驱动）。 */
function AcLeaf({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20C4 10 12 4 20 4c0 8-6 16-16 16z" />
      <path d="M4 20C8 16 13 12 18 8" />
    </svg>
  )
}

/** 双向箭头（视图切换按钮）。 */
function SwapIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
    </svg>
  )
}

/** 金币图标（用量视图收起态）。 */
function CoinIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="var(--now-deep)" stroke="oklch(100% 0 0)" strokeWidth="2" />
      <path d="M12 7v10M8.6 7.6L12 11l3.4-3.4M8.6 13h6.8" stroke="oklch(100% 0 0)" strokeWidth="1.7" />
    </svg>
  )
}

/* ─── 展开态 · 价格视图（复用经典结构 + 动森风格） ──────────────────── */

/** Go 套餐额度（美元）。 */
export const GO_QUOTA = { fiveHour: 12, weekly: 30, monthly: 60 } as const

function PricingView({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
  deepseek,
  deepseekError,
  deepseekStale,
  deepseekLoading,
}: {
  period: PeriodState
  priceTableExpanded: boolean
  onTogglePriceTable: () => void
  cursorPercent: number
  deepseek?: DeepseekBalanceData | null
  deepseekError?: string | null
  deepseekStale?: boolean
  deepseekLoading?: boolean
}): JSX.Element {
  return (
    <div className="ds-pane ds-pane--pricing">
      {/* 时间轴（周末全天空闲，仅工作日含高峰段） */}
      {(() => {
        const segs = timelineSegmentsAt(new Date())
        const weekend = isWeekend(new Date())
        return (
          <>
            <div className="ai-tl-bar">
              <div className="ai-tl-track">
                {segs.map((seg, i) => (
                  <i
                    key={`${seg.period}-${i}`}
                    className={seg.period === 'peak' ? 'ai-s-peak' : 'ai-s-idle'}
                    style={{ width: seg.width }}
                  />
                ))}
              </div>
              <span className="ai-tl-cur" style={{ left: `${cursorPercent}%` }} />
            </div>
            <div className="ai-tl-meta">{weekend ? '周末全天空闲｜低谷' : '高峰 09:00–12:00 · 14:00–18:00｜其余空闲'}</div>
          </>
        )
      })()}

      {/* 余额查询切换（原 价格表） */}
      <button type="button" className="ai-toggle" aria-expanded={priceTableExpanded} onClick={onTogglePriceTable}>
        <span>余额查询</span>
        <ChevronIcon className="ai-chev" />
      </button>

      {/* DeepSeek 余额（原价格表，改为余额查询） */}
      {priceTableExpanded && (
        <div className="ai-price-inner">
          <div className="ai-inner">
            {deepseekLoading ? (
              <div style={{ padding: '8px 4px', fontSize: 11, color: 'var(--ac-ink-2)' }}>加载中…</div>
            ) : deepseekError && !deepseek ? (
              <div style={{ padding: '8px 4px', fontSize: 11, color: '#a33' }}>
                {deepseekError}
                <div style={{ marginTop: 4, color: 'var(--ac-ink-2)' }}>请在设置页“DeepSeek Key”中配置后刷新</div>
              </div>
            ) : deepseek ? (
              <>
                <div className="ai-d-row">
                  <span>总余额</span>
                  <span className="ai-d-n">
                    {deepseek.balance_infos[0]?.total_balance ?? '--'} {deepseek.balance_infos[0]?.currency ?? 'CNY'}
                    {deepseek.is_available ? '' : ' · 不可用'}
                  </span>
                </div>
                <div className="ai-d-row">
                  <span>赠送</span>
                  <span className="ai-d-n">{deepseek.balance_infos[0]?.granted_balance ?? '--'} CNY</span>
                </div>
                <div className="ai-d-row">
                  <span>充值</span>
                  <span className="ai-d-n">{deepseek.balance_infos[0]?.topped_up_balance ?? '--'} CNY</span>
                </div>
                <div className="ai-d-row">
                  <span>可用</span>
                  <span className="ai-d-n" style={{ color: deepseek.is_available ? 'var(--ac-green)' : '#e05a5a' }}>
                    {deepseek.is_available ? '可用' : '余额不足'}
                  </span>
                </div>
                {deepseekStale && <div style={{ fontSize: 9.5, color: '#a33', marginTop: 4 }}>缓存值 · {deepseekError ?? ''}</div>}
              </>
            ) : (
              <div style={{ padding: '8px 4px', fontSize: 11, color: 'var(--ac-ink-2)' }}>暂无数据</div>
            )}
          </div>
          <div className="ai-foot">
            <AcLeaf className="ai-foot-leaf" />
            DeepSeek 余额 · {deepseekStale ? '缓存值' : '实时'} · CNY
          </div>
        </div>
      )}
    </div>
  )
}

function ModelSection({ model }: { model: 'V4-Flash' | 'V4-Pro' }): JSX.Element {
  const items: Array<{ label: string; key: '输入·缓存命中' | '输入·缓存未命中' | '输出' }> = [
    { label: '输入 · 缓存命中', key: '输入·缓存命中' },
    { label: '输入 · 缓存未命中', key: '输入·缓存未命中' },
    { label: '输出', key: '输出' },
  ]
  return (
    <>
      <tr className="ai-wtm">
        <td colSpan={3}>
          <AcLeaf className="ai-model-leaf" />
          {model}
        </td>
      </tr>
      {items.map(({ label, key }) => {
        const [idle, peak] = PRICE_TABLE[model][key]
        return (
          <tr key={key}>
            <td>{label}</td>
            <td className="ai-n ai-ci">{formatPrice(idle)}</td>
            <td className="ai-n ai-cp">{formatPrice(peak)}</td>
          </tr>
        )
      })}
    </>
  )
}

/* ─── 展开态 · 用量视图 ────────────────────────────────────────────── */

function UsageView({
  usageDetailExpanded,
  onToggleUsageDetail,
  usage,
  usageReal = false,
  goQuota,
  goQuotaError,
  goQuotaStale,
}: {
  usageDetailExpanded: boolean
  onToggleUsageDetail: () => void
  usage: UsageSnapshot
  usageReal?: boolean
  goQuota?: GoQuotaUsage | null
  goQuotaError?: string | null
  goQuotaStale?: boolean
}): JSX.Element {
  // 优先使用真实 Go 套餐百分比；无数据时回退到本地估算（保持 0.0% 占位）
  const hasReal = !!goQuota
  const p5h = hasReal ? goQuota!.rolling.percent : Math.min(100, (usage.estimatedCost / GO_QUOTA.fiveHour) * 100)
  const pWeek = hasReal ? goQuota!.weekly.percent : Math.min(100, (usage.estimatedCost / GO_QUOTA.weekly) * 100)
  const pMonth = hasReal ? goQuota!.monthly.percent : Math.min(100, (usage.estimatedCost / GO_QUOTA.monthly) * 100)
  const subLabel = hasReal ? (goQuotaStale ? 'Go套餐用量 · 缓存值' : 'Go套餐用量 · 实时统计') : (usageReal ? 'Go套餐用量 · 实时统计' : 'Go套餐用量 · 示例数据')
  return (
    <div className="ds-pane ds-pane--usage">
      <div className="ai-usage-sub">{subLabel}</div>
      {goQuotaError && !hasReal && <div className="ai-usage-err" style={{ fontSize: 9.5, color: '#a33', marginTop: 4 }}>{goQuotaError}</div>}

      {/* 3 个 tile：5小时 / 一周 / 一月（均为百分比 + 限额） */}
      <div className="ai-tiles">
        <div className="ai-tile ai-tile--5h">
          <span className="ai-tile-k">5小时</span>
          <span className="ai-tile-v">{formatRate(p5h)}</span>
          <span className="ai-tile-u">限额 $12</span>
        </div>
        <div className="ai-tile ai-tile--week">
          <span className="ai-tile-k">一周</span>
          <span className="ai-tile-v">{formatRate(pWeek)}</span>
          <span className="ai-tile-u">限额 $30</span>
        </div>
        <div className="ai-tile ai-tile--month">
          <span className="ai-tile-k">一月</span>
          <span className="ai-tile-v">{formatRate(pMonth)}</span>
          <span className="ai-tile-u">限额 $60</span>
        </div>
      </div>

      {/* 明细切换 */}
      <button type="button" className="ai-toggle ai-toggle--usage" aria-expanded={usageDetailExpanded} onClick={onToggleUsageDetail}>
        <span>明细</span>
        <ChevronIcon className="ai-chev" />
      </button>

      {/* 明细：Go 套餐额度拆解（真实值时显示 percent+限额，不再用本地 cost 换算） */}
      {usageDetailExpanded && (
        <div className="ai-detail-inner">
          <div className="ai-inner">
            {hasReal ? (
              <>
                <div className="ai-d-row">
                  <span>5小时</span>
                  <span className="ai-d-n">{formatRate(goQuota!.rolling.percent)} · 限额 $12</span>
                </div>
                <div className="ai-d-row">
                  <span>一周</span>
                  <span className="ai-d-n">{formatRate(goQuota!.weekly.percent)} · 限额 $30</span>
                </div>
                <div className="ai-d-row">
                  <span>一月</span>
                  <span className="ai-d-n">{formatRate(goQuota!.monthly.percent)} · 限额 $60</span>
                </div>
                {goQuotaStale && <div className="ai-d-row" style={{ color: '#a33' }}><span>提示</span><span className="ai-d-n">缓存值 · {goQuotaError ?? ''}</span></div>}
              </>
            ) : (
              <>
                <div className="ai-d-row">
                  <span>5小时</span>
                  <span className="ai-d-n">{formatRate(p5h)} · 限额 $12</span>
                </div>
                <div className="ai-d-row">
                  <span>一周</span>
                  <span className="ai-d-n">{formatRate(pWeek)} · 限额 $30</span>
                </div>
                <div className="ai-d-row">
                  <span>一月</span>
                  <span className="ai-d-n">{formatRate(pMonth)} · 限额 $60</span>
                </div>
              </>
            )}
          </div>
          <div className="ai-foot">
            <AcLeaf className="ai-foot-leaf" />
            {hasReal ? (goQuotaStale ? '缓存值 · 按美元额度计费' : '实时统计 · 按美元额度计费') : (usageReal ? '实时统计 · 按美元额度计费' : '演示数据 · 接入后按真实用量统计')}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── 展开态主组件 ──────────────────────────────────────────────────── */

export function AnimalIslandExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
  viewTab,
  onToggleViewTab,
  usageDetailExpanded,
  onToggleUsageDetail,
  usage = DEMO_USAGE,
  usageReal = false,
  goQuota,
  goQuotaError,
  goQuotaStale,
  deepseek,
  deepseekError,
  deepseekStale,
  deepseekLoading,
}: AnimalIslandExpandedProps): JSX.Element {
  return (
    <div className={`ds-style-11${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="ai-head">
        <button
          type="button"
          className="ai-view-switch"
          aria-label="切换视图"
          aria-pressed={viewTab === 'usage'}
          onClick={onToggleViewTab}
        >
          <SwapIcon className="ai-swap-ico" />
          <span className="ai-v-label ai-v-pricing">DeepSeek</span>
          <span className="ai-v-label ai-v-usage">Go套餐用量</span>
        </button>
        <span className="ai-sticker">
          <i className="ai-dot" />
          <span className="ai-lpk">高峰<i className="ai-x2">×2</i></span>
          <span className="ai-lidle">空闲</span>
        </span>
      </div>

      <div className="ai-panes">
        {viewTab === 'pricing' && (
          <PricingView
            period={period}
            priceTableExpanded={priceTableExpanded}
            onTogglePriceTable={onTogglePriceTable}
            cursorPercent={cursorPercent}
            deepseek={deepseek}
            deepseekError={deepseekError}
            deepseekStale={deepseekStale}
            deepseekLoading={deepseekLoading}
          />
        )}
        {viewTab === 'usage' && (
          <UsageView
            usageDetailExpanded={usageDetailExpanded}
            onToggleUsageDetail={onToggleUsageDetail}
            usage={usage}
            usageReal={usageReal}
            goQuota={goQuota}
            goQuotaError={goQuotaError}
            goQuotaStale={goQuotaStale}
          />
        )}
      </div>
    </div>
  )
}

/* ─── 收起态 ───────────────────────────────────────────────────────── */

export function AnimalIslandCollapsed({
  period,
  viewTab,
  usage = DEMO_USAGE,
}: AnimalIslandCollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-11">
      {viewTab === 'pricing' ? (
        <span className="ai-coll-pricing">
          <AcLeaf className={`ai-coll-leaf ai-coll-leaf--${period === 'peak' ? 'peak' : 'idle'}`} />
          <span className="ai-coll-lbl">{period === 'peak' ? '峰' : '闲'}</span>
        </span>
      ) : (
        <span className="ai-coll-usage">
          <CoinIcon className="ai-coll-coin" />
          <span className="ai-coll-cost">{formatCost(usage.estimatedCost)}</span>
        </span>
      )}
    </div>
  )
}
