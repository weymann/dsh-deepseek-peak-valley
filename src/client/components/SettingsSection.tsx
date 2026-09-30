/**
 * 设置入口 · DS峰谷小组件（`settings.section` 页）。
 *
 * 用户需求（已确认）：设置里可切换 11 款风格 + 启停开关。
 * 内容：启停开关 / 模拟时段（演示覆盖）/ 风格选择 / 实时预览。
 * 写路径走本插件偏好 store（`settings.section` 的 owner props 只给 `{ close }`，
 * 文案/当前值/写路径由本插件自持）。
 *
 * 全部文案经 slot 注册的 `locale:` 座位注入的 `t` 提供，并由
 * `TranslatorProvider` 透传给实时预览里的皮肤组件。
 */
import { useEffect, useState } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
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
import { TranslatorProvider, useT, useHostError } from '../locale/translator'
import { LOCALE_NS } from '../locale'

/** `settings.section` 全量 props：owner 共享 `{ close }` + 全局标准套件 + locale 座位。 */
export type SettingsSectionProps = PropsRuntime<'settings.section'> & PropsLocale<typeof LOCALE_NS>

/** 设置页 · DS峰谷小组件。 */
export function SettingsSection(props: SettingsSectionProps): JSX.Element {
  const { t } = props
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
  // 宿主错误：码 + 英文兜底 → 当前语言文案（在 Provider 内调用）
  const goQuotaError = useHostError(goQuotaState.errorCode, goQuotaState.error)
  const deepseekError = useHostError(deepseekState.errorCode, deepseekState.error)

  useEffect(() => {
    fetch('/go-quota/config', { cache: 'no-store' } as any)
      .then((r) => r.json())
      .then((j) => setCfgStatus(j))
      .catch(() => {})
  }, [])

  return (
    <TranslatorProvider t={t}>
      <div className="ds-pv-settings">
      <h2>{t('settings.label')}</h2>
      <p className="ds-pv-desc">{t('settings.describe')}</p>

      {/* 启停开关 */}
      <div className="ds-pv-row">
        <span className="ds-pv-row-label">
          <span>{t('settings.enabled')}</span>
          <span className="hint">{t('settings.enabledHint')}</span>
        </span>
        <button
          type="button"
          className="ds-pv-switch"
          role="switch"
          aria-checked={preferences.enabled}
          onClick={() => setPreferences({ enabled: !preferences.enabled })}
        >
          <span className="visually-hidden">{preferences.enabled ? t('settings.switchOn') : t('settings.switchOff')}</span>
        </button>
      </div>

      {/* 模拟时段（演示覆盖，刷新回到自动判定） */}
      <div className="ds-pv-row">
        <span className="ds-pv-row-label">
          <span>{t('settings.simulate')}</span>
          <span className="hint">{t('settings.simulateHint')}</span>
        </span>
        <div className="ds-pv-seg" role="group" aria-label={t('settings.simulateAria')}>
          <button
            type="button"
            aria-pressed={period === 'peak'}
            onClick={() => setPeriodOverride(period === 'peak' ? null : 'peak')}
          >
            {t('period.peak')}
          </button>
          <button
            type="button"
            aria-pressed={period === 'idle'}
            onClick={() => setPeriodOverride(period === 'idle' ? null : 'idle')}
          >
            {t('period.idle')}
          </button>
        </div>
      </div>

      {/* Key 配置：Go 套餐 & DeepSeek */}
      <fieldset className="ds-pv-fieldset">
        <legend>{t('settings.keysLegend')}</legend>
        <p className="hint" style={{ margin: '0 0 8px', lineHeight: 1.6 }}>
          {t('settings.keysHint')}
          {cfgStatus && (
            <span style={{ display: 'block', marginTop: 4 }}>
              Go: {cfgStatus.goKeyConfigured ? cfgStatus.goKeyMasked : t('settings.notConfigured')} · DeepSeek: {cfgStatus.deepseekKeyConfigured ? cfgStatus.deepseekKeyMasked : t('settings.notConfigured')}
              {goQuotaError && <span style={{ color: '#a33' }}> · {t('settings.goError')}:{goQuotaError.slice(0, 40)}</span>}
              {deepseekError && <span style={{ color: '#a33' }}> · {t('settings.deepseekError')}:{deepseekError.slice(0, 40)}</span>}
            </span>
          )}
        </p>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{t('settings.goKeyLabel')}</span>
            <input
              type="password"
              placeholder={cfgStatus?.goKeyMasked || t('settings.keyPlaceholder')}
              value={goKeyInput}
              onChange={(e) => setGoKeyInput(e.target.value)}
              style={{ padding: '6px 10px', border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 6, fontSize: 12 }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{t('settings.deepseekKeyLabel')}</span>
            <input
              type="password"
              placeholder={cfgStatus?.deepseekKeyMasked || t('settings.keyPlaceholder')}
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
                  if (dsKeyInput.trim()) body.deepseekKey = dsKeyInput.trim()
                  if (Object.keys(body).length === 0) {
                    setSaveMsg(t('settings.noNewKey'))
                    return
                  }
                  const r = await fetch('/go-quota/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } as any)
                  const j: any = await r.json()
                  if (!j.ok && j.error) throw new Error(j.error)
                  setCfgStatus((prev) => ({ ...prev, goKeyMasked: j.goKeyMasked ?? prev?.goKeyMasked, deepseekKeyMasked: j.deepseekKeyMasked ?? prev?.deepseekKeyMasked, goKeyConfigured: !!j.goKeyMasked, deepseekKeyConfigured: !!j.deepseekKeyMasked }))
                  setSaveMsg(t('settings.saved'))
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
              {saving ? t('settings.saving') : t('settings.save')}
            </button>
            <button
              type="button"
              onClick={async () => {
                // 清空
                if (!confirm(t('settings.clearConfirm'))) return
                const r = await fetch('/go-quota/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goKey: '', deepseekKey: '' }) } as any)
                await r.json()
                setCfgStatus({ goKeyConfigured: false, deepseekKeyConfigured: false, goKeyMasked: '', deepseekKeyMasked: '' })
                setSaveMsg(t('settings.cleared'))
                setTimeout(() => setSaveMsg(null), 2000)
              }}
              style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--dsw-alias-border-l1)', background: 'transparent', cursor: 'pointer', fontSize: 12 }}
            >
              {t('settings.clear')}
            </button>
            {saveMsg && <span style={{ fontSize: 12, color: saveMsg === t('settings.noNewKey') ? '#a33' : '#1a7' }}>{saveMsg}</span>}
          </div>
        </div>
      </fieldset>

      {/* 风格选择 */}
      <fieldset className="ds-pv-fieldset">
        <legend>{t('settings.stylesLegend')}</legend>
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
        <span className="ds-pv-preview-title">{t('settings.preview')} · {t(STYLE_NAME_KEY[preferences.styleId])} {STYLE_CATALOG[preferences.styleId].nameEn}</span>
        <div className="ds-pv-preview-stack">
          <div className="ds-pv-preview-item ds-pv-preview-item--expanded">
            <span className="ds-pv-preview-label">{t('settings.previewExpanded')}</span>
            <div className="ds-pv" data-period={period} data-tab={previewViewTab} role="group" aria-label={t('settings.previewAriaExpanded')}>
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
            <span className="ds-pv-preview-label">{t('settings.previewCollapsed')}</span>
            <div className="ds-pv" data-period={period} data-tab={previewViewTab} role="group" aria-label={t('settings.previewAriaCollapsed')}>
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
    </TranslatorProvider>
  )
}

/** 风格编号 → 本地化风格名键。 */
const STYLE_NAME_KEY = {
  '01': 'style.01',
  '02': 'style.02',
  '03': 'style.03',
  '04': 'style.04',
  '05': 'style.05',
  '06': 'style.06',
  '07': 'style.07',
  '08': 'style.08',
  '09': 'style.09',
  '10': 'style.10',
  '11': 'style.11',
} as const

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
  const t = useT()
  const spec = STYLE_CATALOG[id]
  return (
    <button type="button" className="ds-pv-style-option" aria-pressed={selected} onClick={onSelect}>
      <span className="ds-idx">{id}</span>
      <span className="ds-zh">{t(STYLE_NAME_KEY[id])}</span>
      <span className="ds-en">{spec.nameEn}</span>
    </button>
  )
}
