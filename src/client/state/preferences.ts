/**
 * 小组件浏览器侧 · 插件偏好（设置页与侧边栏小组件共享）。
 *
 * 全局偏好（跨会话，localStorage 持久化）：
 * - enabled：启停开关（关闭时侧边栏小组件不渲染）
 * - styleId：所选风格（十款之一）
 *
 * 写路径走本插件自己的偏好 store（003 契约：文案/当前值/写路径走自己的
 * inject face；纯 client 无后端，持久化落在浏览器 localStorage）。
 */
import { DEFAULT_STYLE_ID, type StyleId } from '../../core/catalog'
import { createStore, readStorage, useStore, writeStorage } from './store'

/** 插件偏好。 */
export interface PluginPreferences {
  /** 启停开关。 */
  enabled: boolean
  /** 所选风格编号。 */
  styleId: StyleId
}

/** localStorage 键（插件唯一前缀，避免与宿主其它存储冲突）。 */
const STORAGE_KEY = 'dsh-deepseek-peak-valley:preferences'

const DEFAULTS: PluginPreferences = {
  enabled: true,
  styleId: DEFAULT_STYLE_ID,
}

function isStyleId(value: unknown): value is StyleId {
  return typeof value === 'string' && /^0[1-9]|10$/.test(value)
}

/** 从 localStorage 载入偏好（缺省 + 字段校验）。 */
function loadPreferences(): PluginPreferences {
  const raw = readStorage<Partial<PluginPreferences>>(STORAGE_KEY, {})
  return {
    enabled: typeof raw.enabled === 'boolean' ? raw.enabled : DEFAULTS.enabled,
    styleId: isStyleId(raw.styleId) ? raw.styleId : DEFAULTS.styleId,
  }
}

const preferences = createStore<PluginPreferences>(loadPreferences)

/** 读取当前偏好快照。 */
export function getPreferences(): PluginPreferences {
  return preferences.getSnapshot()
}

/** 更新偏好（部分字段；立即持久化并通知订阅者）。 */
export function setPreferences(patch: Partial<PluginPreferences>): void {
  const next = { ...preferences.getSnapshot(), ...patch }
  preferences.set(next)
  writeStorage(STORAGE_KEY, next)
}

/** 订阅偏好变化（返回取消订阅）。 */
export function subscribePreferences(listener: () => void): () => void {
  return preferences.subscribe(listener)
}

/** 组件内读取偏好。 */
export function usePreferences(): PluginPreferences {
  return useStore(preferences)
}
