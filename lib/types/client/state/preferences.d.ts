/**
 * 小组件浏览器侧 · 插件偏好（设置页与侧边栏小组件共享）。
 *
 * 全局偏好（跨会话，localStorage 持久化）：
 * - enabled：启停开关（关闭时侧边栏小组件不渲染）
 * - styleId：所选风格（11 款之一）
 *
 * 写路径走本插件自己的偏好 store（003 契约：文案/当前值/写路径走自己的
 * inject face；纯 client 无后端，持久化落在浏览器 localStorage）。
 */
import { type StyleId } from '../../core/catalog';
/** 插件偏好。 */
export interface PluginPreferences {
    /** 启停开关。 */
    enabled: boolean;
    /** 所选风格编号。 */
    styleId: StyleId;
}
/** 读取当前偏好快照。 */
export declare function getPreferences(): PluginPreferences;
/** 更新偏好（部分字段；立即持久化并通知订阅者）。 */
export declare function setPreferences(patch: Partial<PluginPreferences>): void;
/** 订阅偏好变化（返回取消订阅）。 */
export declare function subscribePreferences(listener: () => void): () => void;
/** 组件内读取偏好。 */
export declare function usePreferences(): PluginPreferences;
