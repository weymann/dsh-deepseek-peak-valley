/**
 * Style 06 · 终端 Terminal · CLI 日志。
 *
 * 独有特征（002-前端-页面交互 §06）：终端标题栏「deepseek-rate · v4」+ 三圆点；
 * 正文日志式 `$ ds rate --now` → `▸ 当前：高峰/空闲`（强调色）→ 时段说明；
 * 价格表为等宽 ttbl（flash / pro 两组，idle/peak 双列，当前时段列加粗）。
 */
import { PRICE_TABLE, type BillingItem, type ModelName, type PeriodState } from '../../core/types'
import { ITEM_ORDER, MODEL_ORDER, formatPrice, Toggle } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'

/** 终端 · 展开态。 */
export function TerminalExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
}: ExpandedProps): JSX.Element {
  return (
    <div className={`w ds-style-06${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="term-bar">
        <i className="tdot" /><i className="tdot" /><i className="tdot" />
        <span className="tname">deepseek-rate · v4</span>
      </div>
      <div className="term-body">
        <div className="tline"><span className="ps">$</span><span className="txt">ds rate --now</span></div>
        <div className="tline"><span className="ps">▸</span><span className="nowv">{period === 'peak' ? '当前：高峰' : '当前：空闲'}</span></div>
        <div className="tline"><span className="dim">09:00–12:00 · 14:00–18:00</span></div>
        <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
        {priceTableExpanded && <TerminalTable period={period} />}
      </div>
      {priceTableExpanded && <div className="term-foot">元 / 百万 tokens · 北京时间</div>}
    </div>
  )
}

/** 终端等宽价格表（flash / pro 两组）。 */
function TerminalTable({ period }: { period: PeriodState }): JSX.Element {
  return (
    <div className="ttbl">
      {MODEL_ORDER.map((model) => (
        <TerminalGroup key={model} model={model} />
      ))}
    </div>
  )
}

function TerminalGroup({ model }: { model: ModelName }): JSX.Element {
  return (
    <>
      <div className="tt-head">
        <span>{model === 'V4-Flash' ? 'flash' : 'pro'}</span>
        <span>idle</span>
        <span>peak</span>
      </div>
      {ITEM_ORDER.map((item) => {
        const [idle, peak] = PRICE_TABLE[model][item]
        return (
          <div className="tt-row" key={item}>
            <span className="m">{labelOf(item)}</span>
            <span className="p">
              <span className="n idle">{formatPrice(idle)}</span>
              <span className="n peak">{formatPrice(peak)}</span>
            </span>
          </div>
        )
      })}
    </>
  )
}

function labelOf(item: BillingItem): string {
  switch (item) {
    case '输入·缓存命中': return '输入 · 缓存命中'
    case '输入·缓存未命中': return '输入 · 未命中'
    case '输出': return '输出'
  }
}

/** 终端 · 收起态（光标 + 峰/闲）。 */
export function TerminalCollapsed({ period }: CollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-06">
      <span className="caret">▍</span>
      <span className="lbl">{period === 'peak' ? '峰' : '闲'}</span>
    </div>
  )
}
