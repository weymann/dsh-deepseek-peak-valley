/**
 * 十款风格组件注册表：StyleId → { Expanded, Collapsed }。
 *
 * 每款风格同时实现「展开 · 侧边栏」（头部/时间轴/价格表/页脚）与
 * 「收起 · 图标栏」（紧凑指示器 + 峰/闲 文字），对齐 002-接口契约 §2 与
 * 002-前端-页面交互 逐款实现。
 *
 * 双视图风格（11 · 无人岛）额外提供 DualExpanded / DualCollapsed。
 */
import type { StyleId } from '../../core/catalog';
import { type AnimalIslandCollapsedProps, type AnimalIslandExpandedProps } from './AnimalIsland';
import { type CollapsedProps, type ExpandedProps } from './classic';
/** 单款风格组件对。 */
export interface StyleComponents {
    Expanded: (props: ExpandedProps) => JSX.Element;
    Collapsed: (props: CollapsedProps) => JSX.Element;
}
/** 双视图风格组件对（额外提供双视图展开/收起组件）。 */
export interface DualViewStyleComponents extends StyleComponents {
    DualExpanded: (props: AnimalIslandExpandedProps) => JSX.Element;
    DualCollapsed: (props: AnimalIslandCollapsedProps) => JSX.Element;
}
/** 风格组件注册表（002-接口契约 §3 十一款）。 */
export declare const STYLE_COMPONENTS: Record<StyleId, StyleComponents | DualViewStyleComponents>;
/** 按风格编号取组件对（缺省回退到 01）。 */
export declare function styleComponents(styleId: StyleId): StyleComponents;
/** 按风格编号取双视图组件对（仅双视图风格有效）。 */
export declare function dualViewComponents(styleId: StyleId): DualViewStyleComponents | null;
