# dsh-loading-phrases — Design Baseline

A plugin for the DeepSeek Harness Web GUI that replaces the shipped
`Deep diving...` turn-status text with rotating witty loading phrases and
informative tips.

## Status

Work in progress. Decisions below are locked unless marked `PENDING`.

## Findings from the harness (verified against source)

- The `Deep diving...` line is rendered by the `TurnStatus` component inside
  `ChatView` (`packages/client/ui-conversation`), hard-coded, and **not
  inside any Slot**. It is gated by `running` from the session's
  `ConversationSnapshot`, and appends an elapsed-time clock after 15 s.
- The chat scrollport has no seat at that position. The nearest sanctioned
  seats are `conversation.composer.dock` (ambient readout band under the
  composer, where the shipped stats line lives) and
  `conversation.input.dock` (full-width rows above the composer). Both expose
  `useSession` / `useSessions` standard props and the `InputZone` owner share.
- GUI language comes from the client `locale` service:
  `getLocale().active` is `'zh'` or `'en'`; `locale/change` notifies switches.
- Dynamic Client plugins may ship CSS through `styles.insert(css)`; DOM
  manipulation and hard-coded product selectors are not sanctioned. The
  shipped status row can only be hidden via a CSS-module-derived selector
  (`[class*="turnStatus"]`, built as `[hash]_[local]`).

## Content

| Channel | EN | ZH |
| --- | --- | --- |
| Witty phrases | 49 entries, derived from Qwen Code web-shell `WITTY_LOADING_PHRASES_EN` | 24 entries, Qwen Code `WITTY_LOADING_PHRASES_ZH` |
| Tips | 30–50 entries, written for DSH (draft, `PENDING` review) | 30–50 entries, semantic translation of the EN set |

Adjustments applied to the derived lists:

- stripped stray trailing whitespace (`Shipping awesomeness... `);
- `New line? That's Ctrl+J.` adapted to DSH's real composer shortcut:
  `New line? That's Shift+Enter.`.

Attribution: phrases are derived from
`google-gemini/gemini-cli` / `QwenLM/qwen-code` (Apache-2.0); see `NOTICE.md`.

## Display

- Single line, one phrase at a time.
- Display timing follows the original `Deep diving...` exactly: shown while
  the session is `running`, hidden otherwise.
- `all` mode: strict alternation `witty (5 s) → tips (10 s) → witty (5 s) → …`,
  each run starts with a witty phrase.
- `witty` mode: witty only, every 5 s. `tips` mode: tips only, every 10 s.
- Rotation is a no-repeat shuffle (Fisher–Yates deck, reshuffle on
  exhaustion, fresh deck per run). No consecutive duplicates.

`PENDING` — placement (blocked on user decision):

- A. Hide the shipped row entirely; render the phrase line in
  `conversation.composer.dock` (always visible during runs), replicating the
  shipped ≥15 s elapsed clock.
- B. Hide only the shipped text, keep the shipped clock in the scrollport;
  phrase line in `conversation.composer.dock`.
- C. Patch the harness to Slot-ify `TurnStatus` for exact-position
  replacement (harness modification, out of plugin scope).

## Language

- Follow the GUI locale from the `locale` service (`zh` → ZH table,
  anything else → EN table; fallback EN).
- `zh`/`en` lists are independent, not literal translations.

## Configuration

`dsh-loading-phrases.json` (Host reads via the `fs` service, passes to the
Client through the Package-private RPC):

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

- `mode`: `tips` | `witty` | `all` (default) | `off` — `off` yields entirely
  and the original `Deep diving...` stays untouched.
- `phrases` / `tips`: per-language overrides; empty arrays mean built-ins.
- v1 reads once at plugin apply; hot reload is a later iteration.

## Lifecycle (PENDING)

- Dynamic Cordis plugin first, to validate on the real page.
- Persistence strategy (agent preset / host composition) is decided after
  validation. A settings-panel UI may follow once the plugin is durable
  (the dynamic-plugin rules forbid durable settings).

## Repository conventions

- Code, comments, commits: English (Chinese allowed where nuance requires).
- `README.md` in English plus a `README.zh-CN.md` mirror; `AGENTS.md` in
  English only.
- Conventional commits, one milestone per commit.
