# dsh-loading-phrases — Design Baseline

A plugin for the DeepSeek Harness Web GUI that replaces the shipped
`Deep diving...` running status with rotating witty loading phrases and
informative tips, in the original position.

## Delivery route (final)

**Plain-package plugin**, mounted through the DSH profile:

- `dsh plugin add <path>` (or `corepack pnpm add <path>` in the profile),
- a load row in `~/.dsh/profiles/<profile>/cordis.patch.yml`,
- client bundle registered through `window.__ModuleLoader__.load` (full
  browser environment), host half `lib/index.js` (stub in v1).

The earlier **dynamic Cordis plugin** (`dshlp-1`, composer.dock + Slot UI)
was the validation stage. It is stopped; its source is archived under
`legacy/dynamic-package/`. Decision: the plain-package route won because it
renders in the original position, persists across restarts, and has no
host-side file I/O in v1 (phrases are bundled).

## Mechanism

- The status line is located with the stable attribute selector
  `[data-chat-flow] > [role="status"][aria-live="polite"]` — no hashed
  CSS-module class names.
- The original "Deep diving..." text node is collapsed with `font-size: 0`;
  the phrase is rendered by `::before { content: attr(data-dshlp) }` using
  the same `--dsw-static-deepseek-*` gradient recipe and a local shimmer
  keyframes (the product keyframes may be hashed).
- The shipped elapsed clock `<span>` keeps its own font shorthand and stays
  intact.
- `MutationObserver` on `document.documentElement` tracks status-line
  appear/disappear (run start/end), one rotation timer per element (multiple
  sessions supported); scans are coalesced through `queueMicrotask`.
- **Fail-safe by construction**: `data-dshlp` is only set while the script is
  alive, so any failure degrades back to the original product text.
- Cleanup: observer disconnect, timers cleared, attributes removed, style tag
  removed — all inside a `ctx.effect` disposer.

## Rotation

- Strict alternation `witty (5 s) → tips (10 s) → witty …`, each run starts
  with a witty phrase; dwell time belongs to the phrase just shown
  (`setTimeout` chain).
- No-repeat shuffle: Fisher–Yates decks per channel, reshuffled on
  exhaustion with a first-of-new ≠ last-of-old guard; fresh decks per run
  and per language switch.
- If a channel's list is empty, it is skipped; if both are empty, the
  attribute is removed and the original text returns.

## Language

- Follows the GUI `locale` service (`active` is `zh` / `en`; unknown locales
  fall back to the English lists). Language switches reset decks and repaint
  immediately.

## Content

| Channel | EN | ZH | Source |
| --- | --- | --- | --- |
| Witty phrases | 49 | 24 | Derived from Qwen Code web-shell lists (Apache-2.0, `NOTICE.md`); one entry adapted to DSH's real composer shortcut (`Ctrl+J` → `Shift+Enter`) |
| Tips | 40 | 40 | Written against verified DSH UI behavior |

Single source of truth: `src/data/witty.json` / `src/data/tips.json`;
`scripts/sync-data.js` regenerates the data blocks in `lib/client.js`.

## Configuration (v2, planned)

`dsh-loading-phrases.json` read by the host half:

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

`mode`: `tips` | `witty` | `all` | `off` (off = yield entirely, original
text untouched). Per-language overrides replace built-ins per language.

## History / decisions log

- Content decided after researching Qwen Code (`usePhraseCycler`,
  web-shell `loadingPhrases.ts`) and Gemini CLI (`usePhraseCycler`,
  `INFORMATIVE_TIPS` / `WITTY_LOADING_PHRASES`, `ui.loadingPhrases`
  settings).
- Position options A (composer.dock, validated), B (dock + kept clock),
  C (harness slotification), D (pure-CSS in original position) — **D won**
  after the user's `dsh-witty-loader` proved the mechanism; merge decision:
  deliver in this repository as a plain package.
- Tuning constants live in `lib/client.js` until v2 config lands.
