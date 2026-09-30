import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { LOCALE_NS } from '../locale';
/** `settings.section` 全量 props：owner 共享 `{ close }` + 全局标准套件 + locale 座位。 */
export type SettingsSectionProps = PropsRuntime<'settings.section'> & PropsLocale<typeof LOCALE_NS>;
/** 设置页 · DS峰谷小组件。 */
export declare function SettingsSection(props: SettingsSectionProps): JSX.Element;
