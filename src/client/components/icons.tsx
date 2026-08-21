/**
 * 小组件图标（全部 aria-hidden，纯装饰；时段信息以文字传达）。
 */
import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'aria-hidden'>

function iconProps(props: IconProps): SVGProps<SVGSVGElement> {
  return {
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  }
}

/** chevron-right（价格表展开指示）。 */
export function ChevronIcon(props: IconProps): JSX.Element {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}

/** 太阳（昼夜风格 · 高峰）。 */
export function SunIcon(props: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
    </svg>
  )
}

/** 月亮（昼夜风格 · 空闲）。 */
export function MoonIcon(props: IconProps): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </svg>
  )
}
