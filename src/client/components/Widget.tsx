/**
 * 侧边栏小组件（`sidebar.footer.action` 入口）。
 *
 * - 消费 owner props `{ wide: boolean }`：wide = 展开·侧边栏完整报价；
 *   false = 56px rail 收起·紧凑指示器（003-接口契约 §4 双态挂载）。
 * - 按北京时间自动判定时段（可选演示手动覆盖），根元素带 `data-period`
 *   驱动全部风格的语义配色。
 * - 价格表展开/收起（DualState）按 SessionId 分桶记忆（003 用例 7 隔离）。
 * - 关闭时（设置里启停开关）返回 null。
 * - 双视图风格（Animal Island）额外注入 viewTab / usageDetail 状态。
 */
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import { isDualViewStyle } from '../../core/catalog'
import type { PeriodState } from '../../core/types'
import { LOCALE_NS } from '../locale'
import {
  useSessionDualState,
  setPriceTableExpanded,
  toggleViewTab,
  setUsageDetailExpanded,
} from '../state/dual-state'
import { usePeriod } from '../state/period'
import { usePreferences } from '../state/preferences'
import { useUsage } from '../state/usage'
import { useGoQuota } from '../state/go-quota'
import { useDeepseekBalance } from '../state/deepseek-balance'
import { styleComponents, dualViewComponents } from '../styles/registry'
import { TranslatorProvider, useHostError } from '../locale/translator'

/**
 * `sidebar.footer.action` 全量 props：owner 共享 `{ wide }` + 全局标准套件
 * + slot 注册声明的 `locale:` 座位（框架合成的 `t`）。
 * `PropsLocale` 与 `PropsRuntime` 的并集正是框架在 register 调用点对组件
 * 施加的 composed props 约束（`ComposedProps` = PropsRuntime & … & PropsLocale）。
 */
export type PeakValleyWidgetProps = PropsRuntime<'sidebar.footer.action'> & PropsLocale<typeof LOCALE_NS>

/** 侧边栏小组件入口组件。 */
export function PeakValleyWidget(props: PeakValleyWidgetProps): JSX.Element | null {
  const { wide, t } = props
  const preferences = usePreferences()
  const { period, cursorPercent } = usePeriod()
  const usageState = useUsage()
  const goQuotaState = useGoQuota()
  const deepseekState = useDeepseekBalance()
  const sessionId: SessionId | undefined = props.useSessions((state) => state.current)
  const dual = useSessionDualState(sessionId)
  const components = styleComponents(preferences.styleId)

  if (!preferences.enabled) return null

  const isDual = isDualViewStyle(preferences.styleId)
  const dualComp = isDual ? dualViewComponents(preferences.styleId) : null

  return (
    <TranslatorProvider t={t}>
      <PeakValleyBody
        wide={wide}
        t={t}
        period={period}
        cursorPercent={cursorPercent}
        sessionId={sessionId}
        dual={dual}
        components={components}
        dualComp={dualComp}
        usageState={usageState}
        goQuotaState={goQuotaState}
        deepseekState={deepseekState}
      />
    </TranslatorProvider>
  )
}

/**
 * 组件树主体：Provider 之内，因此可以安全地把宿主错误码翻译成当前语言。
 * 拆成独立组件是为了让 `useHostError`（依赖 context）位于 Provider 内部。
 */
function PeakValleyBody({
  wide,
  t,
  period,
  cursorPercent,
  sessionId,
  dual,
  components,
  dualComp,
  usageState,
  goQuotaState,
  deepseekState,
}: {
  wide: boolean
  t: PeakValleyWidgetProps['t']
  period: PeriodState
  cursorPercent: number
  sessionId: SessionId | undefined
  dual: ReturnType<typeof useSessionDualState>
  components: ReturnType<typeof styleComponents>
  dualComp: ReturnType<typeof dualViewComponents>
  usageState: ReturnType<typeof useUsage>
  goQuotaState: ReturnType<typeof useGoQuota>
  deepseekState: ReturnType<typeof useDeepseekBalance>
}): JSX.Element {
  // 宿主错误在进入组件树时一次性本地化；原始码/原文仍留在 store 中
  const goQuotaError = useHostError(goQuotaState.errorCode, goQuotaState.error)
  const deepseekError = useHostError(deepseekState.errorCode, deepseekState.error)

  return (
    <div className="ds-pv" data-period={period} data-tab={dual.viewTab} role="group" aria-label={t('plugin.aria')}>
      {wide ? (
        dualComp ? (
          <dualComp.DualExpanded
            period={period}
            cursorPercent={cursorPercent}
            priceTableExpanded={dual.priceTableExpanded}
            onTogglePriceTable={() => {
              setPriceTableExpanded(sessionId, !dual.priceTableExpanded)
            }}
            viewTab={dual.viewTab}
            onToggleViewTab={() => {
              toggleViewTab(sessionId)
            }}
            usageDetailExpanded={dual.usageDetailExpanded}
            onToggleUsageDetail={() => {
              setUsageDetailExpanded(sessionId, !dual.usageDetailExpanded)
            }}
            usage={usageState.usage}
            usageReal={usageState.real}
            goQuota={goQuotaState.usage}
            goQuotaError={goQuotaError}
            goQuotaStale={goQuotaState.stale}
            deepseek={deepseekState.data}
            deepseekError={deepseekError}
            deepseekStale={deepseekState.stale}
            deepseekLoading={deepseekState.loading}
          />
        ) : (
          <components.Expanded
            period={period}
            cursorPercent={cursorPercent}
            priceTableExpanded={dual.priceTableExpanded}
            onTogglePriceTable={() => {
              if (sessionId !== undefined) {
                setPriceTableExpanded(sessionId, !dual.priceTableExpanded)
              } else {
                setPriceTableExpanded(undefined, !dual.priceTableExpanded)
              }
            }}
            deepseek={deepseekState.data}
            deepseekError={deepseekError}
            deepseekStale={deepseekState.stale}
            deepseekLoading={deepseekState.loading}
            goQuota={goQuotaState.usage}
            goQuotaError={goQuotaError}
            goQuotaStale={goQuotaState.stale}
            goQuotaLoading={goQuotaState.loading}
          />
        )
      ) : dualComp ? (
        <dualComp.DualCollapsed
          period={period}
          cursorPercent={cursorPercent}
          viewTab={dual.viewTab}
          goQuota={goQuotaState.usage}
        />
      ) : (
        <components.Collapsed period={period} cursorPercent={cursorPercent} />
      )}
    </div>
  )
}
