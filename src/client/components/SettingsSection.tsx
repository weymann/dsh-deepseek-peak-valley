/**
 * 设置入口 · DS峰谷小组件（`settings.section` 页）。
 *
 * 用户需求（已确认）：设置里可切换 10 款风格 + 启停开关。
 * 内容：启停开关 / 模拟时段（演示覆盖）/ 十款风格选择 / 实时预览。
 * 写路径走本插件偏好 store（`settings.section` 的 owner props 只给 `{ close }`，
 * 文案/当前值/写路径由本插件自持）。
 */
import { useState } from 'react'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import { STYLE_CATALOG, STYLE_IDS, type StyleId } from '../../core/catalog'
import { setPeriodOverride, usePeriod } from '../state/period'
import { setPreferences, usePreferences } from '../state/preferences'
import { styleComponents } from '../styles/registry'

/** `settings.section` 全量 props：owner 共享 `{ close }` + 全局标准套件。 */
export type SettingsSectionProps = PropsRuntime<'settings.section'>

/** 设置页 · DS峰谷小组件。 */
export function SettingsSection(_props: SettingsSectionProps): JSX.Element {
  const preferences = usePreferences()
  const { period, cursorPercent } = usePeriod()
  const components = styleComponents(preferences.styleId)
  const [previewExpanded, setPreviewExpanded] = useState(true)

  return (
    <div className="ds-pv-settings">
      <h2>DS峰谷小组件</h2>
      <p className="ds-pv-desc">
        按北京时间自动判定高峰（09:00–12:00、14:00–18:00）与空闲时段，在左侧边栏
        展示分时段计费报价；可切换 10 款风格。价格基于公开报价，仅作演示。
      </p>

      {/* 启停开关 */}
      <div className="ds-pv-row">
        <span className="ds-pv-row-label">
          <span>启用小组件</span>
          <span className="hint">关闭后侧边栏不再显示计费小组件</span>
        </span>
        <button
          type="button"
          className="ds-pv-switch"
          role="switch"
          aria-checked={preferences.enabled}
          onClick={() => setPreferences({ enabled: !preferences.enabled })}
        >
          <span className="visually-hidden">{preferences.enabled ? '已启用' : '已停用'}</span>
        </button>
      </div>

      {/* 模拟时段（演示覆盖，刷新回到自动判定） */}
      <div className="ds-pv-row">
        <span className="ds-pv-row-label">
          <span>模拟时段（演示）</span>
          <span className="hint">手动切换后刷新页面回到自动判定</span>
        </span>
        <div className="ds-pv-seg" role="group" aria-label="模拟时段">
          <button
            type="button"
            aria-pressed={period === 'peak'}
            onClick={() => setPeriodOverride(period === 'peak' ? null : 'peak')}
          >
            高峰
          </button>
          <button
            type="button"
            aria-pressed={period === 'idle'}
            onClick={() => setPeriodOverride(period === 'idle' ? null : 'idle')}
          >
            空闲
          </button>
        </div>
      </div>

      {/* 十款风格选择 */}
      <fieldset className="ds-pv-fieldset">
        <legend>风格 · 10 款</legend>
        <div className="ds-pv-styles">
          {STYLE_IDS.map((id) => (
            <StyleOption
              key={id}
              id={id}
              selected={preferences.styleId === id}
              onSelect={() => setPreferences({ styleId: id })}
            />
          ))}
        </div>
      </fieldset>

      {/* 实时预览：正常（展开态）+ 缩小（收起态）同一排，各带名称标记 */}
      <div className="ds-pv-preview">
        <span className="ds-pv-preview-title">预览 · {STYLE_CATALOG[preferences.styleId].nameZh} {STYLE_CATALOG[preferences.styleId].nameEn}</span>
        <div className="ds-pv-preview-stack">
          <div className="ds-pv-preview-item ds-pv-preview-item--expanded">
            <span className="ds-pv-preview-label">正常 · 展开态</span>
            <div className="ds-pv" data-period={period} role="group" aria-label="预览·展开态">
              <components.Expanded
                period={period}
                cursorPercent={cursorPercent}
                priceTableExpanded={previewExpanded}
                onTogglePriceTable={() => setPreviewExpanded((v) => !v)}
              />
            </div>
          </div>
          <div className="ds-pv-preview-item ds-pv-preview-item--collapsed">
            <span className="ds-pv-preview-label">缩小 · 收起态</span>
            <div className="ds-pv" data-period={period} role="group" aria-label="预览·收起态">
              <components.Collapsed period={period} cursorPercent={cursorPercent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 单款风格选项（aria-pressed 单选语义）。 */
function StyleOption({
  id,
  selected,
  onSelect,
}: {
  id: StyleId
  selected: boolean
  onSelect: () => void
}): JSX.Element {
  const spec = STYLE_CATALOG[id]
  return (
    <button type="button" className="ds-pv-style-option" aria-pressed={selected} onClick={onSelect}>
      <span className="ds-idx">{id}</span>
      <span className="ds-zh">{spec.nameZh}</span>
      <span className="ds-en">{spec.nameEn}</span>
    </button>
  )
}
