# AGENTS.md

Guidance for AI agents working in this repository.

## What this project is

`dsh-loading-phrases` is a **plain-package plugin** for the DeepSeek Harness
Web GUI. It replaces the shipped `Deep diving...` running-status line (in its
original position in the chat flow) with alternating witty phrases and
practical tips, matching the GUI locale (zh / en).

Delivery route: mounted as a package row in the DSH profile
(`cordis.patch.yml` + `dsh plugin add`); the client bundle registers through
`window.__ModuleLoader__.load`. The host half serves the configuration
route.

## Repository rules

- Code, comments, commit messages, and `AGENTS.md` are **English**.
- User-facing docs are mirrored: `README.md` (English) and
  `README.zh-CN.md` (Chinese).
- Conventional commits (`feat:`, `docs:`, …), one logical milestone per
  commit.
- `lib/client.js` is a **hand-written CJS-style factory** (no imports, no
  build step) and must stay syntactically valid: run `node --check
  lib/client.js` before committing.
- `lib/index.js` is a plain ESM host plugin; it registers the config route
  (`GET` / `POST /dsh-loading-phrases/config.json`, no-store): GET answers
  `{ config, source, userPath }` with the section resolved as user file
  (`$DSH_HOME/dsh-loading-phrases.json`) → package-root dev seed → built-in
  defaults (re-read per request); POST validates and persists to the
  user-owned file only — never write to the package directory. The client
  also accepts the legacy flat section shape.
- The client registers the settings page through `settings.section`
  (`id: loading-phrases`, locale-thunk nav label). Panel controls must use
  the design-system primitives (Button / Input / Menu selector pills) with
  the shipped settings-row layout — never hand-rolled select/input styling.
  The open-config button lives inside the panel's own action row (not the
  header `settings.action` slot — the shell passes no active-section info
  there) and opens the user file via a lazy `ctx.get('connection')` +
  `connection.api.host.openPath`, gated on `source === 'user'`. The panel
  must re-fetch the config on every mount; preference changes auto-save
  (debounced POST + `applySection` in place, visible Saving…/Saved status)
  against the last SAVED content, while phrase/tips textareas stay
  explicit-save. Keep that teardown/remount and saved-content discipline
  when editing either side.
- Run `npm test` (client behavior simulation + host route test) before
  committing behavior changes; add scenario coverage for new config keys.

## Content workflow (single source of truth)

- Human-reviewable phrase content lives in `src/data/witty.json` and
  `src/data/tips.json` (bilingual `en` / `zh` keys; the two languages are
  independent content, not literal translations).
- The `PHRASES` / `TIPS` blocks inside `lib/client.js` are **generated**:
  after editing the JSON, run `node scripts/sync-data.js` (or
  `npm run sync`) and `npm run check`. Never hand-edit between the
  `===DATA-*-START===` / `===DATA-*-END===` markers.

## Content accuracy rules

- Every tip must correspond to a real, verifiable DeepSeek Harness UI
  behavior. Verify against the harness checkout (`packages/client/*`) before
  adding or changing a tip; never invent shortcuts or settings.
- Product terms stay in English inside Chinese tips (e.g. workspace,
  session, Settings, goal bar, plan mode).

## Mechanism constraints (keep intact when editing)

- The status line is found with the attribute selector
  `[data-chat-flow] > [role="status"][aria-live="polite"]` — never switch to
  hashed CSS-module class names.
- The phrase is carried in the `data-dshlp` attribute and rendered by
  `::before { content: attr(data-dshlp) }`. The attribute is only set while
  the script is alive, so any failure degrades back to the original product
  text — preserve that fail-safe property.
- The phrase is also mirrored onto the element's `aria-label` (set and
  removed alongside `data-dshlp`) so assistive tech announces real text.
- Keep the structural self-diagnostic: when the exact selector finds
  nothing, distinguish "no run active" from "product structure changed" and
  warn loudly for the latter.
- The shipped clock `<span>` must keep working (the original text node is
  collapsed with `font-size: 0`; the clock keeps its own font shorthand).

## Attribution

Witty phrases are derived from `google-gemini/gemini-cli` and
`QwenLM/qwen-code` (Apache-2.0). Keep `NOTICE.md` accurate when lists change.
