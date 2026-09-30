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
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { LOCALE_NS } from '../locale';
/**
 * `sidebar.footer.action` 全量 props：owner 共享 `{ wide }` + 全局标准套件
 * + slot 注册声明的 `locale:` 座位（框架合成的 `t`）。
 * `PropsLocale` 与 `PropsRuntime` 的并集正是框架在 register 调用点对组件
 * 施加的 composed props 约束（`ComposedProps` = PropsRuntime & … & PropsLocale）。
 */
export type PeakValleyWidgetProps = PropsRuntime<'sidebar.footer.action'> & PropsLocale<typeof LOCALE_NS>;
/** 侧边栏小组件入口组件。 */
export declare function PeakValleyWidget(props: PeakValleyWidgetProps): JSX.Element | null;
