# Changelog

All notable changes to `dsh-loading-phrases` are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project adheres to [Semantic Versioning](https://semver.org/).

## [0.6.3] - 2026-08-21

### Added

- repository / homepage / bugs metadata pointing at the GitHub repository,
  pinned by the manifest contract test.

## [0.6.2] - 2026-08-21

### Added

- MIT `LICENSE` file; `LICENSE` and `NOTICE.md` (Apache-2.0 attribution for
  the derived phrase content) now ship in the npm tarball via the `files`
  allowlist, pinned by the manifest contract test.
- `CHANGELOG.md` with the release history back to 0.1.0.
- package metadata: `author` and `keywords`.

## [0.6.1] - 2026-08-21

### Removed

- the host half's boot log line announcing the config route; successful
  mounts are silent again, like the rest of the profile rows.

## [0.6.0] - 2026-08-21

### Changed

- saves are now minimal-write: a phrase/tips list that is empty or
  identical to the built-in content collapses back to `[]` in the user
  file, so only genuine customizations are persisted and untouched lists
  keep following future built-in updates instead of pinning a snapshot.

## [0.5.0] - 2026-08-21

### Added

- profile-bundle distribution: the package ships its own
  `cordis.patch.yml` (`dsh.bundle.patch`), so `dsh plugin add` reconciles
  the profile's `dsh.profile.bundles` automatically and no hand-written
  load row is needed.
- a distribution-manifest contract test pinning the bundle shape and the
  npm `files` allowlist.

## [0.4.5] - 2026-08-21

### Changed

- the editing hint now sits between the Phrase lists heading and the tabs,
  so it is read before editing instead of after the textareas.

## [0.4.4] - 2026-08-21

### Fixed

- textareas no longer overflow past the tab underline (border-box sizing
  across the panel subtree).

## [0.4.3] - 2026-08-21

### Changed

- panel title/intro and editor tabs follow the Plugins settings page
  pattern (heading, tertiary intro, underline tabs); the open-config action
  moved to the right end of the action row.

## [0.4.2] - 2026-08-21

### Changed

- panel controls rebuilt on the design-system primitives (Button / Input /
  Menu selector pills) with the shipped settings-row layout; preference
  auto-save shows a visible Saving…/Saved status.

## [0.4.1] - 2026-08-21

### Changed

- the open-config control lives inside the panel's own action row (header
  actions receive no active-section info); editor tabs labeled
  English/中文; solid primary-button styling.

### Fixed

- the connection service is resolved lazily at click time instead of at
  apply time, so it is found even when it activates after the plugin.

## [0.4.0] - 2026-08-21

### Changed

- settings panel UX rework: dwell inputs display seconds (stored as
  milliseconds), English/中文 editor tabs open on the effective language
  without binding to the preference, preference changes auto-save
  (debounced POST + in-place re-apply), and the panel re-fetches the config
  on every mount.

### Added

- extended GET metadata (`config`, `source`, `userPath`) and a
  settings.action entry opening the user config file.

## [0.3.1] - 2026-08-20

### Changed

- user config stored in `$DSH_HOME/dsh-loading-phrases.json`; the
  package-root file became a development seed that is never written.

### Fixed

- the config route registers through `webServer` injection and lives
  outside the client-modules-owned `/plugins` prefix.

## [0.3.0] - 2026-08-20

### Added

- settings panel (Loading Phrases page): mode, dwell times, shuffle,
  language, materialize-on-save phrase/tips editors, restore defaults, and
  in-place re-apply.
- the config save route (POST) used by the panel.

## [0.2.1] - 2026-08-20

### Added

- aria-label mirror for assistive tech, ellipsis truncation in narrow
  layouts, and selector self-diagnostics when the product structure
  changes.

## [0.2.0] - 2026-08-20

### Added

- config file support: mode `tips`/`witty`/`all`/`off`, dwell intervals,
  shuffle, language, and per-language overrides, served by a host config
  route (no-store, re-read per request).

## [0.1.0] - 2026-08-20

### Added

- first plain-package release: replaces the `Deep diving...` running-status
  line with alternating witty phrases and practical tips (strict
  witty/tips alternation, no-repeat shuffled decks, locale following,
  fail-safe attribute gating, MutationObserver tracking), with the 49/24
  witty and 40/40 tips content generated from the JSON sources.
