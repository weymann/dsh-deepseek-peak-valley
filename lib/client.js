window.__ModuleLoader__.load({
	id: "dsh-deepseek-peak-valley",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/core/catalog.ts
		/** 十款风格清单（002-接口契约 §3，规格逐项）。 */
		const STYLE_CATALOG = {
			"01": {
				id: "01",
				nameZh: "脉冲",
				nameEn: "Pulse",
				enLabel: "DARK · NEON DOT · TECH",
				tags: [
					"深色",
					"发光",
					"科技"
				],
				description: "深色开发环境友好：当前时段以发光圆点脉冲提示，适合常驻侧边栏的暗色主题。",
				stage: {
					expanded: "深色科技卡片：徽章为发光圆点（2.4s 脉冲）+ 高峰/空闲；价格表当前列浅色底 + 光标列高亮条 .hx。",
					collapsed: "42×54 深色圆角卡，9px 发光圆点（脉冲）+ 等宽「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"02": {
				id: "02",
				nameZh: "留白",
				nameEn: "Minimal",
				enLabel: "LIGHT · HAIRLINE · RESTRAINED",
				tags: [
					"浅色",
					"极简",
					"细线"
				],
				description: "克制的浅色卡片：一个彩色圆点 + 一段细时间轴，数字即信息，几乎零装饰。",
				stage: {
					expanded: "白色克制卡片：彩色圆点徽章 + 细时间轴，几乎零装饰；当前列极浅色底。",
					collapsed: "42×54 白卡，9px 圆点（柔光晕）+ 「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"03": {
				id: "03",
				nameZh: "票据",
				nameEn: "Receipt",
				enLabel: "PAPER · MONO · STAMP",
				tags: [
					"浅色",
					"纸质",
					"盖章"
				],
				description: "收据 / 票根质感：等宽对账排版，当前时段像一枚斜盖的印戳，附锯齿撕线与条形码。",
				stage: {
					expanded: "票根质感：标题「DeepSeek 分时段计费」+ 副题「凭条 · 北京时间」；当前时段为斜盖印戳；锯齿撕线 .w-tear；页脚含条形码 .bcode；价格表以虚线/点线分隔。",
					collapsed: "42×54 票根，上下锯齿缘，圆点 + 等宽「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"04": {
				id: "04",
				nameZh: "时刻线",
				nameEn: "Metro",
				enLabel: "ROUTE MAP · 24H LINE · TRAIN",
				tags: [
					"浅色",
					"地铁",
					"24h"
				],
				description: "把一整天画成一条地铁线路：高峰是橙色区间，站点点出 09/12/14/18 时刻，当前位置是一列「列车」。",
				stage: {
					expanded: "地铁线路图：24h 线路（高峰橙色区间 / 空闲底色），站点点出 00/09/12/14/18/24，「列车」随时段移动（高峰 43.75% / 空闲 90%），下方图例；当前时段数字加粗。",
					collapsed: "垂直 mini 线路（16×44），列车位置随时段移动（高峰 37.5% / 空闲 84%）+ 「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"05": {
				id: "05",
				nameZh: "胶囊",
				nameEn: "Pills",
				enLabel: "SOFT · ROUNDED · FRIENDLY",
				tags: [
					"浅色",
					"圆润",
					"亲和"
				],
				description: "大圆角 + 柔和马卡龙色块：价格是彩色小胶囊，时段是圆点徽章，整体亲和轻松。",
				stage: {
					expanded: "大圆角卡片：价格数值为彩色小胶囊（高峰暖 / 空闲冷底色），时段为圆点徽章；当前时段列底部内阴影标记。",
					collapsed: "横向 999px 胶囊 pill（底色 = 当前时段色 13%），圆点 + 文字「高峰 / 空闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"06": {
				id: "06",
				nameZh: "终端",
				nameEn: "Terminal",
				enLabel: "CLI · LOG LINES · MONO",
				tags: [
					"深色",
					"CLI",
					"日志"
				],
				description: "像一条终端输出：`$ ds rate --now` 查询、日志式颜色状态行、等宽价格对齐，开发者味十足。",
				stage: {
					expanded: "终端窗：标题栏「deepseek-rate · v4」+ 三个圆点；正文日志式：$ ds rate --now → ▸ 当前：高峰/空闲（强调色）→ 09:00–12:00 · 14:00–18:00；价格表为等宽 ttbl（flash / pro 两组，idle/peak 双列，当前时段列加粗）。",
					collapsed: "42×54 终端卡，光标 ▍ + 等宽「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"07": {
				id: "07",
				nameZh: "粗野",
				nameEn: "Brutalist",
				enLabel: "HARD EDGE · BLOCKY · BOLD",
				tags: [
					"浅色",
					"硬边",
					"高对比"
				],
				description: "2px 黑边 + 硬投影 + 反色块：当前时段是一个纯色黑块，当前价格列整列反白，醒目直接。",
				stage: {
					expanded: "2px 黑边 + 5px 硬投影 + 直角；时段徽章为纯色反色块（黑底白字）；当前价格列整列反白；等宽大写字标。",
					collapsed: "44×52 黑框直角卡 + 4px 硬投影，20×20 反色块「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"08": {
				id: "08",
				nameZh: "玻璃",
				nameEn: "Glass",
				enLabel: "FROSTED · TRANSLUCENT · GLOW",
				tags: [
					"深色",
					"毛玻璃",
					"通透"
				],
				description: "半透明毛玻璃浮层悬浮在渐变底色上，时段色以光晕呈现，通透而现代。",
				stage: {
					expanded: "半透明毛玻璃浮层（backdrop-filter: blur）+ 渐变底色上两枚光晕 blob；时段色以光晕呈现（圆点 + 光标发光）；当前列半透明白底。",
					collapsed: "44×54 毛玻璃圆角卡，发光圆点 + 「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"09": {
				id: "09",
				nameZh: "昼夜",
				nameEn: "DayNight",
				enLabel: "SUN / MOON · TIME-OF-DAY",
				tags: [
					"明暗",
					"太阳月亮",
					"直观"
				],
				description: "整张卡片随时间变色：高峰是白昼、空闲是夜空，太阳 / 月亮图标直接告诉你「现在是什么时段」。",
				stage: {
					expanded: "整卡随时段变色——高峰白昼底 / 空闲夜空底（0.35s 过渡）；头部太阳/月亮图标切换 + 大字「高峰时段 / 空闲时段」；时间轴暖段=高峰、冷段=空闲。",
					collapsed: "42×56 明暗自适应卡，太阳/月亮图标 + 「峰/闲」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"10": {
				id: "10",
				nameZh: "编辑",
				nameEn: "Editorial",
				enLabel: "SERIF · HAIRLINE · MAGAZINE",
				tags: [
					"浅色",
					"衬线",
					"杂志"
				],
				description: "杂志编辑风：衬线标题 + 等宽数字 + 细分割线，报价像一份精致的期刊专栏，优雅克制。",
				stage: {
					expanded: "杂志专栏：眉题「DeepSeek · 报价」+ 衬线大标题「分时段计费」；等宽数字 + 细分割线；当前列浅色底；页脚含「高峰 = 空闲 × 2」。",
					collapsed: "42×54 细边框卡，衬线「峰/闲」大字 + 等宽小标「NOW」。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			},
			"11": {
				id: "11",
				nameZh: "无人岛",
				nameEn: "Animal Island",
				enLabel: "ACNH · DUAL-VIEW · LEAF",
				tags: [
					"双视图",
					"暖棕描边",
					"动森"
				],
				description: "复刻《动物森友会》UI 语言：粗暖棕描边、厚纸板面板、NookPhone 应用格。支持双视图——DeepSeek 与 Go套餐用量平滑切换；收起态跟随视图与时段变化。",
				stage: {
					expanded: "动森面板：双视图标签页（DeepSeek / Go套餐用量），左边切换按钮；计费视图含时间轴 + 余额查询；用量视图含 3 个旋转贴纸 tile（5小时/一周/一月·百分比+限额 $12/$30/$60）+ 明细；高峰 = 红色闪烁叶子 + ×2 标签；虚线圆角内嵌面板。",
					collapsed: "42×54 暖棕圆角卡：计费视图 = 叶子 + 峰/闲（高峰红色脉冲）；用量视图 = 金币图标 + 费用；跟随当前视图实时切换。"
				},
				semantic: {
					peak: "warm",
					idle: "cool"
				}
			}
		};
		/** 全部风格编号（目录顺序）。 */
		const STYLE_IDS = [
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11"
		];
		/** 双视图风格集合（支持 分时段计费 / 当前会话用量 切换）。 */
		const DUAL_VIEW_STYLES = /* @__PURE__ */ new Set(["11"]);
		/** 判断某风格是否支持双视图。 */
		function isDualViewStyle(id) {
			return DUAL_VIEW_STYLES.has(id);
		}
		//#endregion
		//#region src/core/types.ts
		/** 常量：价格表（001-接口契约 §2 权威数值）。 */
		const PRICE_TABLE = {
			"V4-Flash": {
				"输入·缓存命中": [.05, .1],
				"输入·缓存未命中": [1.5, 3],
				"输出": [4.5, 9]
			},
			"V4-Pro": {
				"输入·缓存命中": [.15, .3],
				"输入·缓存未命中": [4.5, 9],
				"输出": [13.5, 27]
			}
		};
		/** 常量：时段规则（001-接口契约 §1）。 */
		const PERIOD_RULE = {
			timezone: "Asia/Shanghai",
			peakWindows: [{
				start: "09:00",
				end: "12:00"
			}, {
				start: "14:00",
				end: "18:00"
			}]
		};
		/** 常量：时间轴 5 段（001-接口契约 §3）。 */
		const TIMELINE_SEGMENTS = [
			{
				period: "idle",
				fromMinutes: 0,
				toMinutes: 540,
				width: "37.5%"
			},
			{
				period: "peak",
				fromMinutes: 540,
				toMinutes: 720,
				width: "12.5%"
			},
			{
				period: "idle",
				fromMinutes: 720,
				toMinutes: 840,
				width: "8.34%"
			},
			{
				period: "peak",
				fromMinutes: 840,
				toMinutes: 1080,
				width: "16.66%"
			},
			{
				period: "idle",
				fromMinutes: 1080,
				toMinutes: 1440,
				width: "25%"
			}
		];
		/**
		* 常量：当前时段光标位置。
		* ⚠️ 设计稿演示值，仅作兜底；接入后光标按实时时钟计算
		* （core/period.ts `cursorPercentAt`，001-接口契约 §3），不得写死。
		*/
		const TIMELINE_CURSOR = {
			peak: "43.75%",
			idle: "90%"
		};
		/**
		* 演示用量数据（IT之家公开数据推算）。
		* ⚠️ 接入后以真实 API 为准，此处仅作界面演示占位。
		*/
		const DEMO_USAGE = {
			inputTokens: 1200,
			outputTokens: 3400,
			cacheHit: 800,
			cacheMiss: 400,
			cacheHitRate: 66.7,
			estimatedCost: .42,
			costs: {
				"V4-Flash": {
					idle: .1,
					peak: .2
				},
				"V4-Pro": {
					idle: .32,
					peak: .64
				}
			}
		};
		/** 格式化费用（¥ + 最多两位小数，省略末尾零）。 */
		function formatCost(yuan) {
			if (yuan < .01) return `¥${yuan.toFixed(4)}`;
			if (yuan < 1) return `¥${yuan.toFixed(2)}`;
			return `¥${yuan.toFixed(2)}`;
		}
		/** 格式化百分比（0–100 → 66.7%）。 */
		function formatRate(rate) {
			return `${rate.toFixed(1)}%`;
		}
		//#endregion
		//#region src/core/period.ts
		/**
		* 001-核心引擎 · 时段判定（纯 TS，零依赖）。
		*
		* 按北京时间（Asia/Shanghai）自动判定当前时段：
		* - 高峰窗口 09:00–12:00、14:00–18:00（闭区间起始、开区间结束 → 09:00 为 peak，
		*   12:00 / 18:00 为 idle）；
		* - 空闲 = 其余全部时段。
		*
		* 对齐 001-测试-验收用例 用例 1：
		*   09:00 / 10:00 / 16:00 → peak；12:00 / 18:00 / 00:00 → idle。
		*/
		/** 北京时区标识。 */
		const BEIJING_TIMEZONE = "Asia/Shanghai";
		/** 一天的分钟数。 */
		const MINUTES_PER_DAY = 1440;
		/** 把 "HH:mm" 解析为当日分钟数（00:00 = 0）。 */
		function minutesOf(hhmm) {
			const [hour = 0, minute = 0] = hhmm.split(":").map((part) => Number.parseInt(part, 10));
			const h = Number.isFinite(hour) ? hour : 0;
			const m = Number.isFinite(minute) ? minute : 0;
			return Math.min(Math.max(h * 60 + m, 0), 1439);
		}
		/**
		* 取给定时刻的北京当日分钟数。
		* 用 Intl 按 Asia/Shanghai 归一化，避免依赖本机时区。
		*/
		function beijingMinutes(date) {
			const parts = new Intl.DateTimeFormat("en-US", {
				timeZone: BEIJING_TIMEZONE,
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			}).formatToParts(date);
			const map = new Map(parts.map((part) => [part.type, part.value]));
			let hour = Number.parseInt(map.get("hour") ?? "0", 10);
			const minute = Number.parseInt(map.get("minute") ?? "0", 10);
			if (hour === 24) hour = 0;
			return hour * 60 + minute;
		}
		/** 取北京时区周几（0=周日 … 6=周六）。 */
		function beijingWeekday(date = /* @__PURE__ */ new Date()) {
			const beijingStr = date.toLocaleString("en-US", { timeZone: BEIJING_TIMEZONE });
			return new Date(beijingStr).getDay();
		}
		/** 是否为周末（周六/周日全天空闲）。 */
		function isWeekend(date = /* @__PURE__ */ new Date()) {
			const d = beijingWeekday(date);
			return d === 0 || d === 6;
		}
		/**
		* 判定给定时刻（按北京时区）所处的时段。
		* 周六/周日全天空闲，仅周一到周五按峰时窗口判定。
		* @param date 待判定的时刻；缺省为当前时刻。
		* @returns 'peak' | 'idle'
		*/
		function periodAt(date = /* @__PURE__ */ new Date()) {
			if (isWeekend(date)) return "idle";
			const minutes = beijingMinutes(date);
			for (const window of PERIOD_RULE.peakWindows) if (minutes >= minutesOf(window.start) && minutes < minutesOf(window.end)) return "peak";
			return "idle";
		}
		/** 当前北京时段（便捷函数）。 */
		function currentPeriod(now = /* @__PURE__ */ new Date()) {
			return periodAt(now);
		}
		/**
		* 取当前日期对应的时间轴分段（周末全天空闲，仅工作日含高峰段）。
		*/
		function timelineSegmentsAt(date = /* @__PURE__ */ new Date()) {
			if (isWeekend(date)) return TIMELINE_SEGMENTS.map((s) => ({
				...s,
				period: "idle"
			}));
			return TIMELINE_SEGMENTS;
		}
		/**
		* 当前时段光标百分比（001-接口契约 §3：left = 北京当日分钟数 / 1440 × 100%）。
		* 纯函数、按真实时钟实时计算；演示期手动覆盖时段不影响本值。
		*/
		function cursorPercentAt(date = /* @__PURE__ */ new Date()) {
			return beijingMinutes(date) / MINUTES_PER_DAY * 100;
		}
		//#endregion
		//#region src/client/state/store.ts
		/**
		* 小组件浏览器侧 · 最小响应式 store（自包含，零运行时依赖）。
		*
		* 提供 React 可订阅的可观察快照源（getSnapshot + subscribe，适配
		* useSyncExternalStore），以及模块级单例封装。
		*/
		/** 订阅 store 的 React hook（组件在快照替换时重渲染）。 */
		function useStore(store) {
			return (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot);
		}
		/** 创建一个内部可变、外部只读的快照 store。 */
		function createStore(init) {
			let state = init();
			const listeners = /* @__PURE__ */ new Set();
			return {
				getSnapshot: () => state,
				subscribe(listener) {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				set(next) {
					state = next;
					for (const listener of listeners) listener();
				}
			};
		}
		/** 安全 localStorage 读取（无 localStorage / 损坏 JSON / 类型不符 → 返回缺省）。 */
		function readStorage(key, fallback) {
			try {
				if (typeof localStorage === "undefined") return fallback;
				const raw = localStorage.getItem(key);
				if (raw === null) return fallback;
				return JSON.parse(raw);
			} catch {
				return fallback;
			}
		}
		/** 安全 localStorage 写入（无 localStorage / 序列化失败 → 忽略）。 */
		function writeStorage(key, value) {
			try {
				if (typeof localStorage === "undefined") return;
				localStorage.setItem(key, JSON.stringify(value));
			} catch {}
		}
		//#endregion
		//#region src/client/state/period.ts
		/**
		* 小组件浏览器侧 · 时段 store（自动判定 + 演示手动覆盖）。
		*
		* - 接入后按当前北京时间自动判定 `body[data-period]`（peak / idle）；
		* - 演示期提供手动切换（override），刷新后回到自动判定（001 用例 10）；
		* - 全插件共享单一事实源：多挂载点 / 十款风格同步响应，无独立时段状态。
		*
		* 定时器随 fiber 生命周期（apply 中 ctx.effect 启动/清理）。
		*/
		/**
		* 定时轮询粒度（毫秒）。
		* 光标随时钟连续移动（001 用例 6），故缩短到 ≤5s 且每次 tick 都刷新快照；
		* 跨时段边界（09/12/14/18 点）最迟此间隔内刷新。
		*/
		const TICK_MS = 5e3;
		function evaluate(override) {
			const auto = currentPeriod();
			return {
				period: override ?? auto,
				auto,
				override,
				cursorPercent: cursorPercentAt()
			};
		}
		const period = createStore(() => evaluate(null));
		let timer$3 = null;
		/** 启动自动刷新定时器（幂等；由 fiber 生命周期持有，dispose 时停止）。 */
		function startPeriodTimer() {
			if (timer$3 === null) timer$3 = setInterval(() => {
				const prev = period.getSnapshot();
				period.set(evaluate(prev.override));
			}, TICK_MS);
			return () => {
				if (timer$3 !== null) {
					clearInterval(timer$3);
					timer$3 = null;
				}
			};
		}
		/** 演示期手动覆盖时段；null 清除覆盖回到自动判定。 */
		function setPeriodOverride(override) {
			period.set(evaluate(override));
		}
		/** 组件内读取生效时段快照。 */
		function usePeriod() {
			return useStore(period);
		}
		//#endregion
		//#region src/client/state/preferences.ts
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
		/** localStorage 键（插件唯一前缀，避免与宿主其它存储冲突）。 */
		const STORAGE_KEY = "dsh-deepseek-peak-valley:preferences";
		const DEFAULTS = {
			enabled: true,
			styleId: "01"
		};
		function isStyleId(value) {
			return typeof value === "string" && /^(?:0[1-9]|1[01])$/.test(value);
		}
		/** 从 localStorage 载入偏好（缺省 + 字段校验）。 */
		function loadPreferences() {
			const raw = readStorage(STORAGE_KEY, {});
			return {
				enabled: typeof raw.enabled === "boolean" ? raw.enabled : DEFAULTS.enabled,
				styleId: isStyleId(raw.styleId) ? raw.styleId : DEFAULTS.styleId
			};
		}
		const preferences = createStore(loadPreferences);
		/** 更新偏好（部分字段；立即持久化并通知订阅者）。 */
		function setPreferences(patch) {
			const next = {
				...preferences.getSnapshot(),
				...patch
			};
			preferences.set(next);
			writeStorage(STORAGE_KEY, next);
		}
		/** 组件内读取偏好。 */
		function usePreferences() {
			return useStore(preferences);
		}
		//#endregion
		//#region src/client/state/usage.ts
		/**
		* 由 token-meter 投影计算单模型 · 单时段费用（元）。
		* 高峰价 = 空闲 × 2（PRICE_TABLE 权威数值）。
		* 输入费用 = (缓存未命中 + 缓存命中) × 输入单价；输出费用 = 输出 tokens × 输出单价。
		*/
		function estimateCostForModel(model, proj, period) {
			const priceIdx = period === "peak" ? 1 : 0;
			const table = PRICE_TABLE[model];
			return proj.uncachedInputTokens / 1e6 * table["输入·缓存未命中"][priceIdx] + proj.cacheReadTokens / 1e6 * table["输入·缓存命中"][priceIdx] + proj.outputTokens / 1e6 * table["输出"][priceIdx];
		}
		/** 由 token-meter 投影计算两模型合计费用（元）。 */
		function estimateCost(proj, period) {
			return estimateCostForModel("V4-Flash", proj, period) + estimateCostForModel("V4-Pro", proj, period);
		}
		/** 由投影构造用量快照（输入 = 未命中 + 命中，输出 = 输出）。 */
		function projectionToUsage(proj, period) {
			const inputTokens = proj.uncachedInputTokens + proj.cacheReadTokens;
			const cacheHitRate = inputTokens > 0 ? proj.cacheReadTokens / inputTokens * 100 : 0;
			return {
				inputTokens,
				outputTokens: proj.outputTokens,
				cacheHit: proj.cacheReadTokens,
				cacheMiss: proj.uncachedInputTokens,
				cacheHitRate,
				estimatedCost: estimateCost(proj, period),
				costs: {
					"V4-Flash": {
						idle: estimateCostForModel("V4-Flash", proj, "idle"),
						peak: estimateCostForModel("V4-Flash", proj, "peak")
					},
					"V4-Pro": {
						idle: estimateCostForModel("V4-Pro", proj, "idle"),
						peak: estimateCostForModel("V4-Pro", proj, "peak")
					}
				}
			};
		}
		/** 初始快照：演示数据（尚未连接会话）。 */
		function initialState() {
			return {
				usage: DEMO_USAGE,
				real: false,
				sessionId: void 0
			};
		}
		const usageStore = createStore(initialState);
		/** 组件内读取用量快照。 */
		function useUsage() {
			return useStore(usageStore);
		}
		const bridge = {
			sessionId: void 0,
			unsubscribe: null,
			lastList: void 0
		};
		/** 推送一条新快照到 store（会话或投影变化时）。 */
		function pushSnapshot(sessionId, proj, period) {
			if (proj === void 0) {
				usageStore.set({
					usage: DEMO_USAGE,
					real: false,
					sessionId
				});
				return;
			}
			usageStore.set({
				usage: projectionToUsage(proj, period),
				real: true,
				sessionId
			});
		}
		/**
		* 把当前会话的 tokenUsage 投影桥接到本模块 store。
		* 由 apply(ctx) 在 fiber 生命周期内调用；返回 disposer。
		*/
		function startUsageBridge(ctx) {
			const listUnsubscribe = ctx.sessions.list.subscribe(() => {
				const list = ctx.sessions.list.getSnapshot();
				const current = list.current;
				bridge.lastList = list;
				if (current === bridge.sessionId) return;
				bridge.unsubscribe?.();
				bridge.unsubscribe = null;
				bridge.sessionId = current;
				if (current === void 0) {
					pushSnapshot(void 0, void 0, currentPeriod());
					return;
				}
				const binding = ctx.sessions.binding(current);
				if (!binding) {
					pushSnapshot(current, void 0, currentPeriod());
					return;
				}
				const face = binding.session.projections.faceOf("tokenUsage");
				pushSnapshot(current, face.getSnapshot(), currentPeriod());
				bridge.unsubscribe = face.subscribe(() => {
					pushSnapshot(current, face.getSnapshot(), currentPeriod());
				});
			});
			const list = ctx.sessions.list.getSnapshot();
			bridge.lastList = list;
			const current = list.current;
			if (current !== void 0) {
				const binding = ctx.sessions.binding(current);
				if (binding) {
					const face = binding.session.projections.faceOf("tokenUsage");
					pushSnapshot(current, face.getSnapshot(), currentPeriod());
					bridge.unsubscribe = face.subscribe(() => {
						pushSnapshot(current, face.getSnapshot(), currentPeriod());
					});
					bridge.sessionId = current;
				}
			}
			const refreshTimer = setInterval(() => {
				pushSnapshot(bridge.sessionId, readProjection(ctx), currentPeriod());
			}, 5e3);
			return () => {
				listUnsubscribe();
				bridge.unsubscribe?.();
				bridge.unsubscribe = null;
				clearInterval(refreshTimer);
			};
		}
		/** 读取当前会话的 tokenUsage 投影（无会话/绑定未就绪 → undefined）。 */
		function readProjection(ctx) {
			const current = bridge.sessionId ?? ctx.sessions.list.getSnapshot().current;
			if (current === void 0) return void 0;
			const binding = ctx.sessions.binding(current);
			if (!binding) return void 0;
			return binding.session.projections.faceOf("tokenUsage").getSnapshot();
		}
		//#endregion
		//#region src/client/state/go-quota.ts
		/**
		* Go 套餐用量 · 浏览器侧轮询 store（填充三贴纸）。
		*
		* 同源路由 GET /go-quota/usage 由 Node 半场代理官方接口，浏览器每 60s 轮询一次
		*（与 Node 侧 TTL 对齐）。不做弹窗，仅负责三条百分比的实时填充。
		*/
		function initial$1() {
			return {
				usage: null,
				ok: false,
				stale: false,
				error: null,
				errorCode: null,
				fetchedAt: null,
				loading: true
			};
		}
		const store$2 = createStore(initial$1);
		function useGoQuota() {
			return useStore(store$2);
		}
		async function fetchOnce$1() {
			try {
				const res = await fetch("/go-quota/usage", { cache: "no-store" });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				if (data?.ok && data?.usage) store$2.set({
					usage: data.usage,
					ok: true,
					stale: !!data.stale,
					error: data.error ?? null,
					errorCode: data.errorCode ?? null,
					fetchedAt: data.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
				else if (data?.usage && data?.stale) store$2.set({
					usage: data.usage,
					ok: true,
					stale: true,
					error: data.error ?? null,
					errorCode: data.errorCode ?? null,
					fetchedAt: data.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
				else store$2.set({
					usage: data?.usage ?? null,
					ok: false,
					stale: !!data?.stale,
					error: data?.error ?? null,
					errorCode: data?.errorCode ?? "unknown",
					fetchedAt: data?.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
			} catch (e) {
				const prev = store$2.getSnapshot();
				store$2.set({
					usage: prev.usage,
					ok: prev.usage ? true : false,
					stale: !!prev.usage,
					error: e?.message ?? String(e),
					errorCode: null,
					fetchedAt: prev.fetchedAt,
					loading: false
				});
			}
		}
		let timer$2 = null;
		function startGoQuotaPolling() {
			fetchOnce$1();
			timer$2 = window.setInterval(fetchOnce$1, 6e4);
			return () => {
				if (timer$2 !== null) clearInterval(timer$2);
				timer$2 = null;
			};
		}
		/** 立即重新拉取一次 Go 套餐用量（供倒计时归零时主动触发）。 */
		function refreshGoQuota() {
			return fetchOnce$1();
		}
		/** 工具：限额常量（用于 $x 换算，仅展示用） */
		const GO_LIMITS = {
			rolling: 12,
			weekly: 30,
			monthly: 60
		};
		function dollars(percent, limit) {
			return `$${(percent / 100 * limit).toFixed(1)}/$${limit}`;
		}
		//#endregion
		//#region src/client/state/deepseek-balance.ts
		/**
		* DeepSeek 余额 · 浏览器侧轮询 store（余额查询面板）。
		*
		* 同源路由 GET /deepseek/balance 由 Node 半场代理 https://api.deepseek.com/user/balance
		*/
		function initial() {
			return {
				data: null,
				ok: false,
				stale: false,
				error: null,
				errorCode: null,
				fetchedAt: null,
				loading: true
			};
		}
		const store$1 = createStore(initial);
		function useDeepseekBalance() {
			return useStore(store$1);
		}
		async function fetchOnce() {
			try {
				const res = await fetch("/deepseek/balance", { cache: "no-store" });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const data = await res.json();
				if (data?.ok && data?.data) store$1.set({
					data: data.data,
					ok: true,
					stale: !!data.stale,
					error: data.error ?? null,
					errorCode: data.errorCode ?? null,
					fetchedAt: data.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
				else if (data?.data && data?.stale) store$1.set({
					data: data.data,
					ok: true,
					stale: true,
					error: data.error ?? null,
					errorCode: data.errorCode ?? null,
					fetchedAt: data.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
				else store$1.set({
					data: data?.data ?? null,
					ok: false,
					stale: !!data?.stale,
					error: data?.error ?? null,
					errorCode: data?.errorCode ?? "unknown",
					fetchedAt: data?.fetchedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					loading: false
				});
			} catch (e) {
				const prev = store$1.getSnapshot();
				store$1.set({
					data: prev.data,
					ok: prev.data ? true : false,
					stale: !!prev.data,
					error: e?.message ?? String(e),
					errorCode: null,
					fetchedAt: prev.fetchedAt,
					loading: false
				});
			}
		}
		let timer$1 = null;
		function startDeepseekPolling() {
			fetchOnce();
			timer$1 = window.setInterval(fetchOnce, 6e4);
			return () => {
				if (timer$1 !== null) clearInterval(timer$1);
				timer$1 = null;
			};
		}
		function refreshDeepseek() {
			fetchOnce();
		}
		//#endregion
		//#region src/client/components/icons.tsx
		function iconProps(props) {
			return {
				viewBox: "0 0 16 16",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.6,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": true,
				...props
			};
		}
		/** chevron-right（价格表展开指示）。 */
		function ChevronIcon(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				...iconProps(props),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6 3l5 5-5 5" })
			});
		}
		/** 太阳（昼夜风格 · 高峰）。 */
		function SunIcon(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.8,
				strokeLinecap: "round",
				"aria-hidden": true,
				...props,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "4.5"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" })]
			});
		}
		/** 月亮（昼夜风格 · 空闲）。 */
		function MoonIcon(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.8,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": true,
				...props,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" })
			});
		}
		//#endregion
		//#region src/client/locale/index.ts
		/** 本插件占用的 locale 命名空间（唯一所有者）。 */
		const LOCALE_NS = "dsh-deepseek-peak-valley";
		/** 内置全部 locale 的完整字典（注册时双语齐备由类型强制）。 */
		const LOCALE_DICTS = {
			zh: {
				"plugin.aria": "DeepSeek 分时段计费小组件",
				"period.peak": "高峰",
				"period.idle": "空闲",
				"period.peakShort": "峰",
				"period.idleShort": "闲",
				"period.peakLong": "高峰时段",
				"period.idleLong": "空闲时段",
				"period.weekend": "周末全天空闲｜低谷",
				"period.rule": "高峰 09:00–12:00 · 14:00–18:00｜其余空闲",
				"period.dayNightWarmCool": "暖色段 = 高峰　冷色段 = 空闲",
				"item.inputCacheHit": "输入 · 缓存命中",
				"item.inputCacheMiss": "输入 · 缓存未命中",
				"item.output": "输出",
				"timeline.goUsageLoading": "Go 5h 用量 · 加载中…",
				"timeline.goUsageError": "Go 5h 用量 · {error}",
				"timeline.goUsageEmpty": "Go 5h 用量 · 暂无数据",
				"timeline.goUsage": "Go 5h 用量 {percent}%",
				"timeline.staleSuffix": " · 缓存值",
				"common.loading": "加载中…",
				"common.empty": "暂无数据",
				"common.stale": "缓存值",
				"common.live": "实时",
				"common.staleWithDetail": "缓存值 · {detail}",
				"common.balance": "余额查询",
				"common.deepseekBalance": "DeepSeek 余额",
				"common.goWeeklyQuota": "Go 周额度",
				"common.goMonthlyQuota": "Go 月额度",
				"common.unavailable": " · 不可用",
				"common.usageUnit": "元 / 百万 tokens · 北京时间",
				"common.refreshIn": "更新频率 · 剩 {seconds}s",
				"common.configureKeyHint": "请在设置页配置 Key 后刷新",
				"common.configureDeepseekKeyHint": "请在设置页“DeepSeek Key”中配置后刷新",
				"style.01": "脉冲",
				"style.02": "留白",
				"style.03": "票据",
				"style.04": "时刻线",
				"style.05": "胶囊",
				"style.06": "终端",
				"style.07": "粗野",
				"style.08": "玻璃",
				"style.09": "昼夜",
				"style.10": "编辑",
				"style.11": "无人岛",
				"skin.name": "DeepSeek & Go",
				"skin.receiptTitle": "DeepSeek 分时段计费",
				"skin.receiptSub": "凭条 · 北京时间",
				"skin.editorialEyebrow": "DeepSeek · 报价",
				"skin.editorialTitle": "分时段计费",
				"skin.editorialMeta": "09:00–12:00 · 14:00–18:00 高峰（北京时间）",
				"skin.terminalNow": "当前：{period}",
				"skin.terminalHours": "09:00–12:00 · 14:00–18:00",
				"skin.terminalColItem": "项",
				"skin.terminalColBalance": "余额",
				"skin.dayNightPeak": "高峰时段",
				"skin.dayNightIdle": "空闲时段",
				"skin.dayNightSub": "北京时间 · {rule}",
				"skin.dayNightWeekend": "高峰 09:00–12:00 / 14:00–18:00",
				"skin.goTitle": "Go套餐用量",
				"skin.goRolling": "5小时",
				"skin.goWeekly": "一周",
				"skin.goMonthly": "一月",
				"skin.limit": "限额 ${limit}",
				"skin.detail": "明细",
				"skin.totalBalance": "总余额",
				"skin.granted": "赠送",
				"skin.toppedUp": "充值",
				"skin.available": "可用",
				"skin.insufficient": "余额不足",
				"skin.switchView": "切换视图",
				"go.subRealtime": "Go套餐用量 · 实时统计",
				"go.subStale": "Go套餐用量 · 缓存值",
				"go.subDemo": "Go套餐用量 · 示例数据",
				"go.hint": "提示",
				"go.footRealtime": "实时统计 · 按美元额度计费",
				"go.footStale": "缓存值 · 按美元额度计费",
				"go.footDemo": "演示数据 · 接入后按真实用量统计",
				"settings.label": "DS峰谷小组件",
				"settings.enabled": "启用小组件",
				"settings.enabledHint": "关闭后侧边栏不再显示计费小组件",
				"settings.switchOn": "已启用",
				"settings.switchOff": "已停用",
				"settings.simulate": "模拟时段（演示）",
				"settings.simulateHint": "手动切换后刷新页面回到自动判定",
				"settings.simulateAria": "模拟时段",
				"settings.keysLegend": "Key 配置 · Go套餐 & DeepSeek",
				"settings.keysHint": "用于填充 Go套餐用量（三贴纸）与 余额查询（DeepSeek 余额）。留空表示使用系统已配置（auth.json / 环境变量）。保存后立即生效，Key 仅存于 ~/.dsh/dsh-deepseek-peak-valley.json。",
				"settings.goKeyLabel": "Go 套餐 Key（opencode-go）",
				"settings.deepseekKeyLabel": "DeepSeek Key（platform.deepseek.com）",
				"settings.keyPlaceholder": "sk-... 粘贴后保存",
				"settings.notConfigured": "未配置",
				"settings.save": "保存 Keys",
				"settings.saving": "保存中…",
				"settings.clear": "清空",
				"settings.clearConfirm": "清空已保存的 Keys？",
				"settings.saved": "已保存，正在刷新数据…",
				"settings.cleared": "已清空",
				"settings.noNewKey": "未输入新 Key",
				"settings.stylesLegend": "风格 · 11 款",
				"settings.preview": "预览",
				"settings.previewExpanded": "正常 · 展开态",
				"settings.previewCollapsed": "缩小 · 收起态",
				"settings.previewAriaExpanded": "预览·展开态",
				"settings.previewAriaCollapsed": "预览·收起态",
				"settings.describe": "按北京时间自动判定高峰（09:00–12:00、14:00–18:00）与空闲时段，在左侧边栏展示分时段计费报价；可切换 11 款风格。价格基于公开报价，仅作演示。",
				"settings.goError": "Go错误",
				"settings.deepseekError": "DS错误",
				"host.goNoKey": "未找到 OpenCode Go API Key（请在设置页“Go套餐 Key”中配置）",
				"host.goKeyInvalid": "Go API Key 无效（401）",
				"host.goNotSubscribed": "未订阅 OpenCode Go（403）",
				"host.goMalformed": "返回结构异常：缺少 rolling/weekly/monthly",
				"host.deepseekNoKey": "未找到 DeepSeek API Key（请在设置页“DeepSeek Key”中配置）",
				"host.deepseekKeyInvalid": "DeepSeek API Key 无效（401）",
				"host.deepseekMalformed": "返回结构异常：缺少 balance_infos",
				"host.badJson": "JSON 解析失败",
				"host.unknown": "未知错误"
			},
			en: {
				"plugin.aria": "DeepSeek time-of-day pricing widget",
				"period.peak": "Peak",
				"period.idle": "Off-peak",
				"period.peakShort": "Pk",
				"period.idleShort": "Off",
				"period.peakLong": "Peak hours",
				"period.idleLong": "Off-peak hours",
				"period.weekend": "Weekend — off-peak all day | lowest rate",
				"period.rule": "Peak 09:00–12:00 · 14:00–18:00 | off-peak otherwise",
				"period.dayNightWarmCool": "Warm = peak　Cool = off-peak",
				"item.inputCacheHit": "Input · cache hit",
				"item.inputCacheMiss": "Input · cache miss",
				"item.output": "Output",
				"timeline.goUsageLoading": "Go 5h usage · loading…",
				"timeline.goUsageError": "Go 5h usage · {error}",
				"timeline.goUsageEmpty": "Go 5h usage · no data",
				"timeline.goUsage": "Go 5h usage {percent}%",
				"timeline.staleSuffix": " · cached",
				"common.loading": "Loading…",
				"common.empty": "No data",
				"common.stale": "cached",
				"common.live": "live",
				"common.staleWithDetail": "cached · {detail}",
				"common.balance": "Balance",
				"common.deepseekBalance": "DeepSeek balance",
				"common.goWeeklyQuota": "Go weekly quota",
				"common.goMonthlyQuota": "Go monthly quota",
				"common.unavailable": " · unavailable",
				"common.usageUnit": "CNY / million tokens · Beijing time",
				"common.refreshIn": "Refresh in {seconds}s",
				"common.configureKeyHint": "Configure a key in Settings, then refresh",
				"common.configureDeepseekKeyHint": "Configure it under “DeepSeek key” in Settings, then refresh",
				"style.01": "Pulse",
				"style.02": "Minimal",
				"style.03": "Receipt",
				"style.04": "Metro",
				"style.05": "Pills",
				"style.06": "Terminal",
				"style.07": "Brutalist",
				"style.08": "Glass",
				"style.09": "DayNight",
				"style.10": "Editorial",
				"style.11": "Animal Island",
				"skin.name": "DeepSeek & Go",
				"skin.receiptTitle": "DeepSeek time-of-day pricing",
				"skin.receiptSub": "Receipt · Beijing time",
				"skin.editorialEyebrow": "DeepSeek · Rates",
				"skin.editorialTitle": "Time-of-day pricing",
				"skin.editorialMeta": "Peak 09:00–12:00 · 14:00–18:00 (Beijing time)",
				"skin.terminalNow": "now: {period}",
				"skin.terminalHours": "09:00–12:00 · 14:00–18:00",
				"skin.terminalColItem": "Item",
				"skin.terminalColBalance": "Balance",
				"skin.dayNightPeak": "Peak hours",
				"skin.dayNightIdle": "Off-peak hours",
				"skin.dayNightSub": "Beijing time · {rule}",
				"skin.dayNightWeekend": "Peak 09:00–12:00 / 14:00–18:00",
				"skin.goTitle": "Go usage",
				"skin.goRolling": "5 hours",
				"skin.goWeekly": "Week",
				"skin.goMonthly": "Month",
				"skin.limit": "Limit ${limit}",
				"skin.detail": "Details",
				"skin.totalBalance": "Total",
				"skin.granted": "Granted",
				"skin.toppedUp": "Topped up",
				"skin.available": "Available",
				"skin.insufficient": "Insufficient",
				"skin.switchView": "Switch view",
				"go.subRealtime": "Go usage · live",
				"go.subStale": "Go usage · cached",
				"go.subDemo": "Go usage · sample data",
				"go.hint": "Note",
				"go.footRealtime": "Live · billed against the USD quota",
				"go.footStale": "Cached · billed against the USD quota",
				"go.footDemo": "Sample data · real usage appears once connected",
				"settings.label": "DeepSeek Peak & Off-Peak",
				"settings.enabled": "Enable widget",
				"settings.enabledHint": "When off, the sidebar no longer shows the pricing widget",
				"settings.switchOn": "Enabled",
				"settings.switchOff": "Disabled",
				"settings.simulate": "Simulate period (demo)",
				"settings.simulateHint": "Reload the page to return to automatic detection",
				"settings.simulateAria": "Simulate period",
				"settings.keysLegend": "Keys · Go plan & DeepSeek",
				"settings.keysHint": "Fills the Go plan usage stickers and the DeepSeek balance panel. Leave blank to use the system-provided credentials (auth.json / environment variables). Keys take effect immediately and are stored only in ~/.dsh/dsh-deepseek-peak-valley.json.",
				"settings.goKeyLabel": "Go plan key (opencode-go)",
				"settings.deepseekKeyLabel": "DeepSeek key (platform.deepseek.com)",
				"settings.keyPlaceholder": "sk-... paste and save",
				"settings.notConfigured": "not configured",
				"settings.save": "Save keys",
				"settings.saving": "Saving…",
				"settings.clear": "Clear",
				"settings.clearConfirm": "Clear the saved keys?",
				"settings.saved": "Saved — refreshing data…",
				"settings.cleared": "Cleared",
				"settings.noNewKey": "No new key entered",
				"settings.stylesLegend": "Style · 11 options",
				"settings.preview": "Preview",
				"settings.previewExpanded": "Full · expanded",
				"settings.previewCollapsed": "Compact · collapsed",
				"settings.previewAriaExpanded": "Preview, expanded",
				"settings.previewAriaCollapsed": "Preview, collapsed",
				"settings.describe": "Detects DeepSeek peak (09:00–12:00, 14:00–18:00) and off-peak windows in Beijing time, and shows the time-of-day rates in the sidebar. 11 styles available. Prices come from published rates and are for demonstration only.",
				"settings.goError": "Go error",
				"settings.deepseekError": "DeepSeek error",
				"host.goNoKey": "No OpenCode Go API key found (configure it under “Go plan key” in Settings)",
				"host.goKeyInvalid": "Go API key is invalid (401)",
				"host.goNotSubscribed": "OpenCode Go is not subscribed (403)",
				"host.goMalformed": "Unexpected response shape: rolling/weekly/monthly missing",
				"host.deepseekNoKey": "No DeepSeek API key found (configure it under “DeepSeek key” in Settings)",
				"host.deepseekKeyInvalid": "DeepSeek API key is invalid (401)",
				"host.deepseekMalformed": "Unexpected response shape: balance_infos missing",
				"host.badJson": "JSON parse failed",
				"host.unknown": "Unknown error"
			}
		};
		/**
		* 把宿主返回的稳定错误码映射为当前语言文案。
		* @param t - 本命名空间绑定的翻译函数。
		* @param code - 宿主给出的错误码（未知时为 undefined）。
		* @param fallback - 无可用码时原样展示的宿主文本。
		* @returns 本地化文案，或宿主原文。
		*/
		function translateHostError(t, code, fallback) {
			const known = {
				"go-no-key": "host.goNoKey",
				"go-key-invalid": "host.goKeyInvalid",
				"go-not-subscribed": "host.goNotSubscribed",
				"go-malformed": "host.goMalformed",
				"deepseek-no-key": "host.deepseekNoKey",
				"deepseek-key-invalid": "host.deepseekKeyInvalid",
				"deepseek-malformed": "host.deepseekMalformed",
				"bad-json": "host.badJson",
				unknown: "host.unknown"
			};
			if (code && code in known) return t(known[code]);
			return fallback ?? null;
		}
		//#endregion
		//#region src/client/locale/translator.tsx
		/**
		* dsh-deepseek-peak-valley · 翻译座位（React context）与读取钩子。
		*
		* 官方来源是 slot 注册的 `locale:` 座位——框架把该命名空间的 `t` 合成进
		* 注册组件 props，并在语言切换时换发新的函数引用，整套 outlet 随
		* locale revision 重渲染。本插件层级较深（Widget → 风格目录 → 11 款皮肤
		* → 共享原语），把 `t` 逐层写进每个皮肤 props 契约会污染领域类型，
		* 因此这里做一次薄透传：
		*
		* - 顶层唯一的 slot 组件（Widget / SettingsSection）把注入的 `t` 放进
		*   `TranslatorProvider`；
		* - 任意深度的子组件用 `useT()` 取值，语言切换自然生效（引用变化即重渲染）。
		*
		* 缺省值回退为「原样返回键」：独立渲染（如测试）不会崩溃，也不会凭空
		* 产生文案——缺座位是装配错误，应由宿主在 slot 层显式暴露。
		*/
		/** 无 Provider 时的兜底：显示键本身，保持「缺失可见」。 */
		const fallbackT = ((key) => key);
		const TranslatorContext = (0, react.createContext)(fallbackT);
		/** 把 slot 注入的 `t` 座位透传给整棵子树。 */
		function TranslatorProvider({ t, children }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TranslatorContext.Provider, {
				value: t,
				children
			});
		}
		/** 取当前语言的翻译函数（语言切换后返回新引用）。 */
		function useT() {
			return (0, react.useContext)(TranslatorContext);
		}
		/**
		* 把宿主返回的错误（稳定机器码 + 英文兜底）渲染成当前语言的文案。
		*
		* 在渲染层翻译而非在 store 层：store 只保存宿主原文，语言切换后
		* 整个 slot outlet 会随 locale revision 重渲染，这里随即给出新语言的
		* 文案——无需在 store 里维护 locale 依赖。
		* @param code - 宿主给出的稳定机器码（网络层失败时为 null）。
		* @param fallback - 无可用码时原样展示的宿主文本。
		* @returns 本地化文案（无错误时为 null）。
		*/
		function useHostError(code, fallback) {
			const t = useT();
			return code === null && !fallback ? null : translateHostError(t, code, fallback ?? null);
		}
		//#endregion
		//#region src/client/styles/AnimalIsland.tsx
		/** 动森叶子图标（高峰=红色，空闲=绿色，CSS 变量驱动）。 */
		function AcLeaf({ className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.9,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 20C4 10 12 4 20 4c0 8-6 16-16 16z" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M4 20C8 16 13 12 18 8" })]
			});
		}
		/** 双向箭头（视图切换按钮）。 */
		function SwapIcon({ className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				className,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 2,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" })
			});
		}
		/** 金币图标（用量视图收起态）。 */
		function CoinIcon({ className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
				className,
				viewBox: "0 0 24 24",
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "9",
					fill: "var(--now-deep)",
					stroke: "oklch(100% 0 0)",
					strokeWidth: "2"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M12 7v10M8.6 7.6L12 11l3.4-3.4M8.6 13h6.8",
					stroke: "oklch(100% 0 0)",
					strokeWidth: "1.7"
				})]
			});
		}
		/** Go 套餐额度（美元）。 */
		const GO_QUOTA = {
			fiveHour: 12,
			weekly: 30,
			monthly: 60
		};
		function PricingView({ priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-pane ds-pane--pricing",
				children: [
					(() => {
						const segs = timelineSegmentsAt(/* @__PURE__ */ new Date());
						const weekend = isWeekend(/* @__PURE__ */ new Date());
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ai-tl-bar",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "ai-tl-track",
								children: segs.map((seg, i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
									className: seg.period === "peak" ? "ai-s-peak" : "ai-s-idle",
									style: { width: seg.width }
								}, `${seg.period}-${i}`))
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ai-tl-cur",
								style: { left: `${cursorPercent}%` }
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ai-tl-meta",
							children: weekend ? t("period.weekend") : t("period.rule")
						})] });
					})(),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ai-toggle",
						"aria-expanded": priceTableExpanded,
						onClick: onTogglePriceTable,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common.balance") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronIcon, { className: "ai-chev" })]
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "ai-price-inner",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ai-inner",
							children: deepseekLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									padding: "8px 4px",
									fontSize: 11,
									color: "var(--ac-ink-2)"
								},
								children: t("common.loading")
							}) : deepseekError && !deepseek ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: {
									padding: "8px 4px",
									fontSize: 11,
									color: "#a33"
								},
								children: [deepseekError, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: {
										marginTop: 4,
										color: "var(--ac-ink-2)"
									},
									children: t("common.configureDeepseekKeyHint")
								})]
							}) : deepseek ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.totalBalance") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											deepseek.balance_infos[0]?.total_balance ?? "--",
											" ",
											deepseek.balance_infos[0]?.currency ?? "CNY",
											deepseek.is_available ? "" : t("common.unavailable")
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.granted") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [deepseek.balance_infos[0]?.granted_balance ?? "--", " CNY"]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.toppedUp") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [deepseek.balance_infos[0]?.topped_up_balance ?? "--", " CNY"]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.available") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-d-n",
										style: { color: deepseek.is_available ? "var(--ac-green)" : "#e05a5a" },
										children: deepseek.is_available ? t("skin.available") : t("skin.insufficient")
									})]
								}),
								deepseekStale && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 9.5,
										color: "#a33",
										marginTop: 4
									},
									children: t("common.staleWithDetail", { detail: deepseekError ?? "" })
								})
							] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: {
									padding: "8px 4px",
									fontSize: 11,
									color: "var(--ac-ink-2)"
								},
								children: t("common.empty")
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ai-foot",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AcLeaf, { className: "ai-foot-leaf" }),
								t("common.deepseekBalance"),
								" · ",
								deepseekStale ? t("common.stale") : t("common.live"),
								" · CNY"
							]
						})]
					})
				]
			});
		}
		function UsageView({ usageDetailExpanded, onToggleUsageDetail, usage, usageReal = false, goQuota, goQuotaError, goQuotaStale }) {
			const t = useT();
			const hasReal = !!goQuota;
			const p5h = hasReal ? goQuota.rolling.percent : Math.min(100, usage.estimatedCost / GO_QUOTA.fiveHour * 100);
			const pWeek = hasReal ? goQuota.weekly.percent : Math.min(100, usage.estimatedCost / GO_QUOTA.weekly * 100);
			const pMonth = hasReal ? goQuota.monthly.percent : Math.min(100, usage.estimatedCost / GO_QUOTA.monthly * 100);
			const subLabel = hasReal ? goQuotaStale ? t("go.subStale") : t("go.subRealtime") : usageReal ? t("go.subRealtime") : t("go.subDemo");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-pane ds-pane--usage",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "ai-usage-sub",
						children: subLabel
					}),
					goQuotaError && !hasReal && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "ai-usage-err",
						style: {
							fontSize: 9.5,
							color: "#a33",
							marginTop: 4
						},
						children: goQuotaError
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "ai-tiles",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ai-tile ai-tile--5h",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-k",
										children: t("skin.goRolling")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-v",
										children: formatRate(p5h)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-u",
										children: t("skin.limit", { limit: GO_QUOTA.fiveHour })
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ai-tile ai-tile--week",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-k",
										children: t("skin.goWeekly")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-v",
										children: formatRate(pWeek)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-u",
										children: t("skin.limit", { limit: GO_QUOTA.weekly })
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ai-tile ai-tile--month",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-k",
										children: t("skin.goMonthly")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-v",
										children: formatRate(pMonth)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-tile-u",
										children: t("skin.limit", { limit: GO_QUOTA.monthly })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ai-toggle ai-toggle--usage",
						"aria-expanded": usageDetailExpanded,
						onClick: onToggleUsageDetail,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.detail") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronIcon, { className: "ai-chev" })]
					}),
					usageDetailExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "ai-detail-inner",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "ai-inner",
							children: hasReal ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goRolling") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(goQuota.rolling.percent),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.fiveHour })
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goWeekly") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(goQuota.weekly.percent),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.weekly })
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goMonthly") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(goQuota.monthly.percent),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.monthly })
										]
									})]
								}),
								goQuotaStale && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									style: { color: "#a33" },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("go.hint") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ai-d-n",
										children: t("common.staleWithDetail", { detail: goQuotaError ?? "" })
									})]
								})
							] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goRolling") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(p5h),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.fiveHour })
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goWeekly") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(pWeek),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.weekly })
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ai-d-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.goMonthly") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: "ai-d-n",
										children: [
											formatRate(pMonth),
											" · ",
											t("skin.limit", { limit: GO_QUOTA.monthly })
										]
									})]
								})
							] })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ai-foot",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AcLeaf, { className: "ai-foot-leaf" }), hasReal ? goQuotaStale ? t("go.footStale") : t("go.footRealtime") : usageReal ? t("go.footRealtime") : t("go.footDemo")]
						})]
					})
				]
			});
		}
		function AnimalIslandExpanded({ priceTableExpanded, onTogglePriceTable, cursorPercent, viewTab, onToggleViewTab, usageDetailExpanded, onToggleUsageDetail, usage = DEMO_USAGE, usageReal = false, goQuota, goQuotaError, goQuotaStale, deepseek, deepseekError, deepseekStale, deepseekLoading }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `ds-style-11${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ai-head",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ai-view-switch",
						"aria-label": t("skin.switchView"),
						"aria-pressed": viewTab === "usage",
						onClick: onToggleViewTab,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwapIcon, { className: "ai-swap-ico" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ai-v-label ai-v-pricing",
								children: "DeepSeek"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ai-v-label ai-v-usage",
								children: t("skin.goTitle")
							})
						]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "ai-sticker",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "ai-dot" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "ai-lpk",
								children: [t("period.peak"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
									className: "ai-x2",
									children: "×2"
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ai-lidle",
								children: t("period.idle")
							})
						]
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ai-panes",
					children: [viewTab === "pricing" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PricingView, {
						priceTableExpanded,
						onTogglePriceTable,
						cursorPercent,
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading
					}), viewTab === "usage" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageView, {
						usageDetailExpanded,
						onToggleUsageDetail,
						usage,
						usageReal,
						goQuota,
						goQuotaError,
						goQuotaStale
					})]
				})]
			});
		}
		function AnimalIslandCollapsed({ period, viewTab, usage = DEMO_USAGE }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ds-collapsed-11",
				children: viewTab === "pricing" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ai-coll-pricing",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AcLeaf, { className: `ai-coll-leaf ai-coll-leaf--${period === "peak" ? "peak" : "idle"}` }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ai-coll-lbl",
						children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
					})]
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: "ai-coll-usage",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CoinIcon, { className: "ai-coll-coin" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ai-coll-cost",
						children: formatCost(usage.estimatedCost)
					})]
				})
			});
		}
		const store = createStore(() => ({ remaining: 60 }));
		let timer = null;
		/** 订阅剩余秒数（归零时组件重渲染）。 */
		function useCountdown() {
			return useStore(store);
		}
		/**
		* 启动全局倒计时（与插件生命周期绑定，由 client index 的 ctx.effect 调用）。
		* 返回清理函数。每秒递减，到 0 触发一次刷新并重置。
		*/
		function startCountdown() {
			store.set({ remaining: 60 });
			timer = window.setInterval(() => {
				const cur = store.getSnapshot().remaining;
				if (cur <= 1) {
					try {
						refreshDeepseek();
					} catch {}
					try {
						refreshGoQuota();
					} catch {}
					store.set({ remaining: 60 });
				} else store.set({ remaining: cur - 1 });
			}, 1e3);
			return () => {
				if (timer !== null) clearInterval(timer);
				timer = null;
			};
		}
		//#endregion
		//#region src/client/components/primitives.tsx
		/** 时段全称 / 简称（长 = 高峰，短 = 峰）。 */
		function periodWord(t, period, long) {
			if (period === "peak") return long ? t("period.peakLong") : t("period.peakShort");
			return long ? t("period.idleLong") : t("period.idleShort");
		}
		/** 时段徽章（圆点 + 高峰/空闲 文字）。 */
		function Badge({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "w-badge",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), period === "peak" ? t("period.peak") : t("period.idle")]
			});
		}
		/** 双态文字（高峰/空闲；永不共存——仅渲染当前时段）。 */
		function PeriodWord({ period, long }) {
			return periodWord(useT(), period, long);
		}
		/**
		* 24h 时间轴（5 段轨道 + 当前光标 + 元信息）。
		* @param cursorPercent 实时光标百分比（0–100，按当前北京时间计算）；
		*   缺省时退回设计稿演示常量（TIMELINE_CURSOR，仅作兜底）。
		*/
		function Timeline({ period, meta, cursorPercent }) {
			const t = useT();
			const weekend = isWeekend();
			const segments = timelineSegmentsAt(/* @__PURE__ */ new Date());
			const defaultMeta = weekend ? t("period.weekend") : t("period.rule");
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tl-track",
						children: segments.map((segment, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
							className: segment.period === "peak" ? "s-peak" : "s-idle",
							style: { width: segment.width }
						}, `${segment.period}-${index}`))
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: { left: cursorPercent !== void 0 ? `${cursorPercent}%` : TIMELINE_CURSOR[period] }
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "tl-meta",
					children: meta ?? defaultMeta
				})]
			});
		}
		/**
		* Go 模型「近 5 小时（rolling）套餐用量」进度条。
		*
		* 与 Timeline 同构（`.w-tl` / `.tl-bar` / `.tl-track` / `.tl-cur` / `.tl-meta`），
		* 但 **没有高峰/空闲分段标记**——`.tl-track` 仅一条纯轨道 + 用量填充 + 用量光标，
		* 用于展示 Go 模型近 5 小时套餐用量百分比（限额见 GO_LIMITS.rolling）。
		*
		* 数据来自浏览器侧 go-quota 轮询 store（`useGoQuota`，已全局启动轮询）；
		* 上层 Widget 也可直接注入 goQuota / 错误 / 加载态，缺省时回退到 store 取值。
		*/
		function UsageBar({ goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const fallback = useGoQuota();
			const t = useT();
			const usage = goQuota !== void 0 ? goQuota : fallback.usage;
			const error = goQuotaError !== void 0 ? goQuotaError : fallback.error;
			const stale = goQuotaStale !== void 0 ? goQuotaStale : fallback.stale;
			const loading = goQuotaLoading !== void 0 ? goQuotaLoading : fallback.loading;
			const pct = usage ? Math.max(0, Math.min(100, usage.rolling.percent)) : 0;
			if (loading && !usage) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl w-usage",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "tl-track" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: {
							left: "0%",
							opacity: .3
						}
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "tl-meta",
					children: t("timeline.goUsageLoading")
				})]
			});
			if (error && !usage) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl w-usage",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "tl-track" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: {
							left: "0%",
							opacity: .3
						}
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "tl-meta",
					children: t("timeline.goUsageError", { error })
				})]
			});
			if (!usage) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl w-usage",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "tl-track" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: {
							left: "0%",
							opacity: .3
						}
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "tl-meta",
					children: t("timeline.goUsageEmpty")
				})]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl w-usage",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tl-track",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
							className: "tl-fill",
							style: { width: `${pct}%` }
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: { left: `${pct}%` }
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-meta",
					children: [
						t("timeline.goUsage", { percent: pct.toFixed(1) }),
						stale ? t("timeline.staleSuffix") : "",
						"　",
						dollars(pct, GO_LIMITS.rolling)
					]
				})]
			});
		}
		/** 余额查询展开/收起切换按钮（原 价格表，`.w-toggle` + aria-expanded + chevron）。 */
		function Toggle({ expanded, onToggle, label }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "w-toggle",
				"aria-expanded": expanded,
				onClick: onToggle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label ?? t("common.balance") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronIcon, { className: "t-chev" })]
			});
		}
		/** 页脚（单位标注）。 */
		function UnitFooter({ children, note }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-foot",
				children: [note ?? t("common.usageUnit"), children]
			});
		}
		/** 余额查询页脚：动态 60s 倒计时（归零触发刷新，见 state/countdown）。 */
		function CountdownFooter({ children }) {
			const { remaining } = useCountdown();
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, {
				note: t("common.refreshIn", { seconds: remaining }),
				children
			});
		}
		/**
		* 余额查询面板（替换价格表）：DeepSeek 余额 / Go 周额度 / Go 月额度。
		* 已删除「赠送 · 充值 · 可用」三行；样式自适应各风格。
		*/
		function DeepseekBalance({ deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const hasDeepseek = !!deepseek;
			const hasGo = !!goQuota;
			const t = useT();
			if (!hasDeepseek && !hasGo) {
				if (deepseekLoading || goQuotaLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: {
						padding: "8px 2px",
						fontSize: "10.5px",
						opacity: .65
					},
					children: t("common.loading")
				});
				const err = deepseekError || goQuotaError;
				if (err) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: { padding: "8px 2px" },
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "10.5px",
							color: "#a33"
						},
						children: err
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							marginTop: 4,
							fontSize: "9.5px",
							opacity: .7
						},
						children: t("common.configureKeyHint")
					})]
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: {
						padding: "8px 2px",
						fontSize: "10.5px",
						opacity: .65
					},
					children: t("common.empty")
				});
			}
			const entries = deepseek?.balance_infos ?? [];
			const pick = entries.find((b) => b.currency === "CNY") ?? entries[0] ?? null;
			const rowStyle = {
				display: "flex",
				justifyContent: "space-between",
				gap: 8,
				padding: "4px 2px",
				fontSize: "10.5px",
				lineHeight: 1.5
			};
			const sepStyle = { borderTop: "1px dashed color-mix(in oklch, currentColor 22%, transparent)" };
			const stale = deepseekStale || goQuotaStale;
			const num = (text) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 700,
					fontVariantNumeric: "tabular-nums",
					fontFamily: "ui-monospace, monospace"
				},
				children: text
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-balance",
				style: { marginTop: 2 },
				children: [
					hasDeepseek && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: rowStyle,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common.deepseekBalance") }), num(pick ? `${pick.total_balance ?? "--"} ${pick.currency ?? "CNY"}${deepseek.is_available ? "" : t("common.unavailable")}` : "--")]
					}),
					hasGo && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							...rowStyle,
							...hasDeepseek ? sepStyle : {}
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common.goWeeklyQuota") }), num(`${goQuota.weekly.percent.toFixed(1)}% · ${dollars(goQuota.weekly.percent, GO_LIMITS.weekly)}`)]
					}),
					hasGo && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: {
							...rowStyle,
							...sepStyle
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common.goMonthlyQuota") }), num(`${goQuota.monthly.percent.toFixed(1)}% · ${dollars(goQuota.monthly.percent, GO_LIMITS.monthly)}`)]
					}),
					stale && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "9.5px",
							color: "#a33",
							marginTop: 4,
							padding: "0 2px"
						},
						children: t("common.staleWithDetail", { detail: deepseekError ?? goQuotaError ?? "" })
					}),
					!stale && (deepseekError && hasGo || goQuotaError && hasDeepseek) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "9.5px",
							color: "#a33",
							marginTop: 4,
							padding: "0 2px"
						},
						children: deepseekError ?? goQuotaError
					})
				]
			});
		}
		//#endregion
		//#region src/client/styles/classic.tsx
		/**
		* 经典展开态：头部 → 时间轴 → 切换 → 价格表 → 页脚。
		* @param styleClass 风格类名（如 ds-style-01）。
		* @param meta 时间轴元信息（默认 001 标准文案）。
		*/
		function ClassicExpanded({ styleClass, period, priceTableExpanded, onTogglePriceTable, cursorPercent, meta, footer, badge, name, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const t = useT();
			const weekend = isWeekend(/* @__PURE__ */ new Date());
			const effectiveMeta = meta ?? (weekend ? t("period.weekend") : t("period.rule"));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ${styleClass}${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "w-name",
							children: name ?? t("skin.name")
						}), badge ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, { period })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta: effectiveMeta,
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeepseekBalance, {
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading,
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CountdownFooter, { children: footer })
				]
			});
		}
		/** 经典收起态：圆点 + 峰/闲 文字（01/02/03/08 共用结构）。 */
		function DotCollapsed({ styleClass, period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: styleClass,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PeriodWord, { period })
				})]
			});
		}
		//#endregion
		//#region src/client/styles/DayNight.tsx
		/**
		* Style 09 · 昼夜 DayNight · 明暗随时段。
		*
		* 独有特征（002-前端-页面交互 §09）：整卡随时段变色——高峰白昼底 / 空闲夜空底
		* （0.35s 过渡）；太阳/月亮图标切换 + 大字「高峰时段 / 空闲时段」；时间轴
		* 暖段=高峰、冷段=空闲。
		*/
		/** 昼夜 · 展开态（余额查询替换价格表）。 */
		function DayNightExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const day = period === "peak";
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-09${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "sky",
							children: day ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SunIcon, { className: "sun" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MoonIcon, { className: "moon" })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "w-now",
							children: day ? t("skin.dayNightPeak") : t("skin.dayNightIdle")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "w-sub",
						children: t("skin.dayNightSub", { rule: isWeekend(/* @__PURE__ */ new Date()) ? t("period.weekend") : t("skin.dayNightWeekend") })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta: t("period.dayNightWarmCool"),
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeepseekBalance, {
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading,
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CountdownFooter, {})
				]
			});
		}
		/** 昼夜 · 收起态（太阳/月亮 + 峰/闲）。 */
		function DayNightCollapsed({ period }) {
			const day = period === "peak";
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-09",
				children: [day ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SunIcon, { className: "sun" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MoonIcon, { className: "moon" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: day ? t("period.peakShort") : t("period.idleShort")
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Editorial.tsx
		/**
		* Style 10 · 编辑 Editorial · 杂志。
		*
		* 独有特征（002-前端-页面交互 §10）：眉题「DeepSeek · 报价」+ 衬线大标题
		* 「分时段计费」；等宽数字 + 细分割线；当前列浅色底；页脚含「高峰 = 空闲 × 2」。
		*/
		/** 编辑 · 展开态（余额查询替换价格表）。 */
		function EditorialExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-10${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-eyebrow",
							children: t("skin.editorialEyebrow")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-name",
							children: t("skin.editorialTitle")
						})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, { period })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta: isWeekend(/* @__PURE__ */ new Date()) ? t("period.weekend") : t("skin.editorialMeta"),
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeepseekBalance, {
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading,
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CountdownFooter, {})
				]
			});
		}
		/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
		function EditorialCollapsed({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-10",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mark",
					children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: "NOW"
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Metro.tsx
		/**
		* Style 04 · 时刻线 Metro · 线路图。
		*
		* 独有特征（002-前端-页面交互 §04）：24h 地铁线路（高峰橙色区间 / 空闲底色），
		* 站点点出 00/09/12/14/18/24，「列车」随时段移动（按当前北京时间实时计算，
		* 001-接口契约 §3，不得写死），下方图例；当前时段数字加粗（CSS 承担）。
		*/
		/** 站点位置（百分比）。 */
		const STATIONS = [
			"0%",
			"37.5%",
			"50%",
			"58.34%",
			"75%",
			"100%"
		];
		/** 时刻线 · 展开态。 */
		function MetroExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const weekend = isWeekend(/* @__PURE__ */ new Date());
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-04${priceTableExpanded ? "" : " is-collapsed"}`,
				"data-weekend": weekend ? "1" : "0",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "w-name",
							children: "DeepSeek & Go"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, { period })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "line",
						children: [STATIONS.map((left) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
							className: "sta",
							style: { left }
						}, left)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "train",
							style: { left: `${cursorPercent}%` }
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "line-times",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "00" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "09" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "12" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "14" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "18" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "24" })
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "legend",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lg-pk" }), t("period.peak")] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lg-id" }), t("period.idle")] })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeepseekBalance, {
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading,
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CountdownFooter, {})
				]
			});
		}
		/** 时刻线 · 收起态（垂直 mini 线路，列车位置按实时时钟移动）。 */
		function MetroCollapsed({ period, cursorPercent }) {
			const weekend = isWeekend(/* @__PURE__ */ new Date());
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-04",
				"data-weekend": weekend ? "1" : "0",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mini",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "train",
						style: { top: `${cursorPercent}%` }
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Receipt.tsx
		/**
		* Style 03 · 票据 Receipt · 票根。
		*
		* 独有特征（002-前端-页面交互 §03）：斜盖印戳（当前时段）、锯齿撕线 .w-tear、
		* 页脚条形码 .bcode；价格表虚线/点线分隔（CSS 承担）。
		*/
		/** 票据 · 展开态（余额查询替换价格表）。 */
		function ReceiptExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent, deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-03${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "stamp",
						children: period === "peak" ? t("period.peak") : t("period.idle")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "w-head",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-name",
							children: t("skin.receiptTitle")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-sub",
							children: t("skin.receiptSub")
						})] })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "w-tear" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DeepseekBalance, {
						deepseek,
						deepseekError,
						deepseekStale,
						deepseekLoading,
						goQuota,
						goQuotaError,
						goQuotaStale,
						goQuotaLoading
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CountdownFooter, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "bcode" }) })
				]
			});
		}
		/** 票据 · 收起态（上下锯齿缘由 ::before/::after CSS 承担）。 */
		function ReceiptCollapsed({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-03",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Terminal.tsx
		/**
		* Style 06 · 终端 Terminal · CLI 日志。
		*
		* 独有特征（002-前端-页面交互 §06）：终端标题栏「deepseek-rate · v4」+ 三圆点；
		* 正文日志式 `$ ds rate --now` → `▸ 当前：高峰/空闲`（强调色）→ 时段说明；
		* 展开区为 DeepSeek 余额查询（同 AnimalIsland PricingView 复用 /deepseek/balance），
		* 等宽对齐，保持终端 CLI 质感。
		*/
		/** 终端 · 展开态。 */
		function TerminalExpanded({ period, priceTableExpanded, onTogglePriceTable, deepseek: deepseekProp, deepseekError: deepseekErrorProp, deepseekStale: deepseekStaleProp, deepseekLoading: deepseekLoadingProp, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const fallback = useDeepseekBalance();
			const { remaining } = useCountdown();
			const t = useT();
			const deepseek = deepseekProp !== void 0 ? deepseekProp : fallback.data;
			const deepseekError = deepseekErrorProp !== void 0 ? deepseekErrorProp : fallback.error;
			const deepseekStale = deepseekStaleProp !== void 0 ? deepseekStaleProp : fallback.stale;
			const deepseekLoading = deepseekLoadingProp !== void 0 ? deepseekLoadingProp : fallback.loading;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-06${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "term-bar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "tdot" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "tdot" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "tdot" }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "tname",
								children: "deepseek-rate · v4"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "term-body",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "tline",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "ps",
									children: "$"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "txt",
									children: "ds rate --now"
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "tline",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "ps",
									children: "▸"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "nowv",
									children: t("skin.terminalNow", { period: period === "peak" ? t("period.peak") : t("period.idle") })
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "tline",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dim",
									children: isWeekend(/* @__PURE__ */ new Date()) ? t("period.weekend") : t("skin.terminalHours")
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UsageBar, {
								goQuota,
								goQuotaError,
								goQuotaStale,
								goQuotaLoading
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
								expanded: priceTableExpanded,
								onToggle: onTogglePriceTable
							}),
							priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TerminalBalance, {
								deepseek,
								deepseekError,
								deepseekStale,
								deepseekLoading,
								goQuota,
								goQuotaError,
								goQuotaStale,
								goQuotaLoading
							})
						]
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "term-foot",
						children: t("common.refreshIn", { seconds: remaining })
					})
				]
			});
		}
		/** 终端等宽余额块（CLI 风格，复用 ttbl 布局）：总余额(DeepSeek) / Go 周·月额度。 */
		function TerminalBalance({ deepseek, deepseekError, deepseekStale, deepseekLoading, goQuota, goQuotaError, goQuotaStale, goQuotaLoading }) {
			const hasDeepseek = !!deepseek;
			const hasGo = !!goQuota;
			const t = useT();
			if (!hasDeepseek && !hasGo) {
				if (deepseekLoading || goQuotaLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ttbl",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tline",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "ps",
							children: "$"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "txt",
							children: "ds balance"
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tt-row",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "m",
							style: { color: "oklch(68% 0.02 240)" },
							children: ["· ", t("common.loading")]
						})
					})]
				});
				const err = deepseekError || goQuotaError;
				if (err) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ttbl",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "tline",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "ps",
								children: "$"
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "txt",
								children: "ds balance"
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "tt-row",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "m",
								style: { color: "#e07a7a" },
								children: err
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "tline",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "dim",
								children: t("common.configureKeyHint")
							})
						})
					]
				});
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ttbl",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tline",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "ps",
							children: "$"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "txt",
							children: "ds balance"
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tt-row",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "m",
							style: { color: "oklch(68% 0.02 240)" },
							children: t("common.empty")
						})
					})]
				});
			}
			const entries = deepseek?.balance_infos ?? [];
			const pick = entries.find((b) => b.currency === "CNY") ?? entries[0] ?? null;
			const stale = deepseekStale || goQuotaStale;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ttbl",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tline",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "ps",
							children: "$"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "txt",
							children: "ds balance"
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tt-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.terminalColItem") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("skin.terminalColBalance") })]
					}),
					hasDeepseek && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tt-row",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "m",
							children: t("common.deepseekBalance")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "p",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "n",
								style: {
									width: "auto",
									color: "oklch(88% 0.02 150)"
								},
								children: pick ? `${pick.total_balance ?? "--"} ${pick.currency ?? "CNY"}` : "--"
							})
						})]
					}),
					hasGo && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tt-row",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "m",
							children: t("common.goWeeklyQuota")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "p",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "n",
								style: { width: "auto" },
								children: [
									goQuota.weekly.percent.toFixed(1),
									"% · ",
									dollars(goQuota.weekly.percent, GO_LIMITS.weekly)
								]
							})
						})]
					}),
					hasGo && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "tt-row",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "m",
							children: t("common.goMonthlyQuota")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "p",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "n",
								style: { width: "auto" },
								children: [
									goQuota.monthly.percent.toFixed(1),
									"% · ",
									dollars(goQuota.monthly.percent, GO_LIMITS.monthly)
								]
							})
						})]
					}),
					stale && (deepseekError || goQuotaError) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tline",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dim",
							style: { color: "#c07a5a" },
							children: t("common.staleWithDetail", { detail: deepseekError ?? goQuotaError ?? "" })
						})
					}),
					hasDeepseek && !deepseek.is_available && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tline",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "dim",
							children: "is_available: false"
						})
					})
				]
			});
		}
		/** 终端 · 收起态（光标 + 峰/闲）。 */
		function TerminalCollapsed({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-06",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "caret",
					children: "▍"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
				})]
			});
		}
		//#endregion
		//#region src/client/styles/registry.tsx
		/** 胶囊 · 收起态（横向 pill，圆点 + 「高峰/空闲」全词）。 */
		function PillsCollapsed({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-05",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), period === "peak" ? t("period.peak") : t("period.idle")]
			});
		}
		/** 粗野 · 收起态（反色块「峰/闲」）。 */
		function BrutalistCollapsed({ period }) {
			const t = useT();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ds-collapsed-07",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "box",
					children: period === "peak" ? t("period.peakShort") : t("period.idleShort")
				})
			});
		}
		/** 风格组件注册表（002-接口契约 §3 十一款）。 */
		const STYLE_COMPONENTS = {
			"01": {
				Expanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClassicExpanded, {
					styleClass: "ds-style-01",
					...props
				}),
				Collapsed: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotCollapsed, {
					styleClass: "ds-collapsed-01",
					...props
				})
			},
			"02": {
				Expanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClassicExpanded, {
					styleClass: "ds-style-02",
					...props
				}),
				Collapsed: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotCollapsed, {
					styleClass: "ds-collapsed-02",
					...props
				})
			},
			"03": {
				Expanded: ReceiptExpanded,
				Collapsed: ReceiptCollapsed
			},
			"04": {
				Expanded: MetroExpanded,
				Collapsed: MetroCollapsed
			},
			"05": {
				Expanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClassicExpanded, {
					styleClass: "ds-style-05",
					...props
				}),
				Collapsed: PillsCollapsed
			},
			"06": {
				Expanded: TerminalExpanded,
				Collapsed: TerminalCollapsed
			},
			"07": {
				Expanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClassicExpanded, {
					styleClass: "ds-style-07",
					...props
				}),
				Collapsed: BrutalistCollapsed
			},
			"08": {
				Expanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ClassicExpanded, {
					styleClass: "ds-style-08",
					...props
				}),
				Collapsed: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DotCollapsed, {
					styleClass: "ds-collapsed-08",
					...props
				})
			},
			"09": {
				Expanded: DayNightExpanded,
				Collapsed: DayNightCollapsed
			},
			"10": {
				Expanded: EditorialExpanded,
				Collapsed: EditorialCollapsed
			},
			"11": {
				Expanded: () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {}),
				Collapsed: () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {}),
				DualExpanded: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AnimalIslandExpanded, { ...props }),
				DualCollapsed: (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AnimalIslandCollapsed, { ...props })
			}
		};
		/** 按风格编号取组件对（缺省回退到 01）。 */
		function styleComponents(styleId) {
			return STYLE_COMPONENTS[styleId] ?? STYLE_COMPONENTS["01"];
		}
		/** 按风格编号取双视图组件对（仅双视图风格有效）。 */
		function dualViewComponents(styleId) {
			const entry = STYLE_COMPONENTS[styleId];
			return entry && "DualExpanded" in entry ? entry : null;
		}
		//#endregion
		//#region src/client/components/SettingsSection.tsx
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
		/** 设置页 · DS峰谷小组件。 */
		function SettingsSection(props) {
			const { t } = props;
			const preferences = usePreferences();
			const { period, cursorPercent } = usePeriod();
			const usageState = useUsage();
			const goQuotaState = useGoQuota();
			const deepseekState = useDeepseekBalance();
			const components = styleComponents(preferences.styleId);
			const dualComp = isDualViewStyle(preferences.styleId) ? dualViewComponents(preferences.styleId) : null;
			const [previewExpanded, setPreviewExpanded] = (0, react.useState)(true);
			const [previewViewTab, setPreviewViewTab] = (0, react.useState)("pricing");
			const [previewUsageDetail, setPreviewUsageDetail] = (0, react.useState)(true);
			const [goKeyInput, setGoKeyInput] = (0, react.useState)("");
			const [dsKeyInput, setDsKeyInput] = (0, react.useState)("");
			const [cfgStatus, setCfgStatus] = (0, react.useState)(null);
			const [saving, setSaving] = (0, react.useState)(false);
			const [saveMsg, setSaveMsg] = (0, react.useState)(null);
			const goQuotaError = useHostError(goQuotaState.errorCode, goQuotaState.error);
			const deepseekError = useHostError(deepseekState.errorCode, deepseekState.error);
			(0, react.useEffect)(() => {
				fetch("/go-quota/config", { cache: "no-store" }).then((r) => r.json()).then((j) => setCfgStatus(j)).catch(() => {});
			}, []);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TranslatorProvider, {
				t,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "ds-pv-settings",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: t("settings.label") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: "ds-pv-desc",
							children: t("settings.describe")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ds-pv-row",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "ds-pv-row-label",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("settings.enabled") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "hint",
									children: t("settings.enabledHint")
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ds-pv-switch",
								role: "switch",
								"aria-checked": preferences.enabled,
								onClick: () => setPreferences({ enabled: !preferences.enabled }),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "visually-hidden",
									children: preferences.enabled ? t("settings.switchOn") : t("settings.switchOff")
								})
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ds-pv-row",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "ds-pv-row-label",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("settings.simulate") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "hint",
									children: t("settings.simulateHint")
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ds-pv-seg",
								role: "group",
								"aria-label": t("settings.simulateAria"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": period === "peak",
									onClick: () => setPeriodOverride(period === "peak" ? null : "peak"),
									children: t("period.peak")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": period === "idle",
									onClick: () => setPeriodOverride(period === "idle" ? null : "idle"),
									children: t("period.idle")
								})]
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
							className: "ds-pv-fieldset",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("settings.keysLegend") }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "hint",
									style: {
										margin: "0 0 8px",
										lineHeight: 1.6
									},
									children: [t("settings.keysHint"), cfgStatus && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										style: {
											display: "block",
											marginTop: 4
										},
										children: [
											"Go: ",
											cfgStatus.goKeyConfigured ? cfgStatus.goKeyMasked : t("settings.notConfigured"),
											" · DeepSeek: ",
											cfgStatus.deepseekKeyConfigured ? cfgStatus.deepseekKeyMasked : t("settings.notConfigured"),
											goQuotaError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: { color: "#a33" },
												children: [
													" · ",
													t("settings.goError"),
													":",
													goQuotaError.slice(0, 40)
												]
											}),
											deepseekError && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: { color: "#a33" },
												children: [
													" · ",
													t("settings.deepseekError"),
													":",
													deepseekError.slice(0, 40)
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										display: "grid",
										gap: 8
									},
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											style: {
												display: "grid",
												gap: 4
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: {
													fontSize: 12,
													fontWeight: 600
												},
												children: t("settings.goKeyLabel")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: cfgStatus?.goKeyMasked || t("settings.keyPlaceholder"),
												value: goKeyInput,
												onChange: (e) => setGoKeyInput(e.target.value),
												style: {
													padding: "6px 10px",
													border: "1px solid var(--dsw-alias-border-l1)",
													borderRadius: 6,
													fontSize: 12
												}
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
											style: {
												display: "grid",
												gap: 4
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: {
													fontSize: 12,
													fontWeight: 600
												},
												children: t("settings.deepseekKeyLabel")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: cfgStatus?.deepseekKeyMasked || t("settings.keyPlaceholder"),
												value: dsKeyInput,
												onChange: (e) => setDsKeyInput(e.target.value),
												style: {
													padding: "6px 10px",
													border: "1px solid var(--dsw-alias-border-l1)",
													borderRadius: 6,
													fontSize: 12
												}
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												gap: 8,
												alignItems: "center"
											},
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: saving,
													onClick: async () => {
														setSaving(true);
														setSaveMsg(null);
														try {
															const body = {};
															if (goKeyInput.trim()) body.goKey = goKeyInput.trim();
															if (dsKeyInput.trim()) body.deepseekKey = dsKeyInput.trim();
															if (Object.keys(body).length === 0) {
																setSaveMsg(t("settings.noNewKey"));
																return;
															}
															const j = await (await fetch("/go-quota/config", {
																method: "POST",
																headers: { "Content-Type": "application/json" },
																body: JSON.stringify(body)
															})).json();
															if (!j.ok && j.error) throw new Error(j.error);
															setCfgStatus((prev) => ({
																...prev,
																goKeyMasked: j.goKeyMasked ?? prev?.goKeyMasked,
																deepseekKeyMasked: j.deepseekKeyMasked ?? prev?.deepseekKeyMasked,
																goKeyConfigured: !!j.goKeyMasked,
																deepseekKeyConfigured: !!j.deepseekKeyMasked
															}));
															setSaveMsg(t("settings.saved"));
															setGoKeyInput("");
															setDsKeyInput("");
															setTimeout(() => {
																fetch("/go-quota/usage", { cache: "no-store" }).catch(() => {});
																fetch("/deepseek/balance", { cache: "no-store" }).catch(() => {});
																refreshDeepseek();
															}, 300);
														} catch (e) {
															setSaveMsg(e?.message ?? String(e));
														} finally {
															setSaving(false);
															setTimeout(() => setSaveMsg(null), 3e3);
														}
													},
													style: {
														padding: "6px 14px",
														borderRadius: 6,
														border: "1px solid var(--dsw-alias-border-l1)",
														background: "var(--dsw-alias-bg-layer-2)",
														cursor: "pointer",
														fontSize: 12
													},
													children: saving ? t("settings.saving") : t("settings.save")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: async () => {
														if (!confirm(t("settings.clearConfirm"))) return;
														await (await fetch("/go-quota/config", {
															method: "POST",
															headers: { "Content-Type": "application/json" },
															body: JSON.stringify({
																goKey: "",
																deepseekKey: ""
															})
														})).json();
														setCfgStatus({
															goKeyConfigured: false,
															deepseekKeyConfigured: false,
															goKeyMasked: "",
															deepseekKeyMasked: ""
														});
														setSaveMsg(t("settings.cleared"));
														setTimeout(() => setSaveMsg(null), 2e3);
													},
													style: {
														padding: "6px 10px",
														borderRadius: 6,
														border: "1px solid var(--dsw-alias-border-l1)",
														background: "transparent",
														cursor: "pointer",
														fontSize: 12
													},
													children: t("settings.clear")
												}),
												saveMsg && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														fontSize: 12,
														color: saveMsg === t("settings.noNewKey") ? "#a33" : "#1a7"
													},
													children: saveMsg
												})
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
							className: "ds-pv-fieldset",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("settings.stylesLegend") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "ds-pv-styles",
								children: STYLE_IDS.map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StyleOption, {
									id,
									selected: preferences.styleId === id,
									onSelect: () => setPreferences({ styleId: id })
								}, id))
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ds-pv-preview",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: "ds-pv-preview-title",
								children: [
									t("settings.preview"),
									" · ",
									t(STYLE_NAME_KEY[preferences.styleId]),
									" ",
									STYLE_CATALOG[preferences.styleId].nameEn
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ds-pv-preview-stack",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ds-pv-preview-item ds-pv-preview-item--expanded",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ds-pv-preview-label",
										children: t("settings.previewExpanded")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "ds-pv",
										"data-period": period,
										"data-tab": previewViewTab,
										role: "group",
										"aria-label": t("settings.previewAriaExpanded"),
										children: dualComp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(dualComp.DualExpanded, {
											period,
											cursorPercent,
											priceTableExpanded: previewExpanded,
											onTogglePriceTable: () => setPreviewExpanded((v) => !v),
											viewTab: previewViewTab,
											onToggleViewTab: () => setPreviewViewTab((v) => v === "pricing" ? "usage" : "pricing"),
											usageDetailExpanded: previewUsageDetail,
											onToggleUsageDetail: () => setPreviewUsageDetail((v) => !v),
											usage: usageState.usage,
											usageReal: usageState.real,
											goQuota: goQuotaState.usage,
											goQuotaError: goQuotaState.error,
											goQuotaStale: goQuotaState.stale,
											deepseek: deepseekState.data,
											deepseekError: deepseekState.error,
											deepseekStale: deepseekState.stale,
											deepseekLoading: deepseekState.loading
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Expanded, {
											period,
											cursorPercent,
											priceTableExpanded: previewExpanded,
											onTogglePriceTable: () => setPreviewExpanded((v) => !v)
										})
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "ds-pv-preview-item ds-pv-preview-item--collapsed",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "ds-pv-preview-label",
										children: t("settings.previewCollapsed")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: "ds-pv",
										"data-period": period,
										"data-tab": previewViewTab,
										role: "group",
										"aria-label": t("settings.previewAriaCollapsed"),
										children: dualComp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(dualComp.DualCollapsed, {
											period,
											cursorPercent,
											viewTab: previewViewTab,
											usage: usageState.usage
										}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Collapsed, {
											period,
											cursorPercent
										})
									})]
								})]
							})]
						})
					]
				})
			});
		}
		/** 风格编号 → 本地化风格名键。 */
		const STYLE_NAME_KEY = {
			"01": "style.01",
			"02": "style.02",
			"03": "style.03",
			"04": "style.04",
			"05": "style.05",
			"06": "style.06",
			"07": "style.07",
			"08": "style.08",
			"09": "style.09",
			"10": "style.10",
			"11": "style.11"
		};
		/** 单款风格选项（aria-pressed 单选语义）。 */
		function StyleOption({ id, selected, onSelect }) {
			const t = useT();
			const spec = STYLE_CATALOG[id];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ds-pv-style-option",
				"aria-pressed": selected,
				onClick: onSelect,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ds-idx",
						children: id
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ds-zh",
						children: t(STYLE_NAME_KEY[id])
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "ds-en",
						children: spec.nameEn
					})
				]
			});
		}
		//#endregion
		//#region src/client/state/dual-state.ts
		/** 默认记录：收起 + 计费视图。 */
		const DEFAULT_SESSION_STATE = {
			dual: "collapsed",
			priceTableExpanded: false,
			viewTab: "pricing",
			usageDetailExpanded: true
		};
		/** 无活跃会话时的稳定兜底 key，保证本地 UI 开关仍可操作。 */
		const ANONYMOUS_SESSION_KEY = "__anonymous__";
		function resolveSessionKey(sessionId) {
			return sessionId ?? ANONYMOUS_SESSION_KEY;
		}
		const dualState = createStore(() => ({
			version: 0,
			buckets: /* @__PURE__ */ new Map()
		}));
		function mutate(mutator) {
			const prev = dualState.getSnapshot();
			const next = new Map(prev.buckets);
			mutator(next);
			dualState.set({
				version: prev.version + 1,
				buckets: next
			});
		}
		/** 设置某会话价格表展开/收起。 */
		function setPriceTableExpanded(sessionId, expanded) {
			const key = resolveSessionKey(sessionId);
			mutate((buckets) => {
				const prev = buckets.get(key) ?? DEFAULT_SESSION_STATE;
				buckets.set(key, {
					...prev,
					dual: expanded ? "expanded" : "collapsed",
					priceTableExpanded: expanded
				});
			});
		}
		/** 切换某会话的视图标签页。 */
		function toggleViewTab(sessionId) {
			const key = resolveSessionKey(sessionId);
			mutate((buckets) => {
				const prev = buckets.get(key) ?? DEFAULT_SESSION_STATE;
				buckets.set(key, {
					...prev,
					viewTab: prev.viewTab === "pricing" ? "usage" : "pricing"
				});
			});
		}
		/** 设置某会话用量明细展开/收起。 */
		function setUsageDetailExpanded(sessionId, expanded) {
			const key = resolveSessionKey(sessionId);
			mutate((buckets) => {
				const prev = buckets.get(key) ?? DEFAULT_SESSION_STATE;
				buckets.set(key, {
					...prev,
					usageDetailExpanded: expanded
				});
			});
		}
		/**
		* 组件内读取某会话的双态记录。
		* 为避免「无活跃会话时 UI 开关失效」，这里对 undefined 做本地兜底：
		* 使用稳定匿名 key 记忆当前浏览器内的 UI 状态。
		*/
		function useSessionDualState(sessionId) {
			const snapshot = useStore(dualState);
			const key = sessionId ?? ANONYMOUS_SESSION_KEY;
			return snapshot.buckets.get(key) ?? DEFAULT_SESSION_STATE;
		}
		/** fiber dispose 时清空分桶（003 契约：dispose 清理 controller 状态）。 */
		function resetDualStateBuckets() {
			mutate((buckets) => {
				buckets.clear();
			});
		}
		//#endregion
		//#region src/client/components/Widget.tsx
		/** 侧边栏小组件入口组件。 */
		function PeakValleyWidget(props) {
			const { wide, t } = props;
			const preferences = usePreferences();
			const { period, cursorPercent } = usePeriod();
			const usageState = useUsage();
			const goQuotaState = useGoQuota();
			const deepseekState = useDeepseekBalance();
			const sessionId = props.useSessions((state) => state.current);
			const dual = useSessionDualState(sessionId);
			const components = styleComponents(preferences.styleId);
			if (!preferences.enabled) return null;
			const dualComp = isDualViewStyle(preferences.styleId) ? dualViewComponents(preferences.styleId) : null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TranslatorProvider, {
				t,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PeakValleyBody, {
					wide,
					t,
					period,
					cursorPercent,
					sessionId,
					dual,
					components,
					dualComp,
					usageState,
					goQuotaState,
					deepseekState
				})
			});
		}
		/**
		* 组件树主体：Provider 之内，因此可以安全地把宿主错误码翻译成当前语言。
		* 拆成独立组件是为了让 `useHostError`（依赖 context）位于 Provider 内部。
		*/
		function PeakValleyBody({ wide, t, period, cursorPercent, sessionId, dual, components, dualComp, usageState, goQuotaState, deepseekState }) {
			const goQuotaError = useHostError(goQuotaState.errorCode, goQuotaState.error);
			const deepseekError = useHostError(deepseekState.errorCode, deepseekState.error);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ds-pv",
				"data-period": period,
				"data-tab": dual.viewTab,
				role: "group",
				"aria-label": t("plugin.aria"),
				children: wide ? dualComp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(dualComp.DualExpanded, {
					period,
					cursorPercent,
					priceTableExpanded: dual.priceTableExpanded,
					onTogglePriceTable: () => {
						setPriceTableExpanded(sessionId, !dual.priceTableExpanded);
					},
					viewTab: dual.viewTab,
					onToggleViewTab: () => {
						toggleViewTab(sessionId);
					},
					usageDetailExpanded: dual.usageDetailExpanded,
					onToggleUsageDetail: () => {
						setUsageDetailExpanded(sessionId, !dual.usageDetailExpanded);
					},
					usage: usageState.usage,
					usageReal: usageState.real,
					goQuota: goQuotaState.usage,
					goQuotaError,
					goQuotaStale: goQuotaState.stale,
					deepseek: deepseekState.data,
					deepseekError,
					deepseekStale: deepseekState.stale,
					deepseekLoading: deepseekState.loading
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Expanded, {
					period,
					cursorPercent,
					priceTableExpanded: dual.priceTableExpanded,
					onTogglePriceTable: () => {
						if (sessionId !== void 0) setPriceTableExpanded(sessionId, !dual.priceTableExpanded);
						else setPriceTableExpanded(void 0, !dual.priceTableExpanded);
					},
					deepseek: deepseekState.data,
					deepseekError,
					deepseekStale: deepseekState.stale,
					deepseekLoading: deepseekState.loading,
					goQuota: goQuotaState.usage,
					goQuotaError,
					goQuotaStale: goQuotaState.stale,
					goQuotaLoading: goQuotaState.loading
				}) : dualComp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(dualComp.DualCollapsed, {
					period,
					cursorPercent,
					viewTab: dual.viewTab,
					goQuota: goQuotaState.usage
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Collapsed, {
					period,
					cursorPercent
				})
			});
		}
		//#endregion
		//#region \0dsh-inline-css:C:\Projects\dsh-deepseek-peak-valley\src\client\styles\settings.css.mjs
		var settings_css_default = ".ds-pv-settings .visually-hidden{clip:rect(0 0 0 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.ds-pv-settings{color:inherit;flex-direction:column;gap:16px;font-size:13px;line-height:1.6;display:flex}.ds-pv-settings h2{letter-spacing:-.01em;margin:0;font-size:16px;font-weight:700}.ds-pv-settings .ds-pv-desc{color:inherit;opacity:.72;max-width:52ch;margin:0;font-size:12.5px}.ds-pv-row{border:1px solid;border-radius:10px;justify-content:space-between;align-items:center;gap:16px;padding:10px 12px;display:flex}.ds-pv-row .ds-pv-row-label{flex-direction:column;gap:2px;display:flex}.ds-pv-row .ds-pv-row-label .hint{opacity:.6;font-size:11px}.ds-pv-switch{background:0 0;border:1px solid;border-radius:999px;flex:none;width:40px;height:22px;transition:background .15s;position:relative}.ds-pv-switch:after{content:\"\";opacity:.35;background:currentColor;border-radius:50%;width:16px;height:16px;transition:left .15s,opacity .15s;position:absolute;top:2px;left:2px}.ds-pv-switch[aria-checked=true]:after{opacity:1;left:20px}.ds-pv-seg{border:1px solid;border-radius:999px;gap:2px;padding:3px;display:inline-flex}.ds-pv-seg button{cursor:pointer;background:0 0;border:0;border-radius:999px;padding:5px 12px;font-size:12px;font-weight:600}.ds-pv-seg button[aria-pressed=true]{background:currentColor}.ds-pv-fieldset{border:1px solid;border-radius:12px;margin:0;padding:12px 12px 14px}.ds-pv-fieldset legend{letter-spacing:.03em;padding-inline:4px;font-size:12px;font-weight:700}.ds-pv-styles{grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;display:grid}.ds-pv-style-option{text-align:left;cursor:pointer;background:0 0;border:1px solid;border-radius:10px;flex-direction:column;align-items:flex-start;gap:3px;padding:8px 10px;display:flex}.ds-pv-style-option[aria-pressed=true]{outline-offset:1px;outline:2px solid}.ds-pv-style-option .ds-idx{opacity:.55;letter-spacing:.06em;font-family:ui-monospace,monospace;font-size:9.5px}.ds-pv-style-option .ds-zh{font-size:12.5px;font-weight:700}.ds-pv-style-option .ds-en{opacity:.6;text-transform:uppercase;letter-spacing:.05em;font-family:ui-monospace,monospace;font-size:9px}.ds-pv-preview{border:1px dashed;border-radius:12px;flex-direction:column;gap:12px;padding:14px;display:flex}.ds-pv-preview .ds-pv-preview-title{letter-spacing:.08em;text-transform:uppercase;opacity:.6;font-size:11px;font-weight:700}.ds-pv-preview-stack{flex-wrap:nowrap;align-items:flex-start;gap:14px;display:flex;overflow-x:auto}.ds-pv-preview-stack .ds-pv-preview-item{flex-direction:column;flex:none;align-items:flex-start;gap:6px;min-width:0;display:flex}.ds-pv-preview-stack .ds-pv-preview-item .ds-pv-preview-label{letter-spacing:.08em;text-transform:uppercase;opacity:.6;white-space:nowrap;font-size:11px;font-weight:700}.ds-pv-preview-stack .ds-pv-preview-item--expanded{width:268px}.ds-pv-preview-stack .ds-pv-preview-item--expanded .ds-pv{width:100%}.ds-pv-preview-stack .ds-pv-preview-item--collapsed .ds-pv{width:max-content;max-width:100%}";
		//#endregion
		//#region \0dsh-inline-css:C:\Projects\dsh-deepseek-peak-valley\src\client\styles\widget.css.mjs
		var widget_css_default = ".ds-pv{box-sizing:border-box;-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;width:100%;min-width:0;font-family:-apple-system,BlinkMacSystemFont,Inter,Segoe UI,system-ui,sans-serif;font-size:11px;line-height:1.55}.ds-pv *,.ds-pv :before,.ds-pv :after{box-sizing:border-box}.ds-pv button{font:inherit;cursor:pointer;color:inherit}.ds-pv button:focus-visible,.ds-pv a:focus-visible{outline:2px solid var(--accent,currentColor);outline-offset:2px}.ds-pv svg{display:block}.ds-pv table{border-collapse:collapse}.ds-pv .w{width:100%;min-width:0;font-size:11px}.ds-pv .w-head{justify-content:space-between;align-items:center;gap:8px;display:flex}.ds-pv .w-badge{align-items:center;gap:5px;display:inline-flex}.ds-pv .w-badge .dot{border-radius:50%;flex:none;width:6px;height:6px}.ds-pv .tl-bar{border-radius:3px;height:6px;position:relative}.ds-pv .tl-track{border-radius:inherit;display:flex;position:absolute;inset:0;overflow:hidden}.ds-pv .tl-track>i{display:block}.ds-pv .tl-cur{background:var(--now);z-index:1;width:2px;height:12px;transition:left .3s;position:absolute;top:-3px}.ds-pv .tl-meta{letter-spacing:.02em;margin-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-pv .w-tl{margin-top:10px}.ds-pv .tl-fill{background:var(--now);border-radius:inherit;flex:none;height:100%;transition:width .3s;display:block}.ds-pv .w-usage{margin-top:8px}.ds-pv .wt{border-collapse:collapse;table-layout:fixed;width:100%;margin-top:9px}.ds-pv .wt th,.ds-pv .wt td{text-align:left;padding:4px 2px;font-size:11px;line-height:1.4}.ds-pv .wt td:nth-child(2),.ds-pv .wt td:nth-child(3),.ds-pv .wt th:nth-child(2),.ds-pv .wt th:nth-child(3){text-align:right;width:46px}.ds-pv .wt .n{font-variant-numeric:tabular-nums;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-pv .wt .hx{opacity:0;border-radius:1px;height:2px;margin-top:2px;transition:opacity .2s;display:block}.ds-pv[data-period=peak] .wt .hx.hp,.ds-pv[data-period=idle] .wt .hx.hi{opacity:1;background:var(--now)}.ds-pv .w-foot{color:inherit;letter-spacing:.02em;margin-top:8px;padding-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-pv .w-toggle{text-align:left;letter-spacing:.02em;background:0 0;border:0;border-top:1px solid;justify-content:space-between;align-items:center;gap:8px;width:100%;margin-top:9px;padding:5px 2px;font-size:10px;font-weight:600;display:flex}.ds-pv .w-toggle .t-chev{flex:none;width:12px;height:12px;transition:transform .2s}.ds-pv .w:not(.is-collapsed) .w-toggle .t-chev{transform:rotate(90deg)}.ds-pv .w.is-collapsed .wt,.ds-pv .w.is-collapsed .ttbl,.ds-pv .w.is-collapsed .w-foot,.ds-pv .w.is-collapsed .term-foot{display:none}@keyframes dsh-pv-pulse{0%,to{opacity:1}50%{opacity:.45}}.ds-style-01,.ds-collapsed-01{--peak:oklch(80% .15 75);--idle:oklch(78% .11 195);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-01,.ds-pv[data-period=idle] .ds-collapsed-01{--now:var(--idle)}.ds-style-01{color:oklch(94% .01 250);background:oklch(27% .02 262);border:1px solid oklch(44% .03 258);border-radius:12px;padding:12px;box-shadow:0 10px 26px oklch(10% .03 260/.45),inset 0 1px oklch(100% 0 0/.06)}.ds-style-01 .w-name{letter-spacing:.01em;font-size:12px;font-weight:600}.ds-style-01 .w-badge{background:color-mix(in oklch, var(--now) 16%, transparent);border:1px solid color-mix(in oklch, var(--now) 32%, transparent);color:var(--now);border-radius:999px;padding:3px 8px;font-size:10.5px;font-weight:600}.ds-style-01 .w-badge .dot{background:var(--now);box-shadow:0 0 6px var(--now);animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-style-01 .tl-track{background:oklch(20% .015 262);border:1px solid oklch(36% .02 258)}.ds-style-01 .tl-track .s-idle{background:color-mix(in oklch, var(--idle) 34%, transparent)}.ds-style-01 .tl-track .s-peak{background:var(--peak)}.ds-style-01 .tl-cur{background:var(--now);box-shadow:0 0 6px var(--now);height:10px;top:-2px}.ds-style-01 .tl-meta{color:oklch(64% .02 252)}.ds-style-01 .wt th{color:oklch(66% .02 252);letter-spacing:.06em;font-size:9.5px}.ds-style-01 .wt td{color:oklch(88% .01 250)}.ds-style-01 .wt td:not(.n){color:oklch(75% .02 250)}.ds-style-01 .wt tr+tr td,.ds-style-01 .wt thead th{border-top:1px solid oklch(38% .02 258)}.ds-style-01 .wt .wtm td{color:oklch(92% .01 250);font-weight:600}.ds-style-01 .n.ci{color:var(--idle)}.ds-style-01 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-01 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-01 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-01 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-01 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 9%, transparent)}.ds-style-01 .w-foot{color:oklch(60% .02 252)}.ds-style-01 .w-toggle{color:oklch(66% .02 252);border-top-color:oklch(38% .02 258)}.ds-style-01 .w-toggle:hover{color:oklch(92% .01 250)}.ds-collapsed-01{width:42px;height:54px;color:var(--now);background:oklch(27% .02 262);border:1px solid oklch(44% .03 258);border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.ds-collapsed-01 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 8px var(--now);border-radius:50%;animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-collapsed-01 .lbl{font-size:10px;font-weight:600}.ds-style-02,.ds-collapsed-02{--peak:oklch(48% .15 40);--idle:oklch(47% .1 160);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-02,.ds-pv[data-period=idle] .ds-collapsed-02{--now:var(--idle)}.ds-style-02{color:oklch(24% .02 240);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:10px;padding:14px;box-shadow:0 1px 2px oklch(20% .02 240/.04)}.ds-style-02 .w-name{font-size:12.5px;font-weight:600}.ds-style-02 .w-badge{color:var(--now);font-size:11px;font-weight:600}.ds-style-02 .w-badge .dot{background:var(--now)}.ds-style-02 .tl-track{background:oklch(95% .005 240)}.ds-style-02 .tl-track .s-idle{background:oklch(86% .09 155)}.ds-style-02 .tl-track .s-peak{background:oklch(70% .13 42)}.ds-style-02 .tl-cur{background:var(--now);width:2px;height:10px;top:-2px}.ds-style-02 .tl-meta{color:oklch(56% .015 240)}.ds-style-02 .wt th{color:oklch(62% .015 240);letter-spacing:.05em;font-size:9.5px}.ds-style-02 .wt td{color:oklch(32% .02 240)}.ds-style-02 .wt tr+tr td,.ds-style-02 .wt thead th{border-top:1px solid oklch(94% .005 240)}.ds-style-02 .wt .wtm td{color:oklch(24% .02 240);font-weight:600}.ds-style-02 .n.ci{color:var(--idle)}.ds-style-02 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-02 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-02 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-02 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-02 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 5%, transparent)}.ds-style-02 .w-foot{color:oklch(56% .015 240);border-top:1px solid oklch(94% .005 240)}.ds-style-02 .w-toggle{color:oklch(56% .015 240);border-top-color:oklch(94% .005 240)}.ds-style-02 .w-toggle:hover{color:oklch(24% .02 240)}.ds-collapsed-02{width:42px;height:54px;color:var(--now);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:10px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex;box-shadow:0 1px 2px oklch(20% .02 240/.04)}.ds-collapsed-02 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 6px color-mix(in oklch, var(--now) 40%, transparent);border-radius:50%;animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-collapsed-02 .lbl{font-size:10px;font-weight:600}.ds-style-03,.ds-collapsed-03{--peak:oklch(48% .2 26);--idle:oklch(46% .13 235);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-03,.ds-pv[data-period=idle] .ds-collapsed-03{--now:var(--idle)}.ds-style-03{color:oklch(34% .02 70);background:oklch(98.5% .008 90);border:1px solid oklch(86% .02 80);border-radius:4px;padding:12px 14px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;position:relative;box-shadow:0 1px oklch(86% .02 80)}.ds-style-03 .w-head{text-align:center;padding-bottom:2px}.ds-style-03 .w-name{letter-spacing:.06em;font-size:12px;font-weight:700}.ds-style-03 .w-sub{letter-spacing:.14em;color:oklch(55% .03 80);margin-top:2px;font-size:9px}.ds-style-03 .stamp{border:1.5px solid var(--now);color:var(--now);letter-spacing:.12em;opacity:.88;border-radius:3px;padding:1px 7px;font-size:12px;font-weight:700;position:absolute;top:10px;right:12px;transform:rotate(-4deg)}.ds-style-03 .w-tear{border-top:2px dashed oklch(80% .03 80);height:0;margin:10px 0 8px;position:relative}.ds-style-03 .w-tear:before,.ds-style-03 .w-tear:after{content:\"\";background:oklch(94% .012 85);border-radius:50%;width:14px;height:14px;position:absolute;top:-7px}.ds-style-03 .w-tear:before{left:-21px}.ds-style-03 .w-tear:after{right:-21px}.ds-style-03 .w-tl{margin-top:0}.ds-style-03 .tl-bar{height:8px}.ds-style-03 .tl-track{background:oklch(94% .012 85);border:1px dashed oklch(80% .03 80)}.ds-style-03 .tl-track .s-idle{background:color-mix(in oklch, var(--idle) 30%, transparent)}.ds-style-03 .tl-track .s-peak{background:color-mix(in oklch, var(--peak) 78%, transparent)}.ds-style-03 .tl-cur{background:var(--now);width:1.5px;height:12px;top:-2px}.ds-style-03 .tl-meta{color:oklch(55% .03 80)}.ds-style-03 .wt th{color:oklch(58% .03 80);letter-spacing:.08em;font-size:9px}.ds-style-03 .wt td{color:oklch(36% .02 70);font-size:10.5px}.ds-style-03 .wt tr:not(.wtm) td{border-bottom:1px dotted oklch(80% .03 80)}.ds-style-03 .wt thead th{border-bottom:1px solid oklch(70% .03 80)}.ds-style-03 .wt .wtm td{letter-spacing:.14em;color:oklch(30% .02 70);font-size:9.5px;font-weight:700}.ds-style-03 .n.ci{color:var(--idle)}.ds-style-03 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-03 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-03 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-03 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-03 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 7%, transparent)}.ds-style-03 .w-foot{color:oklch(52% .03 80)}.ds-style-03 .w-toggle{letter-spacing:.06em;color:oklch(52% .03 80);border-top:1px dotted oklch(80% .03 80);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-style-03 .w-toggle:hover{color:oklch(30% .02 70)}.ds-style-03 .bcode{opacity:.85;background:repeating-linear-gradient(90deg,oklch(32% .02 70) 0 1.5px,#0000 1.5px 3px,oklch(32% .02 70) 3px 5px,#0000 5px 6px);height:13px;margin-top:6px}.ds-collapsed-03{width:42px;height:54px;color:var(--now);background:oklch(98.5% .008 90);border:1px solid oklch(86% .02 80);border-radius:4px;flex-direction:column;justify-content:center;align-items:center;gap:4px;display:flex;position:relative}.ds-collapsed-03 .dot{background:var(--now);border-radius:50%;width:9px;height:9px}.ds-collapsed-03 .lbl{letter-spacing:.08em;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10px;font-weight:700}.ds-collapsed-03:before,.ds-collapsed-03:after{content:\"\";background:oklch(94% .012 85);border:1px solid oklch(86% .02 80);border-top:0;border-radius:0 0 50% 50%;width:16px;height:8px;position:absolute;left:50%;transform:translate(-50%)}.ds-collapsed-03:before{top:-1px}.ds-collapsed-03:after{bottom:-1px;transform:translate(-50%)rotate(180deg)}.ds-style-04,.ds-collapsed-04{--peak:oklch(50% .17 45);--idle:oklch(50% .11 225);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-04,.ds-pv[data-period=idle] .ds-collapsed-04{--now:var(--idle)}.ds-style-04{color:oklch(24% .02 240);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:12px;padding:14px}.ds-style-04 .w-name{font-size:12.5px;font-weight:600}.ds-style-04 .w-badge{color:var(--now);font-size:11px;font-weight:600}.ds-style-04 .w-badge .dot{background:var(--now)}.ds-style-04 .line{height:12px;margin:14px 2px 0;position:relative}.ds-style-04 .line:before{content:\"\";background:linear-gradient(90deg, var(--idle) 0 37.5%, var(--peak) 37.5% 50%, var(--idle) 50% 58.34%, var(--peak) 58.34% 75%, var(--idle) 75% 100%);border-radius:2px;height:4px;position:absolute;top:4px;left:0;right:0}.ds-style-04[data-weekend=\"1\"] .line:before{background:var(--idle)}.ds-style-04 .sta{background:oklch(100% 0 0);border:2.5px solid oklch(60% .03 240);border-radius:50%;width:9px;height:9px;margin-left:-4.5px;position:absolute;top:1.5px}.ds-style-04 .train{border:3px solid var(--now);width:12px;height:12px;box-shadow:0 0 0 2px color-mix(in oklch, var(--now) 30%, transparent);background:oklch(100% 0 0);border-radius:50%;margin-left:-6px;transition:left .3s;position:absolute;top:0}.ds-style-04 .line-times{color:oklch(56% .015 240);justify-content:space-between;margin-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:8.5px;display:flex}.ds-style-04 .legend{color:oklch(56% .015 240);gap:10px;margin-top:4px;font-size:9.5px;display:flex}.ds-style-04 .legend i{vertical-align:-1px;border-radius:2px;width:8px;height:8px;margin-right:4px;display:inline-block}.ds-style-04 .legend .lg-pk{background:var(--peak)}.ds-style-04 .legend .lg-id{background:var(--idle)}.ds-style-04 .wt th{color:oklch(62% .015 240);letter-spacing:.05em;font-size:9.5px}.ds-style-04 .wt td{color:oklch(32% .02 240)}.ds-style-04 .wt tr+tr td,.ds-style-04 .wt thead th{border-top:1px solid oklch(94% .005 240)}.ds-style-04 .wt .wtm td{color:oklch(24% .02 240);font-weight:600}.ds-style-04 .n.ci{color:var(--idle)}.ds-style-04 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-04 .n.cp,.ds-pv[data-period=idle] .ds-style-04 .n.ci{font-weight:700}.ds-style-04 .w-foot{color:oklch(56% .015 240);border-top:1px solid oklch(94% .005 240)}.ds-style-04 .w-toggle{color:oklch(56% .015 240);border-top-color:oklch(94% .005 240)}.ds-style-04 .w-toggle:hover{color:oklch(24% .02 240)}.ds-collapsed-04{flex-direction:column;align-items:center;gap:6px;display:flex}.ds-collapsed-04 .mini{background:linear-gradient(180deg, var(--idle) 0 37.5%, var(--peak) 37.5% 50%, var(--idle) 50% 58.34%, var(--peak) 58.34% 75%, var(--idle) 75% 100%);border-radius:3px;width:16px;height:44px;position:relative}.ds-collapsed-04[data-weekend=\"1\"] .mini{background:var(--idle)}.ds-collapsed-04 .train{border:2px solid var(--now);width:8px;height:8px;box-shadow:0 0 0 1.5px color-mix(in oklch, var(--now) 35%, transparent);background:oklch(100% 0 0);border-radius:50%;margin-left:-4px;transition:top .3s;position:absolute;left:50%}.ds-collapsed-04 .lbl{color:var(--now);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px;font-weight:600}.ds-style-05,.ds-collapsed-05{--peak:oklch(48% .15 45);--idle:oklch(48% .1 220);--now:var(--peak);--pk-fg:oklch(40% .15 45);--id-fg:oklch(40% .1 220);--pk-bg:oklch(92% .06 60);--id-bg:oklch(92% .05 215)}.ds-pv[data-period=idle] .ds-style-05,.ds-pv[data-period=idle] .ds-collapsed-05{--now:var(--idle)}.ds-style-05{color:oklch(28% .02 90);background:oklch(100% 0 0);border:1px solid oklch(92% .008 90);border-radius:18px;padding:14px}.ds-style-05 .w-name{font-size:12.5px;font-weight:600}.ds-style-05 .w-badge{background:color-mix(in oklch, var(--now) 13%, oklch(100% 0 0));color:var(--now);border-radius:999px;padding:4px 11px;font-size:11px;font-weight:600}.ds-style-05 .w-badge .dot{background:var(--now)}.ds-style-05 .tl-bar{height:8px}.ds-style-05 .tl-track{gap:3px}.ds-style-05 .tl-track>i{border-radius:6px}.ds-style-05 .tl-track .s-idle{background:var(--id-bg)}.ds-style-05 .tl-track .s-peak{background:var(--pk-bg)}.ds-style-05 .tl-cur{background:var(--now);border-radius:2px;width:3px;height:12px;top:-2px}.ds-style-05 .tl-meta{color:oklch(56% .02 90)}.ds-style-05 .wt th{color:oklch(62% .02 90);font-size:9.5px}.ds-style-05 .wt td{color:oklch(34% .02 90)}.ds-style-05 .wt tr+tr td,.ds-style-05 .wt thead th{border-top:1px solid oklch(94% .01 90)}.ds-style-05 .wt .n{border-radius:7px;padding:1px 5px}.ds-style-05 .wt .n.ci{color:var(--id-fg);background:var(--id-bg)}.ds-style-05 .wt .n.cp{color:var(--pk-fg);background:var(--pk-bg)}.ds-style-05 .wt .wtm td{font-weight:700}.ds-pv[data-period=peak] .ds-style-05 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-05 .wt td:nth-child(2){box-shadow:inset 0 -2px 0 var(--now);border-radius:4px}.ds-style-05 .w-foot{color:oklch(55% .02 90)}.ds-style-05 .w-toggle{color:oklch(55% .02 90);border-top-color:oklch(94% .01 90)}.ds-style-05 .w-toggle:hover{color:oklch(28% .02 90)}.ds-collapsed-05{background:color-mix(in oklch, var(--now) 13%, oklch(100% 0 0));color:var(--now);border:1px solid color-mix(in oklch, var(--now) 26%, transparent);border-radius:999px;align-items:center;gap:6px;padding:9px 12px;font-size:11px;font-weight:600;display:flex}.ds-collapsed-05 .dot{background:var(--now);border-radius:50%;width:7px;height:7px}.ds-style-06,.ds-collapsed-06{--peak:oklch(80% .15 85);--idle:oklch(72% .14 150);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-06,.ds-pv[data-period=idle] .ds-collapsed-06{--now:var(--idle)}.ds-style-06{color:oklch(86% .02 150);background:oklch(19% .012 260);border:1px solid oklch(38% .02 260);border-radius:8px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;overflow:hidden}.ds-style-06 .term-bar{background:oklch(16% .012 260);border-bottom:1px solid oklch(34% .02 260);align-items:center;gap:6px;padding:7px 10px;display:flex}.ds-style-06 .term-bar .tdot{background:oklch(55% .02 260);border-radius:50%;width:8px;height:8px}.ds-style-06 .term-bar .tname{color:oklch(68% .02 240);letter-spacing:.04em;margin-left:4px;font-size:10px}.ds-style-06 .term-body{padding:10px 12px 8px}.ds-style-06 .tline{white-space:normal;gap:6px;font-size:10.5px;line-height:1.7;display:flex}.ds-style-06 .tline .ps{color:oklch(60% .02 240)}.ds-style-06 .tline .txt{color:oklch(84% .02 150)}.ds-style-06 .tline .nowv{color:var(--now);font-weight:700}.ds-style-06 .tline .dim{color:oklch(56% .02 240)}.ds-style-06 .ttbl{margin-top:8px;font-size:10.5px;line-height:1.75}.ds-style-06 .tt-row,.ds-style-06 .tt-head{justify-content:space-between;gap:8px;display:flex}.ds-style-06 .tt-row{min-width:0}.ds-style-06 .tt-head{color:oklch(56% .02 240);border-bottom:1px dashed oklch(36% .02 260);margin-bottom:2px;padding-bottom:2px;font-size:9.5px}.ds-style-06 .tt-row .m{text-overflow:ellipsis;white-space:nowrap;color:oklch(80% .02 160);min-width:0;overflow:hidden}.ds-style-06 .tt-row .p{flex:none;gap:8px;display:flex}.ds-style-06 .tt-row .n{text-align:right;width:38px}.ds-style-06 .tt-row .n.idle{color:var(--idle)}.ds-style-06 .tt-row .n.peak{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-06 .tt-row .n.peak,.ds-pv[data-period=idle] .ds-style-06 .tt-row .n.idle{font-weight:700}.ds-style-06 .term-foot{color:oklch(54% .02 240);border-top:1px solid oklch(34% .02 260);padding:7px 12px;font-size:9.5px}.ds-style-06 .w-toggle{color:oklch(58% .02 240);border-top-color:oklch(34% .02 260);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-style-06 .w-toggle:hover{color:oklch(88% .02 150)}.ds-collapsed-06{width:42px;height:54px;color:var(--now);background:oklch(19% .012 260);border:1px solid oklch(38% .02 260);border-radius:8px;flex-direction:column;justify-content:center;align-items:center;gap:4px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;display:flex}.ds-collapsed-06 .caret{font-size:14px;font-weight:700}.ds-collapsed-06 .lbl{font-size:9.5px}.ds-style-07,.ds-collapsed-07{--peak:oklch(50% .2 25);--idle:oklch(44% .12 230);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-07,.ds-pv[data-period=idle] .ds-collapsed-07{--now:var(--idle)}.ds-style-07{color:oklch(22% 0 0);background:oklch(100% 0 0);border:2px solid oklch(20% 0 0);border-radius:0;padding:12px;box-shadow:5px 5px oklch(20% 0 0)}.ds-style-07 .w-name{letter-spacing:.06em;text-transform:uppercase;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:11px;font-weight:700}.ds-style-07 .w-badge{background:var(--now);color:oklch(100% 0 0);letter-spacing:.08em;padding:3px 9px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10.5px;font-weight:700}.ds-style-07 .tl-track{background:oklch(20% 0 0);border-radius:0;gap:2px}.ds-style-07 .tl-track .s-idle{background:oklch(78% .02 200)}.ds-style-07 .tl-track .s-peak{background:var(--peak)}.ds-style-07 .tl-cur{background:var(--now);width:4px;height:16px;top:-3px}.ds-style-07 .tl-meta{color:oklch(45% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .wt th{letter-spacing:.06em;color:oklch(45% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .wt td{color:oklch(25% 0 0);font-size:11px}.ds-style-07 .wt thead th{border-top:2px solid oklch(20% 0 0);border-bottom:2px solid oklch(20% 0 0)}.ds-style-07 .wt tr+tr td{border-top:1.5px solid oklch(20% 0 0)}.ds-style-07 .wt .wtm td{letter-spacing:.1em;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px;font-weight:700}.ds-style-07 .n.ci{color:var(--idle);font-weight:700}.ds-style-07 .n.cp{color:var(--peak);font-weight:700}.ds-pv[data-period=peak] .ds-style-07 .n.cp,.ds-pv[data-period=idle] .ds-style-07 .n.ci{color:oklch(100% 0 0);background:oklch(20% 0 0)}.ds-style-07 .w-foot{color:oklch(45% 0 0);border-top:1.5px solid oklch(20% 0 0);padding-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .w-toggle{letter-spacing:.08em;text-transform:uppercase;color:oklch(45% 0 0);border-top:1.5px solid oklch(20% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .w-toggle:hover{color:oklch(20% 0 0)}.ds-collapsed-07{background:oklch(100% 0 0);border:2px solid oklch(20% 0 0);border-radius:0;place-items:center;width:44px;height:52px;display:grid;box-shadow:4px 4px oklch(20% 0 0)}.ds-collapsed-07 .box{background:var(--now);color:oklch(100% 0 0);place-items:center;width:20px;height:20px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10px;font-weight:700;display:grid}.ds-style-08,.ds-collapsed-08{--peak:oklch(72% .15 70);--idle:oklch(74% .1 200);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-08,.ds-pv[data-period=idle] .ds-collapsed-08{--now:var(--idle)}.ds-style-08{color:oklch(96% .01 240);backdrop-filter:blur(14px);background:oklch(100% 0 0/.12);border:1px solid oklch(100% 0 0/.26);border-radius:14px;padding:13px;position:relative;box-shadow:0 12px 30px oklch(10% .02 260/.4)}.ds-style-08 .w-name{font-size:12.5px;font-weight:600}.ds-style-08 .w-badge{color:var(--now);background:oklch(100% 0 0/.15);border:1px solid oklch(100% 0 0/.22);border-radius:999px;padding:3px 9px;font-size:10.5px;font-weight:600}.ds-style-08 .w-badge .dot{background:var(--now);box-shadow:0 0 8px var(--now)}.ds-style-08 .tl-track{background:oklch(100% 0 0/.1)}.ds-style-08 .tl-track .s-peak{background:var(--peak);opacity:.92}.ds-style-08 .tl-track .s-idle{background:var(--idle);opacity:.55}.ds-style-08 .tl-cur{background:var(--now);box-shadow:0 0 8px var(--now)}.ds-style-08 .tl-meta{color:oklch(80% .02 240)}.ds-style-08 .wt th{color:oklch(78% .02 240);letter-spacing:.06em;font-size:9.5px}.ds-style-08 .wt td{color:oklch(94% .01 240)}.ds-style-08 .wt td:not(.n){color:oklch(82% .02 240)}.ds-style-08 .wt tr+tr td,.ds-style-08 .wt thead th{border-top:1px solid oklch(100% 0 0/.15)}.ds-style-08 .wt .wtm td{font-weight:600}.ds-style-08 .n.ci{color:var(--idle)}.ds-style-08 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-08 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-08 .wt td:nth-child(2){background:oklch(100% 0 0/.09)}.ds-style-08 .w-foot{color:oklch(74% .02 240);border-top:1px solid oklch(100% 0 0/.12)}.ds-style-08 .w-toggle{color:oklch(80% .02 240);border-top-color:oklch(100% 0 0/.14)}.ds-style-08 .w-toggle:hover{color:oklch(96% .01 240)}.ds-collapsed-08{backdrop-filter:blur(14px);width:44px;height:54px;color:var(--now);background:oklch(100% 0 0/.12);border:1px solid oklch(100% 0 0/.26);border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.ds-collapsed-08 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 10px var(--now);border-radius:50%}.ds-collapsed-08 .lbl{font-size:10px;font-weight:600}.ds-style-09,.ds-collapsed-09{--day-bg:oklch(96% .02 85);--day-fg:oklch(32% .03 70);--day-mut:oklch(55% .04 80);--day-ln:oklch(86% .03 90);--night-bg:oklch(24% .05 260);--night-fg:oklch(92% .02 240);--night-mut:oklch(70% .04 250);--night-ln:oklch(42% .05 260);--now:oklch(42% .15 55);--fg2:var(--day-fg);--mut2:var(--day-mut);--ln:var(--day-ln)}.ds-pv[data-period=idle] .ds-style-09,.ds-pv[data-period=idle] .ds-collapsed-09{--now:oklch(82% .05 250);--fg2:var(--night-fg);--mut2:var(--night-mut);--ln:var(--night-ln)}.ds-style-09{background:var(--day-bg);border:1px solid var(--day-ln);color:var(--fg2);border-radius:14px;padding:14px;transition:background .35s,color .35s,border-color .35s}.ds-pv[data-period=idle] .ds-style-09{background:var(--night-bg);border-color:var(--night-ln)}.ds-style-09 .w-head{align-items:center;gap:10px;display:flex}.ds-style-09 .sky svg{width:20px;height:20px;color:var(--now)}.ds-style-09 .sky .sun{display:block}.ds-style-09 .sky .moon,.ds-pv[data-period=idle] .ds-style-09 .sky .sun{display:none}.ds-pv[data-period=idle] .ds-style-09 .sky .moon{display:block}.ds-style-09 .w-now{letter-spacing:-.01em;color:var(--now);font-size:15px;font-weight:700}.ds-style-09 .w-sub{color:var(--mut2);margin:6px 0 10px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-09 .tl-track{background:linear-gradient(90deg,oklch(38% .07 260) 0 37.5%,oklch(72% .14 60) 37.5% 50%,oklch(46% .06 250) 50% 58.34%,oklch(72% .14 60) 58.34% 75%,oklch(38% .07 260) 75% 100%)}.ds-style-09 .tl-cur{background:var(--now);box-shadow:0 0 6px var(--now);width:2.5px;height:12px;top:-3px}.ds-style-09 .tl-meta{color:var(--mut2)}.ds-style-09 .wt th{color:var(--mut2);letter-spacing:.05em;font-size:9.5px}.ds-style-09 .wt td{color:var(--fg2)}.ds-style-09 .wt tr+tr td,.ds-style-09 .wt thead th{border-top:1px solid var(--ln)}.ds-style-09 .wt .wtm td{font-weight:600}.ds-pv[data-period=peak] .ds-style-09 .n.ci{color:oklch(46% .08 240)}.ds-pv[data-period=peak] .ds-style-09 .n.cp{color:oklch(42% .14 55);font-weight:700}.ds-pv[data-period=idle] .ds-style-09 .n.ci{color:oklch(84% .06 250);font-weight:700}.ds-pv[data-period=idle] .ds-style-09 .n.cp{color:oklch(76% .13 70)}.ds-style-09 .w-foot{color:var(--mut2);border-top:1px solid var(--ln)}.ds-style-09 .w-toggle{color:var(--mut2);border-top-color:var(--ln)}.ds-style-09 .w-toggle:hover{color:var(--fg2)}.ds-collapsed-09{background:var(--day-bg);border:1px solid var(--day-ln);width:42px;height:56px;color:var(--fg2);border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:4px;transition:background .35s;display:flex}.ds-pv[data-period=idle] .ds-collapsed-09{background:var(--night-bg);border-color:var(--night-ln);color:var(--night-fg)}.ds-collapsed-09 svg{width:16px;height:16px;color:var(--now)}.ds-collapsed-09 .sun{display:block}.ds-collapsed-09 .moon,.ds-pv[data-period=idle] .ds-collapsed-09 .sun{display:none}.ds-pv[data-period=idle] .ds-collapsed-09 .moon{display:block}.ds-collapsed-09 .lbl{color:var(--now);font-size:9.5px;font-weight:600}.ds-style-10,.ds-collapsed-10{--peak:oklch(46% .16 40);--idle:oklch(44% .09 250);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-10,.ds-pv[data-period=idle] .ds-collapsed-10{--now:var(--idle)}.ds-style-10{color:oklch(30% .02 70);background:oklch(98% .005 85);border:1px solid oklch(86% .015 85);border-radius:2px;padding:14px}.ds-style-10 .w-head{justify-content:space-between;align-items:flex-start;gap:10px;display:flex}.ds-style-10 .w-eyebrow{letter-spacing:.16em;text-transform:uppercase;color:oklch(50% .06 250);margin-bottom:3px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-name{letter-spacing:-.01em;font-family:Iowan Old Style,Charter,Georgia,Songti SC,serif;font-size:16px;font-weight:600}.ds-style-10 .w-badge{color:var(--now);letter-spacing:.1em;text-transform:uppercase;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-style-10 .w-badge .dot{background:var(--now)}.ds-style-10 .tl-track{background:oklch(89% .015 85);height:3px}.ds-style-10 .tl-track .s-idle{background:oklch(80% .03 250)}.ds-style-10 .tl-track .s-peak{background:var(--peak)}.ds-style-10 .tl-cur{background:var(--now);width:1.5px;height:11px;top:-4px}.ds-style-10 .tl-meta{color:oklch(52% .02 80);font-size:9px}.ds-style-10 .wt th{letter-spacing:.1em;text-transform:uppercase;color:oklch(52% .02 80);border-bottom:1px solid oklch(30% .02 70);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .wt td{color:oklch(34% .02 70);font-size:11px}.ds-style-10 .wt tr+tr td{border-top:1px solid oklch(89% .015 85)}.ds-style-10 .wt .wtm td{letter-spacing:.12em;color:oklch(30% .02 70);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px;font-weight:600}.ds-style-10 .n.ci{color:var(--idle)}.ds-style-10 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-10 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-10 .wt td:nth-child(2){background:color-mix(in oklch, var(--now) 7%, transparent)}.ds-style-10 .w-foot{color:oklch(55% .02 80);border-top:1px solid oklch(89% .015 85);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-toggle{letter-spacing:.08em;text-transform:uppercase;color:oklch(52% .02 80);border-top-color:oklch(89% .015 85);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-toggle:hover{color:oklch(30% .02 70)}.ds-collapsed-10{background:oklch(98% .005 85);border:1px solid oklch(86% .015 85);border-radius:2px;flex-direction:column;justify-content:center;align-items:center;gap:3px;width:42px;height:54px;display:flex}.ds-collapsed-10 .mark{color:var(--now);font-family:Iowan Old Style,Charter,Georgia,Songti SC,serif;font-size:15px;font-weight:600}.ds-collapsed-10 .lbl{letter-spacing:.1em;color:var(--now);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:8.5px}.ds-style-11,.ds-collapsed-11{--ac-outline:#6b4d33;--ac-outline-soft:#c9b083;--ac-ink:#6b4d33;--ac-ink-2:#8a6a45;--ac-cream:#fff6df;--ac-cream-2:#fdf3d9;--ac-paper:#fffaf0;--ac-edge:#6b4d3347;--ac-shadow:#6b4d332e;--ac-orange:#e59266;--ac-orange-deep:oklch(40% .11 45);--ac-idle:#82d5bb;--ac-idle-deep:oklch(32% .07 190);--ac-red:#e05a5a;--ac-green:#6fba2c;--ac-yellow:#f7cd67;--ac-blue:#889df0;--ac-pink:#f8a6b2;--ac-mint:#19c8b9;--ai-mint-pale:color-mix(in oklch, var(--ac-mint) 18%, oklch(100% 0 0));--ai-blue-pale:color-mix(in oklch, var(--ac-blue) 16%, oklch(100% 0 0));--ai-yellow-pale:color-mix(in oklch, var(--ac-yellow) 22%, oklch(100% 0 0));--ai-teal-ink:oklch(33% .07 190);--ai-blue-ink:oklch(40% .13 262);--ai-amber-ink:oklch(44% .12 75);--ai-pink-pale:color-mix(in oklch, var(--ac-pink) 20%, oklch(100% 0 0));--ai-pink-ink:oklch(45% .12 10);--peak:var(--ac-orange);--peak-deep:var(--ac-orange-deep);--idle:var(--ac-idle);--idle-deep:var(--ac-idle-deep);--now:var(--peak);--now-deep:var(--peak-deep)}.ds-pv[data-period=idle] .ds-style-11,.ds-pv[data-period=idle] .ds-collapsed-11{--now:var(--idle);--now-deep:var(--idle-deep)}.ds-style-11{background:var(--ac-cream);border:3px solid var(--ac-outline);color:var(--ac-ink);box-shadow:0 5px 0 0 var(--ac-edge), 0 14px 22px var(--ac-shadow);border-radius:24px;padding:12px;font-family:Nunito,ui-rounded,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif}.ds-style-11 .ai-head{justify-content:space-between;align-items:center;gap:8px;display:flex}.ds-style-11 .ai-view-switch{background:var(--ai-mint-pale);border:2.5px solid var(--ac-outline);min-width:122px;color:var(--ac-ink);letter-spacing:.02em;box-shadow:0 3px 0 0 var(--ac-edge);white-space:nowrap;border-radius:999px;justify-content:center;align-items:center;gap:6px;padding:4px 12px;font-size:12px;font-weight:900;transition:all .25s cubic-bezier(.4,0,.2,1);display:inline-flex}.ds-style-11 .ai-view-switch .ai-swap-ico{width:12px;height:12px;color:var(--ac-green);flex:none}.ds-style-11 .ai-view-switch .ai-v-usage,.ds-pv[data-tab=usage] .ds-style-11 .ai-view-switch .ai-v-pricing{display:none}.ds-pv[data-tab=usage] .ds-style-11 .ai-view-switch .ai-v-usage{display:inline}.ds-pv[data-tab=usage] .ds-style-11 .ai-view-switch{background:var(--ai-pink-pale)}.ds-pv[data-tab=usage] .ds-style-11 .ai-view-switch .ai-swap-ico{color:var(--ai-pink-ink)}.ds-style-11 .ai-view-switch:hover{box-shadow:0 4px 0 0 var(--ac-edge);transform:translateY(-1px)}.ds-style-11 .ai-view-switch:active{box-shadow:0 1px 0 0 var(--ac-edge);transform:translateY(2px)}.ds-style-11 .ai-sticker{background:var(--ac-paper);border:2.5px solid var(--now-deep);color:var(--now-deep);letter-spacing:.03em;box-shadow:0 2px 0 0 color-mix(in oklch, var(--now-deep) 45%, transparent);border-radius:999px;align-items:center;gap:5px;padding:3px 10px;font-size:10.5px;font-weight:900;display:inline-flex;position:relative;transform:rotate(-2deg)}.ds-style-11 .ai-sticker .ai-dot{background:var(--now-deep);border-radius:50%;width:6px;height:6px}.ds-style-11 .ai-sticker .ai-x2{color:oklch(100% 0 0);z-index:2;background:oklch(50% .2 27);border-radius:7px;padding:2px 6px;font-size:12px;font-style:normal;font-weight:900;line-height:1;position:absolute;top:-12px;right:-6px;transform:rotate(-5deg);box-shadow:0 2px #6b4d3359}.ds-pv[data-period=idle] .ds-style-11 .ai-lpk,.ds-pv[data-period=peak] .ds-style-11 .ai-lidle{display:none}.ds-style-11 .ai-panes{margin-top:10px}.ds-style-11 .ai-tl-bar{border-radius:999px;height:11px;margin-top:10px;position:relative}.ds-style-11 .ai-tl-track{border-radius:inherit;background:var(--ac-cream-2);border:2.5px solid var(--ac-outline);display:flex;position:absolute;inset:0;overflow:hidden;box-shadow:inset 0 2px 4px #6b4d3333}.ds-style-11 .ai-tl-track>i{display:block}.ds-style-11 .ai-tl-track .ai-s-peak{background:linear-gradient(180deg, color-mix(in oklch, var(--ac-orange) 72%, oklch(100% 0 0)), var(--ac-orange))}.ds-style-11 .ai-tl-track .ai-s-idle{background:linear-gradient(180deg, color-mix(in oklch, var(--ac-idle) 72%, oklch(100% 0 0)), var(--ac-idle))}.ds-style-11 .ai-tl-cur{z-index:1;background:var(--ac-paper);border:3px solid var(--now-deep);border-radius:50%;width:12px;height:12px;transition:left .3s cubic-bezier(.4,0,.2,1);position:absolute;top:50%;left:43.75%;transform:translate(-50%,-50%);box-shadow:0 2px #6b4d3359}.ds-style-11 .ai-tl-meta{letter-spacing:.02em;color:var(--ac-ink-2);margin-top:7px;font-size:9.5px;font-weight:900}.ds-style-11 .ai-toggle{border:2.5px solid var(--ac-outline);background:var(--ai-mint-pale);text-align:left;cursor:pointer;letter-spacing:.02em;width:100%;color:var(--ac-ink);box-shadow:0 4px 0 0 var(--ac-edge);border-radius:999px;justify-content:space-between;align-items:center;gap:8px;margin-top:8px;padding:5px 12px;font-size:11px;font-weight:900;transition:all .25s cubic-bezier(.4,0,.2,1);display:flex}.ds-style-11 .ai-toggle:hover{box-shadow:0 5px 0 0 var(--ac-edge);background:color-mix(in oklch, var(--ai-mint-pale) 88%, var(--ac-green));transform:translateY(-1px)}.ds-style-11 .ai-toggle:active{box-shadow:0 1px 0 0 var(--ac-edge);transform:translateY(2px)}.ds-style-11 .ai-toggle--usage{background:var(--ai-yellow-pale)}.ds-style-11 .ai-toggle--usage:hover{background:color-mix(in oklch, var(--ai-yellow-pale) 88%, var(--ac-yellow))}.ds-style-11 .ai-chev{flex:none;width:12px;height:12px;transition:transform .25s cubic-bezier(.4,0,.2,1)}.ds-style-11:not(.is-collapsed) .ai-chev{transform:rotate(90deg)}.ds-style-11.is-collapsed .ai-price-inner,.ds-style-11 .ai-detail-inner[hidden]{display:none}.ds-style-11 .ai-inner{background:var(--ac-cream-2);border:2px dashed var(--ac-outline-soft);border-radius:16px;margin-top:6px;padding:6px 9px}.ds-style-11 .ai-price-inner{margin-top:6px}.ds-style-11 .ai-wt{border-collapse:collapse;table-layout:fixed;width:100%}.ds-style-11 .ai-wt th,.ds-style-11 .ai-wt td{text-align:left;padding:3px 2px;font-size:10.5px;line-height:1.55}.ds-style-11 .ai-wt td:nth-child(2),.ds-style-11 .ai-wt td:nth-child(3),.ds-style-11 .ai-wt th:nth-child(2),.ds-style-11 .ai-wt th:nth-child(3){text-align:right;width:46px}.ds-style-11 .ai-n{font-variant-numeric:tabular-nums}.ds-style-11 .ai-hx{opacity:0;border-radius:3px;height:2.5px;margin-top:2px;transition:opacity .2s;display:block}.ds-pv[data-period=peak] .ds-style-11 .ai-hx.ai-hp,.ds-pv[data-period=idle] .ds-style-11 .ai-hx.ai-hi{opacity:1;background:var(--now-deep)}.ds-style-11 .ai-wt .ai-wtm td{color:var(--ac-ink);letter-spacing:.04em;font-size:10px;font-weight:900}.ds-style-11 .ai-wt .ai-wtm .ai-model-leaf{vertical-align:-1px;width:9px;height:9px;color:var(--ac-green);margin-right:4px;display:inline-block}.ds-style-11 .ai-wt tr+tr td,.ds-style-11 .ai-wt thead th{border-top:2px dashed var(--ac-outline-soft)}.ds-style-11 .ai-n.ai-ci{color:var(--idle-deep);font-weight:900}.ds-style-11 .ai-n.ai-cp{color:var(--peak-deep);font-weight:900}.ds-style-11 .ai-wt th{color:var(--ac-ink-2);letter-spacing:.08em;font-size:9px;font-weight:900}.ds-style-11 .ai-foot{color:var(--ac-ink-2);align-items:center;gap:6px;margin-top:8px;padding-top:6px;font-size:9.5px;font-weight:900;display:flex}.ds-style-11 .ai-foot-leaf{width:11px;height:11px;color:var(--ac-green);flex:none}.ds-style-11 .ai-usage-sub{color:var(--ac-ink-2);margin-top:2px;font-size:9.5px;font-weight:800}.ds-style-11 .ai-tiles{grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px;display:grid}.ds-style-11 .ai-tile{text-align:center;box-shadow:0 0 0 2.5px var(--ac-outline), 0 4px 0 0 var(--ac-edge);border:3px solid oklch(100% 0 0);border-radius:30%;padding:9px 4px 8px}.ds-style-11 .ai-tile:first-child{transform:rotate(-2deg)}.ds-style-11 .ai-tile:nth-child(2){transform:rotate(1.5deg)translateY(1px)}.ds-style-11 .ai-tile:nth-child(3){transform:rotate(-1deg)}.ds-style-11 .ai-tile-k{letter-spacing:.06em;font-size:8.5px;font-weight:900;display:block}.ds-style-11 .ai-tile-v{font-size:16px;font-weight:900;line-height:1.3;display:block}.ds-style-11 .ai-tile-u{opacity:.85;font-size:8px;font-weight:900;display:block}.ds-style-11 .ai-tile--in{background:var(--ai-mint-pale);color:var(--ai-teal-ink)}.ds-style-11 .ai-tile--out{background:var(--ai-blue-pale);color:var(--ai-blue-ink)}.ds-style-11 .ai-tile--rate{background:var(--ai-green-pale,color-mix(in oklch, var(--ac-green) 18%, oklch(100% 0 0)));color:var(--ai-teal-ink)}.ds-style-11 .ai-tile--5h{background:var(--ai-mint-pale);color:var(--ai-teal-ink)}.ds-style-11 .ai-tile--week{background:var(--ai-blue-pale);color:var(--ai-blue-ink)}.ds-style-11 .ai-tile--month{background:var(--ai-yellow-pale);color:var(--ai-amber-ink)}.ds-style-11 .ai-detail-inner{margin-top:6px}.ds-style-11 .ai-d-row{justify-content:space-between;align-items:baseline;padding:3px 2px;font-size:10px;display:flex}.ds-style-11 .ai-d-row+.ai-d-row{border-top:2px dashed var(--ac-outline-soft)}.ds-style-11 .ai-d-n{font-weight:900}.ds-style-11 .ds-pane{animation:.28s cubic-bezier(.4,0,.2,1) ai-pane-in}@keyframes ai-pane-in{0%{opacity:0;transform:translateY(6px)scale(.985)}to{opacity:1;transform:none}}.ds-collapsed-11{background:var(--ac-cream);border:2.5px solid var(--ac-outline);width:42px;height:54px;box-shadow:0 4px 0 0 var(--ac-edge), 0 10px 16px var(--ac-shadow);border-radius:16px;justify-content:center;align-items:center;display:flex}.ds-collapsed-11 .ai-coll-pricing{flex-direction:column;align-items:center;gap:3px;display:flex}.ds-collapsed-11 .ai-coll-leaf{width:14px;height:14px}.ds-collapsed-11 .ai-coll-leaf--peak{color:var(--ac-red);animation:2.4s ease-in-out infinite ai-leaf-pulse}.ds-collapsed-11 .ai-coll-leaf--idle{color:var(--ac-green)}.ds-collapsed-11 .ai-coll-lbl{font-size:11px;font-weight:900}.ds-collapsed-11 .ai-coll-usage{flex-direction:column;align-items:center;gap:3px;display:none}.ds-pv[data-tab=usage] .ds-collapsed-11 .ai-coll-pricing{display:none}.ds-pv[data-tab=usage] .ds-collapsed-11 .ai-coll-usage{display:flex}.ds-collapsed-11 .ai-coll-coin{width:18px;height:18px}.ds-collapsed-11 .ai-coll-cost{letter-spacing:.01em;font-size:12px;font-weight:900}@keyframes ai-leaf-pulse{0%,to{opacity:1}50%{opacity:.35}}@media (prefers-reduced-motion:reduce){.ds-pv *,.ds-pv :before,.ds-pv :after{transition:none!important;animation:none!important}}";
		//#endregion
		//#region src/client/styles/inject.ts
		/**
		* 样式注入：把 `*.css?inline` 编译文本以 <style data-plugin> 注入 document.head，
		* 返回 disposer（fiber dispose 时移除，003 生命周期契约：dispose 清理样式注入）。
		*/
		const PLUGIN_ID = "dsh-deepseek-peak-valley";
		/** 幂等注入一段 CSS（同 tagId 不重复注入；返回 disposer 移除该 <style>）。 */
		function injectStyle(name, css) {
			const tagId = `${PLUGIN_ID}/${name}`;
			if (typeof document === "undefined") return () => {};
			if (document.querySelector(`style[data-plugin-css="${tagId}"]`) !== null) return () => {};
			const tag = document.createElement("style");
			tag.dataset.plugin = PLUGIN_ID;
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
			return () => {
				tag.remove();
			};
		}
		/** 安装小组件 + 设置页样式；返回统一 disposer。 */
		function installStyles() {
			const disposers = [injectStyle("widget", widget_css_default), injectStyle("settings", settings_css_default)];
			return () => {
				for (const disposer of disposers) disposer();
			};
		}
		//#endregion
		//#region src/client/index.ts
		/** 必需服务：slot 注册表 + sessions（用量桥接）+ 官方 locale（文案座位）。 */
		const inject = [
			"slots",
			"sessions",
			"locale"
		];
		/**
		* Client 插件体：侧边栏小组件 + 设置入口。
		* @param ctx - client 根上下文。
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(LOCALE_NS, LOCALE_DICTS), "dsh-deepseek-peak-valley: locale dictionaries");
			ctx.effect(() => installStyles(), "dsh-deepseek-peak-valley: styles");
			ctx.effect(() => startPeriodTimer(), "dsh-deepseek-peak-valley: period timer");
			ctx.effect(() => startUsageBridge(ctx), "dsh-deepseek-peak-valley: usage bridge");
			ctx.effect(() => startGoQuotaPolling(), "dsh-deepseek-peak-valley: go-quota polling");
			ctx.effect(() => startDeepseekPolling(), "dsh-deepseek-peak-valley: deepseek polling");
			ctx.effect(() => startCountdown(), "dsh-deepseek-peak-valley: refresh countdown");
			ctx.effect(() => () => {
				resetDualStateBuckets();
			}, "dsh-deepseek-peak-valley: dual-state buckets");
			ctx.slots.inject("sidebar.footer.action", () => {
				return ctx.slots.register({
					name: "sidebar.footer.action",
					id: "dsh-deepseek-peak-valley",
					order: 10,
					registrant: "dsh-deepseek-peak-valley",
					locale: LOCALE_NS
				}, PeakValleyWidget);
			});
			ctx.slots.inject("settings.section", () => {
				return ctx.slots.register({
					name: "settings.section",
					id: "dsh-deepseek-peak-valley",
					order: 30,
					registrant: "dsh-deepseek-peak-valley",
					locale: LOCALE_NS,
					label: () => ctx.locale.bind(LOCALE_NS)("settings.label")
				}, SettingsSection);
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map