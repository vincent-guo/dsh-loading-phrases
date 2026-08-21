// dsh-loading-phrases client bundle.
//
// Self-contained CJS-style factory registered with the DSH browser module
// loader (`window.__ModuleLoader__`); no build step. The PHRASES and TIPS
// blocks are generated from src/data/*.json by `node scripts/sync-data.js` —
// edit the JSON, then re-run the sync.

window.__ModuleLoader__.load({
  id: "dsh-loading-phrases",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    // ------------------------------------------------------------------
    // CONTENT (generated — do not hand-edit between the markers)
    // ------------------------------------------------------------------
// ===DATA-PHRASES-START===
    const PHRASES = {
      "en": [
        "I'm Feeling Lucky",
        "Shipping awesomeness...",
        "Painting the serifs back on...",
        "Consulting the digital spirits...",
        "Reticulating splines...",
        "Generating witty retort...",
        "Polishing the algorithms...",
        "Don't rush perfection (or my code)...",
        "Brewing fresh bytes...",
        "Counting electrons...",
        "Engaging cognitive processors...",
        "Checking for syntax errors in the universe...",
        "One moment, optimizing humor...",
        "Untangling neural nets...",
        "Compiling brilliance...",
        "Loading wit.exe...",
        "Preparing a witty response...",
        "Just a sec, I'm debugging reality...",
        "Crafting a response worthy of your patience...",
        "Resolving dependencies... and existential crises...",
        "Garbage collecting... be right back...",
        "Converting coffee into code...",
        "Looking for a misplaced semicolon...",
        "Pre-heating the servers...",
        "Loading the next great idea...",
        "Just a moment, I'm in the zone...",
        "Hold tight, I'm crafting a masterpiece...",
        "Warp speed engaged...",
        "Don't panic...",
        "Following the white rabbit...",
        "The truth is in here... somewhere...",
        "Loading... Do a barrel roll!",
        "Finding a suitable loading screen pun...",
        "Distracting you with this witty phrase...",
        "Almost there... probably...",
        "Hmmm... let me think...",
        "That's not a bug, it's an undocumented feature...",
        "Engage.",
        "I'll be back... with an answer.",
        "Letting the thoughts marinate...",
        "Initiating thoughtful gaze...",
        "Dividing by zero... just kidding!",
        "Buffering... because even AIs need a moment.",
        "Entangling quantum particles for a faster response...",
        "Recalibrating the humor-o-meter.",
        "Enhancing... Enhancing... Still loading.",
        "Have you tried turning it off and on again? (The loading screen, not me.)",
        "Constructing additional pylons...",
        "New line? That's Shift+Enter.",
      ],
      "zh": [
        "正在努力搬砖，请稍候...",
        "老板在身后，快加载啊！",
        "头发掉光前，一定能加载完...",
        "服务器正在深呼吸，准备放大招...",
        "正在向服务器投喂咖啡...",
        "正在赋能全链路，寻找关键抓手...",
        "正在降本增效，优化加载路径...",
        "正在打破部门壁垒，沉淀方法论...",
        "正在拥抱变化，迭代核心价值...",
        "正在对齐颗粒度，打磨底层逻辑...",
        "大力出奇迹，正在强行加载...",
        "只要我不写代码，代码就没有 Bug...",
        "正在把 Bug 转化为 Feature...",
        "只要我不尴尬，Bug 就追不上我...",
        "正在试图理解去年的自己写了什么...",
        "正在猿力觉醒中，请耐心等待...",
        "正在询问产品经理：这需求是真的吗？",
        "正在给产品经理画饼，请稍等...",
        "每一行代码，都在努力让世界变得更好一点点...",
        "每一个伟大的想法，都值得这份耐心的等待...",
        "别急，美好的事物总是需要一点时间去酝酿...",
        "愿你的代码永无 Bug，愿你的梦想终将成真...",
        "哪怕只有 0.1% 的进度，也是在向目标靠近...",
        "加载的是字节，承载的是对技术的热爱...",
      ],
    };
// ===DATA-PHRASES-END===
// ===DATA-TIPS-START===
    const TIPS = {
      "en": [
        "Press Enter to send while idle; during a run, Enter queues your message and Cmd/Ctrl+Enter flips to the other behavior.",
        "Shift+Enter inserts a newline in the composer.",
        "With an empty draft, Cmd/Ctrl+Enter steers all queued messages into the running turn.",
        "Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z undo and redo composer edits.",
        "Arrow Up / Arrow Down walk through your draft history.",
        "Escape closes an open menu or mention popup.",
        "Type @ to reference files from your workspace.",
        "Drag and drop images into the composer to attach them.",
        "File paths the model produces are clickable to open.",
        "Create or switch workspaces from the sidebar picker.",
        "Search your sessions from the sidebar.",
        "Click a tool call to inspect its details in the right panel.",
        "Scroll up to load older messages; use the bottom button to snap back.",
        "Fork a session to branch the conversation from any message.",
        "While the model works, keep typing — messages queue until the turn finishes.",
        "When the agent asks for approval, the composer becomes the approval panel — review before allowing.",
        "Plan mode reviews the plan before executing — enable it from the composer plan control or /plan.",
        "The goal bar tracks long-running objectives across rounds.",
        "The todo strip above the composer shows the current step list.",
        "Tool cards show every command and its result; click one for details.",
        "Use the stop control in the composer to cancel a running turn.",
        "Switch the interface language under Settings — 中文 or English.",
        "Pick a light, dark, or system theme under Settings.",
        "Adjust the composer Enter behavior under Settings.",
        "The readout under the composer tracks the conversation status.",
        "Long-running work continues automatically across rounds — watch the goal bar.",
        "Use plan mode for multi-step work and approve the plan before it runs.",
        "Queued messages wait for the right moment — steer them with Cmd/Ctrl+Enter.",
        "The model runs shell commands in your workspace; follow along in the tool cards.",
        "Switch between chat and trajectory views with the view tabs.",
        "Preferences like language and theme persist in settings.",
        "Mid-turn messages do not interrupt the run — they queue.",
        "Produced files live in your session workspace.",
        "Once a turn passes 15 seconds, the status line shows the elapsed time.",
        "Not into these phrases? Set loadingPhrases.mode to off, tips, or witty in dsh-loading-phrases.json.",
        "Customize the phrase lists per language in dsh-loading-phrases.json.",
        "This plugin replaces the Deep diving... status with rotating witty phrases and tips.",
        "The access-mode and plan controls live in the composer tool row.",
        "Question cards answer with a click — no typing required.",
        "Sessions remember their workspace, so reopening one picks up where you left off.",
      ],
      "zh": [
        "空闲时按 Enter 发送；模型运行中，Enter 把消息加入排队，Cmd/Ctrl+Enter 切换为另一行为。",
        "Shift+Enter 在输入框中换行。",
        "输入框为空时，Cmd/Ctrl+Enter 会把所有排队消息插话发送给正在运行的会话。",
        "Cmd/Ctrl+Z / Cmd/Ctrl+Shift+Z 撤销、重做输入框编辑。",
        "↑ / ↓ 浏览输入历史。",
        "Esc 关闭打开的菜单或 @ 弹层。",
        "输入 @ 引用工作区里的文件。",
        "把图片拖进输入框即可附加。",
        "模型生成的文件路径可以直接点击打开。",
        "在侧边栏创建或切换 workspace。",
        "在侧边栏搜索历史 session。",
        "点击任意工具调用卡片，可在右侧面板查看详情。",
        "向上滚动加载更早的消息；点底部按钮回到最新。",
        "从任意消息 fork，即可分支对话。",
        "模型工作期间可以继续输入——消息会排队，等待这一轮结束。",
        "当智能体请求审批时，输入框会变成审批面板——请审阅后再放行。",
        "plan mode 先审计划再执行——可在输入框工具行的 plan 控件或 /plan 开启。",
        "goal bar 会在多轮之间持续跟踪长期目标。",
        "输入框上方的 todo 条展示当前步骤清单。",
        "工具卡片记录每条命令及结果，点击查看详情。",
        "用输入框里的停止控件取消正在运行的一轮。",
        "在 Settings 里切换界面语言——中文或 English。",
        "在 Settings 里选择浅色 / 深色 / 跟随系统主题。",
        "在 Settings 里调整输入框的 Enter 行为。",
        "输入框下方的读数区展示会话状态。",
        "长任务会自动跨轮续跑——留意 goal bar。",
        "多步骤工作建议用 plan mode，先确认计划再执行。",
        "排队消息等待合适时机——用 Cmd/Ctrl+Enter 插话发送。",
        "模型会在你的工作区执行 shell 命令，可在工具卡片里跟进。",
        "可用视图页签在 chat 与 trajectory 视图间切换。",
        "语言、主题等偏好会持久保存在设置中。",
        "运行中输入的补充不会打断当前轮，会自动排队。",
        "产出的文件保存在你的 session workspace 里。",
        "运行超过 15 秒后，状态行会显示已用时长。",
        "不喜欢这些短语？在 dsh-loading-phrases.json 里把 mode 设为 off、tips 或 witty。",
        "可在 dsh-loading-phrases.json 里按语言自定义短语列表。",
        "本插件用轮换的俏皮话和提示取代了 Deep diving... 状态文案。",
        "访问模式与 plan 控件位于输入框工具行。",
        "提问卡片（就像这张）点击即可作答，无需打字。",
        "session 会记住自己的 workspace，重新打开即可接续上下文。",
      ],
    };
// ===DATA-TIPS-END===

    // ------------------------------------------------------------------
    // TUNING DEFAULTS (overridable through the host-served config)
    // ------------------------------------------------------------------
    const DEFAULT_WITTY_MS = 5000;
    const DEFAULT_TIPS_MS = 10000;
    const DEFAULT_SHUFFLE = true;

    const CONFIG_URL = "/dsh-loading-phrases/config.json";

    // React and the design-system primitives are platform seed words: the
    // shell shares one singleton of each with every client bundle.
    const React = typeof require === "function" ? require("react") : undefined;
    const UI =
      typeof require === "function"
        ? require("@deepseek-ai/dsh-client-ui-primitives")
        : undefined;
    const ButtonComponent = UI !== undefined ? UI.Button : undefined;
    const MenuComponent = UI !== undefined ? UI.Menu : undefined;
    const InputComponent = UI !== undefined ? UI.Input : undefined;
    const ChevronIcon =
      UI !== undefined ? UI.IconChevronDownOutline14 : undefined;

    // ------------------------------------------------------------------
    // TARGET: the shipped running-status line rendered by the conversation
    // view while a turn is running:
    //   <div role="status" aria-live="polite">Deep diving...<span>clock</span></div>
    // It is a direct child of the chat-flow column. Attribute selectors only
    // — no hashed CSS-module class names, so minor product restyles survive.
    // ------------------------------------------------------------------
    const STATUS_SELECTOR =
      '[data-chat-flow] > [role="status"][aria-live="polite"]';
    const ATTR = "data-dshlp";

    // With [data-dshlp] present, collapse the original "Deep diving..." text
    // node to font-size 0 and drop the parent's own gradient/shimmer (it has
    // no visible own text left). The ::before pseudo-element then renders the
    // current phrase with the same shimmer recipe. The clock <span> keeps its
    // own font shorthand, so the elapsed-time readout is unaffected.
    // Fail-safe by construction: the attribute is only set while our script
    // is alive, so any failure degrades back to the original product text.
    // Accessibility: the phrase is mirrored onto aria-label (set/removed by
    // JS) so assistive tech announces real text changes instead of relying
    // on the pseudo-element content, which is not reliably exposed.
    const CSS = `
[data-chat-flow] > [role="status"][aria-live="polite"][${ATTR}] {
  font-size: 0;
  background: none;
  animation: none;
}
[data-chat-flow] > [role="status"][aria-live="polite"][${ATTR}]::before {
  content: attr(${ATTR});
  font: var(--dsw-font-s-strong-14);
  white-space: nowrap;
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
    90deg,
    var(--dsw-static-deepseek-500) 0%,
    var(--dsw-static-deepseek-500) 40%,
    var(--dsw-static-deepseek-200) 50%,
    var(--dsw-static-deepseek-500) 60%,
    var(--dsw-static-deepseek-500) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  background-position: 100% 0;
  background-size: 250% 100%;
  animation: 1.8s linear infinite dshlp-status-shimmer;
  /* Narrow layouts: long phrases truncate instead of overflowing. */
  flex: 0 1 auto;
  min-width: 0;
  max-width: min(60vw, 40rem);
  overflow: hidden;
  text-overflow: ellipsis;
}
@keyframes dshlp-status-shimmer {
  to { background-position: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  [data-chat-flow] > [role="status"][aria-live="polite"][${ATTR}]::before {
    background-position: 0 0;
    background-size: 100% 100%;
    animation: none;
  }
}
.dshlp-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 760px;
  color: var(--dsw-alias-label-primary);
}
/* Keep every control inside the panel columns: width:100% includes
   padding and borders instead of overflowing the rows above. */
.dshlp-panel,
.dshlp-panel * {
  box-sizing: border-box;
}
/* Plugins-page heading/intro pattern. */
.dshlp-panel-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.dshlp-panel-intro {
  margin: 0;
  font-size: 13px;
  color: var(--dsw-alias-label-tertiary);
}
.dshlp-subhead {
  margin: 10px 0 0;
  font-size: 14px;
  font-weight: 600;
}
/* Official settings-row pattern (figma Setting-Cell), same tokens as the
   shipped Language row. */
.dshlp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.dshlp-rowText {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 48px;
}
.dshlp-title {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}
/* Selector pill (figma Selector). */
.dshlp-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 18px;
  background: var(--dsw-alias-bg-module-platform);
  font: inherit;
  font-size: 14px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
  cursor: pointer;
}
.dshlp-selector:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.dshlp-chevron {
  flex: none;
}
.dshlp-selector-native {
  min-width: 160px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  padding: 5px 8px;
  font: var(--dsw-font-xs-13);
}
.dshlp-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.dshlp-field-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dshlp-label {
  font: var(--dsw-font-xs-13);
  color: var(--dsw-alias-label-secondary);
}
.dshlp-control {
  min-width: 160px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  padding: 5px 8px;
  font: var(--dsw-font-xs-13);
}
.dshlp-textarea {
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: 140px;
  resize: vertical;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  padding: 6px 8px;
  font: var(--dsw-font-xs-13);
  line-height: 1.6;
}
.dshlp-tabs {
  display: flex;
  align-items: flex-end;
  gap: 22px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
  margin-top: 2px;
}
.dshlp-tab {
  position: relative;
  border: 0;
  padding: 7px 1px 9px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}
.dshlp-tab:hover,
.dshlp-tab-active {
  color: var(--dsw-alias-label-primary);
}
.dshlp-tab-active::after,
.dshlp-tab:focus-visible::after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--dsw-alias-brand-primary);
  border-radius: 2px 2px 0 0;
}
.dshlp-actions-spacer {
  margin-left: auto;
  display: flex;
  gap: 8px;
  align-items: center;
}
.dshlp-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.dshlp-button {
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  padding: 6px 12px;
  font: var(--dsw-font-xs-13);
  cursor: pointer;
}
.dshlp-button-primary {
  border-color: transparent;
  background: var(--dsw-alias-brand-primary);
  color: #fff;
}
.dshlp-button:disabled {
  opacity: 0.5;
  cursor: default;
}
.dshlp-status-ok {
  font: var(--dsw-font-xs-13);
  color: var(--dsw-alias-state-success-primary);
}
.dshlp-status-error {
  font: var(--dsw-font-xs-13);
  color: var(--dsw-alias-state-error-primary);
}
`;

    // ------------------------------------------------------------------
    // ROTATION ENGINE
    // ------------------------------------------------------------------
    function freshDeck(list) {
      const d = list.slice();
      for (let i = d.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = d[i];
        d[i] = d[j];
        d[j] = tmp;
      }
      return { d, i: 0 };
    }

    function drawFromDeck(kind, list, entry) {
      let deck = entry.decks[kind];
      if (deck === null || deck === undefined) {
        deck = freshDeck(list);
        entry.decks[kind] = deck;
      }
      if (deck.i >= deck.d.length) {
        // Reshuffle; never let the new cycle start with the old cycle's tail.
        const prev = deck.d[deck.d.length - 1];
        const nd = freshDeck(list);
        if (nd.d.length > 1 && nd.d[0] === prev) {
          nd.d[0] = nd.d[nd.d.length - 1];
          nd.d[nd.d.length - 1] = prev;
        }
        deck.d = nd.d;
        deck.i = 0;
      }
      return deck.d[deck.i++];
    }

    function randomPick(list, exclude) {
      if (list.length === 1) return list[0];
      let index = 0;
      do {
        index = Math.floor(Math.random() * list.length);
      } while (list[index] === exclude);
      return list[index];
    }

    // ------------------------------------------------------------------
    // SETTINGS PANEL COPY (bilingual UI strings)
    // ------------------------------------------------------------------
    const COPY = {
      en: {
        title: "Loading Phrases",
        phraseLists: "Phrase lists",
        modeLabel: "Mode",
        modeAll: "Witty + tips (alternating)",
        modeWitty: "Witty only",
        modeTips: "Tips only",
        modeOff: "Off (original status)",
        wittyMs: "Witty dwell (seconds)",
        tipsMs: "Tips dwell (seconds)",
        shuffle: "No-repeat rotation",
        language: "Language",
        languageAuto: "Follow the GUI",
        phrasesEn: "Witty phrases (EN)",
        phrasesZh: "Witty phrases (ZH)",
        tipsEn: "Tips (EN)",
        tipsZh: "Tips (ZH)",
        hint: "One phrase per line. Empty list = fall back to built-ins.",
        save: "Save phrases",
        restore: "Restore defaults",
        saved: "Saved",
        saving: "Saving…",
        saveFailed: "Save failed",
        autoHint: "Preferences save automatically; phrase lists use the Save button.",
        shuffleOn: "On",
        shuffleOff: "Off",
        openConfig: "Open phrase config",
        openConfigHint: "Available after your first save (creates ~/.dsh/dsh-loading-phrases.json)",
        openFailed: "Open failed",
      },
      zh: {
        title: "加载短语",
        phraseLists: "短语列表",
        modeLabel: "模式",
        modeAll: "俏皮话 + 提示（交替）",
        modeWitty: "仅俏皮话",
        modeTips: "仅提示",
        modeOff: "关闭（显示原文案）",
        wittyMs: "俏皮话停留（秒）",
        tipsMs: "提示停留（秒）",
        shuffle: "无重复轮换",
        language: "语言",
        languageAuto: "跟随界面",
        phrasesEn: "俏皮话（英文）",
        phrasesZh: "俏皮话（中文）",
        tipsEn: "提示（英文）",
        tipsZh: "提示（中文）",
        hint: "每行一条。留空 = 回退内置短语。",
        save: "保存短语",
        restore: "恢复默认",
        saved: "已保存",
        saving: "保存中…",
        saveFailed: "保存失败",
        autoHint: "偏好改动自动保存；短语列表需点「保存短语」。",
        shuffleOn: "开启",
        shuffleOff: "关闭",
        openConfig: "打开短语配置",
        openConfigHint: "首次保存后可用（生成 ~/.dsh/dsh-loading-phrases.json）",
        openFailed: "打开失败",
      },
    };

    const splitLines = (text) =>
      String(text)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    const joinLines = (list) => (Array.isArray(list) ? list.join("\n") : "");

    async function apply(ctx) {
      const locale = ctx.get("locale");
      const slots = ctx.get("slots");

      // Resolve configuration from the host-served route; any failure (route
      // missing, network, malformed JSON) falls back to built-in defaults.
      // The route answers `{ config, source, userPath }`; the legacy flat
      // section shape is still accepted.
      let section = {};
      let configMeta = { source: "default", userPath: null };
      try {
        if (typeof fetch === "function") {
          const response = await fetch(CONFIG_URL + "?t=" + Date.now());
          if (response.ok) {
            const body = await response.json();
            if (body !== null && typeof body === "object") {
              if (body.config !== undefined && typeof body.config === "object") {
                section = body.config;
                configMeta = {
                  source: typeof body.source === "string" ? body.source : "default",
                  userPath: typeof body.userPath === "string" ? body.userPath : null,
                };
              } else {
                section = body;
              }
            }
          }
        }
      } catch {
        section = {};
      }

      // One style tag for the whole activation: rotation CSS plus panel CSS.
      const style = document.createElement("style");
      style.setAttribute("data-plugin-css", "dsh-loading-phrases");
      style.textContent = CSS;
      document.head.appendChild(style);

      let stopRotation = null;
      let currentSection = section;
      let currentMeta = configMeta;

      const mountRotation = (cfg) => {
        const MODE = typeof cfg.mode === "string" ? cfg.mode : "all";
        // `off` yields entirely: no observer, no timers — the original
        // "Deep diving..." text stays untouched.
        if (MODE === "off") return null;

        const WITTY_MS =
          typeof cfg.wittyIntervalMs === "number"
            ? cfg.wittyIntervalMs
            : DEFAULT_WITTY_MS;
        const TIPS_MS =
          typeof cfg.tipsIntervalMs === "number"
            ? cfg.tipsIntervalMs
            : DEFAULT_TIPS_MS;
        const SHUFFLE = cfg.shuffle !== false;
        const LANGUAGE =
          typeof cfg.language === "string" ? cfg.language : "auto";
        const phraseOverride = cfg.phrases || { en: [], zh: [] };
        const tipsOverride = cfg.tips || { en: [], zh: [] };

        let lastActive = locale === undefined ? "en" : locale.getSnapshot().active;

        const resolveLang = () => {
          if (LANGUAGE !== "auto") return LANGUAGE === "zh" ? "zh" : "en";
          if (locale === undefined) return "en";
          const active = locale.getSnapshot().active;
          return active === "zh" ? "zh" : "en";
        };

        // Per-language overrides replace the built-in list for that language;
        // an empty override keeps the built-in list.
        const listFor = (data, override) => {
          const lang = resolveLang();
          const ov = override && override[lang];
          if (ov && ov.length > 0) return ov;
          return data[lang] !== undefined ? data[lang] : data.en || [];
        };

        // Element -> { timer, next, current, decks }: one rotation timer per
        // live status line (each open session's chat flow can have its own).
        const tracked = new Map();
        let scheduled = false;
        let selectorWarned = false;

        const draw = (el, entry) => {
          const lists = {
            witty: listFor(PHRASES, phraseOverride),
            tips: listFor(TIPS, tipsOverride),
          };
          const candidates = [];
          if (MODE === "all" || MODE === "witty") candidates.push("witty");
          if (MODE === "all" || MODE === "tips") candidates.push("tips");
          const avail = candidates.filter((k) => lists[k].length > 0);
          if (avail.length === 0) {
            // Nothing to show: clear the attribute so the original text returns.
            entry.timer = null;
            el.removeAttribute(ATTR);
            el.removeAttribute("aria-label");
            return;
          }
          // Strict alternation when both channels exist; fixed channel otherwise.
          const kind = avail.length === 1 ? avail[0] : entry.next;
          const list = lists[kind];
          const phrase = SHUFFLE
            ? drawFromDeck(kind, list, entry)
            : randomPick(list, entry.current);
          entry.current = phrase;
          el.setAttribute(ATTR, phrase);
          el.setAttribute("aria-label", phrase);
          entry.next = kind === "witty" ? "tips" : "witty";
          entry.timer = setTimeout(
            () => draw(el, entry),
            kind === "witty" ? WITTY_MS : TIPS_MS,
          );
        };

        const start = (el) => {
          if (tracked.has(el)) return;
          const entry = { timer: null, next: "witty", current: null, decks: {} };
          tracked.set(el, entry);
          draw(el, entry);
        };

        const stop = (el) => {
          const entry = tracked.get(el);
          if (entry === undefined) return;
          if (entry.timer !== null) clearTimeout(entry.timer);
          tracked.delete(el);
          el.removeAttribute(ATTR);
          el.removeAttribute("aria-label");
        };

        const reset = (el) => {
          const entry = tracked.get(el);
          if (entry === undefined) return;
          if (entry.timer !== null) clearTimeout(entry.timer);
          entry.timer = null;
          entry.next = "witty";
          entry.current = null;
          entry.decks = {};
          draw(el, entry);
        };

        const scan = () => {
          scheduled = false;
          const present = new Set();
          const nodes = document.querySelectorAll(STATUS_SELECTOR);
          for (const el of nodes) {
            present.add(el);
            start(el);
          }
          for (const el of [...tracked.keys()]) {
            if (!present.has(el) || !el.isConnected) stop(el);
          }
          // Structural self-diagnostic (at most once per activation): when the
          // exact selector finds nothing, distinguish "the product moved the
          // status line" from "no run is active yet", and say so loudly.
          if (!selectorWarned && nodes.length === 0) {
            const flowRoot = document.querySelector("[data-chat-flow]");
            if (flowRoot === null) {
              console.warn(
                "dsh-loading-phrases: [data-chat-flow] container not found; phrases will not render. The product DOM may have changed.",
              );
              selectorWarned = true;
            } else if (flowRoot.querySelectorAll !== undefined) {
              const loose = flowRoot.querySelectorAll(
                '[role="status"][aria-live="polite"]',
              );
              if (loose.length > 0) {
                console.warn(
                  "dsh-loading-phrases: status line found but not as a direct child of [data-chat-flow]; the selector likely needs updating.",
                );
                selectorWarned = true;
              }
            }
          }
        };

        // Coalesce DOM-mutation storms (streaming renders) into one microtask.
        const scheduleScan = () => {
          if (scheduled) return;
          scheduled = true;
          queueMicrotask(scan);
        };

        const observer = new MutationObserver(scheduleScan);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });
        scan();

        // Follow the active UI language: fresh decks and an immediate repaint.
        const stopLocale =
          locale === undefined
            ? null
            : locale.subscribe(() => {
                const active = locale.getSnapshot().active;
                if (active === lastActive) return;
                lastActive = active;
                for (const el of [...tracked.keys()]) reset(el);
              });

        return () => {
          observer.disconnect();
          for (const el of [...tracked.keys()]) stop(el);
          if (stopLocale !== null) stopLocale();
        };
      };

      const applySection = (cfg) => {
        if (stopRotation !== null) {
          stopRotation();
          stopRotation = null;
        }
        currentSection = cfg;
        stopRotation = mountRotation(cfg);
      };
      applySection(section);

      // ------------------------------------------------------------------
      // SHARED HELPERS FOR THE SETTINGS SURFACES
      // ------------------------------------------------------------------
      const pickListFor = (data, override, listLang) => {
        const ov = override && override[listLang];
        if (ov && ov.length > 0) return ov;
        return data[listLang] !== undefined ? data[listLang] : [];
      };

      const seedPrefs = (cfg) => ({
        mode: typeof cfg.mode === "string" ? cfg.mode : "all",
        wittySeconds:
          (typeof cfg.wittyIntervalMs === "number"
            ? cfg.wittyIntervalMs
            : DEFAULT_WITTY_MS) / 1000,
        tipsSeconds:
          (typeof cfg.tipsIntervalMs === "number"
            ? cfg.tipsIntervalMs
            : DEFAULT_TIPS_MS) / 1000,
        shuffle: cfg.shuffle !== false,
        language: typeof cfg.language === "string" ? cfg.language : "auto",
      });

      const seedContent = (cfg) => ({
        phrasesEn: joinLines(
          pickListFor(PHRASES, cfg.phrases || { en: [], zh: [] }, "en"),
        ),
        phrasesZh: joinLines(
          pickListFor(PHRASES, cfg.phrases || { en: [], zh: [] }, "zh"),
        ),
        tipsEn: joinLines(
          pickListFor(TIPS, cfg.tips || { en: [], zh: [] }, "en"),
        ),
        tipsZh: joinLines(
          pickListFor(TIPS, cfg.tips || { en: [], zh: [] }, "zh"),
        ),
      });

      const buildSection = (prefs, content) => ({
        mode: prefs.mode,
        wittyIntervalMs:
          Math.max(1000, Math.round(Number(prefs.wittySeconds) * 1000)) ||
          DEFAULT_WITTY_MS,
        tipsIntervalMs:
          Math.max(1000, Math.round(Number(prefs.tipsSeconds) * 1000)) ||
          DEFAULT_TIPS_MS,
        shuffle: Boolean(prefs.shuffle),
        language: prefs.language,
        phrases: {
          en: splitLines(content.phrasesEn),
          zh: splitLines(content.phrasesZh),
        },
        tips: { en: splitLines(content.tipsEn), zh: splitLines(content.tipsZh) },
      });

      const postSection = async (next) => {
        if (typeof fetch !== "function") throw new Error("fetch unavailable");
        const response = await fetch(CONFIG_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        const body = await response.json();
        if (!response.ok || !body || body.ok !== true) {
          throw new Error(body && body.error ? body.error : "save rejected");
        }
      };

      // ------------------------------------------------------------------
      // SETTINGS PAGE
      // ------------------------------------------------------------------
      // Selector pill over the design-system Menu (falls back to a native
      // select when the primitives are unavailable).
      function PillSelector({ items, selectedId, onSelect, fallbackLabel }) {
        const [open, setOpen] = React.useState(false);
        const selected = items.find((item) => item.id === selectedId);
        const label = selected !== undefined ? selected.label : fallbackLabel;
        if (MenuComponent === undefined || ChevronIcon === undefined) {
          return React.createElement(
            "select",
            {
              className: "dshlp-selector-native",
              value: selectedId,
              onChange: (event) => onSelect(event.target.value),
            },
            items.map((item) =>
              React.createElement(
                "option",
                { value: item.id, key: item.id },
                item.label,
              ),
            ),
          );
        }
        return React.createElement(
          MenuComponent,
          {
            open,
            onClose: () => setOpen(false),
            items,
            selectedId,
            onSelect: (id) => {
              onSelect(id);
              setOpen(false);
            },
            align: "end",
            portal: true,
            anchor: React.createElement(
              "button",
              {
                type: "button",
                className: "dshlp-selector",
                "aria-haspopup": "menu",
                "aria-expanded": open,
                onClick: () => setOpen((v) => !v),
              },
              label,
              React.createElement(ChevronIcon, { className: "dshlp-chevron", size: 14 }),
            ),
          },
        );
      }

      function Panel() {
        const [lang, setLang] = React.useState(() =>
          locale !== undefined ? locale.getSnapshot().active : "en",
        );
        React.useEffect(() => {
          if (locale === undefined) return;
          const update = () => setLang(locale.getSnapshot().active);
          return locale.subscribe(update);
        }, []);
        const C = COPY[lang === "zh" ? "zh" : "en"];

        // Initial editor tab = the language the runtime currently uses
        // (one-time positioning; the tab is NOT live-bound to the preference).
        const initialTab = () => {
          const forced =
            typeof currentSection.language === "string"
              ? currentSection.language
              : "auto";
          if (forced !== "auto") return forced === "zh" ? "zh" : "en";
          return locale !== undefined && locale.getSnapshot().active === "zh"
            ? "zh"
            : "en";
        };
        const [tabLang, setTabLang] = React.useState(initialTab);

        const [prefs, setPrefs] = React.useState(() => seedPrefs(currentSection));
        const [content, setContent] = React.useState(() =>
          seedContent(currentSection),
        );
        const [status, setStatus] = React.useState(null);
        // Open-config button state (the button lives in this page's action
        // row, so it only ever shows while the Loading Phrases page is open).
        const [openMeta, setOpenMeta] = React.useState(null);
        const [openBusy, setOpenBusy] = React.useState(false);
        const [openError, setOpenError] = React.useState(null);

        // Content drafts stay explicit-save; preference auto-save persists
        // against the last SAVED content so an unsaved textarea never rides
        // along accidentally.
        const savedContentRef = React.useRef(seedContent(currentSection));
        const prefsTimerRef = React.useRef(null);
        const statusTimerRef = React.useRef(null);

        // Re-fetch on every mount so external file edits are reflected:
        // opening the panel always sees the latest on-disk state.
        React.useEffect(() => {
          let alive = true;
          const load = async () => {
            try {
              if (typeof fetch !== "function") return;
              const response = await fetch(CONFIG_URL + "?t=" + Date.now());
              if (!response.ok) return;
              const body = await response.json();
              if (body === null || typeof body !== "object") return;
              const cfg =
                body.config !== undefined && typeof body.config === "object"
                  ? body.config
                  : body;
              if (!alive) return;
              setPrefs(seedPrefs(cfg));
              setContent(seedContent(cfg));
              savedContentRef.current = seedContent(cfg);
              setOpenMeta({
                source:
                  typeof body.source === "string" ? body.source : "default",
                userPath:
                  typeof body.userPath === "string" ? body.userPath : null,
              });
            } catch {
              // keep the current draft on a failed refresh
            }
          };
          void load();
          return () => {
            alive = false;
            if (prefsTimerRef.current !== null) clearTimeout(prefsTimerRef.current);
            if (statusTimerRef.current !== null) clearTimeout(statusTimerRef.current);
          };
        }, []);

        const flashStatus = (next) => {
          setStatus(next);
          if (statusTimerRef.current !== null) clearTimeout(statusTimerRef.current);
          if (next === "saved") {
            statusTimerRef.current = setTimeout(() => setStatus(null), 2500);
          }
        };

        const persist = async (nextPrefs, nextContent) => {
          try {
            const next = buildSection(nextPrefs, nextContent);
            await postSection(next);
            applySection(next);
            savedContentRef.current = nextContent;
            flashStatus("saved");
          } catch {
            flashStatus("error");
          }
        };

        // Preferences save themselves (debounced); content needs the button.
        const setPref = (key, value) => {
          const next = { ...prefs, [key]: value };
          setPrefs(next);
          setStatus("saving");
          if (prefsTimerRef.current !== null) clearTimeout(prefsTimerRef.current);
          prefsTimerRef.current = setTimeout(() => {
            prefsTimerRef.current = null;
            void persist(next, savedContentRef.current);
          }, 600);
        };

        const setPrefSeconds = (key) => (event) => {
          const parsed = Number(event.target.value);
          setPref(key, Number.isFinite(parsed) ? Math.max(1, parsed) : 1);
        };

        const saveContent = () => {
          void persist(prefs, content);
        };

        const restore = async () => {
          const next = {
            mode: "all",
            wittyIntervalMs: DEFAULT_WITTY_MS,
            tipsIntervalMs: DEFAULT_TIPS_MS,
            shuffle: DEFAULT_SHUFFLE,
            language: "auto",
            phrases: { en: [], zh: [] },
            tips: { en: [], zh: [] },
          };
          try {
            await postSection(next);
            applySection(next);
            setPrefs(seedPrefs(next));
            setContent(seedContent(next));
            savedContentRef.current = seedContent(next);
            flashStatus("saved");
          } catch {
            flashStatus("error");
          }
        };

        const openConfig = async () => {
          if (
            openMeta === null ||
            openMeta.source !== "user" ||
            openMeta.userPath === null
          ) {
            return;
          }
          setOpenBusy(true);
          setOpenError(null);
          try {
            // Lazy lookup: the connection service may activate after this
            // plugin, so read it at click time rather than at apply time.
            const connection = ctx.get("connection");
            if (connection === undefined || connection.api === undefined) {
              throw new Error("connection unavailable");
            }
            await connection.api.host.openPath({ path: openMeta.userPath });
          } catch (err) {
            setOpenError(err && err.message ? err.message : String(err));
          } finally {
            setOpenBusy(false);
          }
        };

        // Official settings-row layout: title left, control right.
        const row = (title, control) =>
          React.createElement(
            "div",
            { className: "dshlp-row", key: title },
            React.createElement(
              "div",
              { className: "dshlp-rowText" },
              React.createElement("div", { className: "dshlp-title" }, title),
            ),
            control,
          );

        const numberInput = (value, onChange) =>
          InputComponent === undefined
            ? React.createElement("input", {
                className: "dshlp-selector-native",
                type: "number",
                min: "1",
                step: "1",
                value: String(value),
                onChange,
              })
            : React.createElement(InputComponent, {
                type: "number",
                min: "1",
                step: "1",
                value: String(value),
                onChange,
              });

        const actionButton = (label, onClick, opts) => {
          if (ButtonComponent === undefined) {
            return React.createElement(
              "button",
              {
                type: "button",
                className:
                  "dshlp-button" + (opts.primary ? " dshlp-button-primary" : ""),
                disabled: opts.disabled === true,
                title: opts.title,
                onClick,
              },
              label,
            );
          }
          return React.createElement(
            ButtonComponent,
            {
              variant: opts.primary ? "primary" : "outline",
              size: "sm",
              disabled: opts.disabled === true,
              title: opts.title,
              onClick,
            },
            label,
          );
        };

        const tabButton = (code, labelText) =>
          React.createElement(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": tabLang === code,
              className:
                "dshlp-tab" + (tabLang === code ? " dshlp-tab-active" : ""),
              onClick: () => setTabLang(code),
            },
            labelText,
          );

        return React.createElement(
          "div",
          { className: "dshlp-panel" },
          React.createElement("h2", { className: "dshlp-panel-title" }, C.title),
          React.createElement("p", { className: "dshlp-panel-intro" }, C.autoHint),
          row(
            C.modeLabel,
            React.createElement(PillSelector, {
              items: [
                { id: "all", label: C.modeAll },
                { id: "witty", label: C.modeWitty },
                { id: "tips", label: C.modeTips },
                { id: "off", label: C.modeOff },
              ],
              selectedId: prefs.mode,
              onSelect: (id) => setPref("mode", id),
              fallbackLabel: prefs.mode,
            }),
          ),
          row(
            C.wittyMs,
            numberInput(prefs.wittySeconds, setPrefSeconds("wittySeconds")),
          ),
          row(
            C.tipsMs,
            numberInput(prefs.tipsSeconds, setPrefSeconds("tipsSeconds")),
          ),
          row(
            C.shuffle,
            React.createElement(PillSelector, {
              items: [
                { id: "true", label: C.shuffleOn },
                { id: "false", label: C.shuffleOff },
              ],
              selectedId: prefs.shuffle ? "true" : "false",
              onSelect: (id) => setPref("shuffle", id === "true"),
              fallbackLabel: prefs.shuffle ? C.shuffleOn : C.shuffleOff,
            }),
          ),
          row(
            C.language,
            React.createElement(PillSelector, {
              items: [
                { id: "auto", label: C.languageAuto },
                { id: "en", label: "English" },
                { id: "zh", label: "中文" },
              ],
              selectedId: prefs.language,
              onSelect: (id) => setPref("language", id),
              fallbackLabel: prefs.language,
            }),
          ),
          React.createElement("div", { className: "dshlp-subhead" }, C.phraseLists),
          React.createElement("p", { className: "dshlp-panel-intro" }, C.hint),
          React.createElement(
            "div",
            { className: "dshlp-tabs", role: "tablist" },
            tabButton("en", "English"),
            tabButton("zh", "中文"),
          ),
          React.createElement(
            "div",
            { className: "dshlp-field-stack" },
            React.createElement(
              "span",
              { className: "dshlp-label" },
              tabLang === "zh" ? C.phrasesZh : C.phrasesEn,
            ),
            React.createElement("textarea", {
              className: "dshlp-textarea",
              value: tabLang === "zh" ? content.phrasesZh : content.phrasesEn,
              onChange: (event) =>
                setContent((prev) => ({
                  ...prev,
                  [tabLang === "zh" ? "phrasesZh" : "phrasesEn"]:
                    event.target.value,
                })),
            }),
          ),
          React.createElement(
            "div",
            { className: "dshlp-field-stack" },
            React.createElement(
              "span",
              { className: "dshlp-label" },
              tabLang === "zh" ? C.tipsZh : C.tipsEn,
            ),
            React.createElement("textarea", {
              className: "dshlp-textarea",
              value: tabLang === "zh" ? content.tipsZh : content.tipsEn,
              onChange: (event) =>
                setContent((prev) => ({
                  ...prev,
                  [tabLang === "zh" ? "tipsZh" : "tipsEn"]: event.target.value,
                })),
            }),
          ),
          React.createElement(
            "div",
            { className: "dshlp-actions" },
            actionButton(C.save, saveContent, { primary: true }),
            actionButton(C.restore, restore, {}),
            status === "saving"
              ? React.createElement("span", { className: "dshlp-label" }, C.saving)
              : null,
            status === "saved"
              ? React.createElement("span", { className: "dshlp-status-ok" }, C.saved)
              : null,
            status === "error"
              ? React.createElement(
                  "span",
                  { className: "dshlp-status-error" },
                  C.saveFailed,
                )
              : null,
            React.createElement(
              "div",
              { className: "dshlp-actions-spacer" },
              actionButton(C.openConfig, openConfig, {
                disabled:
                  openMeta === null || openMeta.source !== "user" || openBusy,
                title:
                  openMeta !== null && openMeta.source === "user"
                    ? undefined
                    : C.openConfigHint,
              }),
              openError !== null
                ? React.createElement(
                    "span",
                    { className: "dshlp-status-error" },
                    `${C.openFailed}: ${openError}`,
                  )
                : null,
            ),
          ),
        );
      }

      if (slots !== undefined && slots.inject !== undefined) {
        slots.inject("settings.section", () =>
          slots.register(
            {
              name: "settings.section",
              id: "loading-phrases",
              order: 30,
              label: () =>
                locale !== undefined && locale.getSnapshot().active === "zh"
                  ? "加载短语"
                  : "Loading Phrases",
            },
            () =>
              React !== undefined ? React.createElement(Panel) : null,
          ),
        );
      }

      ctx.effect(() => () => {
        if (stopRotation !== null) stopRotation();
        style.remove();
      });

      // Test seam: the settings surfaces re-apply config through the same
      // function; exposing it lets the simulation cover save/restore flows.
      exports.__test = { applySection };
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    return module.exports;
  },
});
