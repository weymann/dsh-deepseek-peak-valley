# dev · 预研 · DSH client 集成证据（面向实现批次）

> 状态: 草稿 | 最近更新: 2025-08-21
> 来源: 官方正式版 node_modules（@deepseek-ai/dsh-web-app 0.1.0-rc.8 系列）只读取证
> 用途: 003-DSH 集成层 实现时的 slot 契约与版本依据

## 版本
- dsh-web-app / dsh-client-ui-sidebar / dsh-client-ui-settings 均为 0.1.0-rc.8
- client 包 exports 均含 `./client`（如 `@deepseek-ai/dsh-client-ui-sidebar/client`）
- slots 类型经 `declare module '@deepseek-ai/dsh-client-ui-slots'` 的 `SlotMap` 接口合并

## 侧边栏（设计稿「左侧边栏 · 左下角 · 设置上方」）
来源: `dsh-client-ui-sidebar/lib/types/client/contract/slots.d.ts`
- `sidebar.brand.mark`（single/root）
- `sidebar.brand.name`（single/root）
- `sidebar.workspaces`（single/root）—— 会话浏览区
- `sidebar.settings`（single/root）—— 边栏脚设置位
- **`sidebar.footer.action`（list/root）** —— 设置旁的可选操作位；owner 只传 `{ wide: boolean }`
  - `SidebarFooterActionOwnerProps = { wide: boolean }`（false = 56px rail 图标栏）
  - → 对应设计稿「展开·侧边栏 (wide) / 收起·图标栏 (rail)」双态，最贴合挂载点

## 设置（用户需求「设置里选 DS峰谷小组件」）
来源: `dsh-client-ui-settings/lib/types/client/contract/slots.d.ts`
- `settings.section`（list/root）—— 一个独立设置页；选项 `id`(section key) / `order` / `label`；owner 传 `{ close }`
- `settings.general.item`（list/root）—— General 区一个首选项行；选项 `id`/`order`；owner props 为空，文案/当前值/写路径走自己的 inject face + `host.call`
- `settings.trigger`（single）—— 边栏脚触发行内容
- `settings.plugins.tab`（list）—— Plugins 区 tab 页
- 取舍（待实现批次定）：独立页 `settings.section`（可放预览 + 十款选择） vs 首选项行 `settings.general.item`（轻量下拉）

## 待实现批次再取证
- client 插件最小入口（inject/slots）与 slot 注册四步契约：参考官方 `packages/client/ui-message-feedback` 模板（skill §2.2）
- 构建：client tsdown helper + `window.__ModuleLoader__.load` 包装
- 组合验证：`dsh plugin --profile <scratch> add <pkg>` → `--dump-config` → 真实 GUI
