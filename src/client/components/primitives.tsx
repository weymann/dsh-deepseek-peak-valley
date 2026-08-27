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
  type BillingItem,
  type ModelName,
  type PeriodState,
} from '../../core/types'
import { isWeekend, timelineSegmentsAt } from '../../core/period'
import { ChevronIcon } from './icons'
import type { DeepseekBalanceData } from '../state/deepseek-balance'
import { useGoQuota, dollars, GO_LIMITS } from '../state/go-quota'
import type { GoQuotaUsage } from '../state/go-quota'
import { useCountdown } from '../state/countdown'

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
  meta,
  cursorPercent,
}: {
  period: PeriodState
  meta?: string
  cursorPercent?: number
}): JSX.Element {
  const weekend = isWeekend()
  const segments = timelineSegmentsAt(new Date())
  const defaultMeta = weekend ? '周末全天空闲｜低谷' : '高峰 09:00–12:00 · 14:00–18:00｜其余空闲'
  return (
    <div className="w-tl">
      <div className="tl-bar">
        <div className="tl-track">
          {segments.map((segment, index) => (
            <i
              key={`${segment.period}-${index}`}
              className={segment.period === 'peak' ? 's-peak' : 's-idle'}
              style={{ width: segment.width }}
            />
          ))}
        </div>
        <span className="tl-cur" style={{ left: cursorPercent !== undefined ? `${cursorPercent}%` : TIMELINE_CURSOR[period] }} />
      </div>
      <div className="tl-meta">{meta ?? defaultMeta}</div>
    </div>
  )
}

/**
 * Go 模型「近 5 小时（rolling）套餐用量」进度条。
 *
 * 与 Timeline 同构（`.w-tl` / `.tl-bar` / `.tl-track` / `.tl-cur` / `.tl-meta`），
 * 但 **没有高峰/空闲分段标记**——`.tl-track` 仅一条纯轨道 + 用量填充 + 用量光标，
 * 用于展示 Go 模型近 5 小时套餐用量百分比（限额见 GO_LIMITS.rolling）。
 *
 * 数据来自浏览器侧 go-quota 轮询 store（`useGoQuota`，已全局启动轮询）；
 * 上层 Widget 也可直接注入 goQuota / 错误 / 加载态，缺省时回退到 store 取值。
 */
export function UsageBar({
  goQuota,
  goQuotaError,
  goQuotaStale,
  goQuotaLoading,
}: {
  goQuota?: GoQuotaUsage | null
  goQuotaError?: string | null
  goQuotaStale?: boolean
  goQuotaLoading?: boolean
}): JSX.Element {
  const fallback = useGoQuota()
  const usage = goQuota !== undefined ? goQuota : fallback.usage
  const error = goQuotaError !== undefined ? goQuotaError : fallback.error
  const stale = goQuotaStale !== undefined ? goQuotaStale : fallback.stale
  const loading = goQuotaLoading !== undefined ? goQuotaLoading : fallback.loading

  const pct = usage ? Math.max(0, Math.min(100, usage.rolling.percent)) : 0

  if (loading && !usage) {
    return (
      <div className="w-tl w-usage">
        <div className="tl-bar">
          <div className="tl-track" />
          <span className="tl-cur" style={{ left: '0%', opacity: 0.3 }} />
        </div>
        <div className="tl-meta">Go 5h 用量 · 加载中…</div>
      </div>
    )
  }
  if (error && !usage) {
    return (
      <div className="w-tl w-usage">
        <div className="tl-bar">
          <div className="tl-track" />
          <span className="tl-cur" style={{ left: '0%', opacity: 0.3 }} />
        </div>
        <div className="tl-meta">Go 5h 用量 · {error}</div>
      </div>
    )
  }
  if (!usage) {
    return (
      <div className="w-tl w-usage">
        <div className="tl-bar">
          <div className="tl-track" />
          <span className="tl-cur" style={{ left: '0%', opacity: 0.3 }} />
        </div>
        <div className="tl-meta">Go 5h 用量 · 暂无数据</div>
      </div>
    )
  }

  return (
    <div className="w-tl w-usage">
      <div className="tl-bar">
        <div className="tl-track">
          <i className="tl-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="tl-cur" style={{ left: `${pct}%` }} />
      </div>
      <div className="tl-meta">
        Go 5h 用量 {pct.toFixed(1)}%{stale ? ' · 缓存值' : ''}　{dollars(pct, GO_LIMITS.rolling)}
      </div>
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

/** 余额查询展开/收起切换按钮（原 价格表，`.w-toggle` + aria-expanded + chevron）。 */
export function Toggle({
  expanded,
  onToggle,
  label = '余额查询',
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

/** 余额查询页脚：动态 60s 倒计时（归零触发刷新，见 state/countdown）。 */
export function CountdownFooter({ children }: { children?: ReactNode }): JSX.Element {
  const { remaining } = useCountdown()
  return <UnitFooter note={`更新频率 · 剩 ${remaining}s`}>{children}</UnitFooter>
}

/** 余额查询面板 props（DeepSeek 余额 + Go 周/月额度）。 */
export interface DeepseekBalanceProps {
  deepseek?: DeepseekBalanceData | null
  deepseekError?: string | null
  deepseekStale?: boolean
  deepseekLoading?: boolean
  /** Go 套餐用量（周/月额度）。 */
  goQuota?: GoQuotaUsage | null
  goQuotaError?: string | null
  goQuotaStale?: boolean
  goQuotaLoading?: boolean
}

/**
 * 余额查询面板（替换价格表）：DeepSeek 余额 / Go 周额度 / Go 月额度。
 * 已删除「赠送 · 充值 · 可用」三行；样式自适应各风格。
 */
export function DeepseekBalance({
  deepseek,
  deepseekError,
  deepseekStale,
  deepseekLoading,
  goQuota,
  goQuotaError,
  goQuotaStale,
  goQuotaLoading,
}: DeepseekBalanceProps): JSX.Element {
  const hasDeepseek = !!deepseek
  const hasGo = !!goQuota
  if (!hasDeepseek && !hasGo) {
    if (deepseekLoading || goQuotaLoading) {
      return <div style={{ padding: '8px 2px', fontSize: '10.5px', opacity: 0.65 }}>加载中…</div>
    }
    const err = deepseekError || goQuotaError
    if (err) {
      return (
        <div style={{ padding: '8px 2px' }}>
          <div style={{ fontSize: '10.5px', color: '#a33' }}>{err}</div>
          <div style={{ marginTop: 4, fontSize: '9.5px', opacity: 0.7 }}>请在设置页配置 Key 后刷新</div>
        </div>
      )
    }
    return <div style={{ padding: '8px 2px', fontSize: '10.5px', opacity: 0.65 }}>暂无数据</div>
  }

  // DeepSeek 余额按币种返回数组（如 USD + CNY 各一条）；优先取用户充值的人民币
  // 条目，避免误取 [0] 的 USD/0.00。无 CNY 时回退到首条。
  const entries = deepseek?.balance_infos ?? []
  const pick = (entries.find((b) => b.currency === 'CNY') ?? entries[0]) ?? null
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    padding: '4px 2px',
    fontSize: '10.5px',
    lineHeight: 1.5,
  }
  const sepStyle: React.CSSProperties = {
    borderTop: '1px dashed color-mix(in oklch, currentColor 22%, transparent)',
  }
  const stale = deepseekStale || goQuotaStale
  const num = (text: string): JSX.Element => (
    <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontFamily: 'ui-monospace, monospace' }}>{text}</span>
  )
  return (
    <div className="w-balance" style={{ marginTop: 2 }}>
      {hasDeepseek && (
        <div style={rowStyle}>
          <span>DeepSeek 余额</span>
          {num(pick ? `${pick.total_balance ?? '--'} ${pick.currency ?? 'CNY'}${deepseek!.is_available ? '' : ' · 不可用'}` : '--')}
        </div>
      )}
      {hasGo && (
        <div style={{ ...rowStyle, ...(hasDeepseek ? sepStyle : {}) }}>
          <span>Go 周额度</span>
          {num(`${goQuota!.weekly.percent.toFixed(1)}% · ${dollars(goQuota!.weekly.percent, GO_LIMITS.weekly)}`)}
        </div>
      )}
      {hasGo && (
        <div style={{ ...rowStyle, ...sepStyle }}>
          <span>Go 月额度</span>
          {num(`${goQuota!.monthly.percent.toFixed(1)}% · ${dollars(goQuota!.monthly.percent, GO_LIMITS.monthly)}`)}
        </div>
      )}
      {stale && (
        <div style={{ fontSize: '9.5px', color: '#a33', marginTop: 4, padding: '0 2px' }}>
          缓存值 · {deepseekError ?? goQuotaError ?? ''}
        </div>
      )}
    </div>
  )
}
