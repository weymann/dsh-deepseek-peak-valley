/**
 * 样式注入：把 `*.css?inline` 编译文本以 <style data-plugin> 注入 document.head，
 * 返回 disposer（fiber dispose 时移除，003 生命周期契约：dispose 清理样式注入）。
 */
import settingsCss from './settings.css?inline'
import widgetCss from './widget.css?inline'

const PLUGIN_ID = 'dsh-deepseek-peak-valley'

/** 幂等注入一段 CSS（同 tagId 不重复注入；返回 disposer 移除该 <style>）。 */
function injectStyle(name: string, css: string): () => void {
  const tagId = `${PLUGIN_ID}/${name}`
  if (typeof document === 'undefined') return () => {}
  if (document.querySelector(`style[data-plugin-css="${tagId}"]`) !== null) {
    return () => {}
  }
  const tag = document.createElement('style')
  tag.dataset.plugin = PLUGIN_ID
  tag.dataset.pluginCss = tagId
  tag.textContent = css
  document.head.appendChild(tag)
  return () => {
    tag.remove()
  }
}

/** 安装小组件 + 设置页样式；返回统一 disposer。 */
export function installStyles(): () => void {
  const disposers: Array<() => void> = [
    injectStyle('widget', widgetCss),
    injectStyle('settings', settingsCss),
  ]
  return () => {
    for (const disposer of disposers) disposer()
  }
}
