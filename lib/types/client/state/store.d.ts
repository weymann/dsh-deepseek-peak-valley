/** 可观察快照源（与 DSH runtime 的 ObservableSnapshot 同构）。 */
export interface ReadableStore<T> {
    /** 返回当前快照（更新间保持稳定引用）。 */
    getSnapshot(): T;
    /** 订阅快照替换；返回取消订阅。 */
    subscribe(listener: () => void): () => void;
}
/** 订阅 store 的 React hook（组件在快照替换时重渲染）。 */
export declare function useStore<T>(store: ReadableStore<T>): T;
/** 创建一个内部可变、外部只读的快照 store。 */
export declare function createStore<T>(init: () => T): ReadableStore<T> & {
    /** 整体替换状态（更新间快照引用稳定）。 */
    set(next: T): void;
};
/** 安全 localStorage 读取（无 localStorage / 损坏 JSON / 类型不符 → 返回缺省）。 */
export declare function readStorage<T>(key: string, fallback: T): T;
/** 安全 localStorage 写入（无 localStorage / 序列化失败 → 忽略）。 */
export declare function writeStorage(key: string, value: unknown): void;
