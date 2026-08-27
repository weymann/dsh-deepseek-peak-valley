/**
 * Go 套餐 3 贴纸（通用版，所有皮肤复用）。
 * 样式通过内联 + CSS 变量自适应各皮肤的 --now / --peak / --idle，布局保持与 AnimalIsland 一致但中性。
 */
import { useGoQuota } from '../state/go-quota'
import type { GoQuotaUsage } from '../state/go-quota'

function formatRate(n: number): string {
  return `${n.toFixed(1)}%`
}

export function GoQuotaPanel(props: { goQuota?: GoQuotaUsage | null; goQuotaError?: string | null; goQuotaStale?: boolean; goQuotaLoading?: boolean }): JSX.Element {
  const fallback = useGoQuota()
  const goQuota = props.goQuota !== undefined ? props.goQuota : fallback.usage
  const goQuotaError = props.goQuotaError !== undefined ? props.goQuotaError : fallback.error
  const goQuotaStale = props.goQuotaStale !== undefined ? props.goQuotaStale : fallback.stale
  const loading = props.goQuotaLoading !== undefined ? props.goQuotaLoading : fallback.loading

  if (loading && !goQuota) {
    return <div style={{ padding: '8px 2px', fontSize: 11, opacity: 0.65 }}>加载中…</div>
  }
  if (goQuotaError && !goQuota) {
    return (
      <div style={{ padding: '8px 2px' }}>
        <div style={{ fontSize: 11, color: '#a33' }}>{goQuotaError}</div>
        <div style={{ marginTop: 4, fontSize: 9.5, opacity: 0.7 }}>请在设置页“Go 套餐 Key”中配置</div>
      </div>
    )
  }
  if (!goQuota) return <div style={{ padding: '8px 2px', fontSize: 11, opacity: 0.65 }}>暂无数据</div>

  const tiles = [
    { k: '5小时', v: goQuota.rolling.percent, sub: '限额 $12', color: 'var(--idle, #6fba2c)' },
    { k: '一周', v: goQuota.weekly.percent, sub: '限额 $30', color: 'var(--peak, #e59266)' },
    { k: '一月', v: goQuota.monthly.percent, sub: '限额 $60', color: 'var(--now, #f7cd67)' },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 6 }}>
        {tiles.map((t) => (
          <div
            key={t.k}
            style={{
              borderRadius: 16,
              padding: '10px 4px 8px',
              textAlign: 'center',
              border: '1.5px solid color-mix(in oklch, currentColor 18%, transparent)',
              background: 'color-mix(in oklch, currentColor 8%, transparent)',
              color: t.color as any,
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', opacity: 0.9 }}>{t.k}</div>
            <div style={{ fontSize: 16, fontWeight: 900, lineHeight: 1.3, marginTop: 2 }}>{formatRate(t.v)}</div>
            <div style={{ fontSize: 8, fontWeight: 700, opacity: 0.8, marginTop: 4 }}>{t.sub}</div>
          </div>
        ))}
      </div>
      {goQuotaStale && <div style={{ fontSize: 9.5, color: '#a33', marginTop: 6 }}>缓存值 · {goQuotaError ?? ''}</div>}
    </div>
  )
}
