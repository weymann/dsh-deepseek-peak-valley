# dev · 验收报告 · 批次 5：价格表默认收起

> 状态: 已验收（通过）| 日期: 2025-08-21
> 需求: 用户新增「所有小组件默认价格表收起来」
> 验收方法: 子 agent（6ccaecd5）实施 + 主 agent 独立复核（源码/产物/typecheck/build + GUI 截图）

## 改动
- `src/client/state/dual-state.ts`：`DEFAULT_SESSION_STATE` → `{ dual: 'collapsed', priceTableExpanded: false }`（唯一改动文件；该默认被 Widget.tsx 消费，覆盖全部 10 款风格）
- 排查确认：src 中无其它硬编码展开默认值；唯一例外为设置页实时预览 `previewExpanded`（`useState(true)`，主 agent 指定保留——风格展示预览非小组件本体）

## 验收证据
| 项 | 结果 |
|---|---|
| 源码默认值 | ✅ `{ dual: 'collapsed', priceTableExpanded: false }` |
| `pnpm typecheck` / `pnpm build` | ✅ exit 0（lib/client.js 85.20kB 重新生成，含新默认值） |
| GUI 截图（新 rev 3a6dd5cfdb55） | ✅ 小组件默认收起：仅头部+时间轴+「价格表」按钮；无价格表行、无页脚、高度紧凑 |
| 文档同步（主 agent） | ✅ 001-前端-页面交互 §2（默认收起+动态光标补漏）、001-接口契约 §4（默认收起）、001-用例 5（默认收起） |
| 范围纪律 | ✅ 仅改 dual-state.ts；未动设计稿/docs/package.json/cordis.patch.yml/tsdown.config.ts/SettingsSection previewExpanded |

## 遗留
- 设置页实时预览仍默认展开（展示用，按主 agent 决定保留）；如需也收起可再调
