import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
//#region src/index.ts
/**
* dsh-deepseek-peak-valley · Node 半场（host）+ Go 套餐代理 + DeepSeek 余额代理
*
* - 读凭据：优先使用设置页通过 POST /go-quota/config 写入的 ~/.dsh/dsh-deepseek-peak-valley.json，
*   其次环境变量，其次 auth.json
* - Go：代理官方接口 GET https://opencode.ai/zen/go/v1/usage
* - DeepSeek：代理 GET https://api.deepseek.com/user/balance
* - 缓存 single-flight + TTL 60s + 失败退避 10s + stale-on-error
* - 注册同源路由 GET /go-quota/usage, GET/POST /go-quota/config, GET /deepseek/balance
*/
const inject = ["webServer"];
const GO_ENDPOINT = "https://opencode.ai/zen/go/v1/usage";
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/user/balance";
const ERROR_RETRY_GAP_MS = 1e4;
const CONFIG_PATH = path.join(os.homedir(), ".dsh", "dsh-deepseek-peak-valley.json");
const goCache = {
	at: 0,
	data: null,
	error: null,
	promise: null
};
const dsCache = {
	at: 0,
	data: null,
	error: null,
	promise: null
};
function loadPersistConfig() {
	try {
		if (!fs.existsSync(CONFIG_PATH)) return {};
		const raw = fs.readFileSync(CONFIG_PATH, "utf8");
		const obj = JSON.parse(raw);
		return {
			goKey: obj.goKey?.trim() || void 0,
			deepseekKey: obj.deepseekKey?.trim() || void 0
		};
	} catch {
		return {};
	}
}
function savePersistConfig(patch) {
	const next = { ...loadPersistConfig() };
	if (patch.goKey !== void 0) next.goKey = patch.goKey.trim() ? patch.goKey.trim() : void 0;
	if (patch.deepseekKey !== void 0) next.deepseekKey = patch.deepseekKey.trim() ? patch.deepseekKey.trim() : void 0;
	if (!next.goKey) delete next.goKey;
	if (!next.deepseekKey) delete next.deepseekKey;
	try {
		fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
		fs.writeFileSync(CONFIG_PATH, JSON.stringify(next, null, 2), "utf8");
	} catch {}
	return next;
}
function maskKey(key) {
	if (!key) return "";
	if (key.length <= 8) return "***";
	return key.slice(0, 6) + "****" + key.slice(-4);
}
/** 读取 Go Key：设置页配置 > env > auth.json */
function resolveGoKey() {
	const cfg = loadPersistConfig();
	if (cfg.goKey) return cfg.goKey;
	const envKey = process.env.OPENCODE_GO_API_KEY || process.env.OPENCODE_API_KEY;
	if (envKey && envKey.trim()) return envKey.trim();
	const authContent = process.env.OPENCODE_AUTH_CONTENT;
	if (authContent) try {
		const parsed = JSON.parse(authContent);
		for (const k of ["opencode-go", "opencode"]) {
			const ent = parsed?.[k];
			if (ent && ent.type === "api" && typeof ent.key === "string" && ent.key.trim()) return ent.key.trim();
		}
	} catch {}
	const candidates = [];
	const xdg = process.env.XDG_DATA_HOME;
	if (xdg) candidates.push(path.join(xdg, "opencode", "auth.json"));
	if (process.env.LOCALAPPDATA) candidates.push(path.join(process.env.LOCALAPPDATA, "opencode", "auth.json"));
	candidates.push(path.join(os.homedir(), ".local", "share", "opencode", "auth.json"));
	candidates.push(path.join(os.homedir(), ".config", "opencode", "auth.json"));
	for (const p of candidates) try {
		if (!fs.existsSync(p)) continue;
		const raw = fs.readFileSync(p, "utf8");
		const obj = JSON.parse(raw);
		for (const k of ["opencode-go", "opencode"]) {
			const ent = obj?.[k];
			if (ent && ent.type === "api" && typeof ent.key === "string" && ent.key.trim()) return ent.key.trim();
		}
	} catch {}
}
function resolveDeepseekKey() {
	const cfg = loadPersistConfig();
	if (cfg.deepseekKey) return cfg.deepseekKey;
	const envKey = process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_KEY || process.env.DEEPSEEK_API_TOKEN;
	if (envKey && envKey.trim()) return envKey.trim();
	const candidates = [];
	const xdg = process.env.XDG_DATA_HOME;
	if (xdg) candidates.push(path.join(xdg, "opencode", "auth.json"));
	candidates.push(path.join(os.homedir(), ".local", "share", "opencode", "auth.json"));
	candidates.push(path.join(os.homedir(), ".config", "opencode", "auth.json"));
	for (const p of candidates) try {
		if (!fs.existsSync(p)) continue;
		const raw = fs.readFileSync(p, "utf8");
		const ent = JSON.parse(raw)?.["deepseek"];
		if (ent && ent.type === "api" && typeof ent.key === "string" && ent.key.trim()) return ent.key.trim();
	} catch {}
}
async function fetchGo() {
	const key = resolveGoKey();
	if (!key) throw new Error("未找到 OpenCode Go API Key（请在设置页“Go套餐 Key”中配置）");
	const res = await fetch(GO_ENDPOINT, {
		headers: { authorization: `Bearer ${key}` },
		signal: AbortSignal.timeout(8e3)
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		let msg = `HTTP ${res.status}`;
		if (res.status === 401) msg = "Go API Key 无效（401）";
		else if (res.status === 403) msg = "未订阅 OpenCode Go（403）";
		else if (body) msg += ` ${body.slice(0, 200)}`;
		throw new Error(msg);
	}
	const usage = (await res.json())?.usage;
	if (!usage || !usage.rolling || !usage.weekly || !usage.monthly) throw new Error("返回结构异常：缺少 rolling/weekly/monthly");
	return usage;
}
async function fetchDeepseek() {
	const key = resolveDeepseekKey();
	if (!key) throw new Error("未找到 DeepSeek API Key（请在设置页“DeepSeek Key”中配置）");
	const res = await fetch(DEEPSEEK_ENDPOINT, {
		headers: { Authorization: `Bearer ${key}` },
		signal: AbortSignal.timeout(8e3)
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		let msg = `HTTP ${res.status}`;
		if (res.status === 401) msg = "DeepSeek API Key 无效（401）";
		else if (body) msg += ` ${body.slice(0, 300)}`;
		throw new Error(msg);
	}
	const data = await res.json();
	if (data?.balance_infos && Array.isArray(data.balance_infos)) return data;
	if (data?.data?.balance_infos) return data.data;
	throw new Error("返回结构异常：缺少 balance_infos");
}
async function ensureGo(pollMs) {
	const now = Date.now();
	if (goCache.data && now - goCache.at < pollMs) return {
		ok: true,
		usage: goCache.data,
		fetchedAt: new Date(goCache.at).toISOString()
	};
	if (goCache.error && now - goCache.at < ERROR_RETRY_GAP_MS) {
		if (goCache.data) return {
			ok: true,
			usage: goCache.data,
			stale: true,
			error: goCache.error,
			fetchedAt: new Date(goCache.at).toISOString()
		};
		return {
			ok: false,
			error: goCache.error,
			fetchedAt: new Date(goCache.at).toISOString()
		};
	}
	if (goCache.promise) try {
		return {
			ok: true,
			usage: await goCache.promise,
			fetchedAt: new Date(goCache.at).toISOString()
		};
	} catch (e) {
		if (goCache.data) return {
			ok: true,
			usage: goCache.data,
			stale: true,
			error: e?.message ?? String(e),
			fetchedAt: new Date(goCache.at).toISOString()
		};
		return {
			ok: false,
			error: e?.message ?? String(e),
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
	const p = fetchGo();
	goCache.promise = p;
	try {
		const u = await p;
		goCache.data = u;
		goCache.error = null;
		goCache.at = Date.now();
		return {
			ok: true,
			usage: u,
			fetchedAt: new Date(goCache.at).toISOString()
		};
	} catch (e) {
		const msg = e?.message ?? String(e);
		goCache.error = msg;
		if (goCache.data) return {
			ok: true,
			usage: goCache.data,
			stale: true,
			error: msg,
			fetchedAt: new Date(goCache.at).toISOString()
		};
		goCache.at = Date.now();
		return {
			ok: false,
			error: msg,
			fetchedAt: new Date(goCache.at).toISOString()
		};
	} finally {
		goCache.promise = null;
	}
}
async function ensureDeepseek(pollMs) {
	const now = Date.now();
	if (dsCache.data && now - dsCache.at < pollMs) return {
		ok: true,
		data: dsCache.data,
		fetchedAt: new Date(dsCache.at).toISOString()
	};
	if (dsCache.error && now - dsCache.at < ERROR_RETRY_GAP_MS) {
		if (dsCache.data) return {
			ok: true,
			data: dsCache.data,
			stale: true,
			error: dsCache.error,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
		return {
			ok: false,
			error: dsCache.error,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
	}
	if (dsCache.promise) try {
		return {
			ok: true,
			data: await dsCache.promise,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
	} catch (e) {
		if (dsCache.data) return {
			ok: true,
			data: dsCache.data,
			stale: true,
			error: e?.message ?? String(e),
			fetchedAt: new Date(dsCache.at).toISOString()
		};
		return {
			ok: false,
			error: e?.message ?? String(e),
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
	const p = fetchDeepseek();
	dsCache.promise = p;
	try {
		const d = await p;
		dsCache.data = d;
		dsCache.error = null;
		dsCache.at = Date.now();
		return {
			ok: true,
			data: d,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
	} catch (e) {
		const msg = e?.message ?? String(e);
		dsCache.error = msg;
		if (dsCache.data) return {
			ok: true,
			data: dsCache.data,
			stale: true,
			error: msg,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
		dsCache.at = Date.now();
		return {
			ok: false,
			error: msg,
			fetchedAt: new Date(dsCache.at).toISOString()
		};
	} finally {
		dsCache.promise = null;
	}
}
function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => body += chunk);
		req.on("end", () => {
			if (!body) return resolve({});
			try {
				resolve(JSON.parse(body));
			} catch (e) {
				reject(/* @__PURE__ */ new Error("JSON 解析失败"));
			}
		});
		req.on("error", reject);
	});
}
function json(res, obj, status = 200) {
	res.statusCode = status;
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Cache-Control", "no-store");
	res.end(JSON.stringify(obj));
}
function apply(ctx, config) {
	const pollMs = typeof config?.pollMs === "number" && config.pollMs >= 15e3 ? config.pollMs : 6e4;
	const disposers = [];
	disposers.push(ctx.webServer.register({
		kind: "exact",
		path: "/go-quota/usage",
		handler: async (_req, res) => {
			json(res, await ensureGo(pollMs));
		}
	}));
	disposers.push(ctx.webServer.register({
		kind: "exact",
		path: "/deepseek/balance",
		handler: async (_req, res) => {
			json(res, await ensureDeepseek(pollMs));
		}
	}));
	disposers.push(ctx.webServer.register({
		kind: "exact",
		path: "/go-quota/config",
		handler: async (req, res) => {
			if (req.method === "GET") {
				const cfg = loadPersistConfig();
				json(res, {
					goKeyConfigured: !!cfg.goKey,
					deepseekKeyConfigured: !!cfg.deepseekKey,
					goKeyMasked: maskKey(cfg.goKey),
					deepseekKeyMasked: maskKey(cfg.deepseekKey)
				});
				return;
			}
			if (req.method === "POST") {
				try {
					const body = await readJsonBody(req);
					const patch = {};
					if (typeof body.goKey === "string") patch.goKey = body.goKey;
					if (typeof body.deepseekKey === "string") patch.deepseekKey = body.deepseekKey;
					if (body.goKey === "" || body.goKey === null) patch.goKey = "";
					if (body.deepseekKey === "" || body.deepseekKey === null) patch.deepseekKey = "";
					const next = savePersistConfig(patch);
					if (patch.goKey !== void 0) {
						goCache.at = 0;
						goCache.error = null;
						goCache.promise = null;
					}
					if (patch.deepseekKey !== void 0) {
						dsCache.at = 0;
						dsCache.error = null;
						dsCache.promise = null;
					}
					json(res, {
						ok: true,
						goKeyMasked: maskKey(next.goKey),
						deepseekKeyMasked: maskKey(next.deepseekKey)
					});
				} catch (e) {
					json(res, {
						ok: false,
						error: e?.message ?? String(e)
					}, 400);
				}
				return;
			}
			res.statusCode = 405;
			res.setHeader("Allow", "GET, POST");
			res.end("Method Not Allowed");
		}
	}));
	const timer = setInterval(() => {
		ensureGo(pollMs).catch(() => {});
		ensureDeepseek(pollMs).catch(() => {});
	}, pollMs);
	timer.unref?.();
	ensureGo(pollMs).catch(() => {});
	ensureDeepseek(pollMs).catch(() => {});
	return () => {
		clearInterval(timer);
		for (const d of disposers) try {
			d();
		} catch {}
	};
}
//#endregion
export { apply, inject };
