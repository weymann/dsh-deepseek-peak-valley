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
export type StyleId = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10'

/** 单款风格规格。 */
export interface StyleSpec {
  id: StyleId
  /** 中文名，如 '脉冲'。 */
  nameZh: string
  /** 英文名，如 'Pulse'。 */
  nameEn: string
  /** 设计稿英文标签，如 'DARK · NEON DOT · TECH'。 */
  enLabel: string
  /** 风格标签，如 ['深色','发光','科技']。 */
  tags: string[]
  /** 风格描述。 */
  description: string
  stage: {
    /** 展开 · 侧边栏 形态说明。 */
    expanded: string
    /** 收起 · 图标栏 形态说明。 */
    collapsed: string
  }
  /** 语义强调色：高峰暖色 / 空闲冷色（全系列统一语义，色值随风格落地）。 */
  semantic: { peak: 'warm'; idle: 'cool' }
}

/** 风格目录：全部 10 款。 */
export type StyleCatalog = Record<StyleId, StyleSpec>

/** 十款风格清单（002-接口契约 §3，规格逐项）。 */
export const STYLE_CATALOG: StyleCatalog = {
  '01': {
    id: '01',
    nameZh: '脉冲',
    nameEn: 'Pulse',
    enLabel: 'DARK · NEON DOT · TECH',
    tags: ['深色', '发光', '科技'],
    description: '深色开发环境友好：当前时段以发光圆点脉冲提示，适合常驻侧边栏的暗色主题。',
    stage: {
      expanded: '深色科技卡片：徽章为发光圆点（2.4s 脉冲）+ 高峰/空闲；价格表当前列浅色底 + 光标列高亮条 .hx。',
      collapsed: '42×54 深色圆角卡，9px 发光圆点（脉冲）+ 等宽「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '02': {
    id: '02',
    nameZh: '留白',
    nameEn: 'Minimal',
    enLabel: 'LIGHT · HAIRLINE · RESTRAINED',
    tags: ['浅色', '极简', '细线'],
    description: '克制的浅色卡片：一个彩色圆点 + 一段细时间轴，数字即信息，几乎零装饰。',
    stage: {
      expanded: '白色克制卡片：彩色圆点徽章 + 细时间轴，几乎零装饰；当前列极浅色底。',
      collapsed: '42×54 白卡，9px 圆点（柔光晕）+ 「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '03': {
    id: '03',
    nameZh: '票据',
    nameEn: 'Receipt',
    enLabel: 'PAPER · MONO · STAMP',
    tags: ['浅色', '纸质', '盖章'],
    description: '收据 / 票根质感：等宽对账排版，当前时段像一枚斜盖的印戳，附锯齿撕线与条形码。',
    stage: {
      expanded: '票根质感：标题「DeepSeek 分时段计费」+ 副题「凭条 · 北京时间」；当前时段为斜盖印戳；锯齿撕线 .w-tear；页脚含条形码 .bcode；价格表以虚线/点线分隔。',
      collapsed: '42×54 票根，上下锯齿缘，圆点 + 等宽「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '04': {
    id: '04',
    nameZh: '时刻线',
    nameEn: 'Metro',
    enLabel: 'ROUTE MAP · 24H LINE · TRAIN',
    tags: ['浅色', '地铁', '24h'],
    description: '把一整天画成一条地铁线路：高峰是橙色区间，站点点出 09/12/14/18 时刻，当前位置是一列「列车」。',
    stage: {
      expanded: '地铁线路图：24h 线路（高峰橙色区间 / 空闲底色），站点点出 00/09/12/14/18/24，「列车」随时段移动（高峰 43.75% / 空闲 90%），下方图例；当前时段数字加粗。',
      collapsed: '垂直 mini 线路（16×44），列车位置随时段移动（高峰 37.5% / 空闲 84%）+ 「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '05': {
    id: '05',
    nameZh: '胶囊',
    nameEn: 'Pills',
    enLabel: 'SOFT · ROUNDED · FRIENDLY',
    tags: ['浅色', '圆润', '亲和'],
    description: '大圆角 + 柔和马卡龙色块：价格是彩色小胶囊，时段是圆点徽章，整体亲和轻松。',
    stage: {
      expanded: '大圆角卡片：价格数值为彩色小胶囊（高峰暖 / 空闲冷底色），时段为圆点徽章；当前时段列底部内阴影标记。',
      collapsed: '横向 999px 胶囊 pill（底色 = 当前时段色 13%），圆点 + 文字「高峰 / 空闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '06': {
    id: '06',
    nameZh: '终端',
    nameEn: 'Terminal',
    enLabel: 'CLI · LOG LINES · MONO',
    tags: ['深色', 'CLI', '日志'],
    description: '像一条终端输出：`$ ds rate --now` 查询、日志式颜色状态行、等宽价格对齐，开发者味十足。',
    stage: {
      expanded: '终端窗：标题栏「deepseek-rate · v4」+ 三个圆点；正文日志式：$ ds rate --now → ▸ 当前：高峰/空闲（强调色）→ 09:00–12:00 · 14:00–18:00；价格表为等宽 ttbl（flash / pro 两组，idle/peak 双列，当前时段列加粗）。',
      collapsed: '42×54 终端卡，光标 ▍ + 等宽「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '07': {
    id: '07',
    nameZh: '粗野',
    nameEn: 'Brutalist',
    enLabel: 'HARD EDGE · BLOCKY · BOLD',
    tags: ['浅色', '硬边', '高对比'],
    description: '2px 黑边 + 硬投影 + 反色块：当前时段是一个纯色黑块，当前价格列整列反白，醒目直接。',
    stage: {
      expanded: '2px 黑边 + 5px 硬投影 + 直角；时段徽章为纯色反色块（黑底白字）；当前价格列整列反白；等宽大写字标。',
      collapsed: '44×52 黑框直角卡 + 4px 硬投影，20×20 反色块「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '08': {
    id: '08',
    nameZh: '玻璃',
    nameEn: 'Glass',
    enLabel: 'FROSTED · TRANSLUCENT · GLOW',
    tags: ['深色', '毛玻璃', '通透'],
    description: '半透明毛玻璃浮层悬浮在渐变底色上，时段色以光晕呈现，通透而现代。',
    stage: {
      expanded: '半透明毛玻璃浮层（backdrop-filter: blur）+ 渐变底色上两枚光晕 blob；时段色以光晕呈现（圆点 + 光标发光）；当前列半透明白底。',
      collapsed: '44×54 毛玻璃圆角卡，发光圆点 + 「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '09': {
    id: '09',
    nameZh: '昼夜',
    nameEn: 'DayNight',
    enLabel: 'SUN / MOON · TIME-OF-DAY',
    tags: ['明暗', '太阳月亮', '直观'],
    description: '整张卡片随时间变色：高峰是白昼、空闲是夜空，太阳 / 月亮图标直接告诉你「现在是什么时段」。',
    stage: {
      expanded: '整卡随时段变色——高峰白昼底 / 空闲夜空底（0.35s 过渡）；头部太阳/月亮图标切换 + 大字「高峰时段 / 空闲时段」；时间轴暖段=高峰、冷段=空闲。',
      collapsed: '42×56 明暗自适应卡，太阳/月亮图标 + 「峰/闲」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
  '10': {
    id: '10',
    nameZh: '编辑',
    nameEn: 'Editorial',
    enLabel: 'SERIF · HAIRLINE · MAGAZINE',
    tags: ['浅色', '衬线', '杂志'],
    description: '杂志编辑风：衬线标题 + 等宽数字 + 细分割线，报价像一份精致的期刊专栏，优雅克制。',
    stage: {
      expanded: '杂志专栏：眉题「DeepSeek · 报价」+ 衬线大标题「分时段计费」；等宽数字 + 细分割线；当前列浅色底；页脚含「高峰 = 空闲 × 2」。',
      collapsed: '42×54 细边框卡，衬线「峰/闲」大字 + 等宽小标「NOW」。',
    },
    semantic: { peak: 'warm', idle: 'cool' },
  },
}

/** 全部风格编号（目录顺序）。 */
export const STYLE_IDS: readonly StyleId[] = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
]

/** 默认风格。 */
export const DEFAULT_STYLE_ID: StyleId = '01'
