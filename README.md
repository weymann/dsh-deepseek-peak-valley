# dsh-deepseek-peak-valley

**v0.1.1** · DeepSeek 分时段计费小组件 · DSH client 插件（platform=web）

[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-4C8BF5?logo=deepseek)](#) [![DSH rc.8](https://img.shields.io/badge/DSH-rc.8-1F6FEB?logo=deepseek)](#) [![license MIT](https://img.shields.io/badge/license-MIT-green)](#) 

按北京时间自动判定高峰（09:00–12:00、14:00–18:00）/ 空闲时段，在 DSH Web
左侧边栏左下角（设置上方）展示分时段计费报价；支持 **11 款风格切换** 与启停开关（设置页「DS峰谷小组件」）。

> 价格基于公开报价（ DeepSeek V4，元 / 百万 tokens），仅作界面演示；
> 正式接入请以官方实时接口为准。

---

## ✨ 组件介绍

### 分时段计费（全部 11 款风格）

- 高峰 / 空闲按**北京时间**自动判定，实时时间轴光标随真实时钟移动（≤5s 刷新）；
- 价格表：V4-Flash / V4-Pro × 3 计费项 × [空闲, 高峰]，高峰 = 空闲 × 2；
- 展开态（侧边栏完整报价）与收起态（56px rail 紧凑指示器）随宿主 `wide` 双态自动切换。

### 当前会话用量（风格 11 · 无人岛 Animal Island 双视图）

点击「无人岛」组件左上角按钮，可在 **分时段计费** 与 **当前会话用量** 两个视图间切换：

- **真实用量**：读取 DSH 宿主 `dsh-token-meter` 发布的 `tokenUsage` 投影（provider 上报，跨会话持久日志累计），随对话实时增长；
- **三个贴纸**：输入 tokens / 输出 tokens / **缓存命中率**（缓存命中 ÷ 总输入）；
- **明细**：缓存命中、缓存未命中、输出，以及预估费用按模型拆分 ——
  `V4-Flash` 与 `V4-Pro` 分别列出 **空闲价 / 高峰价**（高峰 = 空闲 × 2）；
- 收起态跟随视图：计费视图 = 叶子 + 峰/闲（高峰红色脉冲），用量视图 = 金币 + 费用。

> 用量统计的是**当前会话**（非历史累计、非跨会话合计）；新会话尚未产生用量时显示 0，并标注数据来源。

---

## 兼容性（DSH 版本标识）

- 插件目标：**DSH Web · rc.8**（`@deepseek-ai/dsh-client-runtime` / `-ui-sidebar` / `-ui-settings` / `-ui-slots` 均 `^0.1.0-rc.8`，`@deepseek-ai/cordis ^4.0.1`）
- 挂载形态：`sidebar.footer.action`（展开=完整报价 / 收起=紧凑指示器）+ `settings.section`（设置页）
- 发布：[GitHub Releases](https://github.com/z-col/dsh-deepseek-peak-valley/releases)（当前 v0.1.1）

## 🎨 十一款风格预览

每款风格包含**正常（展开态）**与**缩小（收起态）**两种形态（真实运行截图）：

| | | | | | |
|---|---|---|---|---|---|
| **01 · 脉冲 Pulse**<br>深色科技 | **02 · 留白 Minimal**<br>极简浅色 | **03 · 票据 Receipt**<br>票根 | **04 · 时刻线 Metro**<br>线路图 | **05 · 胶囊 Pills**<br>圆润亲和 | **06 · 终端 Terminal**<br>CLI 日志 |
| ![01](assets/styles/style-01.png) | ![02](assets/styles/style-02.png) | ![03](assets/styles/style-03.png) | ![04](assets/styles/style-04.png) | ![05](assets/styles/style-05.png) | ![06](assets/styles/style-06.png) |
| **07 · 粗野 Brutalist**<br>硬边高对比 | **08 · 玻璃 Glass**<br>毛玻璃 | **09 · 昼夜 DayNight**<br>明暗随时段 | **10 · 编辑 Editorial**<br>杂志 | **11 · 无人岛 Animal Island**<br>动森 · 双视图 | |
| ![07](assets/styles/style-07.png) | ![08](assets/styles/style-08.png) | ![09](assets/styles/style-09.png) | ![10](assets/styles/style-10.png) | ![11](assets/styles/style-11.png) | |

> 想交互式切换查看每款风格的高峰/空闲表现？打开设计稿预览页：
> [`deepseek-pricing-widget-styles.html`](deepseek-pricing-widget-styles.html)（浏览器直接打开，右上角可切换模拟时段）；
> 双视图设计稿：[`animal-island-widgets-v2.html`](animal-island-widgets-v2.html)。

---

## 安装（已验证命令）

```sh
# scratch profile 验证
dsh plugin --profile ds-pv-scratch add /path/to/dsh-deepseek-peak-valley

# 装入 web profile（装后需重启 dsh web）
dsh plugin --profile web add /path/to/dsh-deepseek-peak-valley
```

## 开发

```sh
pnpm typecheck   # host + client 双 program
pnpm build       # lib/index.js + lib/client.js（__ModuleLoader__ 包装）+ lib/types
pnpm watch       # client HMR 需 tsdown --watch 持续重写 lib/client.js
```

## 契约

- 挂载：`sidebar.footer.action`（owner `{ wide }`：展开=完整报价 / 收起=紧凑指示器）
- 设置：`settings.section`「DS峰谷小组件」（启停 + 11 款风格切换 + 模拟时段 + 预览）
- 时段规则（北京时间）：高峰 09:00–12:00 / 14:00–18:00，其余空闲；高峰价 = 空闲 × 2
- 用量：`inject: ['slots', 'sessions']`，读取当前会话 `tokenUsage` 投影（`dsh-token-meter`）

## License

[MIT](LICENSE) © 2025 z-col
