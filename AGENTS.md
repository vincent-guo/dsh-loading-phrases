# AGENTS.md

Guidance for AI agents working in this repository.

## What this project is

`dsh-loading-phrases` is a plugin for the DeepSeek Harness Web GUI. It hides
the shipped `Deep diving...` running-status row and renders a rotating
witty-phrase / tip line in the `conversation.composer.dock` slot, gated by
the same `running` session state the original status uses.

## Repository rules

- Code, comments, commit messages, and `AGENTS.md` are **English**.
- User-facing docs are mirrored: `README.md` (English) and
  `README.zh-CN.md` (Chinese).
- Phrase/tips data in `src/data/*.json` is intentionally **bilingual**
  (`en` / `zh` keys). The two lists are independent content, not literal
  translations of each other.
- Conventional commits (`feat:`, `docs:`, …), one logical milestone per
  commit.
- `src/plugin/host.js` and `src/plugin/client.js` are plain-JS Cordis
  Package halves (no imports, no JSX). Keep them in sync with the live
  dynamic Package when iterating.

## Content accuracy rules

- Every tip in `src/data/tips.json` must correspond to a real, verifiable
  DeepSeek Harness UI behavior. Verify against the harness checkout
  (`packages/client/*`) before adding or changing a tip; never invent
  shortcuts or settings.
- Product terms stay in English inside Chinese tips (e.g. workspace,
  session, Settings, goal bar, plan mode).

## Attribution

Witty phrases are derived from `google-gemini/gemini-cli` and
`QwenLM/qwen-code` (Apache-2.0). Keep `NOTICE.md` accurate when lists change.
