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
  (`GET /plugins/dsh-loading-phrases/config.json`, no-store) that reads the
  package-root `dsh-loading-phrases.json` on every request.
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
- The shipped clock `<span>` must keep working (the original text node is
  collapsed with `font-size: 0`; the clock keeps its own font shorthand).

## Attribution

Witty phrases are derived from `google-gemini/gemini-cli` and
`QwenLM/qwen-code` (Apache-2.0). Keep `NOTICE.md` accurate when lists change.
