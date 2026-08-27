/**
 * 设置入口 · DS峰谷小组件（`settings.section` 页）。
 *
 * 用户需求（已确认）：设置里可切换 11 款风格 + 启停开关。
 * 内容：启停开关 / 模拟时段（演示覆盖）/ 风格选择 / 实时预览。
 * 写路径走本插件偏好 store（`settings.section` 的 owner props 只给 `{ close }`，
 * 文案/当前值/写路径由本插件自持）。
 */
import { useEffect, useState } from 'react'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
import { STYLE_CATALOG, STYLE_IDS, isDualViewStyle, type StyleId } from '../../core/catalog'
import type { ViewTab } from '../../core/types'
import { setPeriodOverride, usePeriod } from '../state/period'
import { setPreferences, usePreferences } from '../state/preferences'
import { useUsage } from '../state/usage'
import { useGoQuota } from '../state/go-quota'
import { useDeepseekBalance, refreshDeepseek } from '../state/deepseek-balance'
import { styleComponents, dualViewComponents } from '../styles/registry'

/** `settings.section` 全量 props：owner 共享 `{ close }` + 全局标准套件。 */
export type SettingsSectionProps = PropsRuntime<'settings.section'>

/** 设置页 · DS峰谷小组件。 */
export function SettingsSection(_props: SettingsSectionProps): JSX.Element {
  const preferences = usePreferences()
  const { period, cursorPercent } = usePeriod()
  const usageState = useUsage()
  const goQuotaState = useGoQuota()
  const deepseekState = useDeepseekBalance()
  const components = styleComponents(preferences.styleId)
  const dualComp = isDualViewStyle(preferences.styleId) ? dualViewComponents(preferences.styleId) : null
  const [previewExpanded, setPreviewExpanded] = useState(true)
  const [previewViewTab, setPreviewViewTab] = useState<ViewTab>('pricing')
  const [previewUsageDetail, setPreviewUsageDetail] = useState(true)
  const [goKeyInput, setGoKeyInput] = useState('')
  const [dsKeyInput, setDsKeyInput] = useState('')
  const [cfgStatus, setCfgStatus] = useState<{ goKeyMasked?: string; deepseekKeyMasked?: string; goKeyConfigured?: boolean; deepseekKeyConfigured?: boolean } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)

  useEffect(() => {
    fetch('/go-quota/config', { cache: 'no-store' } as any)
      .then((r) => r.json())
      .then((j) => setCfgStatus(j))
      .catch(() => {})
  }, [])

  return (
    <div className="ds-pv-settings">
      <h2>DS峰谷小组件</h2>
      <p className="ds-pv-desc">
        按北京时间自动判定高峰（09:00–12:00、14:00–18:00）与空闲时段，在左侧边栏
        展示分时段计费报价；可切换 11 款风格。价格基于公开报价，仅作演示。
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

      {/* Key 配置：Go 套餐 & DeepSeek */}
      <fieldset className="ds-pv-fieldset">
        <legend>Key 配置 · Go套餐 & DeepSeek</legend>
        <p className="hint" style={{ margin: '0 0 8px', lineHeight: 1.6 }}>
          用于填充 <b>Go套餐用量</b>（三贴纸）与 <b>余额查询</b>（DeepSeek 余额）。留空表示使用系统已配置（`auth.json` / 环境变量）。保存后立即生效，Key 仅存于 `~/.dsh/dsh-deepseek-peak-valley.json`。
          {cfgStatus && (
            <span style={{ display: 'block', marginTop: 4 }}>
              Go: {cfgStatus.goKeyConfigured ? cfgStatus.goKeyMasked : '未配置'} · DeepSeek: {cfgStatus.deepseekKeyConfigured ? cfgStatus.deepseekKeyMasked : '未配置'}
              {goQuotaState.error && <span style={{ color: '#a33' }}> · Go错误:{goQuotaState.error.slice(0, 40)}</span>}
              {deepseekState.error && <span style={{ color: '#a33' }}> · DS错误:{deepseekState.error.slice(0, 40)}</span>}
            </span>
          )}
        </p>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Go 套餐 Key（opencode-go）</span>
            <input
              type="password"
              placeholder={cfgStatus?.goKeyMasked || 'sk-... 粘贴后保存'}
              value={goKeyInput}
              onChange={(e) => setGoKeyInput(e.target.value)}
              style={{ padding: '6px 10px', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 6, fontSize: 12 }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>DeepSeek Key（platform.deepseek.com）</span>
            <input
              type="password"
              placeholder={cfgStatus?.deepseekKeyMasked || 'sk-... 粘贴后保存'}
              value={dsKeyInput}
              onChange={(e) => setDsKeyInput(e.target.value)}
              style={{ padding: '6px 10px', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 6, fontSize: 12 }}
            />
          </label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                setSaving(true)
                setSaveMsg(null)
                try {
                  const body: any = {}
                  if (goKeyInput.trim()) body.goKey = goKeyInput.trim()
                  else if (goKeyInput === '') {
                    // 不传则不改；清空需用户显式清空后保存？这里仅当有输入才更新
                  }
                  if (dsKeyInput.trim()) body.deepseekKey = dsKeyInput.trim()
                  // 允许清空：若输入框为空且用户点击清空，可传空字符串
                  // 这里如果用户输入为空字符串且想清空，可通过单独逻辑；暂仅更新非空
                  if (Object.keys(body).length === 0) {
                    setSaveMsg('未输入新 Key')
                    return
                  }
                  const r = await fetch('/go-quota/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } as any)
                  const j: any = await r.json()
                  if (!j.ok && j.error) throw new Error(j.error)
                  setCfgStatus((prev) => ({ ...prev, goKeyMasked: j.goKeyMasked ?? prev?.goKeyMasked, deepseekKeyMasked: j.deepseekKeyMasked ?? prev?.deepseekKeyMasked, goKeyConfigured: !!j.goKeyMasked, deepseekKeyConfigured: !!j.deepseekKeyMasked }))
                  setSaveMsg('已保存，正在刷新数据…')
                  setGoKeyInput('')
                  setDsKeyInput('')
                  // 触发重新轮询（下一次 60s 前先手动刷新）
                  setTimeout(() => {
                    fetch('/go-quota/usage', { cache: 'no-store' } as any).catch(() => {})
                    fetch('/deepseek/balance', { cache: 'no-store' } as any).catch(() => {})
                    refreshDeepseek()
                  }, 300)
                } catch (e: any) {
                  setSaveMsg(e?.message ?? String(e))
                } finally {
                  setSaving(false)
                  setTimeout(() => setSaveMsg(null), 3000)
                }
              }}
              style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--dsw-alias-border-l1)', background: 'var(--dsw-alias-bg-layer-2)', cursor: 'pointer', fontSize: 12 }}
            >
              {saving ? '保存中…' : '保存 Keys'}
            </button>
            <button
              type="button"
              onClick={async () => {
                // 清空
                if (!confirm('清空已保存的 Keys？')) return
                const r = await fetch('/go-quota/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goKey: '', deepseekKey: '' }) } as any)
                const j: any = await r.json()
                setCfgStatus({ goKeyConfigured: false, deepseekKeyConfigured: false, goKeyMasked: '', deepseekKeyMasked: '' })
                setSaveMsg('已清空')
                setTimeout(() => setSaveMsg(null), 2000)
              }}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--dsw-alias-border-l1)', background: 'transparent', cursor: 'pointer', fontSize: 12 }}
            >
              清空
            </button>
            {saveMsg && <span style={{ fontSize: 12, color: saveMsg.includes('已') ? '#1a7' : '#a33' }}>{saveMsg}</span>}
          </div>
        </div>
      </fieldset>

      {/* 风格选择 */}
      <fieldset className="ds-pv-fieldset">
        <legend>风格 · 11 款</legend>
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
            <div className="ds-pv" data-period={period} data-tab={previewViewTab} role="group" aria-label="预览·展开态">
              {dualComp ? (
                <dualComp.DualExpanded
                  period={period}
                  cursorPercent={cursorPercent}
                  priceTableExpanded={previewExpanded}
                  onTogglePriceTable={() => setPreviewExpanded((v) => !v)}
                  viewTab={previewViewTab}
                  onToggleViewTab={() => setPreviewViewTab((v) => (v === 'pricing' ? 'usage' : 'pricing'))}
                  usageDetailExpanded={previewUsageDetail}
                  onToggleUsageDetail={() => setPreviewUsageDetail((v) => !v)}
                  usage={usageState.usage}
                  usageReal={usageState.real}
                  goQuota={goQuotaState.usage}
                  goQuotaError={goQuotaState.error}
                  goQuotaStale={goQuotaState.stale}
                  deepseek={deepseekState.data}
                  deepseekError={deepseekState.error}
                  deepseekStale={deepseekState.stale}
                  deepseekLoading={deepseekState.loading}
                />
              ) : (
                <components.Expanded
                  period={period}
                  cursorPercent={cursorPercent}
                  priceTableExpanded={previewExpanded}
                  onTogglePriceTable={() => setPreviewExpanded((v) => !v)}
                />
              )}
            </div>
          </div>
          <div className="ds-pv-preview-item ds-pv-preview-item--collapsed">
            <span className="ds-pv-preview-label">缩小 · 收起态</span>
            <div className="ds-pv" data-period={period} data-tab={previewViewTab} role="group" aria-label="预览·收起态">
              {dualComp ? (
                <dualComp.DualCollapsed
                  period={period}
                  cursorPercent={cursorPercent}
                  viewTab={previewViewTab}
                  usage={usageState.usage}
                />
              ) : (
                <components.Collapsed period={period} cursorPercent={cursorPercent} />
              )}
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
