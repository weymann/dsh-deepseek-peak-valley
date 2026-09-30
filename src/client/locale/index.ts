/**
 * dsh-deepseek-peak-valley · locale 命名空间（官方 i18n 层）。
 *
 * 对齐 @deepseek-ai/dsh-client-locale 的 typed 形式：
 * - 通过 `declare module` 把本插件的命名空间并入 `LocaleNamespaceMap`，
 *   字典的键集因此成为编译期契约（缺键 / 多键都是编译错误）；
 * - `LOCALE_DICTS` 一次性提供内置全部 locale（zh / en）的完整字典，
 *   注册时双语齐备由类型强制（缺一个 locale 无法通过编译）；
 * - 组件侧的 `t` 来自 slot 注册的 `locale:` 座位（框架合成），
 *   文案随「设置 → 常规 → 语言」实时切换，无需重新注册。
 *
 * 文案分类：
 * - 插件自身文案（widget / 设置页 / 各皮肤）→ 本命名空间扁平键；
 * - 宿主（Node 半场）返回的错误 → `host.*` 键，由 host 侧的稳定 `code`
 *   映射到当前语言；未知 code 回退到宿主给出的英文原文。
 */
import type { LocaleDictOf, TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import type { LocaleId } from '@deepseek-ai/dsh-client-locale'

/** 本插件占用的 locale 命名空间（唯一所有者）。 */
export const LOCALE_NS = 'dsh-deepseek-peak-valley'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** DeepSeek 峰谷计费小组件 + Go 套餐用量 + 设置页文案。 */
    'dsh-deepseek-peak-valley':
      | 'plugin.aria'
      // 时段
      | 'period.peak'
      | 'period.idle'
      | 'period.peakShort'
      | 'period.idleShort'
      | 'period.peakLong'
      | 'period.idleLong'
      | 'period.weekend'
      | 'period.rule'
      | 'period.dayNightWarmCool'
      // 计费项
      | 'item.inputCacheHit'
      | 'item.inputCacheMiss'
      | 'item.output'
      // 时间轴 / 用量条
      | 'timeline.goUsageLoading'
      | 'timeline.goUsageError'
      | 'timeline.goUsageEmpty'
      | 'timeline.goUsage'
      | 'timeline.staleSuffix'
      // 通用
      | 'common.loading'
      | 'common.empty'
      | 'common.stale'
      | 'common.live'
      | 'common.staleWithDetail'
      | 'common.balance'
      | 'common.deepseekBalance'
      | 'common.goWeeklyQuota'
      | 'common.goMonthlyQuota'
      | 'common.unavailable'
      | 'common.usageUnit'
      | 'common.refreshIn'
      | 'common.configureKeyHint'
      | 'common.configureDeepseekKeyHint'
      // 样式名
      | 'style.01'
      | 'style.02'
      | 'style.03'
      | 'style.04'
      | 'style.05'
      | 'style.06'
      | 'style.07'
      | 'style.08'
      | 'style.09'
      | 'style.10'
      | 'style.11'
      // 皮肤专属文案
      | 'skin.name'
      | 'skin.receiptTitle'
      | 'skin.receiptSub'
      | 'skin.editorialEyebrow'
      | 'skin.editorialTitle'
      | 'skin.editorialMeta'
      | 'skin.terminalNow'
      | 'skin.terminalHours'
      | 'skin.terminalColItem'
      | 'skin.terminalColBalance'
      | 'skin.dayNightPeak'
      | 'skin.dayNightIdle'
      | 'skin.dayNightSub'
      | 'skin.dayNightWeekend'
      | 'skin.goTitle'
      | 'skin.goRolling'
      | 'skin.goWeekly'
      | 'skin.goMonthly'
      | 'skin.limit'
      | 'skin.detail'
      | 'skin.totalBalance'
      | 'skin.granted'
      | 'skin.toppedUp'
      | 'skin.available'
      | 'skin.insufficient'
      | 'skin.switchView'
      // Go 套餐用量视图
      | 'go.subRealtime'
      | 'go.subStale'
      | 'go.subDemo'
      | 'go.hint'
      | 'go.footRealtime'
      | 'go.footStale'
      | 'go.footDemo'
      // 设置页
      | 'settings.label'
      | 'settings.enabled'
      | 'settings.enabledHint'
      | 'settings.switchOn'
      | 'settings.switchOff'
      | 'settings.simulate'
      | 'settings.simulateHint'
      | 'settings.simulateAria'
      | 'settings.keysLegend'
      | 'settings.keysHint'
      | 'settings.goKeyLabel'
      | 'settings.deepseekKeyLabel'
      | 'settings.keyPlaceholder'
      | 'settings.notConfigured'
      | 'settings.save'
      | 'settings.saving'
      | 'settings.clear'
      | 'settings.clearConfirm'
      | 'settings.saved'
      | 'settings.cleared'
      | 'settings.noNewKey'
      | 'settings.stylesLegend'
      | 'settings.preview'
      | 'settings.previewExpanded'
      | 'settings.previewCollapsed'
      | 'settings.previewAriaExpanded'
      | 'settings.previewAriaCollapsed'
      | 'settings.describe'
      | 'settings.goError'
      | 'settings.deepseekError'
      // 宿主（Node 半场）错误码 → 本地化文案
      | 'host.goNoKey'
      | 'host.goKeyInvalid'
      | 'host.goNotSubscribed'
      | 'host.goMalformed'
      | 'host.deepseekNoKey'
      | 'host.deepseekKeyInvalid'
      | 'host.deepseekMalformed'
      | 'host.badJson'
      | 'host.unknown'
  }
}

/** 本插件的完整字典（键集由 `LocaleNamespaceMap` 声明约束）。 */
export type PluginDict = LocaleDictOf<typeof LOCALE_NS>

const zh: PluginDict = {
  'plugin.aria': 'DeepSeek 分时段计费小组件',

  'period.peak': '高峰',
  'period.idle': '空闲',
  'period.peakShort': '峰',
  'period.idleShort': '闲',
  'period.peakLong': '高峰时段',
  'period.idleLong': '空闲时段',
  'period.weekend': '周末全天空闲｜低谷',
  'period.rule': '高峰 09:00–12:00 · 14:00–18:00｜其余空闲',
  'period.dayNightWarmCool': '暖色段 = 高峰　冷色段 = 空闲',

  'item.inputCacheHit': '输入 · 缓存命中',
  'item.inputCacheMiss': '输入 · 缓存未命中',
  'item.output': '输出',

  'timeline.goUsageLoading': 'Go 5h 用量 · 加载中…',
  'timeline.goUsageError': 'Go 5h 用量 · {error}',
  'timeline.goUsageEmpty': 'Go 5h 用量 · 暂无数据',
  'timeline.goUsage': 'Go 5h 用量 {percent}%',
  'timeline.staleSuffix': ' · 缓存值',

  'common.loading': '加载中…',
  'common.empty': '暂无数据',
  'common.stale': '缓存值',
  'common.live': '实时',
  'common.staleWithDetail': '缓存值 · {detail}',
  'common.balance': '余额查询',
  'common.deepseekBalance': 'DeepSeek 余额',
  'common.goWeeklyQuota': 'Go 周额度',
  'common.goMonthlyQuota': 'Go 月额度',
  'common.unavailable': ' · 不可用',
  'common.usageUnit': '元 / 百万 tokens · 北京时间',
  'common.refreshIn': '更新频率 · 剩 {seconds}s',
  'common.configureKeyHint': '请在设置页配置 Key 后刷新',
  'common.configureDeepseekKeyHint': '请在设置页“DeepSeek Key”中配置后刷新',

  'style.01': '脉冲',
  'style.02': '留白',
  'style.03': '票据',
  'style.04': '时刻线',
  'style.05': '胶囊',
  'style.06': '终端',
  'style.07': '粗野',
  'style.08': '玻璃',
  'style.09': '昼夜',
  'style.10': '编辑',
  'style.11': '无人岛',

  'skin.name': 'DeepSeek & Go',
  'skin.receiptTitle': 'DeepSeek 分时段计费',
  'skin.receiptSub': '凭条 · 北京时间',
  'skin.editorialEyebrow': 'DeepSeek · 报价',
  'skin.editorialTitle': '分时段计费',
  'skin.editorialMeta': '09:00–12:00 · 14:00–18:00 高峰（北京时间）',
  'skin.terminalNow': '当前：{period}',
  'skin.terminalHours': '09:00–12:00 · 14:00–18:00',
  'skin.terminalColItem': '项',
  'skin.terminalColBalance': '余额',
  'skin.dayNightPeak': '高峰时段',
  'skin.dayNightIdle': '空闲时段',
  'skin.dayNightSub': '北京时间 · {rule}',
  'skin.dayNightWeekend': '高峰 09:00–12:00 / 14:00–18:00',
  'skin.goTitle': 'Go套餐用量',
  'skin.goRolling': '5小时',
  'skin.goWeekly': '一周',
  'skin.goMonthly': '一月',
  'skin.limit': '限额 ${limit}',
  'skin.detail': '明细',
  'skin.totalBalance': '总余额',
  'skin.granted': '赠送',
  'skin.toppedUp': '充值',
  'skin.available': '可用',
  'skin.insufficient': '余额不足',
  'skin.switchView': '切换视图',

  'go.subRealtime': 'Go套餐用量 · 实时统计',
  'go.subStale': 'Go套餐用量 · 缓存值',
  'go.subDemo': 'Go套餐用量 · 示例数据',
  'go.hint': '提示',
  'go.footRealtime': '实时统计 · 按美元额度计费',
  'go.footStale': '缓存值 · 按美元额度计费',
  'go.footDemo': '演示数据 · 接入后按真实用量统计',

  'settings.label': 'DS峰谷小组件',
  'settings.enabled': '启用小组件',
  'settings.enabledHint': '关闭后侧边栏不再显示计费小组件',
  'settings.switchOn': '已启用',
  'settings.switchOff': '已停用',
  'settings.simulate': '模拟时段（演示）',
  'settings.simulateHint': '手动切换后刷新页面回到自动判定',
  'settings.simulateAria': '模拟时段',
  'settings.keysLegend': 'Key 配置 · Go套餐 & DeepSeek',
  'settings.keysHint':
    '用于填充 Go套餐用量（三贴纸）与 余额查询（DeepSeek 余额）。留空表示使用系统已配置（auth.json / 环境变量）。保存后立即生效，Key 仅存于 ~/.dsh/dsh-deepseek-peak-valley.json。',
  'settings.goKeyLabel': 'Go 套餐 Key（opencode-go）',
  'settings.deepseekKeyLabel': 'DeepSeek Key（platform.deepseek.com）',
  'settings.keyPlaceholder': 'sk-... 粘贴后保存',
  'settings.notConfigured': '未配置',
  'settings.save': '保存 Keys',
  'settings.saving': '保存中…',
  'settings.clear': '清空',
  'settings.clearConfirm': '清空已保存的 Keys？',
  'settings.saved': '已保存，正在刷新数据…',
  'settings.cleared': '已清空',
  'settings.noNewKey': '未输入新 Key',
  'settings.stylesLegend': '风格 · 11 款',
  'settings.preview': '预览',
  'settings.previewExpanded': '正常 · 展开态',
  'settings.previewCollapsed': '缩小 · 收起态',
  'settings.previewAriaExpanded': '预览·展开态',
  'settings.previewAriaCollapsed': '预览·收起态',
  'settings.describe':
    '按北京时间自动判定高峰（09:00–12:00、14:00–18:00）与空闲时段，在左侧边栏展示分时段计费报价；可切换 11 款风格。价格基于公开报价，仅作演示。',
  'settings.goError': 'Go错误',
  'settings.deepseekError': 'DS错误',

  'host.goNoKey': '未找到 OpenCode Go API Key（请在设置页“Go套餐 Key”中配置）',
  'host.goKeyInvalid': 'Go API Key 无效（401）',
  'host.goNotSubscribed': '未订阅 OpenCode Go（403）',
  'host.goMalformed': '返回结构异常：缺少 rolling/weekly/monthly',
  'host.deepseekNoKey': '未找到 DeepSeek API Key（请在设置页“DeepSeek Key”中配置）',
  'host.deepseekKeyInvalid': 'DeepSeek API Key 无效（401）',
  'host.deepseekMalformed': '返回结构异常：缺少 balance_infos',
  'host.badJson': 'JSON 解析失败',
  'host.unknown': '未知错误',
}

const en: PluginDict = {
  'plugin.aria': 'DeepSeek time-of-day pricing widget',

  'period.peak': 'Peak',
  'period.idle': 'Off-peak',
  'period.peakShort': 'Pk',
  'period.idleShort': 'Off',
  'period.peakLong': 'Peak hours',
  'period.idleLong': 'Off-peak hours',
  'period.weekend': 'Weekend — off-peak all day | lowest rate',
  'period.rule': 'Peak 09:00–12:00 · 14:00–18:00 | off-peak otherwise',
  'period.dayNightWarmCool': 'Warm = peak　Cool = off-peak',

  'item.inputCacheHit': 'Input · cache hit',
  'item.inputCacheMiss': 'Input · cache miss',
  'item.output': 'Output',

  'timeline.goUsageLoading': 'Go 5h usage · loading…',
  'timeline.goUsageError': 'Go 5h usage · {error}',
  'timeline.goUsageEmpty': 'Go 5h usage · no data',
  'timeline.goUsage': 'Go 5h usage {percent}%',
  'timeline.staleSuffix': ' · cached',

  'common.loading': 'Loading…',
  'common.empty': 'No data',
  'common.stale': 'cached',
  'common.live': 'live',
  'common.staleWithDetail': 'cached · {detail}',
  'common.balance': 'Balance',
  'common.deepseekBalance': 'DeepSeek balance',
  'common.goWeeklyQuota': 'Go weekly quota',
  'common.goMonthlyQuota': 'Go monthly quota',
  'common.unavailable': ' · unavailable',
  'common.usageUnit': 'CNY / million tokens · Beijing time',
  'common.refreshIn': 'Refresh in {seconds}s',
  'common.configureKeyHint': 'Configure a key in Settings, then refresh',
  'common.configureDeepseekKeyHint': 'Configure it under “DeepSeek key” in Settings, then refresh',

  'style.01': 'Pulse',
  'style.02': 'Minimal',
  'style.03': 'Receipt',
  'style.04': 'Metro',
  'style.05': 'Pills',
  'style.06': 'Terminal',
  'style.07': 'Brutalist',
  'style.08': 'Glass',
  'style.09': 'DayNight',
  'style.10': 'Editorial',
  'style.11': 'Animal Island',

  'skin.name': 'DeepSeek & Go',
  'skin.receiptTitle': 'DeepSeek time-of-day pricing',
  'skin.receiptSub': 'Receipt · Beijing time',
  'skin.editorialEyebrow': 'DeepSeek · Rates',
  'skin.editorialTitle': 'Time-of-day pricing',
  'skin.editorialMeta': 'Peak 09:00–12:00 · 14:00–18:00 (Beijing time)',
  'skin.terminalNow': 'now: {period}',
  'skin.terminalHours': '09:00–12:00 · 14:00–18:00',
  'skin.terminalColItem': 'Item',
  'skin.terminalColBalance': 'Balance',
  'skin.dayNightPeak': 'Peak hours',
  'skin.dayNightIdle': 'Off-peak hours',
  'skin.dayNightSub': 'Beijing time · {rule}',
  'skin.dayNightWeekend': 'Peak 09:00–12:00 / 14:00–18:00',
  'skin.goTitle': 'Go usage',
  'skin.goRolling': '5 hours',
  'skin.goWeekly': 'Week',
  'skin.goMonthly': 'Month',
  'skin.limit': 'Limit ${limit}',
  'skin.detail': 'Details',
  'skin.totalBalance': 'Total',
  'skin.granted': 'Granted',
  'skin.toppedUp': 'Topped up',
  'skin.available': 'Available',
  'skin.insufficient': 'Insufficient',
  'skin.switchView': 'Switch view',

  'go.subRealtime': 'Go usage · live',
  'go.subStale': 'Go usage · cached',
  'go.subDemo': 'Go usage · sample data',
  'go.hint': 'Note',
  'go.footRealtime': 'Live · billed against the USD quota',
  'go.footStale': 'Cached · billed against the USD quota',
  'go.footDemo': 'Sample data · real usage appears once connected',

  'settings.label': 'DeepSeek Peak & Off-Peak',
  'settings.enabled': 'Enable widget',
  'settings.enabledHint': 'When off, the sidebar no longer shows the pricing widget',
  'settings.switchOn': 'Enabled',
  'settings.switchOff': 'Disabled',
  'settings.simulate': 'Simulate period (demo)',
  'settings.simulateHint': 'Reload the page to return to automatic detection',
  'settings.simulateAria': 'Simulate period',
  'settings.keysLegend': 'Keys · Go plan & DeepSeek',
  'settings.keysHint':
    'Fills the Go plan usage stickers and the DeepSeek balance panel. Leave blank to use the system-provided credentials (auth.json / environment variables). Keys take effect immediately and are stored only in ~/.dsh/dsh-deepseek-peak-valley.json.',
  'settings.goKeyLabel': 'Go plan key (opencode-go)',
  'settings.deepseekKeyLabel': 'DeepSeek key (platform.deepseek.com)',
  'settings.keyPlaceholder': 'sk-... paste and save',
  'settings.notConfigured': 'not configured',
  'settings.save': 'Save keys',
  'settings.saving': 'Saving…',
  'settings.clear': 'Clear',
  'settings.clearConfirm': 'Clear the saved keys?',
  'settings.saved': 'Saved — refreshing data…',
  'settings.cleared': 'Cleared',
  'settings.noNewKey': 'No new key entered',
  'settings.stylesLegend': 'Style · 11 options',
  'settings.preview': 'Preview',
  'settings.previewExpanded': 'Full · expanded',
  'settings.previewCollapsed': 'Compact · collapsed',
  'settings.previewAriaExpanded': 'Preview, expanded',
  'settings.previewAriaCollapsed': 'Preview, collapsed',
  'settings.describe':
    'Detects DeepSeek peak (09:00–12:00, 14:00–18:00) and off-peak windows in Beijing time, and shows the time-of-day rates in the sidebar. 11 styles available. Prices come from published rates and are for demonstration only.',
  'settings.goError': 'Go error',
  'settings.deepseekError': 'DeepSeek error',

  'host.goNoKey': 'No OpenCode Go API key found (configure it under “Go plan key” in Settings)',
  'host.goKeyInvalid': 'Go API key is invalid (401)',
  'host.goNotSubscribed': 'OpenCode Go is not subscribed (403)',
  'host.goMalformed': 'Unexpected response shape: rolling/weekly/monthly missing',
  'host.deepseekNoKey': 'No DeepSeek API key found (configure it under “DeepSeek key” in Settings)',
  'host.deepseekKeyInvalid': 'DeepSeek API key is invalid (401)',
  'host.deepseekMalformed': 'Unexpected response shape: balance_infos missing',
  'host.badJson': 'JSON parse failed',
  'host.unknown': 'Unknown error',
}

/** 内置全部 locale 的完整字典（注册时双语齐备由类型强制）。 */
export const LOCALE_DICTS: Record<LocaleId, PluginDict> = { zh, en }

/**
 * 把宿主返回的稳定错误码映射为当前语言文案。
 * @param t - 本命名空间绑定的翻译函数。
 * @param code - 宿主给出的错误码（未知时为 undefined）。
 * @param fallback - 无可用码时原样展示的宿主文本。
 * @returns 本地化文案，或宿主原文。
 */
export function translateHostError(
  t: TranslateNS<typeof LOCALE_NS>,
  code: string | null | undefined,
  fallback: string | null | undefined,
): string | null {
  const known: Record<string, keyof PluginDict> = {
    'go-no-key': 'host.goNoKey',
    'go-key-invalid': 'host.goKeyInvalid',
    'go-not-subscribed': 'host.goNotSubscribed',
    'go-malformed': 'host.goMalformed',
    'deepseek-no-key': 'host.deepseekNoKey',
    'deepseek-key-invalid': 'host.deepseekKeyInvalid',
    'deepseek-malformed': 'host.deepseekMalformed',
    'bad-json': 'host.badJson',
    unknown: 'host.unknown',
  }
  if (code && code in known) return t(known[code] as never)
  return fallback ?? null
}
