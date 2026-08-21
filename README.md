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
- the line follows the GUI locale: `zh` → Chinese lists, otherwise English;
- the phrase is mirrored onto the status line's `aria-label`, so assistive
  tech announces real text changes instead of the CSS pseudo-element;
- long phrases truncate with an ellipsis in narrow windows;
- if the product DOM changes and the status line can no longer be found,
  the plugin logs a console diagnostic instead of failing silently.

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

## Settings panel

The plugin registers a **Loading Phrases** page in the GUI Settings (sidebar
foot → Settings). From it you can:

- switch `mode` (alternating / witty only / tips only / off), the dwell
  times (**shown in seconds**, stored as milliseconds), the no-repeat
  switch, and the language policy — **preference changes save themselves**
  (debounced) and apply immediately, no button needed;
- edit the phrase and tip lists (one per line) behind **English / 中文
  tabs** (labeled like the language options) that open on the language
  currently in effect — the tab is just an editor
  view, never coupled to the runtime language preference;
- save phrase edits explicitly with **Save phrases** — saving materializes
  the edited lists into the config, an empty list falls back to the
  built-ins, and **Restore defaults** re-seeds everything;
- the panel re-reads the config every time it opens, so hand-edited file
  changes are never overwritten by a stale draft (panel save still replaces
  the whole section — the panel view wins when both were edited).

The **Open phrase config** button (beside Save/Restore on the page itself)
opens `~/.dsh/dsh-loading-phrases.json` in your default editor for bulk
editing; it is enabled after the first save creates the file. File edits
apply after a page refresh.

## Configuration

The user-owned config lives at `$DSH_HOME/dsh-loading-phrases.json` (usually
`~/.dsh/dsh-loading-phrases.json`) — machine-local and shared by every
profile, so it survives plugin updates. It is served by the host half and
read by the client on every page load; edits apply on the next refresh, and
settings-panel saves apply immediately. The package-root
`dsh-loading-phrases.json` serves only as a development seed and is never
written by the plugin.

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

## Customizing phrases

1. Edit `src/data/witty.json` and/or `src/data/tips.json`
   (`en` / `zh` arrays are independent content, not translations).
2. Run `node scripts/sync-data.js` (or `npm run sync`) to regenerate the
   data blocks in `lib/client.js`, then `npm run check`.
3. Hard-refresh the page for config edits. **Code edits** (`lib/*.js`)
   require a web profile restart — bundle revisions only re-enter the module
   graph through HMR or a restart.

## Content

| Channel | EN | ZH | Source |
| --- | --- | --- | --- |
| Witty phrases | 49 | 24 | Derived from Qwen Code web-shell lists (Apache-2.0, see `NOTICE.md`) |
| Tips | 40 | 40 | Written against real DSH UI behavior |

## Repository layout

```
dsh-loading-phrases.json   default configuration (served by the host half)
lib/index.js               host half (config HTTP route)
lib/client.js              client bundle (DOM target, rotation engine, generated data)
src/data/*.json            phrase/tips content (single source of truth)
scripts/sync-data.js       regenerates the data blocks in lib/client.js
scripts/test-client.mjs    client bundle behavior simulation
scripts/test-host.mjs      host config route test
docs/design.md             design baseline and decisions
```

## Roadmap

The settings panel (v3) is delivered. No further milestones are planned;
optional future work:

- auto-save on preference control change (debounced) if the explicit Save
  button ever feels heavy — achievable without any new dependencies;
- re-evaluate migrating preferences into the durable `settings` service
  only if a concrete need appears (e.g. a DSH settings export/sync feature
  users want this plugin's preferences to ride). See `docs/design.md` for
  the decision record.

## License

[MIT](./LICENSE)
