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
import type { LocaleDictOf, TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
import type { LocaleId } from '@deepseek-ai/dsh-client-locale';
/** 本插件占用的 locale 命名空间（唯一所有者）。 */
export declare const LOCALE_NS = "dsh-deepseek-peak-valley";
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** DeepSeek 峰谷计费小组件 + Go 套餐用量 + 设置页文案。 */
        'dsh-deepseek-peak-valley': 'plugin.aria' | 'period.peak' | 'period.idle' | 'period.peakShort' | 'period.idleShort' | 'period.peakLong' | 'period.idleLong' | 'period.weekend' | 'period.rule' | 'period.dayNightWarmCool' | 'item.inputCacheHit' | 'item.inputCacheMiss' | 'item.output' | 'timeline.goUsageLoading' | 'timeline.goUsageError' | 'timeline.goUsageEmpty' | 'timeline.goUsage' | 'timeline.staleSuffix' | 'common.loading' | 'common.empty' | 'common.stale' | 'common.live' | 'common.staleWithDetail' | 'common.balance' | 'common.deepseekBalance' | 'common.goWeeklyQuota' | 'common.goMonthlyQuota' | 'common.unavailable' | 'common.usageUnit' | 'common.refreshIn' | 'common.configureKeyHint' | 'common.configureDeepseekKeyHint' | 'style.01' | 'style.02' | 'style.03' | 'style.04' | 'style.05' | 'style.06' | 'style.07' | 'style.08' | 'style.09' | 'style.10' | 'style.11' | 'skin.name' | 'skin.receiptTitle' | 'skin.receiptSub' | 'skin.editorialEyebrow' | 'skin.editorialTitle' | 'skin.editorialMeta' | 'skin.terminalNow' | 'skin.terminalHours' | 'skin.terminalColItem' | 'skin.terminalColBalance' | 'skin.dayNightPeak' | 'skin.dayNightIdle' | 'skin.dayNightSub' | 'skin.dayNightWeekend' | 'skin.goTitle' | 'skin.goRolling' | 'skin.goWeekly' | 'skin.goMonthly' | 'skin.limit' | 'skin.detail' | 'skin.totalBalance' | 'skin.granted' | 'skin.toppedUp' | 'skin.available' | 'skin.insufficient' | 'skin.switchView' | 'go.subRealtime' | 'go.subStale' | 'go.subDemo' | 'go.hint' | 'go.footRealtime' | 'go.footStale' | 'go.footDemo' | 'settings.label' | 'settings.enabled' | 'settings.enabledHint' | 'settings.switchOn' | 'settings.switchOff' | 'settings.simulate' | 'settings.simulateHint' | 'settings.simulateAria' | 'settings.keysLegend' | 'settings.keysHint' | 'settings.goKeyLabel' | 'settings.deepseekKeyLabel' | 'settings.keyPlaceholder' | 'settings.notConfigured' | 'settings.save' | 'settings.saving' | 'settings.clear' | 'settings.clearConfirm' | 'settings.saved' | 'settings.cleared' | 'settings.noNewKey' | 'settings.stylesLegend' | 'settings.preview' | 'settings.previewExpanded' | 'settings.previewCollapsed' | 'settings.previewAriaExpanded' | 'settings.previewAriaCollapsed' | 'settings.describe' | 'settings.goError' | 'settings.deepseekError' | 'host.goNoKey' | 'host.goKeyInvalid' | 'host.goNotSubscribed' | 'host.goMalformed' | 'host.deepseekNoKey' | 'host.deepseekKeyInvalid' | 'host.deepseekMalformed' | 'host.badJson' | 'host.unknown';
    }
}
/** 本插件的完整字典（键集由 `LocaleNamespaceMap` 声明约束）。 */
export type PluginDict = LocaleDictOf<typeof LOCALE_NS>;
/** 内置全部 locale 的完整字典（注册时双语齐备由类型强制）。 */
export declare const LOCALE_DICTS: Record<LocaleId, PluginDict>;
/**
 * 把宿主返回的稳定错误码映射为当前语言文案。
 * @param t - 本命名空间绑定的翻译函数。
 * @param code - 宿主给出的错误码（未知时为 undefined）。
 * @param fallback - 无可用码时原样展示的宿主文本。
 * @returns 本地化文案，或宿主原文。
 */
export declare function translateHostError(t: TranslateNS<typeof LOCALE_NS>, code: string | null | undefined, fallback: string | null | undefined): string | null;
