// dsh-loading-phrases host half.
//
// Serves the plugin configuration over HTTP routes so the client bundle can
// read it on every page load and the settings panel can persist edits:
//
//   GET  /dsh-loading-phrases/config.json  read the effective config
//   POST /dsh-loading-phrases/config.json  save the config (writes the
//        user-owned $DSH_HOME/dsh-loading-phrases.json)
//
// The file is re-read on every GET, so config edits apply on the next page
// refresh (and immediately after a panel save, which re-applies in place).
// The route handler owns its full response lifecycle; registration belongs
// to this plugin's fiber and is removed on disposal.

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PACKAGE_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
// User-owned config: machine-local, shared by every profile, and survives
// plugin updates (it lives in $DSH_HOME, never in node_modules). The
// package-root file is a development seed only and is never written.
const DEV_CONFIG_PATH = join(PACKAGE_ROOT, 'dsh-loading-phrases.json')
const USER_CONFIG_PATH = join(
  process.env.DSH_HOME || join(homedir(), '.dsh'),
  'dsh-loading-phrases.json',
)

const configPath = () =>
  existsSync(USER_CONFIG_PATH) ? USER_CONFIG_PATH : DEV_CONFIG_PATH

const DEFAULTS = {
  mode: 'all',
  wittyIntervalMs: 5000,
  tipsIntervalMs: 10000,
  shuffle: true,
  language: 'auto',
}

/** Warn once per process when the effective config fails to parse. */
let parseWarned = false

/** Read the effective config file; any failure yields `{}` so callers fall
 *  back. Resolution order: user file, then the development seed file. */
function readRaw() {
  try {
    const raw = JSON.parse(readFileSync(configPath(), 'utf-8'))
    return raw !== null && typeof raw === 'object' ? raw : {}
  } catch {
    if (!parseWarned) {
      console.warn(
        `[dsh-loading-phrases] config parse failed at ${configPath()}; falling back to defaults`,
      )
      parseWarned = true
    }
    return {}
  }
}

/** Which file currently backs the effective config (for the GET metadata). */
function resolveSource() {
  if (existsSync(USER_CONFIG_PATH)) return 'user'
  if (existsSync(DEV_CONFIG_PATH)) return 'seed'
  return 'default'
}

/** Normalize the loadingPhrases section, filling built-in defaults. */
function normalize(section) {
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
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

export function apply(ctx) {
  // Register through injection so the route lands whenever the web carrier
  // is available, regardless of mount order; the path lives outside the
  // client-modules-owned /plugins prefix.
  ctx.inject(['webServer'], (wsCtx) => {
    const disposer = wsCtx.webServer.register({
      kind: 'exact',
      path: '/dsh-loading-phrases/config.json',
      handler: (req, res) => {
      if (req.method === 'POST') {
        const chunks = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'))
            if (
              body === null ||
              typeof body !== 'object' ||
              typeof body.mode !== 'string'
            ) {
              throw new Error('expected a JSON object with a string `mode` field')
            }
            const previous = readRaw()
            const next = {
              ...previous,
              loadingPhrases: {
                mode: body.mode,
                wittyIntervalMs:
                  typeof body.wittyIntervalMs === 'number'
                    ? body.wittyIntervalMs
                    : DEFAULTS.wittyIntervalMs,
                tipsIntervalMs:
                  typeof body.tipsIntervalMs === 'number'
                    ? body.tipsIntervalMs
                    : DEFAULTS.tipsIntervalMs,
                shuffle:
                  typeof body.shuffle === 'boolean' ? body.shuffle : DEFAULTS.shuffle,
                language:
                  typeof body.language === 'string'
                    ? body.language
                    : DEFAULTS.language,
                phrases: body.phrases || { en: [], zh: [] },
                tips: body.tips || { en: [], zh: [] },
              },
            }
            writeFileSync(USER_CONFIG_PATH, JSON.stringify(next, null, 2) + '\n')
            sendJson(res, 200, { ok: true })
          } catch (error) {
            sendJson(res, 400, { ok: false, error: String(error) })
          }
        })
        return
      }
      const raw = readRaw()
      const section =
        raw.loadingPhrases !== undefined && raw.loadingPhrases !== null
          ? raw.loadingPhrases
          : {}
      sendJson(res, 200, {
        config: normalize(section),
        source: resolveSource(),
        userPath: USER_CONFIG_PATH,
      })
      },
    })
    console.log('[dsh-loading-phrases] config route registered at /dsh-loading-phrases/config.json')
    wsCtx.effect(() => disposer)
  })
}
