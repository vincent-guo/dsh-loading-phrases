# dsh-loading-phrases

Replace the **"Deep diving..."** running status in the DeepSeek Harness Web
GUI with alternating **witty phrases** and **practical tips** — in the
original position, with the original shimmer effect and the elapsed clock
intact.

[中文说明](README.zh-CN.md)

## Behavior

While a turn is running (the same condition under which the original status
line appears):

- the original "Deep diving..." text gives way to a rotating line in the
  **same place**, rendered with the same gradient-shimmer recipe;
- strict alternation: witty phrase for 5 s → tip for 10 s → witty phrase…
  each run starts with a witty phrase;
- rotation is a no-repeat shuffle (Fisher–Yates decks, reshuffled on
  exhaustion) — no back-to-back repeats, every entry shown once per cycle;
- the 15-second elapsed clock keeps working exactly as before;
- the line follows the GUI locale: `zh` → Chinese lists, otherwise English.

Fail-safe by construction: the original text is hidden only while the
plugin's script is alive. Any failure degrades back to the product's own
status text.

## Install

```bash
dsh plugin add /absolute/path/to/dsh-loading-phrases
```

(or, inside the profile directory: `corepack pnpm add
/absolute/path/to/dsh-loading-phrases`)

Then add a load row to `~/.dsh/profiles/<profile>/cordis.patch.yml`
(create the file if absent):

```yaml
- insert:
    - id: loading-phrases
      name: dsh-loading-phrases
```

Hard-refresh the Web GUI page (⌘/Ctrl+Shift+R).

## Customizing phrases

1. Edit `src/data/witty.json` and/or `src/data/tips.json`
   (`en` / `zh` arrays are independent content, not translations).
2. Run `node scripts/sync-data.js` (or `npm run sync`) to regenerate the
   data blocks in `lib/client.js`, then `npm run check`.
3. Hard-refresh the page. If the old content persists, restart the web
   profile process — bundle revisions only re-enter the module graph through
   HMR or a restart.

Rotation tuning (dwell times, shuffle) lives in the `TUNING` section at the
top of `lib/client.js`.

## Content

| Channel | EN | ZH | Source |
| --- | --- | --- | --- |
| Witty phrases | 49 | 24 | Derived from Qwen Code web-shell lists (Apache-2.0, see `NOTICE.md`) |
| Tips | 40 | 40 | Written against real DSH UI behavior |

## Repository layout

```
lib/index.js        host half (stub in v1; config file planned for v2)
lib/client.js       client bundle (DOM target, rotation engine, generated data)
src/data/*.json     phrase/tips content (single source of truth)
scripts/sync-data.js  regenerates the data blocks in lib/client.js
docs/design.md      design baseline and decisions
legacy/             validation-stage dynamic Cordis package (reference only)
```

## Roadmap

- v2 — `dsh-loading-phrases.json` config (mode, intervals, shuffle,
  per-language overrides) read by the host half.
- v3 — settings panel for phrase management.

## License

[MIT](./LICENSE)
