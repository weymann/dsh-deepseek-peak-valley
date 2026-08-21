/**
 * 小组件浏览器侧 · 时段 store（自动判定 + 演示手动覆盖）。
 *
 * - 接入后按当前北京时间自动判定 `body[data-period]`（peak / idle）；
 * - 演示期提供手动切换（override），刷新后回到自动判定（001 用例 10）；
 * - 全插件共享单一事实源：多挂载点 / 十款风格同步响应，无独立时段状态。
 *
 * 定时器随 fiber 生命周期（apply 中 ctx.effect 启动/清理）。
 */
import { currentPeriod, cursorPercentAt, type PeriodState } from '../../core/period'
import { createStore, useStore } from './store'

/** 时段快照。 */
export interface PeriodSnapshot {
  /** 生效时段（有手动覆盖时为覆盖值，否则为自动判定值）。 */
  period: PeriodState
  /** 纯自动判定（北京时间）。 */
  auto: PeriodState
  /** 演示手动覆盖（null = 自动）。 */
  override: PeriodState | null
  /** 时间轴光标百分比（0–100）：始终按真实时钟计算，手动覆盖时段不影响。 */
  cursorPercent: number
}

/**
 * 定时轮询粒度（毫秒）。
 * 光标随时钟连续移动（001 用例 6），故缩短到 ≤5s 且每次 tick 都刷新快照；
 * 跨时段边界（09/12/14/18 点）最迟此间隔内刷新。
 */
const TICK_MS = 5_000

function evaluate(override: PeriodState | null): PeriodSnapshot {
  const auto = currentPeriod()
  return { period: override ?? auto, auto, override, cursorPercent: cursorPercentAt() }
}

const period = createStore<PeriodSnapshot>(() => evaluate(null))

let timer: ReturnType<typeof setInterval> | null = null

/** 启动自动刷新定时器（幂等；由 fiber 生命周期持有，dispose 时停止）。 */
export function startPeriodTimer(): () => void {
  if (timer === null) {
    timer = setInterval(() => {
      const prev = period.getSnapshot()
      // cursorPercent 每次 tick 都在变（真实时钟），直接 set 新对象、每次都通知。
      period.set(evaluate(prev.override))
    }, TICK_MS)
  }
  return () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }
}

/** 演示期手动覆盖时段；null 清除覆盖回到自动判定。 */
export function setPeriodOverride(override: PeriodState | null): void {
  period.set(evaluate(override))
}

/** 组件内读取生效时段快照。 */
export function usePeriod(): PeriodSnapshot {
  return useStore(period)
}
