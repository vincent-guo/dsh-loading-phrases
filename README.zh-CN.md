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
- 跟随界面语言：`zh` → 中文列表，否则英文。

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

## 自定义短语

1. 编辑 `src/data/witty.json` 和/或 `src/data/tips.json`（`en` / `zh` 是独立
   内容，非逐条互译）；
2. 运行 `node scripts/sync-data.js`（或 `npm run sync`）重新生成
   `lib/client.js` 中的数据块，再 `npm run check`；
3. 硬刷新页面。若命中旧 bundle 缓存，重启 web profile 进程。

轮换调参（停留时长、shuffle）在 `lib/client.js` 顶部的 `TUNING` 区。

## 内容

| 通道 | 英文 | 中文 | 来源 |
| --- | --- | --- | --- |
| 俏皮话 | 49 | 24 | 源自 Qwen Code web-shell 列表（Apache-2.0，见 `NOTICE.md`） |
| 提示 | 40 | 40 | 对照 DSH 真实界面行为撰写 |

## 仓库结构

```
lib/index.js        host 半（v1 为空壳；v2 计划读配置文件）
lib/client.js       客户端 bundle（DOM 定位、轮换引擎、生成的数据块）
src/data/*.json     短语内容（唯一事实来源）
scripts/sync-data.js  重新生成 lib/client.js 中的数据块
docs/design.md      设计基线与决策记录
legacy/             验证阶段的动态 Cordis 插件（仅存档）
```

## 路线图

- v2 —— `dsh-loading-phrases.json` 配置（mode、间隔、shuffle、按语言覆盖），
  由 host 半读取。
- v3 —— 短语管理设置面板。

## 许可证

[MIT](./LICENSE)
