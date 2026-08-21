/**
 * 002-十款风格组件库 · 风格目录（类型与清单权威）。
 *
 * 严格对齐 docs/A/A-01-PRD/002-十款风格组件库/002-接口契约.md：
 * - §2 风格目录类型（StyleId / StyleSpec / StyleCatalog）
 * - §3 十款风格清单（规格）
 *
 * 本模块为纯 TS，零外部依赖。
 */
/** 风格编号：'01'…'10'。 */
export type StyleId = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
/** 单款风格规格。 */
export interface StyleSpec {
    id: StyleId;
    /** 中文名，如 '脉冲'。 */
    nameZh: string;
    /** 英文名，如 'Pulse'。 */
    nameEn: string;
    /** 设计稿英文标签，如 'DARK · NEON DOT · TECH'。 */
    enLabel: string;
    /** 风格标签，如 ['深色','发光','科技']。 */
    tags: string[];
    /** 风格描述。 */
    description: string;
    stage: {
        /** 展开 · 侧边栏 形态说明。 */
        expanded: string;
        /** 收起 · 图标栏 形态说明。 */
        collapsed: string;
    };
    /** 语义强调色：高峰暖色 / 空闲冷色（全系列统一语义，色值随风格落地）。 */
    semantic: {
        peak: 'warm';
        idle: 'cool';
    };
}
/** 风格目录：全部 10 款。 */
export type StyleCatalog = Record<StyleId, StyleSpec>;
/** 十款风格清单（002-接口契约 §3，规格逐项）。 */
export declare const STYLE_CATALOG: StyleCatalog;
/** 全部风格编号（目录顺序）。 */
export declare const STYLE_IDS: readonly StyleId[];
/** 默认风格。 */
export declare const DEFAULT_STYLE_ID: StyleId;
