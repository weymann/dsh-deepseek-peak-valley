/**
 * dsh-deepseek-peak-valley · client 插件入口（browser 半）。
 *
 * 对齐 003-接口契约 §3：
 * - `inject = ['slots', 'sessions', 'locale']`（等待 slots / sessions / 官方
 *   locale 服务等必需 service，fiber pending 可诊断）；
 * - `apply(ctx)` 注册「sidebar.footer.action」小组件与「settings.section」设置入口；
 * - 两个 slot 均声明 `locale:` 座位，框架据此合成随语言切换的 `t`；
 * - 全部 controller / listener / 样式 / DOM 随 client fiber dispose 清理；
 * - per-session 双态状态按 SessionId 分桶。
 *
 * 构建产物由 tsdown 包装为 window.__ModuleLoader__.load({ id, factory })；
 * 所有 @deepseek-ai/* 导入均为类型导入（编译期擦除）或模块表平台行。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { SettingsSection } from './components/SettingsSection'
import { PeakValleyWidget } from './components/Widget'
import { resetDualStateBuckets } from './state/dual-state'
import { startPeriodTimer } from './state/period'
import { startUsageBridge } from './state/usage'
import { startGoQuotaPolling } from './state/go-quota'
import { startDeepseekPolling } from './state/deepseek-balance'
import { startCountdown } from './state/countdown'
import { installStyles } from './styles/inject'
import { LOCALE_DICTS, LOCALE_NS } from './locale'

/** 必需服务：slot 注册表 + sessions（用量桥接）+ 官方 locale（文案座位）。 */
export const inject = ['slots', 'sessions', 'locale']

/**
 * Client 插件体：侧边栏小组件 + 设置入口。
 * @param ctx - client 根上下文。
 */
export function apply(ctx: ClientContext): void {
  // 文案字典：内置 zh / en 双语齐备（注册调用由类型强制齐备），
  // 随 fiber dispose 注销；语言由「设置 → 常规 → 语言」统一切换。
  ctx.effect(() => ctx.locale.register(LOCALE_NS, LOCALE_DICTS), 'dsh-deepseek-peak-valley: locale dictionaries')

  // 样式注入随 fiber dispose 移除（003 生命周期契约）
  ctx.effect(() => installStyles(), 'dsh-deepseek-peak-valley: styles')

  // 时段自动判定定时器随 fiber dispose 停止
  ctx.effect(() => startPeriodTimer(), 'dsh-deepseek-peak-valley: period timer')

  // 真实用量桥接（token-meter 投影 → 本插件 store）随 fiber dispose 解除
  ctx.effect(() => startUsageBridge(ctx), 'dsh-deepseek-peak-valley: usage bridge')

  // Go 套餐用量轮询（ /go-quota/usage → 三贴纸真实填充）
  ctx.effect(() => startGoQuotaPolling(), 'dsh-deepseek-peak-valley: go-quota polling')

  // DeepSeek 余额轮询（ /deepseek/balance → 余额查询面板）
  ctx.effect(() => startDeepseekPolling(), 'dsh-deepseek-peak-valley: deepseek polling')

  // 刷新倒计时（每秒递减，归零触发一次主动刷新并重计）
  ctx.effect(() => startCountdown(), 'dsh-deepseek-peak-valley: refresh countdown')

  // per-session 双态分桶在 fiber dispose 时清空
  ctx.effect(
    () => () => {
      resetDualStateBuckets()
    },
    'dsh-deepseek-peak-valley: dual-state buckets',
  )

  // 侧边栏小组件：左侧边栏 · 左下角 · 设置上方（list/root，owner { wide }）
  // locale 座位：框架合成随语言切换的 `t`，由 TranslatorProvider 透传给子组件。
  ctx.slots.inject('sidebar.footer.action', () => {
    const dispose = ctx.slots.register(
      {
        name: 'sidebar.footer.action',
        id: 'dsh-deepseek-peak-valley',
        order: 10,
        registrant: 'dsh-deepseek-peak-valley',
        locale: LOCALE_NS,
      },
      PeakValleyWidget,
    )
    return dispose
  })

  // 设置入口：独立设置页（list/root，label 为随语言变化的 thunk）
  ctx.slots.inject('settings.section', () => {
    const dispose = ctx.slots.register(
      {
        name: 'settings.section',
        id: 'dsh-deepseek-peak-valley',
        order: 30,
        registrant: 'dsh-deepseek-peak-valley',
        locale: LOCALE_NS,
        label: () => ctx.locale.bind(LOCALE_NS)('settings.label'),
      },
      SettingsSection,
    )
    return dispose
  })
}
