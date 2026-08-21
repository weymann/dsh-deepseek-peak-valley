/**
 * 共享组件原语（对齐 001-前端-页面交互 §2 骨架与 DOM 契约）。
 *
 * 全部展开态风格共用的结构件：徽章 / 时间轴 / 价格表 / 展开切换按钮。
 * 逐款差异由各风格组件提供专属标记（印戳、地铁线路、终端、昼夜、编辑…）。
 */
import type { ReactNode } from 'react'
import {
  PRICE_TABLE,
  TIMELINE_CURSOR,
  TIMELINE_SEGMENTS,
  type BillingItem,
  type ModelName,
  type PeriodState,
} from '../../core/types'
import { ChevronIcon } from './icons'

/** 数字渲染：固定两位小数（0.05 / 1.50 / 27.00）。 */
export function formatPrice(value: number): string {
  return value.toFixed(2)
}

/** 计费模型与计费项顺序（价格表行序）。 */
export const MODEL_ORDER: readonly ModelName[] = ['V4-Flash', 'V4-Pro']
export const ITEM_ORDER: readonly BillingItem[] = ['输入·缓存命中', '输入·缓存未命中', '输出']

/** 时段徽章（圆点 + 高峰/空闲 文字）。 */
export function Badge({ period }: { period: PeriodState }): JSX.Element {
  return (
    <span className="w-badge">
      <i className="dot" />
      {period === 'peak' ? '高峰' : '空闲'}
    </span>
  )
}

/** 双态文字（高峰/空闲；永不共存——仅渲染当前时段）。 */
export function PeriodWord({ period, long }: { period: PeriodState; long?: boolean }): ReactNode {
  if (period === 'peak') return long ? '高峰' : '峰'
  return long ? '空闲' : '闲'
}

/**
 * 24h 时间轴（5 段轨道 + 当前光标 + 元信息）。
 * @param cursorPercent 实时光标百分比（0–100，按当前北京时间计算）；
 *   缺省时退回设计稿演示常量（TIMELINE_CURSOR，仅作兜底）。
 */
export function Timeline({
  period,
  meta = '高峰 09:00–12:00 · 14:00–18:00｜其余空闲',
  cursorPercent,
}: {
  period: PeriodState
  meta?: string
  cursorPercent?: number
}): JSX.Element {
  return (
    <div className="w-tl">
      <div className="tl-bar">
        <div className="tl-track">
          {TIMELINE_SEGMENTS.map((segment, index) => (
            <i
              key={`${segment.period}-${index}`}
              className={segment.period === 'peak' ? 's-peak' : 's-idle'}
              style={{ width: segment.width }}
            />
          ))}
        </div>
        <span className="tl-cur" style={{ left: cursorPercent !== undefined ? `${cursorPercent}%` : TIMELINE_CURSOR[period] }} />
      </div>
      <div className="tl-meta">{meta}</div>
    </div>
  )
}

/** 价格表（`.wt`）：两模型分组 × 3 计费项 × [空闲, 高峰]，当前时段列高亮条。 */
export function PriceTable({ period }: { period: PeriodState }): JSX.Element {
  return (
    <table className="wt">
      <thead>
        <tr>
          <th>计费项</th>
          <th>
            空闲<i className="hx hi" />
          </th>
          <th>
            高峰<i className="hx hp" />
          </th>
        </tr>
      </thead>
      <tbody>
        {MODEL_ORDER.map((model) => (
          <ModelGroup key={model} model={model} />
        ))}
      </tbody>
    </table>
  )
}

function ModelGroup({ model }: { model: ModelName }): JSX.Element {
  return (
    <>
      <tr className="wtm">
        <td colSpan={3}>{model}</td>
      </tr>
      {ITEM_ORDER.map((item) => {
        const [idle, peak] = PRICE_TABLE[model][item]
        return (
          <tr key={item}>
            <td>{item}</td>
            <td className="n ci">{formatPrice(idle)}</td>
            <td className="n cp">{formatPrice(peak)}</td>
          </tr>
        )
      })}
    </>
  )
}

/** 价格表展开/收起切换按钮（`.w-toggle` + aria-expanded + chevron）。 */
export function Toggle({
  expanded,
  onToggle,
  label = '价格表',
}: {
  expanded: boolean
  onToggle: () => void
  label?: string
}): JSX.Element {
  return (
    <button type="button" className="w-toggle" aria-expanded={expanded} onClick={onToggle}>
      <span>{label}</span>
      <ChevronIcon className="t-chev" />
    </button>
  )
}

/** 页脚（单位标注）。 */
export function UnitFooter({ children, note = '元 / 百万 tokens · 北京时间' }: { children?: ReactNode; note?: string }): JSX.Element {
  return <div className="w-foot">{note}{children}</div>
}
