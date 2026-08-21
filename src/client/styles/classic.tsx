/**
 * 经典展开态结构（01 脉冲 / 02 留白 / 05 胶囊 / 07 粗野 / 08 玻璃 共用）。
 *
 * 结构严格对齐 001-前端-页面交互 §2：头部（名称 + 时段徽章）→ 时间轴 →
 * 价格表切换 → 价格表 → 页脚。视觉差异全部由样式类（ds-style-NN）的 CSS 承担。
 */
import type { ReactNode } from 'react'
import type { PeriodState } from '../../core/types'
import { Badge, PeriodWord, PriceTable, Timeline, Toggle, UnitFooter } from '../components/primitives'

/** 展开态通用 props（纯展示；DualState 由上层 Widget 注入）。 */
export interface ExpandedProps {
  period: PeriodState
  /** 价格表是否展开（per-session DualState）。 */
  priceTableExpanded: boolean
  /** 切换价格表展开/收起。 */
  onTogglePriceTable: () => void
  /** 时间轴光标百分比（0–100，按当前北京时间实时计算）。 */
  cursorPercent: number
}

/** 收起态通用 props。 */
export interface CollapsedProps {
  period: PeriodState
  /** 光标/列车位置百分比（0–100，按当前北京时间实时计算；Metro 收起态使用）。 */
  cursorPercent: number
}

/**
 * 经典展开态：头部 → 时间轴 → 切换 → 价格表 → 页脚。
 * @param styleClass 风格类名（如 ds-style-01）。
 * @param meta 时间轴元信息（默认 001 标准文案）。
 */
export function ClassicExpanded({
  styleClass,
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
  meta = '高峰 09:00–12:00 · 14:00–18:00｜其余空闲',
  footer,
  badge = <Badge period={period} />,
  name = 'DeepSeek 计费',
}: {
  styleClass: string
  period: PeriodState
  priceTableExpanded: boolean
  onTogglePriceTable: () => void
  cursorPercent: number
  meta?: string
  footer?: ReactNode
  badge?: ReactNode
  name?: string
}): JSX.Element {
  return (
    <div className={`w ${styleClass}${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <span className="w-name">{name}</span>
        {badge}
      </div>
      <Timeline period={period} meta={meta} cursorPercent={cursorPercent} />
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && <PriceTable period={period} />}
      {priceTableExpanded && <UnitFooter>{footer}</UnitFooter>}
    </div>
  )
}

/** 经典收起态：圆点 + 峰/闲 文字（01/02/03/08 共用结构）。 */
export function DotCollapsed({ styleClass, period }: CollapsedProps & { styleClass: string }): JSX.Element {
  return (
    <div className={styleClass}>
      <i className="dot" />
      <span className="lbl">
        <PeriodWord period={period} />
      </span>
    </div>
  )
}
