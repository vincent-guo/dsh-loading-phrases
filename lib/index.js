// dsh-loading-phrases host half.
//
// Serves the plugin configuration over an HTTP route so the client bundle can
// pick it up on every page load. The config file lives at the package root
// (`dsh-loading-phrases.json`) and is re-read on every request, so edits take
// effect on the next page refresh without a profile restart.
//
// The route handler owns its full response lifecycle; registration belongs to
// this plugin's fiber and is removed on disposal.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PACKAGE_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const CONFIG_PATH = join(PACKAGE_ROOT, 'dsh-loading-phrases.json')

const DEFAULTS = {
  mode: 'all',
  wittyIntervalMs: 5000,
  tipsIntervalMs: 10000,
  shuffle: true,
  language: 'auto',
}

/** Read and validate the config; any failure yields `{}` so the client falls
 *  back to its built-in defaults. */
function readConfig() {
  try {
    const raw = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
    if (raw === null || typeof raw !== 'object') return {}
    const section =
      raw.loadingPhrases && typeof raw.loadingPhrases === 'object'
        ? raw.loadingPhrases
        : {}
    return {
      mode: typeof section.mode === 'string' ? section.mode : DEFAULTS.mode,
      wittyIntervalMs:
        typeof section.wittyIntervalMs === 'number'
          ? section.wittyIntervalMs
          : DEFAULTS.wittyIntervalMs,
      tipsIntervalMs:
        typeof section.tipsIntervalMs === 'number'
          ? section.tipsIntervalMs
          : DEFAULTS.tipsIntervalMs,
      shuffle:
        typeof section.shuffle === 'boolean' ? section.shuffle : DEFAULTS.shuffle,
      language:
        typeof section.language === 'string' ? section.language : DEFAULTS.language,
      phrases: section.phrases || { en: [], zh: [] },
      tips: section.tips || { en: [], zh: [] },
    }
  } catch {
    return {}
  }
}

export function apply(ctx) {
  const webServer = ctx.get('webServer')
  if (webServer === undefined) return
  const disposer = webServer.register({
    kind: 'exact',
    path: '/plugins/dsh-loading-phrases/config.json',
    handler: (_req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify(readConfig()))
    },
  })
  ctx.effect(() => disposer)
}
