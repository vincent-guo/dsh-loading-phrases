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
dsh plugin --profile <profile> add dsh-loading-phrases
```

包声明了 `dsh.bundle.patch`（包根目录的 `cordis.patch.yml`，内含
`loading-phrases` 行），因此 `dsh plugin add` 会自动把包名写入 profile 的
`dsh.profile.bundles`，组合行由包自身提供——无需手写加载行。本地开发仓库
把包名换成绝对路径即可（也可在 profile 目录内运行 `corepack pnpm add
/绝对路径/dsh-loading-phrases`）。

重启 profile 进程以加载 host 半侧，然后硬刷新 Web GUI 页面
（⌘/Ctrl+Shift+R）。

若包被安装为普通依赖而未触发 bundle 合并，可手动在
`~/.dsh/profiles/<profile>/cordis.patch.yml` 中加入加载行：

```yaml
- insert:
    - id: loading-phrases
      name: dsh-loading-phrases
```

## 设置面板

插件在 GUI 设置（侧边栏底部 → Settings）中注册了 **加载短语** 页面，使用
官方设计系统组件（选择胶囊、按钮、输入框）、内置设置行布局与「插件」页的
标题/说明范式。可以：

- 切换 `mode`（交替 / 仅俏皮话 / 仅提示 / 关闭）、停留时长（**以秒显示**，
  内部以毫秒存储）、无重复开关与语言策略——**偏好改动自动保存**（防抖，
  带「保存中…/已保存」状态提示），立即生效，无需点按钮；
- 通过 **English / 中文页签**（与语言下拉选项同名）编辑俏皮话与提示列表
  （每行一条），页签初始定位当前生效语言——页签只是编辑视图，不与运行时语言偏好绑定；
- 用「保存短语」显式保存内容编辑——只写入真正改过的内容：未动过（或清空）的
  列表在文件中保持为空、跟随内置更新，自定义过的列表则完整写入；「恢复默认」
  一键重新播种；
- 面板每次打开都会重新读取配置，外部手改文件不会被旧草稿覆盖（面板保存仍
  会整体替换 section——两边都改过时以面板所见为准）。

页面上的 **打开短语配置** 按钮（与保存/恢复默认同排）会用系统默认编辑器
打开 `~/.dsh/dsh-loading-phrases.json` 方便批量编辑；首次保存生成文件后
可用。文件编辑刷新页面后生效。

## 配置

用户配置位于 `$DSH_HOME/dsh-loading-phrases.json`（通常即
`~/.dsh/dsh-loading-phrases.json`）——机器本地、所有 profile 共享，插件升级
不受影响。host 半通过 HTTP 路由提供、客户端每次页面加载读取：改配置刷新页面
即生效，设置面板保存则立即生效。包根目录的 `dsh-loading-phrases.json` 仅作
开发期种子，插件不会写入它。

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
cordis.patch.yml           profile bundle 补丁（loading-phrases 行）
lib/index.js               host 半（配置 HTTP 路由）
lib/client.js              客户端 bundle（DOM 定位、轮换引擎、生成的数据块）
src/data/*.json            短语内容（唯一事实来源）
scripts/sync-data.js       重新生成 lib/client.js 中的数据块
scripts/test-manifest.mjs  分发清单契约测试
scripts/test-client.mjs    客户端 bundle 行为仿真
scripts/test-host.mjs      host 配置路由测试
docs/design.md             设计基线与决策记录
```

## 路线图

设置面板（v3）已交付，暂无后续里程碑。可选方向：

- 若「显式保存按钮」体验偏重，可为偏好控件加防抖自动保存（几十行，
  无新依赖）；
- 仅当出现具体需求时再评估把偏好迁入 `settings` 服务（例如 DSH 推出
  设置导出/同步功能，希望本插件偏好纳入其中）。决策记录见
  `docs/design.md`。

## 许可证

[MIT](./LICENSE)
