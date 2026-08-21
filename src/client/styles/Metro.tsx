/**
 * Style 04 · 时刻线 Metro · 线路图。
 *
 * 独有特征（002-前端-页面交互 §04）：24h 地铁线路（高峰橙色区间 / 空闲底色），
 * 站点点出 00/09/12/14/18/24，「列车」随时段移动（按当前北京时间实时计算，
 * 001-接口契约 §3，不得写死），下方图例；当前时段数字加粗（CSS 承担）。
 */
import type { PeriodState } from '../../core/types'
import { Badge, PriceTable, Toggle, UnitFooter } from '../components/primitives'
import type { CollapsedProps, ExpandedProps } from './classic'

/** 站点位置（百分比）。 */
const STATIONS: readonly string[] = ['0%', '37.5%', '50%', '58.34%', '75%', '100%']

/** 时刻线 · 展开态。 */
export function MetroExpanded({
  period,
  priceTableExpanded,
  onTogglePriceTable,
  cursorPercent,
}: ExpandedProps): JSX.Element {
  return (
    <div className={`w ds-style-04${priceTableExpanded ? '' : ' is-collapsed'}`}>
      <div className="w-head">
        <span className="w-name">DeepSeek 计费</span>
        <Badge period={period} />
      </div>
      <div className="line">
        {STATIONS.map((left) => (
          <i key={left} className="sta" style={{ left }} />
        ))}
        <span className="train" style={{ left: `${cursorPercent}%` }} />
      </div>
      <div className="line-times">
        <span>00</span><span>09</span><span>12</span><span>14</span><span>18</span><span>24</span>
      </div>
      <div className="legend">
        <span><i className="lg-pk" />高峰</span>
        <span><i className="lg-id" />空闲</span>
      </div>
      <Toggle expanded={priceTableExpanded} onToggle={onTogglePriceTable} />
      {priceTableExpanded && <PriceTable period={period} />}
      {priceTableExpanded && <UnitFooter />}
    </div>
  )
}

/** 时刻线 · 收起态（垂直 mini 线路，列车位置按实时时钟移动）。 */
export function MetroCollapsed({ period, cursorPercent }: CollapsedProps): JSX.Element {
  return (
    <div className="ds-collapsed-04">
      <span className="mini">
        <span className="train" style={{ top: `${cursorPercent}%` }} />
      </span>
      <span className="lbl">{period === 'peak' ? '峰' : '闲'}</span>
    </div>
  )
}
