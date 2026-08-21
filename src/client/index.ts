/**
 * dsh-deepseek-peak-valley · client 插件入口（browser 半）。
 *
 * 对齐 003-接口契约 §3：
 * - `inject = ['slots']`（等待 slots 等必需 service，fiber pending 可诊断）；
 * - `apply(ctx)` 注册「sidebar.footer.action」小组件与「settings.section」设置入口；
 * - 全部 controller / listener / 样式 / DOM 随 client fiber dispose 清理；
 * - per-session 双态状态按 SessionId 分桶。
 *
 * 构建产物由 tsdown 包装为 window.__ModuleLoader__.load({ id, factory })；
 * 所有 @deepseek-ai/* 导入均为类型导入（编译期擦除）或模块表平台行。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { SettingsSection } from './components/SettingsSection'
import { PeakValleyWidget } from './components/Widget'
import { resetDualStateBuckets } from './state/dual-state'
import { startPeriodTimer } from './state/period'
import { installStyles } from './styles/inject'

/** 必需服务：slot 注册表（其余依赖都经 slots 进入）。 */
export const inject = ['slots']

/**
 * Client 插件体：侧边栏小组件 + 设置入口。
 * @param ctx - client 根上下文。
 */
export function apply(ctx: ClientContext): void {
  // 样式注入随 fiber dispose 移除（003 生命周期契约）
  ctx.effect(() => installStyles(), 'dsh-deepseek-peak-valley: styles')

  // 时段自动判定定时器随 fiber dispose 停止
  ctx.effect(() => startPeriodTimer(), 'dsh-deepseek-peak-valley: period timer')

  // per-session 双态分桶在 fiber dispose 时清空
  ctx.effect(
    () => () => {
      resetDualStateBuckets()
    },
    'dsh-deepseek-peak-valley: dual-state buckets',
  )

  // 侧边栏小组件：左侧边栏 · 左下角 · 设置上方（list/root，owner { wide }）
  ctx.slots.inject('sidebar.footer.action', () => {
    const dispose = ctx.slots.register(
      {
        name: 'sidebar.footer.action',
        id: 'dsh-deepseek-peak-valley',
        order: 10,
        registrant: 'dsh-deepseek-peak-valley',
      },
      PeakValleyWidget,
    )
    return dispose
  })

  // 设置入口：独立设置页（list/root，label = 「DS峰谷小组件」）
  ctx.slots.inject('settings.section', () => {
    const dispose = ctx.slots.register(
      {
        name: 'settings.section',
        id: 'dsh-deepseek-peak-valley',
        order: 30,
        label: 'DS峰谷小组件',
        registrant: 'dsh-deepseek-peak-valley',
      },
      SettingsSection,
    )
    return dispose
  })
}
