/**
 * 十款风格组件注册表：StyleId → { Expanded, Collapsed }。
 *
 * 每款风格同时实现「展开 · 侧边栏」（头部/时间轴/价格表/页脚）与
 * 「收起 · 图标栏」（紧凑指示器 + 峰/闲 文字），对齐 002-接口契约 §2 与
 * 002-前端-页面交互 逐款实现。
 */
import type { StyleId } from '../../core/catalog';
import { type CollapsedProps, type ExpandedProps } from './classic';
/** 单款风格组件对。 */
export interface StyleComponents {
    Expanded: (props: ExpandedProps) => JSX.Element;
    Collapsed: (props: CollapsedProps) => JSX.Element;
}
/** 风格组件注册表（002-接口契约 §3 十款）。 */
export declare const STYLE_COMPONENTS: Record<StyleId, StyleComponents>;
/** 按风格编号取组件对（缺省回退到 01）。 */
export declare function styleComponents(styleId: StyleId): StyleComponents;
