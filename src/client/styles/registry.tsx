/**
 * 十款风格组件注册表：StyleId → { Expanded, Collapsed }。
 *
 * 每款风格同时实现「展开 · 侧边栏」（头部/时间轴/价格表/页脚）与
 * 「收起 · 图标栏」（紧凑指示器 + 峰/闲 文字），对齐 002-接口契约 §2 与
 * 002-前端-页面交互 逐款实现。
 */
import type { StyleId } from '../../core/catalog'
import type { PeriodState } from '../../core/types'
import { ClassicExpanded, DotCollapsed, type CollapsedProps, type ExpandedProps } from './classic'
import { DayNightCollapsed, DayNightExpanded } from './DayNight'
import { EditorialCollapsed, EditorialExpanded } from './Editorial'
import { MetroCollapsed, MetroExpanded } from './Metro'
import { ReceiptCollapsed, ReceiptExpanded } from './Receipt'
import { TerminalCollapsed, TerminalExpanded } from './Terminal'

/** 单款风格组件对。 */
export interface StyleComponents {
  Expanded: (props: ExpandedProps) => JSX.Element
  Collapsed: (props: CollapsedProps) => JSX.Element
}

/** 胶囊 · 收起态（横向 pill，圆点 + 「高峰/空闲」全词）。 */
function PillsCollapsed({ period }: CollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-05">
      <i className="dot" />
      {period === 'peak' ? '高峰' : '空闲'}
    </div>
  )
}

/** 粗野 · 收起态（反色块「峰/闲」）。 */
function BrutalistCollapsed({ period }: CollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-07">
      <span className="box">{period === 'peak' ? '峰' : '闲'}</span>
    </div>
  )
}

/** 风格组件注册表（002-接口契约 §3 十款）。 */
export const STYLE_COMPONENTS: Record<StyleId, StyleComponents> = {
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
}

/** 按风格编号取组件对（缺省回退到 01）。 */
export function styleComponents(styleId: StyleId): StyleComponents {
  return STYLE_COMPONENTS[styleId] ?? STYLE_COMPONENTS['01']
}
