# dev · 验收报告 · 批次 4：动态光标 + 终端宽度修复

> 状态: 已验收（通过）| 日期: 2025-08-21
> 验收方法: 修复子 agent（346f0039）实施 + 主 agent 独立复核（typecheck/build + 源码核对 + GUI 像素级实测）

## 修复内容
### Bug 1 · 峰谷时间轴光标写死 → 动态化
- `src/core/period.ts` 新增 `cursorPercentAt()` = 北京分钟数 / 1440 × 100
- `state/period.ts`：快照携带 `cursorPercent`（始终按真实时钟，手动覆盖不影响）；tick 30s→5s，每次更新
- Timeline/Metro 光标与列车改传动态值；CSS/常量不再写死（types.ts 常量标记为演示兜底）

### Bug 2 · 06 终端展开态宽度不一致
- `.ds-pv`/`.ds-pv .w` 增 `width:100%; min-width:0`；`.tline` 允许换行；`.tt-row .m` 省略号截断；数字列 `flex:none`

## 验收证据
| 项 | 结果 |
|---|---|
| `pnpm typecheck` / `pnpm build` | ✅ exit 0（lib/client.js 85.20kB 重新生成） |
| 产物包含修复 | ✅ lib/client.js 含 `cursorPercentAt()`、`.ds-pv{width:100%;min-width:0}`、`.tline{white-space:normal}` |
| GUI 光标位置（无头 Chrome 截图 + 像素分析） | ✅ 北京 09:22:37 → 理论 39.07%，实测光标 x≈114.5 / 轨道 39.08%（精确匹配，非写死 43.75%） |
| GUI 轨道分段 | ✅ 37.50% / 12.07% / 8.19% / 16.38% / 25.00%（契约一致） |
| 徽章时段 | ✅ 北京 09:22 在高峰窗 → 显示「高峰」（暖色） |
| 范围纪律 | ✅ 未动设计稿 / docs / package.json / cordis.patch.yml / tsdown.config.ts（唯一清单外改动：SettingsSection 预览透传新 prop，必要） |

## 遗留
- 06 终端宽度为 CSS 级确定性修复 + 产物验证；GUI 交互切换风格未逐一点击（无浏览器驱动），建议用户在设置页切到 06 目检
- 光标随 5s tick 移动（0.3s 动画）；若需更平滑可后续缩短 tick
