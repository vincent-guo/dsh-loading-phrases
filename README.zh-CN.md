# dsh-loading-phrases

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
Web GUI 插件：把自带的 `Deep diving...` 运行状态文案替换为轮换显示的
**诙谐俏皮话**与**实用操作提示**。

## 功能

当会话处于运行中（即原文案 `Deep diving...` 出现的同一条件）时：

- 隐藏原始状态行；
- 在输入框下方的读数区显示单行内容，严格交替轮换：俏皮话 5 秒 → 提示 10
  秒，如此往复，每轮从俏皮话开始；
- 轮换采用无重复 shuffle（Fisher–Yates 洗牌，抽完重洗）——不会连续出现同一
  条，一轮内保证全部展示一遍；
- 运行超过 15 秒后，短语旁显示已运行时长，与原版时钟行为一致；
- 运行结束瞬间整行消失。

语言跟随 GUI 界面语言（`zh` → 中文，否则英文，未知语言回退英文）。

## 内容

| 通道 | 英文 | 中文 | 来源 |
| --- | --- | --- | --- |
| 俏皮话 | 49 | 24 | 源自 Qwen Code web-shell 列表（Apache-2.0，见 `NOTICE.md`） |
| 提示 | 40 | 40 | 对照 DSH 真实界面行为撰写 |

其中一条俏皮话按 DSH 输入框的真实快捷键做了适配
（`Ctrl+J` → `Shift+Enter`）。

## 配置

会话工作区下的 `dsh-loading-phrases.json`：

```json
{
  "loadingPhrases": {
    "mode": "all",
    "wittyIntervalMs": 5000,
    "tipsIntervalMs": 10000,
    "shuffle": true,
    "language": "auto",
    "phrases": { "en": [], "zh": [] },
    "tips": { "en": [], "zh": [] }
  }
}
```

| 键 | 取值 | 默认 | 含义 |
| --- | --- | --- | --- |
| `mode` | `tips` / `witty` / `all` / `off` | `all` | `off` 时插件完全让路，原始 `Deep diving...` 原样显示 |
| `wittyIntervalMs` | 数字 | `5000` | 俏皮话停留时长 |
| `tipsIntervalMs` | 数字 | `10000` | 提示停留时长 |
| `shuffle` | 布尔 | `true` | 无重复轮换；`false` 为有放回随机 |
| `language` | `auto` / `en` / `zh` | `auto` | 强制语言，否则跟随界面语言 |
| `phrases`、`tips` | `{ "en": [...], "zh": [...] }` | 空 | 按语言覆盖；非空列表替换该语言的内置列表 |

修改后刷新页面生效。

## 仓库结构

```
dsh-loading-phrases.json   默认配置
src/data/witty.json        内置俏皮话（中英）
src/data/tips.json         内置提示（中英）
src/plugin/host.js         Cordis Host 半（读配置与数据，提供 bootstrap）
src/plugin/client.js       Cordis Client 半（dock UI、轮换引擎）
docs/design.md             设计基线与决策记录
```

完整设计基线与待定项见 `docs/design.md`。

## 状态

已作为会话内动态 Cordis 插件验证。持久化安装（agent preset / host 组合）
已规划、待定。
