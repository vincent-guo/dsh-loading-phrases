# dsh-loading-phrases

把 DeepSeek Harness Web GUI 的 **"Deep diving..."** 运行状态行替换为交替轮换的
**诙谐俏皮话**与**实用操作提示**——保留原位置、原渐变 shimmer 效果和已运行
时长时钟。

[English](README.md)

## 行为

当一轮运行进行中（即原文案出现的同一条件）时：

- 原文 "Deep diving..." 让位于**同一位置**的轮换文案，沿用同款渐变 shimmer
  配方渲染；
- 严格交替：俏皮话 5 秒 → 提示 10 秒 → 俏皮话……每一轮从俏皮话开始；
- 轮换为无重复 shuffle（Fisher–Yates 洗牌，抽完重洗）——不会连续重复，一轮
  内每条都展示一次；
- 15 秒后出现的耗时时钟与原来完全一致；
- 跟随界面语言：`zh` → 中文列表，否则英文；
- 短语同步镜像到状态行的 `aria-label`，辅助技术（屏幕阅读器）播报的是
  真实文本变更，而非 CSS 伪元素内容；
- 窄窗口下过长的短语以省略号截断；
- 若产品 DOM 结构变化导致找不到状态行，插件会在控制台输出诊断信息，
  而不是静默失效。

天然失败让路：原文案只会在插件脚本存活期间被隐藏，任何故障都会自动降级回
产品原文。

## 安装

```bash
dsh plugin add /绝对路径/dsh-loading-phrases
```

（也可在 profile 目录内直接运行 `corepack pnpm add
/绝对路径/dsh-loading-phrases`）

然后在 `~/.dsh/profiles/<profile>/cordis.patch.yml` 中加入加载行（文件不存在
则新建）：

```yaml
- insert:
    - id: loading-phrases
      name: dsh-loading-phrases
```

硬刷新 Web GUI 页面（⌘/Ctrl+Shift+R）。

## 配置

包根目录的 `dsh-loading-phrases.json` 由 host 半通过 HTTP 路由提供，客户端每次
页面加载时读取——改配置只需刷新页面，无需重启：

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

## 自定义短语

1. 编辑 `src/data/witty.json` 和/或 `src/data/tips.json`（`en` / `zh` 是独立
   内容，非逐条互译）；
2. 运行 `node scripts/sync-data.js`（或 `npm run sync`）重新生成
   `lib/client.js` 中的数据块，再 `npm run check`；
3. 改配置只需硬刷新页面；**改代码**（`lib/*.js`）需要重启 web profile
   进程——bundle 修订只有经 HMR 或重启才会重新进入模块图谱。

## 内容

| 通道 | 英文 | 中文 | 来源 |
| --- | --- | --- | --- |
| 俏皮话 | 49 | 24 | 源自 Qwen Code web-shell 列表（Apache-2.0，见 `NOTICE.md`） |
| 提示 | 40 | 40 | 对照 DSH 真实界面行为撰写 |

## 仓库结构

```
dsh-loading-phrases.json   默认配置（host 半提供）
lib/index.js               host 半（配置 HTTP 路由）
lib/client.js              客户端 bundle（DOM 定位、轮换引擎、生成的数据块）
src/data/*.json            短语内容（唯一事实来源）
scripts/sync-data.js       重新生成 lib/client.js 中的数据块
scripts/test-client.mjs    客户端 bundle 行为仿真
scripts/test-host.mjs      host 配置路由测试
docs/design.md             设计基线与决策记录
```

## 路线图

- v3 —— 短语管理设置面板。

## 许可证

[MIT](./LICENSE)
