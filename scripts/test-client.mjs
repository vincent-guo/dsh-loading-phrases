// dsh-loading-phrases client bundle behavior simulation.
//
// Runs the real lib/client.js factory inside a fake browser environment
// (window.__ModuleLoader__, a minimal DOM, a fake clock, and a fake cordis
// ctx with a locale face) and asserts the observable contract:
//
//   - registration id and apply shape
//   - a status line gets data-dshlp + aria-label when it appears (run start)
//   - the first phrase of a run is a witty phrase
//   - strict alternation witty (5 s) -> tips (10 s) -> witty ...
//   - no-repeat shuffle: full coverage per channel, no back-to-back repeats
//   - locale switch repaints immediately with the new language's lists
//   - config support: mode tips / off, custom intervals, per-language
//     overrides, forced language
//   - multiple concurrent status lines rotate independently
//   - selector self-diagnostics when the product structure changes
//   - element removal clears attributes and timers
//   - cleanup disconnects the observer and removes the style tag
//
// Usage: node scripts/test-client.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bundle = readFileSync(join(root, 'lib/client.js'), 'utf-8')
const witty = JSON.parse(readFileSync(join(root, 'src/data/witty.json'), 'utf-8'))
const tips = JSON.parse(readFileSync(join(root, 'src/data/tips.json'), 'utf-8'))

let failures = 0
function assert(cond, msg) {
  if (!cond) {
    failures += 1
    console.error('FAIL:', msg)
  } else {
    console.log('ok -', msg)
  }
}

// --- fake browser environment ---------------------------------------------
let observerInstance = null
let flowRootFake = { querySelectorAll: () => [] }

class FakeEl {
  constructor() {
    this.isConnected = true
    this.attrs = new Map()
  }
  setAttribute(k, v) {
    this.attrs.set(k, v)
  }
  removeAttribute(k) {
    this.attrs.delete(k)
  }
  getAttribute(k) {
    return this.attrs.get(k)
  }
}

const styleTag = {
  attrs: new Map(),
  textContent: '',
  removed: false,
  setAttribute(k, v) {
    this.attrs.set(k, v)
  },
  remove() {
    this.removed = true
  },
}

let els = []
const document = {
  querySelectorAll() {
    return els.filter((e) => e.isConnected)
  },
  querySelector(sel) {
    return sel === '[data-chat-flow]' ? flowRootFake : null
  },
  createElement(tag) {
    if (tag !== 'style') throw new Error(`unexpected createElement(${tag})`)
    return styleTag
  },
  head: { appendChild: (node) => node },
  documentElement: {},
}

class MutationObserver {
  constructor(cb) {
    this.cb = cb
    this.disconnected = false
    observerInstance = this
  }
  observe() {}
  disconnect() {
    this.disconnected = true
  }
}

const consoleStub = {
  warns: [],
  warn(...args) {
    this.warns.push(args.join(' '))
  },
  log() {},
  error() {},
}

// --- fake clock --------------------------------------------------------------
const timeouts = new Map()
const microtasks = []
let now = 0
let nextTimerId = 1
function setTimeout(cb, delay) {
  const id = nextTimerId++
  timeouts.set(id, { cb, due: now + delay })
  return id
}
function clearTimeout(id) {
  timeouts.delete(id)
}
function queueMicrotask(fn) {
  microtasks.push(fn)
}
function flushMicro() {
  while (microtasks.length > 0) microtasks.shift()()
}
function advance(ms) {
  const target = now + ms
  for (;;) {
    const next = [...timeouts.entries()]
      .filter(([, t]) => t.due <= target)
      .sort((a, b) => a[1].due - b[1].due)[0]
    if (next === undefined) break
    now = next[1].due
    timeouts.delete(next[0])
    next[1].cb()
    flushMicro()
  }
  now = target
  flushMicro()
}
function triggerMutation() {
  if (observerInstance === null) return
  observerInstance.cb()
  flushMicro()
}

// --- fake window / ctx ---------------------------------------------------------
let loadedId = null
let factory = null
const win = {
  __ModuleLoader__: {
    load({ id, factory: f }) {
      loadedId = id
      factory = f
    },
  },
}

let active = 'en'
const localeSubs = new Set()
const locale = {
  getSnapshot: () => ({ active }),
  subscribe(fn) {
    localeSubs.add(fn)
    return () => localeSubs.delete(fn)
  },
}

let disposers = []
const ctx = {
  get: (name) =>
    name === 'locale' ? locale : name === 'slots' ? slotsStub : undefined,
  effect: (fn) => {
    disposers.push(fn())
  },
}

// Slots fake: captures the settings-section registration without rendering.
let slotInjectKey = null
let slotInjectCb = null
let lastSlotRegistration = null
const slotsStub = {
  inject(key, cb) {
    slotInjectKey = key
    slotInjectCb = cb
  },
  register(...args) {
    lastSlotRegistration = args
  },
}

// React stub: the panel is never rendered in the simulation; the factory
// only stores the require() result.
const requireStub = (spec) => (spec === 'react' ? {} : undefined)

// Config route stub: per-scenario `configImpl` decides the JSON response.
let configImpl = null
const fetchStub = () => {
  if (configImpl === null) throw new Error('no config route in fake env')
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(configImpl),
  })
}

function reset() {
  els = []
  flowRootFake = { querySelectorAll: () => [] }
  styleTag.removed = false
  styleTag.textContent = ''
  styleTag.attrs.clear()
  observerInstance = null
  active = 'en'
  disposers = []
  localeSubs.clear()
  configImpl = null
  consoleStub.warns = []
  slotInjectKey = null
  slotInjectCb = null
  lastSlotRegistration = null
  timeouts.clear()
  microtasks.length = 0
  now = 0
}

// --- load the real bundle -------------------------------------------------------
const runner = new Function(
  'window',
  'document',
  'MutationObserver',
  'setTimeout',
  'clearTimeout',
  'queueMicrotask',
  'fetch',
  'console',
  'require',
  `${bundle}\n;return 0`,
)
runner(win, document, MutationObserver, setTimeout, clearTimeout, queueMicrotask, fetchStub, consoleStub, requireStub)
assert(loadedId === 'dsh-loading-phrases', 'bundle registers id dsh-loading-phrases')
assert(typeof factory === 'function', 'factory captured')
const plugin = factory()
assert(typeof plugin.apply === 'function', 'exports.apply is a function')

// --- scenario 1: defaults, appearance, first phrase, alternation ---------------
reset()
await plugin.apply(ctx)
assert(styleTag.attrs.get('data-plugin-css') === 'dsh-loading-phrases', 'style tag installed with plugin id')
assert(styleTag.textContent.includes('attr(data-dshlp)'), 'CSS carries attr() phrase carrier')
assert(styleTag.textContent.includes('text-overflow: ellipsis'), 'CSS truncates long phrases in narrow layouts')

const el = new FakeEl()
els.push(el)
triggerMutation()
const p1 = el.getAttribute('data-dshlp')
assert(p1 !== undefined, 'attribute set when the status line appears (run start)')
assert(witty.en.includes(p1), `first phrase is an English witty phrase (got "${p1}")`)
assert(el.getAttribute('aria-label') === p1, 'aria-label mirrors the phrase for assistive tech')

advance(5000)
const p2 = el.getAttribute('data-dshlp')
assert(tips.en.includes(p2), `after 5 s the line shows an English tip (got "${p2}")`)
assert(el.getAttribute('aria-label') === p2, 'aria-label follows each rotation')

advance(10000)
const p3 = el.getAttribute('data-dshlp')
assert(witty.en.includes(p3), 'after 10 s more, back to a witty phrase')
assert(p3 !== p1, 'consecutive witty draws differ (no-repeat)')

advance(5000)
const p4 = el.getAttribute('data-dshlp')
assert(tips.en.includes(p4), 'alternation continues with a tip')
assert(p4 !== p2, 'consecutive tip draws differ (no-repeat)')

// --- scenario 2: full no-repeat cycles (zh, both channels) ---------------------
active = 'zh'
for (const sub of [...localeSubs]) sub()
const zhFirst = el.getAttribute('data-dshlp')
assert(witty.zh.includes(zhFirst), `locale switch repaints immediately with a zh witty phrase (got "${zhFirst}")`)
assert(el.getAttribute('aria-label') === zhFirst, 'aria-label repaints with the locale')

const zhWittySeen = [zhFirst]
for (let i = 1; i < witty.zh.length; i++) {
  advance(5000)
  const t = el.getAttribute('data-dshlp')
  assert(tips.zh.includes(t), `zh tip at cycle ${i}`)
  advance(10000)
  const w = el.getAttribute('data-dshlp')
  assert(witty.zh.includes(w), `zh witty at cycle ${i}`)
  zhWittySeen.push(w)
}
assert(new Set(zhWittySeen).size === witty.zh.length, `zh witty full coverage (${witty.zh.length}/${witty.zh.length})`)
assert(zhWittySeen.every((w, i) => i === 0 || w !== zhWittySeen[i - 1]), 'no back-to-back zh witty repeats')

// --- scenario 3: removal + cleanup ----------------------------------------------
el.isConnected = false
els = []
triggerMutation()
assert(el.getAttribute('data-dshlp') === undefined, 'attribute removed when the status line disappears (run end)')
assert(el.getAttribute('aria-label') === undefined, 'aria-label removed when the run ends')
assert(timeouts.size === 0, 'rotation timer cleared on removal')

for (const dispose of disposers) dispose()
assert(observerInstance !== null && observerInstance.disconnected, 'observer disconnected on cleanup')
assert(styleTag.removed, 'style tag removed on cleanup')

// --- scenario 4: config mode=tips -------------------------------------------------
reset()
configImpl = { mode: 'tips' }
await plugin.apply(ctx)
const elTips = new FakeEl()
els.push(elTips)
triggerMutation()
const t1 = elTips.getAttribute('data-dshlp')
assert(tips.en.includes(t1), `mode tips: first phrase is a tip (got "${t1}")`)
advance(10000)
const t2 = elTips.getAttribute('data-dshlp')
assert(tips.en.includes(t2) && t2 !== t1, 'mode tips: next phrase is a different tip')
advance(10000)
assert(tips.en.includes(elTips.getAttribute('data-dshlp')), 'mode tips: witty never appears')

// --- scenario 5: config mode=off --------------------------------------------------
reset()
configImpl = { mode: 'off' }
await plugin.apply(ctx)
assert(styleTag.textContent.includes('dshlp-panel'), 'mode off: panel CSS still installed (settings page stays available)')
assert(observerInstance === null, 'mode off: no observer installed')
const elOff = new FakeEl()
els.push(elOff)
triggerMutation()
assert(elOff.getAttribute('data-dshlp') === undefined, 'mode off: status line untouched')

// --- scenario 6: custom interval + per-language override ---------------------------
reset()
configImpl = { mode: 'witty', wittyIntervalMs: 7000, phrases: { en: ['CUSTOM-ONLY'] } }
await plugin.apply(ctx)
const elC = new FakeEl()
els.push(elC)
triggerMutation()
assert(elC.getAttribute('data-dshlp') === 'CUSTOM-ONLY', 'override list replaces built-in for that language')
advance(7000)
assert(elC.getAttribute('data-dshlp') === 'CUSTOM-ONLY', 'single-item override stays stable across ticks')

// --- scenario 7: forced language -----------------------------------------------------
reset()
configImpl = { mode: 'witty', language: 'zh' }
await plugin.apply(ctx)
const elLang = new FakeEl()
els.push(elLang)
triggerMutation()
assert(witty.zh.includes(elLang.getAttribute('data-dshlp')), 'forced language zh wins over the en GUI locale')

// --- scenario 8: multiple concurrent status lines ------------------------------------
reset()
await plugin.apply(ctx)
const elA = new FakeEl()
const elB = new FakeEl()
els.push(elA, elB)
triggerMutation()
assert(elA.getAttribute('data-dshlp') !== undefined, 'line A gets a phrase')
assert(elB.getAttribute('data-dshlp') !== undefined, 'line B gets a phrase')
advance(5000)
assert(tips.en.includes(elA.getAttribute('data-dshlp')), 'line A rotates independently')
assert(tips.en.includes(elB.getAttribute('data-dshlp')), 'line B rotates independently')
elB.isConnected = false
els = [elA]
triggerMutation()
assert(elB.getAttribute('data-dshlp') === undefined, 'removed line B is cleaned up')
advance(10000)
assert(witty.en.includes(elA.getAttribute('data-dshlp')), 'line A keeps rotating after B is gone')

// --- scenario 9: selector self-diagnostics -------------------------------------------
reset()
flowRootFake = { querySelectorAll: () => [new FakeEl()] }
await plugin.apply(ctx)
assert(
  consoleStub.warns.some((w) => w.includes('not as a direct child')),
  'warns when the status line exists but the structure changed',
)

reset()
flowRootFake = null
await plugin.apply(ctx)
assert(
  consoleStub.warns.some((w) => w.includes('[data-chat-flow] container not found')),
  'warns when the chat-flow container itself is gone',
)

reset()
await plugin.apply(ctx)
assert(consoleStub.warns.length === 0, 'no warnings when nothing suspicious is present')

// --- scenario 10: settings section registration -------------------------------------
reset()
await plugin.apply(ctx)
assert(slotInjectKey === 'settings.section', 'panel waits on the settings.section slot')
assert(typeof slotInjectCb === 'function', 'inject callback captured')
slotInjectCb()
assert(lastSlotRegistration !== null, 'panel registers into settings.section')
const [slotOptions] = lastSlotRegistration
assert(slotOptions.id === 'loading-phrases', 'section id is loading-phrases')
assert(typeof slotOptions.label === 'function', 'nav label is a locale thunk')
active = 'en'
assert(slotOptions.label() === 'Loading Phrases', 'nav label follows en')
active = 'zh'
assert(slotOptions.label() === '加载短语', 'nav label follows zh')

// --- scenario 11: in-place config re-apply (panel save path) ------------------------
reset()
await plugin.apply(ctx)
assert(typeof plugin.__test === 'object' && typeof plugin.__test.applySection === 'function', 'test seam exposes applySection')
const elRe = new FakeEl()
els.push(elRe)
triggerMutation()
assert(witty.en.includes(elRe.getAttribute('data-dshlp')), 'rotation runs before re-apply')

plugin.__test.applySection({
  mode: 'off',
  wittyIntervalMs: 5000,
  tipsIntervalMs: 10000,
  shuffle: true,
  language: 'auto',
  phrases: { en: [], zh: [] },
  tips: { en: [], zh: [] },
})
assert(elRe.getAttribute('data-dshlp') === undefined, 'mode off re-apply clears the phrase immediately')
assert(observerInstance !== null && observerInstance.disconnected, 'mode off re-apply disconnects the observer')

plugin.__test.applySection({
  mode: 'tips',
  wittyIntervalMs: 5000,
  tipsIntervalMs: 10000,
  shuffle: true,
  language: 'auto',
  phrases: { en: [], zh: [] },
  tips: { en: [], zh: [] },
})
triggerMutation()
assert(tips.en.includes(elRe.getAttribute('data-dshlp')), 'mode tips re-apply rotates tips on the same line')

plugin.__test.applySection({
  mode: 'all',
  wittyIntervalMs: 5000,
  tipsIntervalMs: 10000,
  shuffle: true,
  language: 'auto',
  phrases: { en: [], zh: [] },
  tips: { en: [], zh: [] },
})
triggerMutation()
assert(witty.en.includes(elRe.getAttribute('data-dshlp')), 're-apply back to all resumes with a witty phrase')
for (const dispose of disposers) dispose()
assert(observerInstance.disconnected, 'final cleanup disconnects the active observer')

console.log(failures === 0 ? '\nALL CLIENT CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
