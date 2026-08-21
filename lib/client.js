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
			"10"
		];
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
		/**
		* 判定给定时刻（按北京时区）所处的时段。
		* @param date 待判定的时刻；缺省为当前时刻。
		* @returns 'peak' | 'idle'
		*/
		function periodAt(date = /* @__PURE__ */ new Date()) {
			const minutes = beijingMinutes(date);
			for (const window of PERIOD_RULE.peakWindows) if (minutes >= minutesOf(window.start) && minutes < minutesOf(window.end)) return "peak";
			return "idle";
		}
		/** 当前北京时段（便捷函数）。 */
		function currentPeriod(now = /* @__PURE__ */ new Date()) {
			return periodAt(now);
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
		let timer = null;
		/** 启动自动刷新定时器（幂等；由 fiber 生命周期持有，dispose 时停止）。 */
		function startPeriodTimer() {
			if (timer === null) timer = setInterval(() => {
				const prev = period.getSnapshot();
				period.set(evaluate(prev.override));
			}, TICK_MS);
			return () => {
				if (timer !== null) {
					clearInterval(timer);
					timer = null;
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
		* - styleId：所选风格（十款之一）
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
			return typeof value === "string" && /^0[1-9]|10$/.test(value);
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
		//#region src/client/components/primitives.tsx
		/** 数字渲染：固定两位小数（0.05 / 1.50 / 27.00）。 */
		function formatPrice(value) {
			return value.toFixed(2);
		}
		/** 计费模型与计费项顺序（价格表行序）。 */
		const MODEL_ORDER = ["V4-Flash", "V4-Pro"];
		const ITEM_ORDER = [
			"输入·缓存命中",
			"输入·缓存未命中",
			"输出"
		];
		/** 时段徽章（圆点 + 高峰/空闲 文字）。 */
		function Badge({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: "w-badge",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), period === "peak" ? "高峰" : "空闲"]
			});
		}
		/** 双态文字（高峰/空闲；永不共存——仅渲染当前时段）。 */
		function PeriodWord({ period, long }) {
			if (period === "peak") return long ? "高峰" : "峰";
			return long ? "空闲" : "闲";
		}
		/**
		* 24h 时间轴（5 段轨道 + 当前光标 + 元信息）。
		* @param cursorPercent 实时光标百分比（0–100，按当前北京时间计算）；
		*   缺省时退回设计稿演示常量（TIMELINE_CURSOR，仅作兜底）。
		*/
		function Timeline({ period, meta = "高峰 09:00–12:00 · 14:00–18:00｜其余空闲", cursorPercent }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-tl",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tl-bar",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "tl-track",
						children: TIMELINE_SEGMENTS.map((segment, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {
							className: segment.period === "peak" ? "s-peak" : "s-idle",
							style: { width: segment.width }
						}, `${segment.period}-${index}`))
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "tl-cur",
						style: { left: cursorPercent !== void 0 ? `${cursorPercent}%` : TIMELINE_CURSOR[period] }
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "tl-meta",
					children: meta
				})]
			});
		}
		/** 价格表（`.wt`）：两模型分组 × 3 计费项 × [空闲, 高峰]，当前时段列高亮条。 */
		function PriceTable({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
				className: "wt",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: "计费项" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("th", { children: ["空闲", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "hx hi" })] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("th", { children: ["高峰", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "hx hp" })] })
				] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tbody", { children: MODEL_ORDER.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelGroup, { model }, model)) })]
			});
		}
		function ModelGroup({ model }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", {
				className: "wtm",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
					colSpan: 3,
					children: model
				})
			}), ITEM_ORDER.map((item) => {
				const [idle, peak] = PRICE_TABLE[model][item];
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: item }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
						className: "n ci",
						children: formatPrice(idle)
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
						className: "n cp",
						children: formatPrice(peak)
					})
				] }, item);
			})] });
		}
		/** 价格表展开/收起切换按钮（`.w-toggle` + aria-expanded + chevron）。 */
		function Toggle({ expanded, onToggle, label = "价格表" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "w-toggle",
				"aria-expanded": expanded,
				onClick: onToggle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChevronIcon, { className: "t-chev" })]
			});
		}
		/** 页脚（单位标注）。 */
		function UnitFooter({ children, note = "元 / 百万 tokens · 北京时间" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "w-foot",
				children: [note, children]
			});
		}
		//#endregion
		//#region src/client/styles/classic.tsx
		/**
		* 经典展开态：头部 → 时间轴 → 切换 → 价格表 → 页脚。
		* @param styleClass 风格类名（如 ds-style-01）。
		* @param meta 时间轴元信息（默认 001 标准文案）。
		*/
		function ClassicExpanded({ styleClass, period, priceTableExpanded, onTogglePriceTable, cursorPercent, meta = "高峰 09:00–12:00 · 14:00–18:00｜其余空闲", footer, badge = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, { period }), name = "DeepSeek 计费" }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ${styleClass}${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "w-name",
							children: name
						}), badge]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta,
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PriceTable, { period }),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, { children: footer })
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
		/** 昼夜 · 展开态。 */
		function DayNightExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent }) {
			const day = period === "peak";
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
							children: day ? "高峰时段" : "空闲时段"
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "w-sub",
						children: "北京时间 · 高峰 09:00–12:00 / 14:00–18:00"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta: "暖色段 = 高峰　冷色段 = 空闲",
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PriceTable, { period }),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, { note: "元 / 百万 tokens · 高峰 = 空闲 × 2" })
				]
			});
		}
		/** 昼夜 · 收起态（太阳/月亮 + 峰/闲）。 */
		function DayNightCollapsed({ period }) {
			const day = period === "peak";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-09",
				children: [day ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SunIcon, { className: "sun" }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MoonIcon, { className: "moon" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: day ? "峰" : "闲"
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Editorial.tsx
		/** 编辑 · 展开态。 */
		function EditorialExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-10${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-eyebrow",
							children: "DeepSeek · 报价"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-name",
							children: "分时段计费"
						})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Badge, { period })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						meta: "09:00–12:00 · 14:00–18:00 高峰（北京时间）",
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PriceTable, { period }),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, { note: "元 / 百万 tokens · 高峰 = 空闲 × 2" })
				]
			});
		}
		/** 编辑 · 收起态（衬线「峰/闲」大字 + 等宽小标「NOW」）。 */
		function EditorialCollapsed({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-10",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mark",
					children: period === "peak" ? "峰" : "闲"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: "NOW"
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Metro.tsx
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
		function MetroExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-04${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "w-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "w-name",
							children: "DeepSeek 计费"
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
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lg-pk" }), "高峰"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "lg-id" }), "空闲"] })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PriceTable, { period }),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, {})
				]
			});
		}
		/** 时刻线 · 收起态（垂直 mini 线路，列车位置按实时时钟移动）。 */
		function MetroCollapsed({ period, cursorPercent }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-04",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "mini",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "train",
						style: { top: `${cursorPercent}%` }
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? "峰" : "闲"
				})]
			});
		}
		//#endregion
		//#region src/client/styles/Receipt.tsx
		/** 票据 · 展开态。 */
		function ReceiptExpanded({ period, priceTableExpanded, onTogglePriceTable, cursorPercent }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `w ds-style-03${priceTableExpanded ? "" : " is-collapsed"}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "stamp",
						children: period === "peak" ? "高峰" : "空闲"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "w-head",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-name",
							children: "DeepSeek 分时段计费"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: "w-sub",
							children: "凭条 · 北京时间"
						})] })
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "w-tear" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Timeline, {
						period,
						cursorPercent
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
						expanded: priceTableExpanded,
						onToggle: onTogglePriceTable
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PriceTable, { period }),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnitFooter, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: "bcode" }) })
				]
			});
		}
		/** 票据 · 收起态（上下锯齿缘由 ::before/::after CSS 承担）。 */
		function ReceiptCollapsed({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-03",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? "峰" : "闲"
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
		* 价格表为等宽 ttbl（flash / pro 两组，idle/peak 双列，当前时段列加粗）。
		*/
		/** 终端 · 展开态。 */
		function TerminalExpanded({ period, priceTableExpanded, onTogglePriceTable }) {
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
									children: period === "peak" ? "当前：高峰" : "当前：空闲"
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "tline",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "dim",
									children: "09:00–12:00 · 14:00–18:00"
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Toggle, {
								expanded: priceTableExpanded,
								onToggle: onTogglePriceTable
							}),
							priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TerminalTable, { period })
						]
					}),
					priceTableExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "term-foot",
						children: "元 / 百万 tokens · 北京时间"
					})
				]
			});
		}
		/** 终端等宽价格表（flash / pro 两组）。 */
		function TerminalTable({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ttbl",
				children: MODEL_ORDER.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TerminalGroup, { model }, model))
			});
		}
		function TerminalGroup({ model }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "tt-head",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: model === "V4-Flash" ? "flash" : "pro" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "idle" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "peak" })
				]
			}), ITEM_ORDER.map((item) => {
				const [idle, peak] = PRICE_TABLE[model][item];
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "tt-row",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: "m",
						children: labelOf(item)
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: "p",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "n idle",
							children: formatPrice(idle)
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "n peak",
							children: formatPrice(peak)
						})]
					})]
				}, item);
			})] });
		}
		function labelOf(item) {
			switch (item) {
				case "输入·缓存命中": return "输入 · 缓存命中";
				case "输入·缓存未命中": return "输入 · 未命中";
				case "输出": return "输出";
			}
		}
		/** 终端 · 收起态（光标 + 峰/闲）。 */
		function TerminalCollapsed({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-06",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "caret",
					children: "▍"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "lbl",
					children: period === "peak" ? "峰" : "闲"
				})]
			});
		}
		//#endregion
		//#region src/client/styles/registry.tsx
		/** 胶囊 · 收起态（横向 pill，圆点 + 「高峰/空闲」全词）。 */
		function PillsCollapsed({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-collapsed-05",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { className: "dot" }), period === "peak" ? "高峰" : "空闲"]
			});
		}
		/** 粗野 · 收起态（反色块「峰/闲」）。 */
		function BrutalistCollapsed({ period }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ds-collapsed-07",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: "box",
					children: period === "peak" ? "峰" : "闲"
				})
			});
		}
		/** 风格组件注册表（002-接口契约 §3 十款）。 */
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
			}
		};
		/** 按风格编号取组件对（缺省回退到 01）。 */
		function styleComponents(styleId) {
			return STYLE_COMPONENTS[styleId] ?? STYLE_COMPONENTS["01"];
		}
		//#endregion
		//#region src/client/components/SettingsSection.tsx
		/**
		* 设置入口 · DS峰谷小组件（`settings.section` 页）。
		*
		* 用户需求（已确认）：设置里可切换 10 款风格 + 启停开关。
		* 内容：启停开关 / 模拟时段（演示覆盖）/ 十款风格选择 / 实时预览。
		* 写路径走本插件偏好 store（`settings.section` 的 owner props 只给 `{ close }`，
		* 文案/当前值/写路径由本插件自持）。
		*/
		/** 设置页 · DS峰谷小组件。 */
		function SettingsSection(_props) {
			const preferences = usePreferences();
			const { period, cursorPercent } = usePeriod();
			const components = styleComponents(preferences.styleId);
			const [previewExpanded, setPreviewExpanded] = (0, react.useState)(true);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "ds-pv-settings",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "DS峰谷小组件" }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "ds-pv-desc",
						children: "按北京时间自动判定高峰（09:00–12:00、14:00–18:00）与空闲时段，在左侧边栏 展示分时段计费报价；可切换 10 款风格。价格基于公开报价，仅作演示。"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "ds-pv-row",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "ds-pv-row-label",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "启用小组件" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "hint",
								children: "关闭后侧边栏不再显示计费小组件"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ds-pv-switch",
							role: "switch",
							"aria-checked": preferences.enabled,
							onClick: () => setPreferences({ enabled: !preferences.enabled }),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "visually-hidden",
								children: preferences.enabled ? "已启用" : "已停用"
							})
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "ds-pv-row",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: "ds-pv-row-label",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "模拟时段（演示）" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "hint",
								children: "手动切换后刷新页面回到自动判定"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ds-pv-seg",
							role: "group",
							"aria-label": "模拟时段",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": period === "peak",
								onClick: () => setPeriodOverride(period === "peak" ? null : "peak"),
								children: "高峰"
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": period === "idle",
								onClick: () => setPeriodOverride(period === "idle" ? null : "idle"),
								children: "空闲"
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
						className: "ds-pv-fieldset",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: "风格 · 10 款" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
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
								"预览 · ",
								STYLE_CATALOG[preferences.styleId].nameZh,
								" ",
								STYLE_CATALOG[preferences.styleId].nameEn
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "ds-pv-preview-stack",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "ds-pv-preview-item ds-pv-preview-item--expanded",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "ds-pv-preview-label",
									children: "正常 · 展开态"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "ds-pv",
									"data-period": period,
									role: "group",
									"aria-label": "预览·展开态",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Expanded, {
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
									children: "缩小 · 收起态"
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "ds-pv",
									"data-period": period,
									role: "group",
									"aria-label": "预览·收起态",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Collapsed, {
										period,
										cursorPercent
									})
								})]
							})]
						})]
					})
				]
			});
		}
		/** 单款风格选项（aria-pressed 单选语义）。 */
		function StyleOption({ id, selected, onSelect }) {
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
						children: spec.nameZh
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
		/** 默认记录：收起。 */
		const DEFAULT_SESSION_STATE = {
			dual: "collapsed",
			priceTableExpanded: false
		};
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
			mutate((buckets) => {
				buckets.set(sessionId, {
					dual: expanded ? "expanded" : "collapsed",
					priceTableExpanded: expanded
				});
			});
		}
		/** 组件内读取某会话的双态记录。 */
		function useSessionDualState(sessionId) {
			const snapshot = useStore(dualState);
			return sessionId === void 0 ? DEFAULT_SESSION_STATE : snapshot.buckets.get(sessionId) ?? DEFAULT_SESSION_STATE;
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
			const { wide } = props;
			const preferences = usePreferences();
			const { period, cursorPercent } = usePeriod();
			const sessionId = props.useSessions((state) => state.current);
			const dual = useSessionDualState(sessionId);
			const components = styleComponents(preferences.styleId);
			if (!preferences.enabled) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: "ds-pv",
				"data-period": period,
				role: "group",
				"aria-label": "DeepSeek 分时段计费小组件",
				children: wide ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Expanded, {
					period,
					cursorPercent,
					priceTableExpanded: dual.priceTableExpanded,
					onTogglePriceTable: () => {
						if (sessionId !== void 0) setPriceTableExpanded(sessionId, !dual.priceTableExpanded);
					}
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(components.Collapsed, {
					period,
					cursorPercent
				})
			});
		}
		//#endregion
		//#region \0dsh-inline-css:/Users/zcol/Project/DeepSeek峰谷小组件/src/client/styles/settings.css.mjs
		var settings_css_default = ".ds-pv-settings .visually-hidden{clip:rect(0 0 0 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.ds-pv-settings{color:inherit;flex-direction:column;gap:16px;font-size:13px;line-height:1.6;display:flex}.ds-pv-settings h2{letter-spacing:-.01em;margin:0;font-size:16px;font-weight:700}.ds-pv-settings .ds-pv-desc{color:inherit;opacity:.72;max-width:52ch;margin:0;font-size:12.5px}.ds-pv-row{border:1px solid;border-radius:10px;justify-content:space-between;align-items:center;gap:16px;padding:10px 12px;display:flex}.ds-pv-row .ds-pv-row-label{flex-direction:column;gap:2px;display:flex}.ds-pv-row .ds-pv-row-label .hint{opacity:.6;font-size:11px}.ds-pv-switch{background:0 0;border:1px solid;border-radius:999px;flex:none;width:40px;height:22px;transition:background .15s;position:relative}.ds-pv-switch:after{content:\"\";opacity:.35;background:currentColor;border-radius:50%;width:16px;height:16px;transition:left .15s,opacity .15s;position:absolute;top:2px;left:2px}.ds-pv-switch[aria-checked=true]:after{opacity:1;left:20px}.ds-pv-seg{border:1px solid;border-radius:999px;gap:2px;padding:3px;display:inline-flex}.ds-pv-seg button{cursor:pointer;background:0 0;border:0;border-radius:999px;padding:5px 12px;font-size:12px;font-weight:600}.ds-pv-seg button[aria-pressed=true]{background:currentColor}.ds-pv-fieldset{border:1px solid;border-radius:12px;margin:0;padding:12px 12px 14px}.ds-pv-fieldset legend{letter-spacing:.03em;padding-inline:4px;font-size:12px;font-weight:700}.ds-pv-styles{grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px;display:grid}.ds-pv-style-option{text-align:left;cursor:pointer;background:0 0;border:1px solid;border-radius:10px;flex-direction:column;align-items:flex-start;gap:3px;padding:8px 10px;display:flex}.ds-pv-style-option[aria-pressed=true]{outline-offset:1px;outline:2px solid}.ds-pv-style-option .ds-idx{opacity:.55;letter-spacing:.06em;font-family:ui-monospace,monospace;font-size:9.5px}.ds-pv-style-option .ds-zh{font-size:12.5px;font-weight:700}.ds-pv-style-option .ds-en{opacity:.6;text-transform:uppercase;letter-spacing:.05em;font-family:ui-monospace,monospace;font-size:9px}.ds-pv-preview{border:1px dashed;border-radius:12px;flex-direction:column;gap:12px;padding:14px;display:flex}.ds-pv-preview .ds-pv-preview-title{letter-spacing:.08em;text-transform:uppercase;opacity:.6;font-size:11px;font-weight:700}.ds-pv-preview-stack{flex-wrap:nowrap;align-items:flex-start;gap:14px;display:flex;overflow-x:auto}.ds-pv-preview-stack .ds-pv-preview-item{flex-direction:column;flex:none;align-items:flex-start;gap:6px;min-width:0;display:flex}.ds-pv-preview-stack .ds-pv-preview-item .ds-pv-preview-label{letter-spacing:.08em;text-transform:uppercase;opacity:.6;white-space:nowrap;font-size:11px;font-weight:700}.ds-pv-preview-stack .ds-pv-preview-item--expanded{width:268px}.ds-pv-preview-stack .ds-pv-preview-item--expanded .ds-pv{width:100%}.ds-pv-preview-stack .ds-pv-preview-item--collapsed .ds-pv{width:max-content;max-width:100%}";
		//#endregion
		//#region \0dsh-inline-css:/Users/zcol/Project/DeepSeek峰谷小组件/src/client/styles/widget.css.mjs
		var widget_css_default = ".ds-pv{box-sizing:border-box;-webkit-font-smoothing:antialiased;text-rendering:optimizelegibility;width:100%;min-width:0;font-family:-apple-system,BlinkMacSystemFont,Inter,Segoe UI,system-ui,sans-serif;font-size:11px;line-height:1.55}.ds-pv *,.ds-pv :before,.ds-pv :after{box-sizing:border-box}.ds-pv button{font:inherit;cursor:pointer;color:inherit}.ds-pv button:focus-visible,.ds-pv a:focus-visible{outline:2px solid var(--accent,currentColor);outline-offset:2px}.ds-pv svg{display:block}.ds-pv table{border-collapse:collapse}.ds-pv .w{width:100%;min-width:0;font-size:11px}.ds-pv .w-head{justify-content:space-between;align-items:center;gap:8px;display:flex}.ds-pv .w-badge{align-items:center;gap:5px;display:inline-flex}.ds-pv .w-badge .dot{border-radius:50%;flex:none;width:6px;height:6px}.ds-pv .tl-bar{border-radius:3px;height:6px;position:relative}.ds-pv .tl-track{border-radius:inherit;display:flex;position:absolute;inset:0;overflow:hidden}.ds-pv .tl-track>i{display:block}.ds-pv .tl-cur{background:var(--now);z-index:1;width:2px;height:12px;transition:left .3s;position:absolute;top:-3px}.ds-pv .tl-meta{letter-spacing:.02em;margin-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-pv .w-tl{margin-top:10px}.ds-pv .wt{border-collapse:collapse;table-layout:fixed;width:100%;margin-top:9px}.ds-pv .wt th,.ds-pv .wt td{text-align:left;padding:4px 2px;font-size:11px;line-height:1.4}.ds-pv .wt td:nth-child(2),.ds-pv .wt td:nth-child(3),.ds-pv .wt th:nth-child(2),.ds-pv .wt th:nth-child(3){text-align:right;width:46px}.ds-pv .wt .n{font-variant-numeric:tabular-nums;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-pv .wt .hx{opacity:0;border-radius:1px;height:2px;margin-top:2px;transition:opacity .2s;display:block}.ds-pv[data-period=peak] .wt .hx.hp,.ds-pv[data-period=idle] .wt .hx.hi{opacity:1;background:var(--now)}.ds-pv .w-foot{color:inherit;letter-spacing:.02em;margin-top:8px;padding-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-pv .w-toggle{text-align:left;letter-spacing:.02em;background:0 0;border:0;border-top:1px solid;justify-content:space-between;align-items:center;gap:8px;width:100%;margin-top:9px;padding:5px 2px;font-size:10px;font-weight:600;display:flex}.ds-pv .w-toggle .t-chev{flex:none;width:12px;height:12px;transition:transform .2s}.ds-pv .w:not(.is-collapsed) .w-toggle .t-chev{transform:rotate(90deg)}.ds-pv .w.is-collapsed .wt,.ds-pv .w.is-collapsed .ttbl,.ds-pv .w.is-collapsed .w-foot,.ds-pv .w.is-collapsed .term-foot{display:none}@keyframes dsh-pv-pulse{0%,to{opacity:1}50%{opacity:.45}}.ds-style-01,.ds-collapsed-01{--peak:oklch(80% .15 75);--idle:oklch(78% .11 195);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-01,.ds-pv[data-period=idle] .ds-collapsed-01{--now:var(--idle)}.ds-style-01{color:oklch(94% .01 250);background:oklch(27% .02 262);border:1px solid oklch(44% .03 258);border-radius:12px;padding:12px;box-shadow:0 10px 26px oklch(10% .03 260/.45),inset 0 1px oklch(100% 0 0/.06)}.ds-style-01 .w-name{letter-spacing:.01em;font-size:12px;font-weight:600}.ds-style-01 .w-badge{background:color-mix(in oklch, var(--now) 16%, transparent);border:1px solid color-mix(in oklch, var(--now) 32%, transparent);color:var(--now);border-radius:999px;padding:3px 8px;font-size:10.5px;font-weight:600}.ds-style-01 .w-badge .dot{background:var(--now);box-shadow:0 0 6px var(--now);animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-style-01 .tl-track{background:oklch(20% .015 262);border:1px solid oklch(36% .02 258)}.ds-style-01 .tl-track .s-idle{background:color-mix(in oklch, var(--idle) 34%, transparent)}.ds-style-01 .tl-track .s-peak{background:var(--peak)}.ds-style-01 .tl-cur{background:var(--now);box-shadow:0 0 6px var(--now);height:10px;top:-2px}.ds-style-01 .tl-meta{color:oklch(64% .02 252)}.ds-style-01 .wt th{color:oklch(66% .02 252);letter-spacing:.06em;font-size:9.5px}.ds-style-01 .wt td{color:oklch(88% .01 250)}.ds-style-01 .wt td:not(.n){color:oklch(75% .02 250)}.ds-style-01 .wt tr+tr td,.ds-style-01 .wt thead th{border-top:1px solid oklch(38% .02 258)}.ds-style-01 .wt .wtm td{color:oklch(92% .01 250);font-weight:600}.ds-style-01 .n.ci{color:var(--idle)}.ds-style-01 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-01 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-01 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-01 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-01 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 9%, transparent)}.ds-style-01 .w-foot{color:oklch(60% .02 252)}.ds-style-01 .w-toggle{color:oklch(66% .02 252);border-top-color:oklch(38% .02 258)}.ds-style-01 .w-toggle:hover{color:oklch(92% .01 250)}.ds-collapsed-01{width:42px;height:54px;color:var(--now);background:oklch(27% .02 262);border:1px solid oklch(44% .03 258);border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.ds-collapsed-01 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 8px var(--now);border-radius:50%;animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-collapsed-01 .lbl{font-size:10px;font-weight:600}.ds-style-02,.ds-collapsed-02{--peak:oklch(48% .15 40);--idle:oklch(47% .1 160);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-02,.ds-pv[data-period=idle] .ds-collapsed-02{--now:var(--idle)}.ds-style-02{color:oklch(24% .02 240);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:10px;padding:14px;box-shadow:0 1px 2px oklch(20% .02 240/.04)}.ds-style-02 .w-name{font-size:12.5px;font-weight:600}.ds-style-02 .w-badge{color:var(--now);font-size:11px;font-weight:600}.ds-style-02 .w-badge .dot{background:var(--now)}.ds-style-02 .tl-track{background:oklch(95% .005 240)}.ds-style-02 .tl-track .s-idle{background:oklch(86% .09 155)}.ds-style-02 .tl-track .s-peak{background:oklch(70% .13 42)}.ds-style-02 .tl-cur{background:var(--now);width:2px;height:10px;top:-2px}.ds-style-02 .tl-meta{color:oklch(56% .015 240)}.ds-style-02 .wt th{color:oklch(62% .015 240);letter-spacing:.05em;font-size:9.5px}.ds-style-02 .wt td{color:oklch(32% .02 240)}.ds-style-02 .wt tr+tr td,.ds-style-02 .wt thead th{border-top:1px solid oklch(94% .005 240)}.ds-style-02 .wt .wtm td{color:oklch(24% .02 240);font-weight:600}.ds-style-02 .n.ci{color:var(--idle)}.ds-style-02 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-02 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-02 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-02 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-02 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 5%, transparent)}.ds-style-02 .w-foot{color:oklch(56% .015 240);border-top:1px solid oklch(94% .005 240)}.ds-style-02 .w-toggle{color:oklch(56% .015 240);border-top-color:oklch(94% .005 240)}.ds-style-02 .w-toggle:hover{color:oklch(24% .02 240)}.ds-collapsed-02{width:42px;height:54px;color:var(--now);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:10px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex;box-shadow:0 1px 2px oklch(20% .02 240/.04)}.ds-collapsed-02 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 6px color-mix(in oklch, var(--now) 40%, transparent);border-radius:50%;animation:2.4s ease-in-out infinite dsh-pv-pulse}.ds-collapsed-02 .lbl{font-size:10px;font-weight:600}.ds-style-03,.ds-collapsed-03{--peak:oklch(48% .2 26);--idle:oklch(46% .13 235);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-03,.ds-pv[data-period=idle] .ds-collapsed-03{--now:var(--idle)}.ds-style-03{color:oklch(34% .02 70);background:oklch(98.5% .008 90);border:1px solid oklch(86% .02 80);border-radius:4px;padding:12px 14px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;position:relative;box-shadow:0 1px oklch(86% .02 80)}.ds-style-03 .w-head{text-align:center;padding-bottom:2px}.ds-style-03 .w-name{letter-spacing:.06em;font-size:12px;font-weight:700}.ds-style-03 .w-sub{letter-spacing:.14em;color:oklch(55% .03 80);margin-top:2px;font-size:9px}.ds-style-03 .stamp{border:1.5px solid var(--now);color:var(--now);letter-spacing:.12em;opacity:.88;border-radius:3px;padding:1px 7px;font-size:12px;font-weight:700;position:absolute;top:10px;right:12px;transform:rotate(-4deg)}.ds-style-03 .w-tear{border-top:2px dashed oklch(80% .03 80);height:0;margin:10px 0 8px;position:relative}.ds-style-03 .w-tear:before,.ds-style-03 .w-tear:after{content:\"\";background:oklch(94% .012 85);border-radius:50%;width:14px;height:14px;position:absolute;top:-7px}.ds-style-03 .w-tear:before{left:-21px}.ds-style-03 .w-tear:after{right:-21px}.ds-style-03 .w-tl{margin-top:0}.ds-style-03 .tl-bar{height:8px}.ds-style-03 .tl-track{background:oklch(94% .012 85);border:1px dashed oklch(80% .03 80)}.ds-style-03 .tl-track .s-idle{background:color-mix(in oklch, var(--idle) 30%, transparent)}.ds-style-03 .tl-track .s-peak{background:color-mix(in oklch, var(--peak) 78%, transparent)}.ds-style-03 .tl-cur{background:var(--now);width:1.5px;height:12px;top:-2px}.ds-style-03 .tl-meta{color:oklch(55% .03 80)}.ds-style-03 .wt th{color:oklch(58% .03 80);letter-spacing:.08em;font-size:9px}.ds-style-03 .wt td{color:oklch(36% .02 70);font-size:10.5px}.ds-style-03 .wt tr:not(.wtm) td{border-bottom:1px dotted oklch(80% .03 80)}.ds-style-03 .wt thead th{border-bottom:1px solid oklch(70% .03 80)}.ds-style-03 .wt .wtm td{letter-spacing:.14em;color:oklch(30% .02 70);font-size:9.5px;font-weight:700}.ds-style-03 .n.ci{color:var(--idle)}.ds-style-03 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-03 .wt td:nth-child(3),.ds-pv[data-period=peak] .ds-style-03 .wt th:nth-child(3),.ds-pv[data-period=idle] .ds-style-03 .wt td:nth-child(2),.ds-pv[data-period=idle] .ds-style-03 .wt th:nth-child(2){background:color-mix(in oklch, var(--now) 7%, transparent)}.ds-style-03 .w-foot{color:oklch(52% .03 80)}.ds-style-03 .w-toggle{letter-spacing:.06em;color:oklch(52% .03 80);border-top:1px dotted oklch(80% .03 80);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-style-03 .w-toggle:hover{color:oklch(30% .02 70)}.ds-style-03 .bcode{opacity:.85;background:repeating-linear-gradient(90deg,oklch(32% .02 70) 0 1.5px,#0000 1.5px 3px,oklch(32% .02 70) 3px 5px,#0000 5px 6px);height:13px;margin-top:6px}.ds-collapsed-03{width:42px;height:54px;color:var(--now);background:oklch(98.5% .008 90);border:1px solid oklch(86% .02 80);border-radius:4px;flex-direction:column;justify-content:center;align-items:center;gap:4px;display:flex;position:relative}.ds-collapsed-03 .dot{background:var(--now);border-radius:50%;width:9px;height:9px}.ds-collapsed-03 .lbl{letter-spacing:.08em;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10px;font-weight:700}.ds-collapsed-03:before,.ds-collapsed-03:after{content:\"\";background:oklch(94% .012 85);border:1px solid oklch(86% .02 80);border-top:0;border-radius:0 0 50% 50%;width:16px;height:8px;position:absolute;left:50%;transform:translate(-50%)}.ds-collapsed-03:before{top:-1px}.ds-collapsed-03:after{bottom:-1px;transform:translate(-50%)rotate(180deg)}.ds-style-04,.ds-collapsed-04{--peak:oklch(50% .17 45);--idle:oklch(50% .11 225);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-04,.ds-pv[data-period=idle] .ds-collapsed-04{--now:var(--idle)}.ds-style-04{color:oklch(24% .02 240);background:oklch(100% 0 0);border:1px solid oklch(90% .006 240);border-radius:12px;padding:14px}.ds-style-04 .w-name{font-size:12.5px;font-weight:600}.ds-style-04 .w-badge{color:var(--now);font-size:11px;font-weight:600}.ds-style-04 .w-badge .dot{background:var(--now)}.ds-style-04 .line{height:12px;margin:14px 2px 0;position:relative}.ds-style-04 .line:before{content:\"\";background:linear-gradient(90deg, var(--idle) 0 37.5%, var(--peak) 37.5% 50%, var(--idle) 50% 58.34%, var(--peak) 58.34% 75%, var(--idle) 75% 100%);border-radius:2px;height:4px;position:absolute;top:4px;left:0;right:0}.ds-style-04 .sta{background:oklch(100% 0 0);border:2.5px solid oklch(60% .03 240);border-radius:50%;width:9px;height:9px;margin-left:-4.5px;position:absolute;top:1.5px}.ds-style-04 .train{border:3px solid var(--now);width:12px;height:12px;box-shadow:0 0 0 2px color-mix(in oklch, var(--now) 30%, transparent);background:oklch(100% 0 0);border-radius:50%;margin-left:-6px;transition:left .3s;position:absolute;top:0}.ds-style-04 .line-times{color:oklch(56% .015 240);justify-content:space-between;margin-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:8.5px;display:flex}.ds-style-04 .legend{color:oklch(56% .015 240);gap:10px;margin-top:4px;font-size:9.5px;display:flex}.ds-style-04 .legend i{vertical-align:-1px;border-radius:2px;width:8px;height:8px;margin-right:4px;display:inline-block}.ds-style-04 .legend .lg-pk{background:var(--peak)}.ds-style-04 .legend .lg-id{background:var(--idle)}.ds-style-04 .wt th{color:oklch(62% .015 240);letter-spacing:.05em;font-size:9.5px}.ds-style-04 .wt td{color:oklch(32% .02 240)}.ds-style-04 .wt tr+tr td,.ds-style-04 .wt thead th{border-top:1px solid oklch(94% .005 240)}.ds-style-04 .wt .wtm td{color:oklch(24% .02 240);font-weight:600}.ds-style-04 .n.ci{color:var(--idle)}.ds-style-04 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-04 .n.cp,.ds-pv[data-period=idle] .ds-style-04 .n.ci{font-weight:700}.ds-style-04 .w-foot{color:oklch(56% .015 240);border-top:1px solid oklch(94% .005 240)}.ds-style-04 .w-toggle{color:oklch(56% .015 240);border-top-color:oklch(94% .005 240)}.ds-style-04 .w-toggle:hover{color:oklch(24% .02 240)}.ds-collapsed-04{flex-direction:column;align-items:center;gap:6px;display:flex}.ds-collapsed-04 .mini{background:linear-gradient(180deg, var(--idle) 0 37.5%, var(--peak) 37.5% 50%, var(--idle) 50% 58.34%, var(--peak) 58.34% 75%, var(--idle) 75% 100%);border-radius:3px;width:16px;height:44px;position:relative}.ds-collapsed-04 .train{border:2px solid var(--now);width:8px;height:8px;box-shadow:0 0 0 1.5px color-mix(in oklch, var(--now) 35%, transparent);background:oklch(100% 0 0);border-radius:50%;margin-left:-4px;transition:top .3s;position:absolute;left:50%}.ds-collapsed-04 .lbl{color:var(--now);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px;font-weight:600}.ds-style-05,.ds-collapsed-05{--peak:oklch(48% .15 45);--idle:oklch(48% .1 220);--now:var(--peak);--pk-fg:oklch(40% .15 45);--id-fg:oklch(40% .1 220);--pk-bg:oklch(92% .06 60);--id-bg:oklch(92% .05 215)}.ds-pv[data-period=idle] .ds-style-05,.ds-pv[data-period=idle] .ds-collapsed-05{--now:var(--idle)}.ds-style-05{color:oklch(28% .02 90);background:oklch(100% 0 0);border:1px solid oklch(92% .008 90);border-radius:18px;padding:14px}.ds-style-05 .w-name{font-size:12.5px;font-weight:600}.ds-style-05 .w-badge{background:color-mix(in oklch, var(--now) 13%, oklch(100% 0 0));color:var(--now);border-radius:999px;padding:4px 11px;font-size:11px;font-weight:600}.ds-style-05 .w-badge .dot{background:var(--now)}.ds-style-05 .tl-bar{height:8px}.ds-style-05 .tl-track{gap:3px}.ds-style-05 .tl-track>i{border-radius:6px}.ds-style-05 .tl-track .s-idle{background:var(--id-bg)}.ds-style-05 .tl-track .s-peak{background:var(--pk-bg)}.ds-style-05 .tl-cur{background:var(--now);border-radius:2px;width:3px;height:12px;top:-2px}.ds-style-05 .tl-meta{color:oklch(56% .02 90)}.ds-style-05 .wt th{color:oklch(62% .02 90);font-size:9.5px}.ds-style-05 .wt td{color:oklch(34% .02 90)}.ds-style-05 .wt tr+tr td,.ds-style-05 .wt thead th{border-top:1px solid oklch(94% .01 90)}.ds-style-05 .wt .n{border-radius:7px;padding:1px 5px}.ds-style-05 .wt .n.ci{color:var(--id-fg);background:var(--id-bg)}.ds-style-05 .wt .n.cp{color:var(--pk-fg);background:var(--pk-bg)}.ds-style-05 .wt .wtm td{font-weight:700}.ds-pv[data-period=peak] .ds-style-05 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-05 .wt td:nth-child(2){box-shadow:inset 0 -2px 0 var(--now);border-radius:4px}.ds-style-05 .w-foot{color:oklch(55% .02 90)}.ds-style-05 .w-toggle{color:oklch(55% .02 90);border-top-color:oklch(94% .01 90)}.ds-style-05 .w-toggle:hover{color:oklch(28% .02 90)}.ds-collapsed-05{background:color-mix(in oklch, var(--now) 13%, oklch(100% 0 0));color:var(--now);border:1px solid color-mix(in oklch, var(--now) 26%, transparent);border-radius:999px;align-items:center;gap:6px;padding:9px 12px;font-size:11px;font-weight:600;display:flex}.ds-collapsed-05 .dot{background:var(--now);border-radius:50%;width:7px;height:7px}.ds-style-06,.ds-collapsed-06{--peak:oklch(80% .15 85);--idle:oklch(72% .14 150);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-06,.ds-pv[data-period=idle] .ds-collapsed-06{--now:var(--idle)}.ds-style-06{color:oklch(86% .02 150);background:oklch(19% .012 260);border:1px solid oklch(38% .02 260);border-radius:8px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;overflow:hidden}.ds-style-06 .term-bar{background:oklch(16% .012 260);border-bottom:1px solid oklch(34% .02 260);align-items:center;gap:6px;padding:7px 10px;display:flex}.ds-style-06 .term-bar .tdot{background:oklch(55% .02 260);border-radius:50%;width:8px;height:8px}.ds-style-06 .term-bar .tname{color:oklch(68% .02 240);letter-spacing:.04em;margin-left:4px;font-size:10px}.ds-style-06 .term-body{padding:10px 12px 8px}.ds-style-06 .tline{white-space:normal;gap:6px;font-size:10.5px;line-height:1.7;display:flex}.ds-style-06 .tline .ps{color:oklch(60% .02 240)}.ds-style-06 .tline .txt{color:oklch(84% .02 150)}.ds-style-06 .tline .nowv{color:var(--now);font-weight:700}.ds-style-06 .tline .dim{color:oklch(56% .02 240)}.ds-style-06 .ttbl{margin-top:8px;font-size:10.5px;line-height:1.75}.ds-style-06 .tt-row,.ds-style-06 .tt-head{justify-content:space-between;gap:8px;display:flex}.ds-style-06 .tt-row{min-width:0}.ds-style-06 .tt-head{color:oklch(56% .02 240);border-bottom:1px dashed oklch(36% .02 260);margin-bottom:2px;padding-bottom:2px;font-size:9.5px}.ds-style-06 .tt-row .m{text-overflow:ellipsis;white-space:nowrap;color:oklch(80% .02 160);min-width:0;overflow:hidden}.ds-style-06 .tt-row .p{flex:none;gap:8px;display:flex}.ds-style-06 .tt-row .n{text-align:right;width:38px}.ds-style-06 .tt-row .n.idle{color:var(--idle)}.ds-style-06 .tt-row .n.peak{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-06 .tt-row .n.peak,.ds-pv[data-period=idle] .ds-style-06 .tt-row .n.idle{font-weight:700}.ds-style-06 .term-foot{color:oklch(54% .02 240);border-top:1px solid oklch(34% .02 260);padding:7px 12px;font-size:9.5px}.ds-style-06 .w-toggle{color:oklch(58% .02 240);border-top-color:oklch(34% .02 260);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace}.ds-style-06 .w-toggle:hover{color:oklch(88% .02 150)}.ds-collapsed-06{width:42px;height:54px;color:var(--now);background:oklch(19% .012 260);border:1px solid oklch(38% .02 260);border-radius:8px;flex-direction:column;justify-content:center;align-items:center;gap:4px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;display:flex}.ds-collapsed-06 .caret{font-size:14px;font-weight:700}.ds-collapsed-06 .lbl{font-size:9.5px}.ds-style-07,.ds-collapsed-07{--peak:oklch(50% .2 25);--idle:oklch(44% .12 230);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-07,.ds-pv[data-period=idle] .ds-collapsed-07{--now:var(--idle)}.ds-style-07{color:oklch(22% 0 0);background:oklch(100% 0 0);border:2px solid oklch(20% 0 0);border-radius:0;padding:12px;box-shadow:5px 5px oklch(20% 0 0)}.ds-style-07 .w-name{letter-spacing:.06em;text-transform:uppercase;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:11px;font-weight:700}.ds-style-07 .w-badge{background:var(--now);color:oklch(100% 0 0);letter-spacing:.08em;padding:3px 9px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10.5px;font-weight:700}.ds-style-07 .tl-track{background:oklch(20% 0 0);border-radius:0;gap:2px}.ds-style-07 .tl-track .s-idle{background:oklch(78% .02 200)}.ds-style-07 .tl-track .s-peak{background:var(--peak)}.ds-style-07 .tl-cur{background:var(--now);width:4px;height:16px;top:-3px}.ds-style-07 .tl-meta{color:oklch(45% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .wt th{letter-spacing:.06em;color:oklch(45% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .wt td{color:oklch(25% 0 0);font-size:11px}.ds-style-07 .wt thead th{border-top:2px solid oklch(20% 0 0);border-bottom:2px solid oklch(20% 0 0)}.ds-style-07 .wt tr+tr td{border-top:1.5px solid oklch(20% 0 0)}.ds-style-07 .wt .wtm td{letter-spacing:.1em;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px;font-weight:700}.ds-style-07 .n.ci{color:var(--idle);font-weight:700}.ds-style-07 .n.cp{color:var(--peak);font-weight:700}.ds-pv[data-period=peak] .ds-style-07 .n.cp,.ds-pv[data-period=idle] .ds-style-07 .n.ci{color:oklch(100% 0 0);background:oklch(20% 0 0)}.ds-style-07 .w-foot{color:oklch(45% 0 0);border-top:1.5px solid oklch(20% 0 0);padding-top:6px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .w-toggle{letter-spacing:.08em;text-transform:uppercase;color:oklch(45% 0 0);border-top:1.5px solid oklch(20% 0 0);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-07 .w-toggle:hover{color:oklch(20% 0 0)}.ds-collapsed-07{background:oklch(100% 0 0);border:2px solid oklch(20% 0 0);border-radius:0;place-items:center;width:44px;height:52px;display:grid;box-shadow:4px 4px oklch(20% 0 0)}.ds-collapsed-07 .box{background:var(--now);color:oklch(100% 0 0);place-items:center;width:20px;height:20px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:10px;font-weight:700;display:grid}.ds-style-08,.ds-collapsed-08{--peak:oklch(72% .15 70);--idle:oklch(74% .1 200);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-08,.ds-pv[data-period=idle] .ds-collapsed-08{--now:var(--idle)}.ds-style-08{color:oklch(96% .01 240);backdrop-filter:blur(14px);background:oklch(100% 0 0/.12);border:1px solid oklch(100% 0 0/.26);border-radius:14px;padding:13px;position:relative;box-shadow:0 12px 30px oklch(10% .02 260/.4)}.ds-style-08 .w-name{font-size:12.5px;font-weight:600}.ds-style-08 .w-badge{color:var(--now);background:oklch(100% 0 0/.15);border:1px solid oklch(100% 0 0/.22);border-radius:999px;padding:3px 9px;font-size:10.5px;font-weight:600}.ds-style-08 .w-badge .dot{background:var(--now);box-shadow:0 0 8px var(--now)}.ds-style-08 .tl-track{background:oklch(100% 0 0/.1)}.ds-style-08 .tl-track .s-peak{background:var(--peak);opacity:.92}.ds-style-08 .tl-track .s-idle{background:var(--idle);opacity:.55}.ds-style-08 .tl-cur{background:var(--now);box-shadow:0 0 8px var(--now)}.ds-style-08 .tl-meta{color:oklch(80% .02 240)}.ds-style-08 .wt th{color:oklch(78% .02 240);letter-spacing:.06em;font-size:9.5px}.ds-style-08 .wt td{color:oklch(94% .01 240)}.ds-style-08 .wt td:not(.n){color:oklch(82% .02 240)}.ds-style-08 .wt tr+tr td,.ds-style-08 .wt thead th{border-top:1px solid oklch(100% 0 0/.15)}.ds-style-08 .wt .wtm td{font-weight:600}.ds-style-08 .n.ci{color:var(--idle)}.ds-style-08 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-08 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-08 .wt td:nth-child(2){background:oklch(100% 0 0/.09)}.ds-style-08 .w-foot{color:oklch(74% .02 240);border-top:1px solid oklch(100% 0 0/.12)}.ds-style-08 .w-toggle{color:oklch(80% .02 240);border-top-color:oklch(100% 0 0/.14)}.ds-style-08 .w-toggle:hover{color:oklch(96% .01 240)}.ds-collapsed-08{backdrop-filter:blur(14px);width:44px;height:54px;color:var(--now);background:oklch(100% 0 0/.12);border:1px solid oklch(100% 0 0/.26);border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.ds-collapsed-08 .dot{background:var(--now);width:9px;height:9px;box-shadow:0 0 10px var(--now);border-radius:50%}.ds-collapsed-08 .lbl{font-size:10px;font-weight:600}.ds-style-09,.ds-collapsed-09{--day-bg:oklch(96% .02 85);--day-fg:oklch(32% .03 70);--day-mut:oklch(55% .04 80);--day-ln:oklch(86% .03 90);--night-bg:oklch(24% .05 260);--night-fg:oklch(92% .02 240);--night-mut:oklch(70% .04 250);--night-ln:oklch(42% .05 260);--now:oklch(42% .15 55);--fg2:var(--day-fg);--mut2:var(--day-mut);--ln:var(--day-ln)}.ds-pv[data-period=idle] .ds-style-09,.ds-pv[data-period=idle] .ds-collapsed-09{--now:oklch(82% .05 250);--fg2:var(--night-fg);--mut2:var(--night-mut);--ln:var(--night-ln)}.ds-style-09{background:var(--day-bg);border:1px solid var(--day-ln);color:var(--fg2);border-radius:14px;padding:14px;transition:background .35s,color .35s,border-color .35s}.ds-pv[data-period=idle] .ds-style-09{background:var(--night-bg);border-color:var(--night-ln)}.ds-style-09 .w-head{align-items:center;gap:10px;display:flex}.ds-style-09 .sky svg{width:20px;height:20px;color:var(--now)}.ds-style-09 .sky .sun{display:block}.ds-style-09 .sky .moon,.ds-pv[data-period=idle] .ds-style-09 .sky .sun{display:none}.ds-pv[data-period=idle] .ds-style-09 .sky .moon{display:block}.ds-style-09 .w-now{letter-spacing:-.01em;color:var(--now);font-size:15px;font-weight:700}.ds-style-09 .w-sub{color:var(--mut2);margin:6px 0 10px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-09 .tl-track{background:linear-gradient(90deg,oklch(38% .07 260) 0 37.5%,oklch(72% .14 60) 37.5% 50%,oklch(46% .06 250) 50% 58.34%,oklch(72% .14 60) 58.34% 75%,oklch(38% .07 260) 75% 100%)}.ds-style-09 .tl-cur{background:var(--now);box-shadow:0 0 6px var(--now);width:2.5px;height:12px;top:-3px}.ds-style-09 .tl-meta{color:var(--mut2)}.ds-style-09 .wt th{color:var(--mut2);letter-spacing:.05em;font-size:9.5px}.ds-style-09 .wt td{color:var(--fg2)}.ds-style-09 .wt tr+tr td,.ds-style-09 .wt thead th{border-top:1px solid var(--ln)}.ds-style-09 .wt .wtm td{font-weight:600}.ds-pv[data-period=peak] .ds-style-09 .n.ci{color:oklch(46% .08 240)}.ds-pv[data-period=peak] .ds-style-09 .n.cp{color:oklch(42% .14 55);font-weight:700}.ds-pv[data-period=idle] .ds-style-09 .n.ci{color:oklch(84% .06 250);font-weight:700}.ds-pv[data-period=idle] .ds-style-09 .n.cp{color:oklch(76% .13 70)}.ds-style-09 .w-foot{color:var(--mut2);border-top:1px solid var(--ln)}.ds-style-09 .w-toggle{color:var(--mut2);border-top-color:var(--ln)}.ds-style-09 .w-toggle:hover{color:var(--fg2)}.ds-collapsed-09{background:var(--day-bg);border:1px solid var(--day-ln);width:42px;height:56px;color:var(--fg2);border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:4px;transition:background .35s;display:flex}.ds-pv[data-period=idle] .ds-collapsed-09{background:var(--night-bg);border-color:var(--night-ln);color:var(--night-fg)}.ds-collapsed-09 svg{width:16px;height:16px;color:var(--now)}.ds-collapsed-09 .sun{display:block}.ds-collapsed-09 .moon,.ds-pv[data-period=idle] .ds-collapsed-09 .sun{display:none}.ds-pv[data-period=idle] .ds-collapsed-09 .moon{display:block}.ds-collapsed-09 .lbl{color:var(--now);font-size:9.5px;font-weight:600}.ds-style-10,.ds-collapsed-10{--peak:oklch(46% .16 40);--idle:oklch(44% .09 250);--now:var(--peak)}.ds-pv[data-period=idle] .ds-style-10,.ds-pv[data-period=idle] .ds-collapsed-10{--now:var(--idle)}.ds-style-10{color:oklch(30% .02 70);background:oklch(98% .005 85);border:1px solid oklch(86% .015 85);border-radius:2px;padding:14px}.ds-style-10 .w-head{justify-content:space-between;align-items:flex-start;gap:10px;display:flex}.ds-style-10 .w-eyebrow{letter-spacing:.16em;text-transform:uppercase;color:oklch(50% .06 250);margin-bottom:3px;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-name{letter-spacing:-.01em;font-family:Iowan Old Style,Charter,Georgia,Songti SC,serif;font-size:16px;font-weight:600}.ds-style-10 .w-badge{color:var(--now);letter-spacing:.1em;text-transform:uppercase;font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px}.ds-style-10 .w-badge .dot{background:var(--now)}.ds-style-10 .tl-track{background:oklch(89% .015 85);height:3px}.ds-style-10 .tl-track .s-idle{background:oklch(80% .03 250)}.ds-style-10 .tl-track .s-peak{background:var(--peak)}.ds-style-10 .tl-cur{background:var(--now);width:1.5px;height:11px;top:-4px}.ds-style-10 .tl-meta{color:oklch(52% .02 80);font-size:9px}.ds-style-10 .wt th{letter-spacing:.1em;text-transform:uppercase;color:oklch(52% .02 80);border-bottom:1px solid oklch(30% .02 70);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .wt td{color:oklch(34% .02 70);font-size:11px}.ds-style-10 .wt tr+tr td{border-top:1px solid oklch(89% .015 85)}.ds-style-10 .wt .wtm td{letter-spacing:.12em;color:oklch(30% .02 70);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9.5px;font-weight:600}.ds-style-10 .n.ci{color:var(--idle)}.ds-style-10 .n.cp{color:var(--peak)}.ds-pv[data-period=peak] .ds-style-10 .wt td:nth-child(3),.ds-pv[data-period=idle] .ds-style-10 .wt td:nth-child(2){background:color-mix(in oklch, var(--now) 7%, transparent)}.ds-style-10 .w-foot{color:oklch(55% .02 80);border-top:1px solid oklch(89% .015 85);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-toggle{letter-spacing:.08em;text-transform:uppercase;color:oklch(52% .02 80);border-top-color:oklch(89% .015 85);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:9px}.ds-style-10 .w-toggle:hover{color:oklch(30% .02 70)}.ds-collapsed-10{background:oklch(98% .005 85);border:1px solid oklch(86% .015 85);border-radius:2px;flex-direction:column;justify-content:center;align-items:center;gap:3px;width:42px;height:54px;display:flex}.ds-collapsed-10 .mark{color:var(--now);font-family:Iowan Old Style,Charter,Georgia,Songti SC,serif;font-size:15px;font-weight:600}.ds-collapsed-10 .lbl{letter-spacing:.1em;color:var(--now);font-family:ui-monospace,JetBrains Mono,IBM Plex Mono,SF Mono,Menlo,monospace;font-size:8.5px}@media (prefers-reduced-motion:reduce){.ds-pv *,.ds-pv :before,.ds-pv :after{transition:none!important;animation:none!important}}";
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
		/** 必需服务：slot 注册表（其余依赖都经 slots 进入）。 */
		const inject = ["slots"];
		/**
		* Client 插件体：侧边栏小组件 + 设置入口。
		* @param ctx - client 根上下文。
		*/
		function apply(ctx) {
			ctx.effect(() => installStyles(), "dsh-deepseek-peak-valley: styles");
			ctx.effect(() => startPeriodTimer(), "dsh-deepseek-peak-valley: period timer");
			ctx.effect(() => () => {
				resetDualStateBuckets();
			}, "dsh-deepseek-peak-valley: dual-state buckets");
			ctx.slots.inject("sidebar.footer.action", () => {
				return ctx.slots.register({
					name: "sidebar.footer.action",
					id: "dsh-deepseek-peak-valley",
					order: 10,
					registrant: "dsh-deepseek-peak-valley"
				}, PeakValleyWidget);
			});
			ctx.slots.inject("settings.section", () => {
				return ctx.slots.register({
					name: "settings.section",
					id: "dsh-deepseek-peak-valley",
					order: 30,
					label: "DS峰谷小组件",
					registrant: "dsh-deepseek-peak-valley"
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