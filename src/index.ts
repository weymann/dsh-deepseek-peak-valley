/**
 * dsh-deepseek-peak-valley · node 半（host stub）。
 *
 * 纯 client 小组件：host 侧无行为。空 apply() 让插件出现在 host cordis.yml /
 * Loader 中；浏览器半通过 exports["./client"] 分发（见 package.json 的
 * `dsh.client` 声明）。
 */
/** Host 插件体 —— 本表面插件无 host 侧行为。 */
export function apply(): void {}
