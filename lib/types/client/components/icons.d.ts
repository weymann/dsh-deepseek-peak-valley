/**
 * 小组件图标（全部 aria-hidden，纯装饰；时段信息以文字传达）。
 */
import type { SVGProps } from 'react';
type IconProps = Omit<SVGProps<SVGSVGElement>, 'aria-hidden'>;
/** chevron-right（价格表展开指示）。 */
export declare function ChevronIcon(props: IconProps): JSX.Element;
/** 太阳（昼夜风格 · 高峰）。 */
export declare function SunIcon(props: IconProps): JSX.Element;
/** 月亮（昼夜风格 · 空闲）。 */
export declare function MoonIcon(props: IconProps): JSX.Element;
export {};
