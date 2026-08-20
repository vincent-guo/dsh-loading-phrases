# dsh-loading-phrases — Design Baseline

A plugin for the DeepSeek Harness Web GUI that replaces the shipped
`Deep diving...` running status with rotating witty loading phrases and
informative tips, in the original position.

## Delivery route (final)

**Plain-package plugin**, mounted through the DSH profile:

- `dsh plugin add <path>` (or `corepack pnpm add <path>` in the profile),
- a load row in `~/.dsh/profiles/<profile>/cordis.patch.yml`,
- client bundle registered through `window.__ModuleLoader__.load` (full
  browser environment), host half `lib/index.js` serving the configuration
  route.

The earlier **dynamic Cordis plugin** (`dshlp-1`, composer.dock + Slot UI)
was the validation stage; it was stopped and later removed entirely (its
source remains available in git history). Decision: the plain-package route
won because it renders in the original position, persists across restarts,
and keeps phrase content bundled in the client with zero file I/O (the only
host-side I/O is the config route, which re-reads one small JSON per
request).

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
- **Accessibility**: the phrase is mirrored onto the element's `aria-label`
  (set and removed by JS alongside the attribute), so live-region
  announcements carry real text changes instead of relying on the
  pseudo-element, which assistive tech does not expose reliably.
- **Narrow layouts**: the pseudo-element truncates with `text-overflow:
  ellipsis` (`max-width: min(60vw, 40rem)`).
- **Structural self-diagnostic** (once per activation): when the exact
  selector finds nothing, the scan checks whether `[data-chat-flow]` exists
  and whether a looser descendant match finds the status line; either
  failure mode logs a console warning naming the likely cause.
- Cleanup: observer disconnect, timers cleared, attributes removed, style tag
  removed — all inside a `ctx.effect` disposer.

## Rotation

- Channel set follows `mode`: `all` alternates strictly
  `witty (5 s) → tips (10 s) → witty …`; `witty` / `tips` fix one channel.
  Each run starts with a witty phrase; dwell time belongs to the phrase just
  shown (`setTimeout` chain).
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

## Configuration (implemented)

The host half registers `GET /plugins/dsh-loading-phrases/config.json`
(`kind: exact`, `Cache-Control: no-store`) and reads
`dsh-loading-phrases.json` from the package root on **every request**, so
config edits apply on the next page refresh without a restart. The client
fetches it at `apply` time and falls back to built-in defaults on any
failure.

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
Code edits to `lib/*.js` require a web profile restart (bundle revisions
only re-enter the module graph through HMR or a restart); config edits do
not.

## Settings panel (v3 memo)

A graphical settings panel replaces hand-editing the JSON; it is the front
door for editing content lists. Design baseline agreed so far:

- **Materialize-on-save, not runtime merge.** The panel seeds its list
  editor with the built-in phrases on first open (or with the saved list
  once one exists); saving writes the complete edited list back to the
  config, and the runtime keeps the existing semantics — a non-empty config
  list replaces the built-in list, no merge logic at runtime. The earlier
  "append mode" idea is cancelled in favor of this.
- **Empty means fall back to default.** Saving an empty list removes that
  language's key and the runtime falls back to the built-in list; channel
  disabling is expressed through `mode`, never through an empty list.
- **Restore defaults.** The panel offers an explicit "restore defaults"
  action that re-seeds the editor from the current built-in lists, so users
  can opt back into future built-in phrase updates.
- **Storage layering.** Content lists stay in
  `dsh-loading-phrases.json` (the panel writes the file through a host
  method); only preferences (mode, intervals, shuffle, language) belong in
  the durable `settings` service. The settings document stays free of bulk
  phrase content.
- **Propagation (config hot-reload) is resolved together with the panel.**
  First verify whether the client exposes a subscription surface for
  settings namespaces (like the `locale` service); if yes, ride it, else
  build a channel on the panel's save path (host push / SSE). The interim
  fallback remains "refresh the page", optionally upgraded to "re-read at
  run start" if needed before the panel lands.

## Verification

- `npm test` runs the real bundle in a fake browser environment (100
  assertions: appearance, alternation cadence, no-repeat full coverage,
  locale repaint, config modes, a11y mirror, selector diagnostics,
  concurrent lines, cleanup) plus a host route test over the real config
  file. It caught and fixed the deck-initialization crash before any
  browser exposure.
- Installation verified server-side: profile dependency, patch row, bundle
  route (HTTP 200), boot-manifest entry, and byte-identical served bundle.
- Visual behavior confirmed by the user on the live page ("页面正常"):
  original-position replacement, alternation, and the retained clock.

## History / decisions log

- Content decided after researching Qwen Code (`usePhraseCycler`,
  web-shell `loadingPhrases.ts`) and Gemini CLI (`usePhraseCycler`,
  `INFORMATIVE_TIPS` / `WITTY_LOADING_PHRASES`, `ui.loadingPhrases`
  settings).
- Position options A (composer.dock, validated), B (dock + kept clock),
  C (harness slotification), D (pure-CSS in original position) — **D won**
  after the user's `dsh-witty-loader` proved the mechanism; merge decision:
  deliver in this repository as a plain package.
- Tuning constants in `lib/client.js` are defaults; the host-served config
  overrides them at runtime.
- The validation-stage dynamic Cordis plugin (`dshlp-1`) was stopped and then
  removed entirely; its source was dropped from the tree and remains
  available in git history.
- v3 panel baseline recorded (see "Settings panel (v3 memo)"): custom phrase
  editing materializes on save instead of merging at runtime; an empty list
  falls back to built-in defaults; the earlier "append mode" idea is
  cancelled.
- v2.1 experience patches: aria-label a11y mirror, narrow-screen truncation,
  selector self-diagnostics, and the corresponding test coverage.
