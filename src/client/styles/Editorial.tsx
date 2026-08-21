/**
 * Style 10 · 编辑 Editorial · 杂志。
 *
 * 独有特征（002-前端-页面交互 §10）：眉题「DeepSeek · 报价」+ 衬线大标题
 * 「分时段计费」；等宽数字 + 细分割线；当前列浅色底；页脚含「高峰 = 空闲 × 2」。
 */
import type { PeriodState } from '../../core/types'
import { Badge, PriceTable, Timeline, Toggle, UnitFooter } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'

/** 编辑 · 展开态。 */
export function EditorialExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
}: ExpandedProps): JSX.Element {
  return (
    <div className={`w ds-style-10${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <div>
          <div className="w-eyebrow">DeepSeek · 报价</div>
          <div className="w-name">分时段计费</div>
        </div>
        <Badge period={period} />
      </div>
      <Timeline period={period} meta="09:00–12:00 · 14:00–18:00 高峰（北京时间）" cursorPercent={cursorPercent} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && <PriceTable period={period} />}
      {priceTableExpanded && <UnitFooter note="元 / 百万 tokens · 高峰 = 空闲 × 2" />}
    </div>
  )
}

/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
export function EditorialCollapsed({ period }: CollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-10">
      <span className="mark">{period === 'peak' ? '峰' : '闲'}</span>
      <span className="lbl">NOW</span>
    </div>
  )
}
