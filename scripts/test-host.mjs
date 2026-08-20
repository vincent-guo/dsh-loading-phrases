// dsh-loading-phrases host route test.
//
// Imports the real lib/index.js (plain ESM host plugin) with a fake cordis
// ctx whose `webServer` captures the registration, then exercises the GET
// and POST route handlers. DSH_HOME is pointed at a temp directory so the
// write test lands in a scratch user file, never in the real home dir or
// the package-root development seed; the temp home is removed at the end.
//
// Usage: node scripts/test-host.mjs

import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const devConfigPath = join(root, 'dsh-loading-phrases.json')

// Isolate the user-config location before the host module resolves paths.
const tmpHome = mkdtempSync(join(tmpdir(), 'dshlp-home-'))
process.env.DSH_HOME = tmpHome
const { apply } = await import(join(root, 'lib/index.js'))
const userConfigPath = join(tmpHome, 'dsh-loading-phrases.json')

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
  inject(names, cb) {
    const scope = {
      webServer: {
        register(r) {
          route = r
          return () => {
            routeDisposed = true
          }
        },
      },
      effect: (fn) => {
        disposers.push(fn())
      },
    }
    cb(scope)
  },
}

apply(ctx)

assert(route !== null, 'route registered')
assert(route.kind === 'exact', 'route kind is exact')
assert(route.path === '/dsh-loading-phrases/config.json', 'route path matches client fetch and avoids the /plugins prefix')

function makeRes() {
  return {
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
}

function makeReq(method, body) {
  let dataCb = null
  let endCb = null
  const req = {
    method,
    on(event, cb) {
      if (event === 'data') dataCb = cb
      if (event === 'end') endCb = cb
    },
  }
  if (method === 'POST') {
    queueMicrotask(() => {
      const payload = Buffer.from(body, 'utf-8')
      dataCb(payload)
      endCb()
    })
  }
  return req
}

async function flush() {
  await new Promise((resolve) => queueMicrotask(resolve))
}

// --- GET falls back to the development seed when no user file exists ------------
{
  assert(existsSync(userConfigPath) === false, 'no user config file before the first save')
  const res = makeRes()
  route.handler(makeReq('GET'), res)
  assert(res.statusCode === 200, 'GET answers 200')
  assert(res.headers['Content-Type'] === 'application/json; charset=utf-8', 'JSON content type')
  assert(res.headers['Cache-Control'] === 'no-store', 'config is never cached')

  const body = JSON.parse(res.body)
  assert(body.mode === 'all', `default mode from the dev seed file (got ${body.mode})`)
  assert(body.wittyIntervalMs === 5000 && body.tipsIntervalMs === 10000, 'default intervals from the dev seed file')
  assert(body.shuffle === true, 'shuffle enabled by default')
  assert(body.language === 'auto', 'language auto by default')
  assert(Array.isArray(body.phrases?.en) && Array.isArray(body.tips?.zh), 'override slots present in payload')
}

// --- POST writes the USER file; GET then reflects it ------------------------------
{
  const res = makeRes()
  route.handler(
    makeReq(
      'POST',
      JSON.stringify({
        mode: 'tips',
        wittyIntervalMs: 6000,
        tipsIntervalMs: 12000,
        shuffle: false,
        language: 'zh',
        phrases: { en: ['One'], zh: [] },
        tips: { en: [], zh: ['提示一'] },
      }),
    ),
    res,
  )
  await flush()
  assert(res.statusCode === 200, 'POST answers 200')
  const body = JSON.parse(res.body)
  assert(body.ok === true, 'POST reports ok')

  assert(existsSync(userConfigPath), 'POST creates the user config file under DSH_HOME')
  const onDisk = JSON.parse(readFileSync(userConfigPath, 'utf-8'))
  assert(onDisk.loadingPhrases.mode === 'tips', 'POST writes the saved mode to the user file')
  assert(onDisk.loadingPhrases.phrases.en[0] === 'One', 'POST writes per-language lists to the user file')
  const devSeed = JSON.parse(readFileSync(devConfigPath, 'utf-8'))
  assert(devSeed.loadingPhrases.mode === 'all', 'the development seed file is never written')

  const getRes = makeRes()
  route.handler(makeReq('GET'), getRes)
  const got = JSON.parse(getRes.body)
  assert(got.mode === 'tips' && got.language === 'zh', 'GET reflects the saved user section')
  assert(got.shuffle === false, 'GET reflects the saved shuffle')
}

// --- invalid POST body is rejected with 400 ---------------------------------------
{
  const res = makeRes()
  route.handler(makeReq('POST', JSON.stringify({ mode: 42 })), res)
  await flush()
  assert(res.statusCode === 400, 'invalid POST answers 400')
  const body = JSON.parse(res.body)
  assert(body.ok === false && typeof body.error === 'string', 'rejection carries an error message')
}

for (const dispose of disposers) dispose()
assert(routeDisposed, 'route disposer runs on plugin disposal')

rmSync(tmpHome, { recursive: true, force: true })
console.log(failures === 0 ? '\nALL HOST CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
