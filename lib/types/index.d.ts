export declare const inject: string[];
/** 稳定错误码（client 侧映射为本地化文案；新增码需同步 locale 字典）。 */
export type ErrorCode = 'go-no-key' | 'go-key-invalid' | 'go-not-subscribed' | 'go-malformed' | 'deepseek-no-key' | 'deepseek-key-invalid' | 'deepseek-malformed' | 'bad-json' | 'unknown';
export declare function apply(ctx: any, config: any): () => void;
