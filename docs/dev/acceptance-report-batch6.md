# dev · 验收报告 · 批次 6：设置预览并排 + 名称标记

> 状态: 已验收（通过）| 日期: 2025-08-21
> 需求: 用户「设置里的预览栏，把缩小后的组件和正常组件放到一排展示，标记好名称」
> 验收方法: 子 agent（108fac51）实施 + 主 agent 独立复核（源码/产物/typecheck/build + GUI 真实交互实测）

## 改动
- `src/client/components/SettingsSection.tsx`（预览区块）：两个预览项（展开态 + 收起态）各包一层
  `ds-pv-preview-item ds-pv-preview-item--expanded|--collapsed`，每项上方新增名称标签
  `ds-pv-preview-label`：「正常 · 展开态」/「缩小 · 收起态」；组件结构零改动
  （`.ds-pv` 容器 class / data-period / role / aria-label 原样保留，Expanded/Collapsed props 未动）。
- `src/client/styles/settings.css`：
  - `.ds-pv-preview-stack`：`flex-wrap: nowrap` + `overflow-x: auto` —— 两组件**始终同一排**，空间不足横向滚动，绝不换行；
  - 新增 `.ds-pv-preview-item`（flex 列、标签在上组件在下、左对齐）与 `.ds-pv-preview-label`（与预览标题同风格小号大写）；
  - 展开项固定 268px；收起项 `.ds-pv` 用 `width: max-content`，容器贴合 42-56px 窄组件，不留大空位。

## 验收证据
| 项 | 结果 |
|---|---|
| 源码复核（主 agent 独立读） | ✅ 两组件同一排 + 各带名称标签；组件结构/aria 语义零改动；仅 2 个源文件 |
| `pnpm typecheck`（主 agent 独立实跑） | ✅ exit 0 |
| `pnpm build`（主 agent 独立实跑） | ✅ exit 0，lib/client.js 86.31kB 重新生成，含「正常 · 展开态」「缩小 · 收起态」与 `ds-pv-preview-label` |
| GUI 实测（CDP 驱动真实 dsh web：点击「设置」→「DS峰谷小组件」） | ✅ 预览区渲染两 item；几何测量：展开态 [527,591,268,404]、收起态 [809,591,72,78]，**y 完全相等（591）、垂直重叠 78px = 完全同一排**；收起态宽度贴合窄组件（72px） |
| 侧边栏回归（截图像素对比） | ✅ 改动前后左侧边栏差异 0.07%（仅动态光标移动），小组件无回归 |
| 范围纪律 | ✅ 仅改 SettingsSection.tsx + settings.css；未动设计稿/docs/package.json/cordis.patch.yml/tsdown.config.ts |

## 遗留
- 设置页为 hash 路由交互进入（无直达 URL），本轮以 CDP 真实点击验证；如需目检可刷新页面 → 设置 → DS峰谷小组件。
