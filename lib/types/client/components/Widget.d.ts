/**
 * 侧边栏小组件（`sidebar.footer.action` 入口）。
 *
 * - 消费 owner props `{ wide: boolean }`：wide = 展开·侧边栏完整报价；
 *   false = 56px rail 收起·紧凑指示器（003-接口契约 §4 双态挂载）。
 * - 按北京时间自动判定时段（可选演示手动覆盖），根元素带 `data-period`
 *   驱动全部风格的语义配色。
 * - 价格表展开/收起（DualState）按 SessionId 分桶记忆（003 用例 7 隔离）。
 * - 关闭时（设置里启停开关）返回 null。
 */
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
/** `sidebar.footer.action` 全量 props：owner 共享 `{ wide }` + 全局标准套件。 */
export type PeakValleyWidgetProps = PropsRuntime<'sidebar.footer.action'>;
/** 侧边栏小组件入口组件。 */
export declare function PeakValleyWidget(props: PeakValleyWidgetProps): JSX.Element | null;
