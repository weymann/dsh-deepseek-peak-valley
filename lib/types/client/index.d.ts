/**
 * dsh-deepseek-peak-valley · client 插件入口（browser 半）。
 *
 * 对齐 003-接口契约 §3：
 * - `inject = ['slots']`（等待 slots 等必需 service，fiber pending 可诊断）；
 * - `apply(ctx)` 注册「sidebar.footer.action」小组件与「settings.section」设置入口；
 * - 全部 controller / listener / 样式 / DOM 随 client fiber dispose 清理；
 * - per-session 双态状态按 SessionId 分桶。
 *
 * 构建产物由 tsdown 包装为 window.__ModuleLoader__.load({ id, factory })；
 * 所有 @deepseek-ai/* 导入均为类型导入（编译期擦除）或模块表平台行。
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
/** 必需服务：slot 注册表（其余依赖都经 slots 进入）。 */
export declare const inject: string[];
/**
 * Client 插件体：侧边栏小组件 + 设置入口。
 * @param ctx - client 根上下文。
 */
export declare function apply(ctx: ClientContext): void;
