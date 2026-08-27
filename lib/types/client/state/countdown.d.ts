/** 倒计时总时长（秒），与轮询间隔一致。 */
export declare const COUNTDOWN_SECONDS = 60;
interface CountdownState {
    remaining: number;
}
/** 订阅剩余秒数（归零时组件重渲染）。 */
export declare function useCountdown(): CountdownState;
/**
 * 启动全局倒计时（与插件生命周期绑定，由 client index 的 ctx.effect 调用）。
 * 返回清理函数。每秒递减，到 0 触发一次刷新并重置。
 */
export declare function startCountdown(): () => void;
export {};
