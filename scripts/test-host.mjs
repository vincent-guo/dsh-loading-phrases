// dsh-loading-phrases host route test.
//
// Imports the real lib/index.js (plain ESM host plugin) with a fake cordis
// ctx whose `webServer` captures the registration, then exercises the route
// handler against the real package-root config file and checks lifecycle.
//
// Usage: node scripts/test-host.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { apply } = await import(join(root, 'lib/index.js'))

let failures = 0
function assert(cond, msg) {
  if (!cond) {
    failures += 1
    console.error('FAIL:', msg)
  } else {
    console.log('ok -', msg)
  }
}

let route = null
let routeDisposed = false
const disposers = []
const ctx = {
  get: (name) =>
    name === 'webServer'
      ? {
          register(r) {
            route = r
            return () => {
              routeDisposed = true
            }
          },
        }
      : undefined,
  effect: (fn) => {
    disposers.push(fn())
  },
}

apply(ctx)

assert(route !== null, 'route registered')
assert(route.kind === 'exact', 'route kind is exact')
assert(route.path === '/plugins/dsh-loading-phrases/config.json', 'route path matches client fetch')

const res = {
  statusCode: 0,
  headers: {},
  body: '',
  setHeader(k, v) {
    this.headers[k] = v
  },
  end(body) {
    this.body = body
  },
}
await route.handler({}, res)

assert(res.statusCode === 200, 'handler answers 200')
assert(res.headers['Content-Type'] === 'application/json; charset=utf-8', 'JSON content type')
assert(res.headers['Cache-Control'] === 'no-store', 'config is never cached')

const body = JSON.parse(res.body)
assert(body.mode === 'all', `default mode from repo config file (got ${body.mode})`)
assert(body.wittyIntervalMs === 5000 && body.tipsIntervalMs === 10000, 'default intervals from repo config file')
assert(body.shuffle === true, 'shuffle enabled by default')
assert(body.language === 'auto', 'language auto by default')
assert(Array.isArray(body.phrases?.en) && Array.isArray(body.tips?.zh), 'override slots present in payload')

for (const dispose of disposers) dispose()
assert(routeDisposed, 'route disposer runs on plugin disposal')

console.log(failures === 0 ? '\nALL HOST CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
