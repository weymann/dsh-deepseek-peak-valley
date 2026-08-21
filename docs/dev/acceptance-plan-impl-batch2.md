# dev · 验收计划 · 批次 2：实现 dsh client 插件

> 状态: 草稿 | 最近更新: 2025-08-21
> 所属: 主 agent「如何验收」定义；实现子 agent c8b1d8a0 完成后执行

## 批次内容
Web 前端子 agent（c8b1d8a0）实现 DSH client 插件 `dsh-deepseek-peak-valley`（项目根）：
scaffold + 核心引擎 + sidebar.footer.action 双态挂载 + 设置选项 + 10 款风格 React 组件 + typecheck。

## 验收标准（主 agent 定义）
| # | 维度 | 标准 | 判定 |
|---|------|------|------|
| 1 | 包清单一致性 | package.json 的 exports（./client 指向真实产物）/ dsh.bundle.patch / dsh.client.platform=web / files 一致；cordis.patch.yml 顶层数组含稳定 id/name/config | 通过/不通过 |
| 2 | 核心引擎对齐 | PeriodState/DualState/PriceTable 等类型与 12 个价格数值、时段规则（北京时间 09:00–12:00/14:00–18:00）、高峰=空闲×2 与 001-接口契约一致 | 通过/不通过 |
| 3 | 挂载与双态 | 注册 sidebar.footer.action（owner props { wide }）：wide=完整报价 / rail=紧凑指示器；生命周期随 dispose 清理 | 通过/不通过 |
| 4 | 设置选项 | 「DS峰谷小组件」设置入口（settings.section 或 settings.general.item）：可切换 10 款风格 + 启停开关 | 通过/不通过 |
| 5 | 10 款风格 | 每款含展开态（头部/时间轴/价格表/页脚）与收起态（紧凑指示器）；语义配色高峰=暖/空闲=冷；可访问性（aria/reduced-motion） | 通过/不通过 |
| 6 | 可编译 | typecheck（tsc --noEmit）通过；exports/files 无指向不存在文件 | 通过/不通过 |
| 7 | 范围纪律 | 未动设计稿、未动 docs/ | 通过/不通过 |

## 验收方法
1. 读 001/002/003 接口契约 + 设计稿关键事实（验收计划 docs/dev/acceptance-plan-docs-batch1.md 的关键事实基准）
2. 逐项核验 7 维度；数值逐项比对
3. 运行 typecheck（如依赖已装）；未装则评估源码自洽性
4. 输出：每维度 通过/不通过 + 差异清单；总体结论

## 批次 3（实现验收后）
真实 profile 安装验证：scratch profile → `dsh plugin --profile <scratch> add <pkg>` → `--dump-config` 出现插件层 → 启动后 host/client 加载、GUI 左侧边栏左下角可见组件 + 设置可切换风格。
