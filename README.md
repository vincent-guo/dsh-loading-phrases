# dsh-loading-phrases

A plugin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
Web GUI that replaces the shipped `Deep diving...` running status with rotating
**witty loading phrases** and **practical tips**.

## What it does

While a session is running (the same condition under which the original
`Deep diving...` status appears):

- the original status row is hidden;
- a single line in the ambient readout band under the composer shows, in
  strict alternation: a witty phrase for 5 s, then a tip for 10 s, and so on,
  each run starting with a witty phrase;
- rotation is a no-repeat shuffle (Fisher–Yates decks, reshuffled on
  exhaustion) — no phrase repeats back-to-back and every entry is shown once
  per cycle;
- an elapsed-time clock appears next to the phrase after 15 s, matching the
  original status behavior;
- the line disappears the moment the run ends.

Language follows the GUI locale (`zh` → Chinese, otherwise English; unknown
locales fall back to English).

## Content

| Channel | EN | ZH | Source |
| --- | --- | --- | --- |
| Witty phrases | 49 | 24 | Derived from Qwen Code web-shell lists (Apache-2.0, see `NOTICE.md`) |
| Tips | 40 | 40 | Written for DSH against its real UI behavior |

One derived phrase was adapted to DSH's actual composer shortcut
(`Ctrl+J` → `Shift+Enter`).

## Configuration

`dsh-loading-phrases.json` in the session workspace:

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

| Key | Values | Default | Meaning |
| --- | --- | --- | --- |
| `mode` | `tips` / `witty` / `all` / `off` | `all` | `off` yields entirely: the original `Deep diving...` stays untouched |
| `wittyIntervalMs` | number | `5000` | Dwell time for a witty phrase |
| `tipsIntervalMs` | number | `10000` | Dwell time for a tip |
| `shuffle` | boolean | `true` | No-repeat rotation; `false` = random with replacement |
| `language` | `auto` / `en` / `zh` | `auto` | Force a language instead of following the GUI locale |
| `phrases`, `tips` | `{ "en": [...], "zh": [...] }` | empty | Per-language overrides; a non-empty list replaces the built-in list for that language |

Changes apply on reload.

## Repository layout

```
dsh-loading-phrases.json   default configuration
src/data/witty.json        built-in witty phrases (en/zh)
src/data/tips.json         built-in tips (en/zh)
src/plugin/host.js         Cordis Host half (reads config + data, serves bootstrap)
src/plugin/client.js       Cordis Client half (dock UI, rotation engine)
docs/design.md             design baseline and decisions
```

See `docs/design.md` for the full design baseline and open items.

## Status

Validated as an in-session dynamic Cordis plugin. A durable installation
(agent preset / host composition) is planned but not yet decided.
