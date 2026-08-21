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
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import { isDualViewStyle } from '../../core/catalog'
import {
  useSessionDualState,
  setPriceTableExpanded,
  toggleViewTab,
  setUsageDetailExpanded,
} from '../state/dual-state'
import { usePeriod } from '../state/period'
import { usePreferences } from '../state/preferences'
import { useUsage } from '../state/usage'
import { styleComponents, dualViewComponents } from '../styles/registry'

/** `sidebar.footer.action` 全量 props：owner 共享 `{ wide }` + 全局标准套件。 */
export type PeakValleyWidgetProps = PropsRuntime<'sidebar.footer.action'>

/** 侧边栏小组件入口组件。 */
export function PeakValleyWidget(props: PeakValleyWidgetProps): JSX.Element | null {
  const { wide } = props
  const preferences = usePreferences()
  const { period, cursorPercent } = usePeriod()
  const usageState = useUsage()
  const sessionId: SessionId | undefined = props.useSessions((state) => state.current)
  const dual = useSessionDualState(sessionId)
  const components = styleComponents(preferences.styleId)

  if (!preferences.enabled) return null

  const isDual = isDualViewStyle(preferences.styleId)
  const dualComp = isDual ? dualViewComponents(preferences.styleId) : null

  return (
    <div className="ds-pv" data-period={period} data-tab={dual.viewTab} role="group" aria-label="DeepSeek 分时段计费小组件">
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
          />
        ) : (
          <components.Expanded
            period={period}
            cursorPercent={cursorPercent}
            priceTableExpanded={dual.priceTableExpanded}
            onTogglePriceTable={() => {
              if (sessionId !== undefined) {
                setPriceTableExpanded(sessionId, !dual.priceTableExpanded)
              }
            }}
          />
        )
      ) : (
        dualComp ? (
          <dualComp.DualCollapsed
            period={period}
            cursorPercent={cursorPercent}
            viewTab={dual.viewTab}
          />
        ) : (
          <components.Collapsed period={period} cursorPercent={cursorPercent} />
        )
      )}
    </div>
  )
}
