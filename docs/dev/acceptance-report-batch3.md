# dev · 验收报告 · 批次 3：真实 profile 安装 + GUI 实机验证

> 状态: 已验收（通过）| 日期: 2025-08-21

## CLI 验证（scratch profile）
- `dsh plugin --profile ds-pv-scratch add /Users/zcol/Project/DeepSeek峰谷小组件`：profile 初始化成功，link 安装（574ms）
- `dsh.profile.bundles` 对账正确：`[@deepseek-ai/dsh-base, dsh-deepseek-peak-valley]`
- `dsh --profile ds-pv-scratch --dump-config`：插件层出现（`# == dsh-deepseek-peak-valley` → id/name 行）

## Web profile 安装
- `dsh plugin --profile web add <路径>`：成功（+9 包，link 安装）
- `dsh.profile.bundles`：末尾追加 `dsh-deepseek-peak-valley`
- web 组合含 `ui-sidebar`（声明 sidebar.footer.action）与 `ui-settings`（声明 settings.section），插件注册目标槽位齐备

## 服务端/构建产物验证
- GUI 根（127.0.0.1:3080）HTTP 200，`__DSH_BOOT__.entries` 含 `dsh-deepseek-peak-valley/client.js?rev=…`
- `/plugins/dsh-deepseek-peak-valley/client.js` HTTP 200，84778B，内容为 `window.__ModuleLoader__.load({ id, factory })` + react 模块表 require（格式契约正确）

## GUI 实机验证（无头 Chrome 截图 + 视觉核验）
截图 `.vision/gui-sidebar.png`（1440×900）：
- ✅ 左侧边栏正常渲染；「DeepSeek 计费」小组件出现在**边栏左下角、设置按钮上方**
- ✅ 展开态完整：橙色「● 高峰」徽章（高峰=暖色语义）、分时段时间轴（高峰 09:00–12:00 / 14:00–18:00）、价格表（V4-Flash / V4-Pro × 空闲/高峰 计费项）、页脚「元 / 百万 tokens · 北京时间」
- ✅ 无渲染错误/布局错位
- 注：收起（rail）形态与设置页交互由代码验证（Widget.tsx 按 { wide } 切换 Collapsed；SettingsSection.tsx 启停+风格选择），GUI 交互态未逐一点击核验（无浏览器驱动工具）

## 总体判定
**通过**。插件已装入 web profile 并实机运行：侧边栏小组件正常显示且数据与设计稿/契约一致。批次 3 完成。
