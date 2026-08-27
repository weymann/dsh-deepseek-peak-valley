# DeepSeek 分时段计费 & Go 套餐用量 小组件

**v0.2.0** · 一个 DSH Web 侧边栏小插件

[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-4C8BF5?logo=deepseek)](#) [![DSH rc.8](https://img.shields.io/badge/DSH-rc.8-1F6FEB?logo=deepseek)](#) [![license MIT](https://img.shields.io/badge/license-MIT-green)](#)

## 一句话说明

装在 DSH Web 左侧边栏里，随时帮你盯着两件事：**DeepSeek 现在是高价还是低价时段**，以及 **Go 套餐额度用了多少**。

## 它能做什么

- **自动判断时段**：按北京时间，自动识别「高峰」（09:00–12:00、14:00–18:00）和「空闲」，高峰价 = 空闲价 × 2。
- **常驻侧边栏**：不用开网页，左侧栏就能看到报价和时段，点开还能看详情。
- **11 款皮肤**：深色科技、极简、票据、地铁线路、终端……挑一个顺眼的。
- **Go 套餐额度**：直接显示 Go 模型近 5 小时、本周、本月的用量。

> 价格基于公开报价的界面演示（DeepSeek V4，元 / 百万 tokens），正式接入以官方实时接口为准。

## 最新更新（v0.2.0）

1. **新增「Go 5 小时用量」进度条**（1–10 号皮肤）：在时间轴下面多了一条**没有高峰/空闲标记的纯进度条**，专门展示 Go 模型近 5 小时的用量百分比。
2. **余额查询面板翻新**：
   - 去掉了「赠送 / 充值 / 可用」三行（平时基本用不上）；
   - 换成 **Go 周额度、Go 月额度**（带百分比和金额）；
   - 底部不再是固定文字，而是**真的 60 秒倒计时**——数到 0 自动刷新一次数据，然后重新计时。
3. **修好了人民币余额**：之前会显示成 `0.00 USD`（误取了账号里的美元那条），现在能**正确显示你的人民币余额**，例如 `90.xx CNY`。
4. 标题从「DeepSeek 计费」改成「**DeepSeek & Go**」。

> 说明：11 号皮肤（无人岛）是双视图设计，自带 Go 额度三贴纸，不走上面 1–10 的进度条改动。

## 十一款皮肤

每款都包含**展开态**和**收起态**两种样子（真实运行截图）：

| | | | | | |
|---|---|---|---|---|---|
| **01 · 脉冲 Pulse** | **02 · 留白 Minimal** | **03 · 票据 Receipt** | **04 · 时刻线 Metro** | **05 · 胶囊 Pills** | **06 · 终端 Terminal** |
| ![01](assets/styles/style-01.png) | ![02](assets/styles/style-02.png) | ![03](assets/styles/style-03.png) | ![04](assets/styles/style-04.png) | ![05](assets/styles/style-05.png) | ![06](assets/styles/style-06.png) |
| **07 · 粗野 Brutalist** | **08 · 玻璃 Glass** | **09 · 昼夜 DayNight** | **10 · 编辑 Editorial** | **11 · 无人岛 Animal Island** | |
| ![07](assets/styles/style-07.png) | ![08](assets/styles/style-08.png) | ![09](assets/styles/style-09.png) | ![10](assets/styles/style-10.png) | ![11](assets/styles/style-11.png) | |

想切换着看每种皮肤的高峰/空闲样子？直接用浏览器打开设计稿：
[`deepseek-pricing-widget-styles.html`](deepseek-pricing-widget-styles.html)（右上角可切模拟时段）；
双视图设计稿：[`animal-island-widgets-v2.html`](animal-island-widgets-v2.html)。

## 怎么安装

```sh
dsh plugin --profile web add /path/to/dsh-deepseek-peak-valley
```

装完重启一下 dsh web 即可。

## 兼容性

- 目标：**DSH Web · rc.8**
- 出现位置：左侧栏左下角（设置按钮上方）+ 设置页「DS峰谷小组件」（启停、换皮肤）

## License

[MIT](LICENSE) © 2025 z-col
