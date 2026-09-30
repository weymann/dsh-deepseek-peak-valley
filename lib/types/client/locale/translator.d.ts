/**
 * dsh-deepseek-peak-valley · 翻译座位（React context）与读取钩子。
 *
 * 官方来源是 slot 注册的 `locale:` 座位——框架把该命名空间的 `t` 合成进
 * 注册组件 props，并在语言切换时换发新的函数引用，整套 outlet 随
 * locale revision 重渲染。本插件层级较深（Widget → 风格目录 → 11 款皮肤
 * → 共享原语），把 `t` 逐层写进每个皮肤 props 契约会污染领域类型，
 * 因此这里做一次薄透传：
 *
 * - 顶层唯一的 slot 组件（Widget / SettingsSection）把注入的 `t` 放进
 *   `TranslatorProvider`；
 * - 任意深度的子组件用 `useT()` 取值，语言切换自然生效（引用变化即重渲染）。
 *
 * 缺省值回退为「原样返回键」：独立渲染（如测试）不会崩溃，也不会凭空
 * 产生文案——缺座位是装配错误，应由宿主在 slot 层显式暴露。
 */
import { type ReactNode } from 'react';
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
import { LOCALE_NS } from './index';
/** 本命名空间的翻译函数类型（框架 `t` 座位的确切类型）。 */
export type PluginT = TranslateNS<typeof LOCALE_NS>;
/** 把 slot 注入的 `t` 座位透传给整棵子树。 */
export declare function TranslatorProvider({ t, children }: {
    t: PluginT;
    children: ReactNode;
}): JSX.Element;
/** 取当前语言的翻译函数（语言切换后返回新引用）。 */
export declare function useT(): PluginT;
/**
 * 把宿主返回的错误（稳定机器码 + 英文兜底）渲染成当前语言的文案。
 *
 * 在渲染层翻译而非在 store 层：store 只保存宿主原文，语言切换后
 * 整个 slot outlet 会随 locale revision 重渲染，这里随即给出新语言的
 * 文案——无需在 store 里维护 locale 依赖。
 * @param code - 宿主给出的稳定机器码（网络层失败时为 null）。
 * @param fallback - 无可用码时原样展示的宿主文本。
 * @returns 本地化文案（无错误时为 null）。
 */
export declare function useHostError(code: string | null | undefined, fallback: string | null | undefined): string | null;
