/**
 * 十款风格组件注册表：StyleId → { Expanded, Collapsed }。
 *
 * 每款风格同时实现「展开 · 侧边栏」（头部/时间轴/价格表/页脚）与
 * 「收起 · 图标栏」（紧凑指示器 + 峰/闲 文字），对齐 002-接口契约 §2 与
 * 002-前端-页面交互 逐款实现。
 *
 * 双视图风格（11 · 无人岛）额外提供 DualExpanded / DualCollapsed。
 */
import type { StyleId } from '../../core/catalog'
import {
  AnimalIslandCollapsed,
  AnimalIslandExpanded,
  type AnimalIslandCollapsedProps,
  type AnimalIslandExpandedProps,
} from './AnimalIsland'
import { ClassicExpanded, DotCollapsed, type CollapsedProps, type ExpandedProps } from './classic'
import { DayNightCollapsed, DayNightExpanded } from './DayNight'
import { EditorialCollapsed, EditorialExpanded } from './Editorial'
import { MetroCollapsed, MetroExpanded } from './Metro'
import { ReceiptCollapsed, ReceiptExpanded } from './Receipt'
import { TerminalCollapsed, TerminalExpanded } from './Terminal'
import { useT } from '../locale/translator'

/** 单款风格组件对。 */
export interface StyleComponents {
  Expanded: (props: ExpandedProps) => JSX.Element
  Collapsed: (props: CollapsedProps) => JSX.Element
}

/** 双视图风格组件对（额外提供双视图展开/收起组件）。 */
export interface DualViewStyleComponents extends StyleComponents {
  DualExpanded: (props: AnimalIslandExpandedProps) => JSX.Element
  DualCollapsed: (props: AnimalIslandCollapsedProps) => JSX.Element
}

/** 胶囊 · 收起态（横向 pill，圆点 + 「高峰/空闲」全词）。 */
function PillsCollapsed({ period }: CollapsedProps): JSX.Element {
  const t = useT()
  return (
    <div className="ds-collapsed-05">
      <i className="dot" />
      {period === 'peak' ? t('period.peak') : t('period.idle')}
    </div>
  )
}

/** 粗野 · 收起态（反色块「峰/闲」）。 */
function BrutalistCollapsed({ period }: CollapsedProps): JSX.Element {
  const t = useT()
  return (
    <div className="ds-collapsed-07">
      <span className="box">{period === 'peak' ? t('period.peakShort') : t('period.idleShort')}</span>
    </div>
  )
}

/** 风格组件注册表（002-接口契约 §3 十一款）。 */
export const STYLE_COMPONENTS: Record<StyleId, StyleComponents | DualViewStyleComponents> = {
  '01': {
    Expanded: (props) => <ClassicExpanded styleClass="ds-style-01" {...props} />,
    Collapsed: (props) => <DotCollapsed styleClass="ds-collapsed-01" {...props} />,
  },
  '02': {
    Expanded: (props) => <ClassicExpanded styleClass="ds-style-02" {...props} />,
    Collapsed: (props) => <DotCollapsed styleClass="ds-collapsed-02" {...props} />,
  },
  '03': {
    Expanded: ReceiptExpanded,
    Collapsed: ReceiptCollapsed,
  },
  '04': {
    Expanded: MetroExpanded,
    Collapsed: MetroCollapsed,
  },
  '05': {
    Expanded: (props) => <ClassicExpanded styleClass="ds-style-05" {...props} />,
    Collapsed: PillsCollapsed,
  },
  '06': {
    Expanded: TerminalExpanded,
    Collapsed: TerminalCollapsed,
  },
  '07': {
    Expanded: (props) => <ClassicExpanded styleClass="ds-style-07" {...props} />,
    Collapsed: BrutalistCollapsed,
  },
  '08': {
    Expanded: (props) => <ClassicExpanded styleClass="ds-style-08" {...props} />,
    Collapsed: (props) => <DotCollapsed styleClass="ds-collapsed-08" {...props} />,
  },
  '09': {
    Expanded: DayNightExpanded,
    Collapsed: DayNightCollapsed,
  },
  '10': {
    Expanded: EditorialExpanded,
    Collapsed: EditorialCollapsed,
  },
  '11': {
    Expanded: () => <div />, // 占位：双视图风格使用 DualExpanded 替代
    Collapsed: () => <div />, // 占位：双视图风格使用 DualCollapsed 替代
    DualExpanded: (props) => <AnimalIslandExpanded {...props} />,
    DualCollapsed: (props) => <AnimalIslandCollapsed {...props} />,
  },
}

/** 按风格编号取组件对（缺省回退到 01）。 */
export function styleComponents(styleId: StyleId): StyleComponents {
  return STYLE_COMPONENTS[styleId] ?? STYLE_COMPONENTS['01']
}

/** 按风格编号取双视图组件对（仅双视图风格有效）。 */
export function dualViewComponents(styleId: StyleId): DualViewStyleComponents | null {
  const entry = STYLE_COMPONENTS[styleId]
  return entry && 'DualExpanded' in entry ? entry as DualViewStyleComponents : null
}
