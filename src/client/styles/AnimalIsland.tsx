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
import { TIMELINE_SEGMENTS } from '../../core/types'
import { ChevronIcon } from '../components/icons'
import { formatPrice } from '../components/primitives'

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
  /** 用量数据（默认 DEMO_USAGE）。 */
  usage?: UsageSnapshot
  /** true = token-meter 真实投影数据；false = 演示数据。 */
  usageReal?: boolean
}

/** 收起态 props（含视图状态）。 */
export interface AnimalIslandCollapsedProps {
  period: PeriodState
  cursorPercent: number
  /** 当前视图标签页。 */
  viewTab: ViewTab
  /** 用量数据。 */
  usage?: UsageSnapshot
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

function PricingView({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
}: {
  period: PeriodState
  priceTableExpanded: boolean
  onTogglePriceTable: () => void
  cursorPercent: number
}): JSX.Element {
  return (
    <div className="ds-pane ds-pane--pricing">
      {/* 时间轴 */}
      <div className="ai-tl-bar">
        <div className="ai-tl-track">
          {TIMELINE_SEGMENTS.map((seg, i) => (
            <i
              key={`${seg.period}-${i}`}
              className={seg.period === 'peak' ? 'ai-s-peak' : 'ai-s-idle'}
              style={{ width: seg.width }}
            />
          ))}
        </div>
        <span className="ai-tl-cur" style={{ left: `${cursorPercent}%` }} />
      </div>
      <div className="ai-tl-meta">高峰 09:00–12:00 · 14:00–18:00｜其余空闲</div>

      {/* 价格表切换 */}
      <button type="button" className="ai-toggle" aria-expanded={priceTableExpanded} onClick={onTogglePriceTable}>
        <span>价格表</span>
        <ChevronIcon className="ai-chev" />
      </button>

      {/* 价格表 */}
      {priceTableExpanded && (
        <div className="ai-price-inner">
          <div className="ai-inner">
            <table className="ai-wt">
              <thead>
                <tr>
                  <th>计费项</th>
                  <th>空闲<i className="ai-hx ai-hi" /></th>
                  <th>高峰<i className="ai-hx ai-hp" /></th>
                </tr>
              </thead>
              <tbody>
                {(['V4-Flash', 'V4-Pro'] as const).map((model) => (
                  <ModelSection key={model} model={model} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="ai-foot">
            <AcLeaf className="ai-foot-leaf" />
            元 / 百万 tokens · 北京时间
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
}: {
  usageDetailExpanded: boolean
  onToggleUsageDetail: () => void
  usage: UsageSnapshot
  usageReal?: boolean
}): JSX.Element {
  return (
    <div className="ds-pane ds-pane--usage">
      <div className="ai-usage-sub">{usageReal ? 'DSH 会话用量 · token-meter' : '示例数据 · 尚无会话用量'}</div>

      {/* 3 个 tile：输入 / 输出 / 缓存命中率 */}
      <div className="ai-tiles">
        <div className="ai-tile ai-tile--in">
          <span className="ai-tile-k">输入</span>
          <span className="ai-tile-v">{formatTokenCount(usage.inputTokens)}</span>
          <span className="ai-tile-u">tokens</span>
        </div>
        <div className="ai-tile ai-tile--out">
          <span className="ai-tile-k">输出</span>
          <span className="ai-tile-v">{formatTokenCount(usage.outputTokens)}</span>
          <span className="ai-tile-u">tokens</span>
        </div>
        <div className="ai-tile ai-tile--rate">
          <span className="ai-tile-k">命中率</span>
          <span className="ai-tile-v">{formatRate(usage.cacheHitRate)}</span>
          <span className="ai-tile-u">缓存</span>
        </div>
      </div>

      {/* 明细切换 */}
      <button type="button" className="ai-toggle ai-toggle--usage" aria-expanded={usageDetailExpanded} onClick={onToggleUsageDetail}>
        <span>明细</span>
        <ChevronIcon className="ai-chev" />
      </button>

      {/* 明细 */}
      {usageDetailExpanded && (
        <div className="ai-detail-inner">
          <div className="ai-inner">
            <div className="ai-d-row">
              <span>输入 · 缓存命中</span>
              <span className="ai-d-n">{formatTokenCount(usage.cacheHit)}</span>
            </div>
            <div className="ai-d-row">
              <span>输入 · 缓存未命中</span>
              <span className="ai-d-n">{formatTokenCount(usage.cacheMiss)}</span>
            </div>
            <div className="ai-d-row">
              <span>输出</span>
              <span className="ai-d-n">{formatTokenCount(usage.outputTokens)}</span>
            </div>
            <div className="ai-d-row">
              <span>V4-Flash 费用</span>
              <span className="ai-d-n">空闲 {formatCost(usage.costs['V4-Flash'].idle)} · 高峰 {formatCost(usage.costs['V4-Flash'].peak)}</span>
            </div>
            <div className="ai-d-row">
              <span>V4-Pro 费用</span>
              <span className="ai-d-n">空闲 {formatCost(usage.costs['V4-Pro'].idle)} · 高峰 {formatCost(usage.costs['V4-Pro'].peak)}</span>
            </div>
          </div>
          <div className="ai-foot">
            <AcLeaf className="ai-foot-leaf" />
            {usageReal ? '实时统计 · 按当前时段计价' : '演示数据 · 接入后按真实用量统计'}
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
          <span className="ai-v-label ai-v-pricing">分时段计费</span>
          <span className="ai-v-label ai-v-usage">当前会话用量</span>
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
          />
        )}
        {viewTab === 'usage' && (
          <UsageView
            usageDetailExpanded={usageDetailExpanded}
            onToggleUsageDetail={onToggleUsageDetail}
            usage={usage}
            usageReal={usageReal}
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
