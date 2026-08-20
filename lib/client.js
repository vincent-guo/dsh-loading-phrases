// dsh-loading-phrases client bundle.
//
// Self-contained CJS-style factory registered with the DSH browser module
// loader (`window.__ModuleLoader__`); no imports, no build step. The PHRASES
// and TIPS blocks are generated from src/data/*.json by
// `node scripts/sync-data.js` — edit the JSON, then re-run the sync.

window.__ModuleLoader__.load({
  id: "dsh-loading-phrases",
  factory: () => {
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
    // TUNING (v1 constants; v2 moves these into the host-read config file)
    // ------------------------------------------------------------------
    // Strict alternation `witty -> tips -> witty -> ...`; dwell time belongs
    // to the phrase just shown.
    const WITTY_MS = 5000;
    const TIPS_MS = 10000;
    // No-repeat rotation: Fisher-Yates decks per channel, reshuffled on
    // exhaustion, fresh decks per run and per language switch.
    const SHUFFLE = true;

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

    function apply(ctx) {
      const locale = ctx.get("locale");
      let lastActive = locale === undefined ? "en" : locale.getSnapshot().active;

      const listFor = (data) => {
        if (locale === undefined) return data.en || [];
        const active = locale.getSnapshot().active;
        return data[active] !== undefined ? data[active] : data.en || [];
      };

      const style = document.createElement("style");
      style.setAttribute("data-plugin-css", "dsh-loading-phrases");
      style.textContent = CSS;
      document.head.appendChild(style);

      // Element -> { timer, next, current, decks }: one rotation timer per
      // live status line (each open session's chat flow can have its own).
      const tracked = new Map();
      let scheduled = false;

      const draw = (el, entry) => {
        const witty = listFor(PHRASES);
        const tips = listFor(TIPS);
        const candidates = [];
        if (witty.length > 0) candidates.push("witty");
        if (tips.length > 0) candidates.push("tips");
        if (candidates.length === 0) {
          // Nothing to show: clear the attribute so the original text returns.
          entry.timer = null;
          el.removeAttribute(ATTR);
          return;
        }
        // Strict alternation when both channels exist; fixed channel otherwise.
        const kind =
          candidates.length === 1 ? candidates[0] : entry.next;
        const list = kind === "witty" ? witty : tips;
        const phrase = SHUFFLE
          ? drawFromDeck(kind, list, entry)
          : randomPick(list, entry.current);
        entry.current = phrase;
        el.setAttribute(ATTR, phrase);
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

      ctx.effect(() => () => {
        observer.disconnect();
        for (const el of [...tracked.keys()]) stop(el);
        if (stopLocale !== null) stopLocale();
        style.remove();
      });
    }

    exports.apply = apply;
    return module.exports;
  },
});
