// dsh-loading-phrases client bundle behavior simulation.
//
// Runs the real lib/client.js factory inside a fake browser environment
// (window.__ModuleLoader__, a minimal DOM, a fake clock, and a fake cordis
// ctx with a locale face) and asserts the observable contract:
//
//   - registration id and apply shape
//   - a status line gets the data-dshlp attribute when it appears (run start)
//   - the first phrase of a run is a witty phrase
//   - strict alternation witty (5 s) -> tips (10 s) -> witty ...
//   - no-repeat shuffle: full coverage per channel, no back-to-back repeats
//   - locale switch repaints immediately with the new language's lists
//   - element removal clears the attribute and timers
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
  get: (name) => (name === 'locale' ? locale : undefined),
  effect: (fn) => {
    disposers.push(fn())
  },
}

function reset() {
  els = []
  styleTag.removed = false
  active = 'en'
  disposers = []
  localeSubs.clear()
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
  `${bundle}\n;return 0`,
)
runner(win, document, MutationObserver, setTimeout, clearTimeout, queueMicrotask)
assert(loadedId === 'dsh-loading-phrases', 'bundle registers id dsh-loading-phrases')
assert(typeof factory === 'function', 'factory captured')
const plugin = factory()
assert(typeof plugin.apply === 'function', 'exports.apply is a function')

// --- scenario 1: appearance, first phrase, alternation -------------------------
reset()
plugin.apply(ctx)
assert(styleTag.attrs.get('data-plugin-css') === 'dsh-loading-phrases', 'style tag installed with plugin id')
assert(styleTag.textContent.includes('attr(data-dshlp)'), 'CSS carries attr() phrase carrier')

const el = new FakeEl()
els.push(el)
triggerMutation()
const p1 = el.getAttribute('data-dshlp')
assert(p1 !== undefined, 'attribute set when the status line appears (run start)')
assert(witty.en.includes(p1), `first phrase is an English witty phrase (got "${p1}")`)

advance(5000)
const p2 = el.getAttribute('data-dshlp')
assert(tips.en.includes(p2), `after 5 s the line shows an English tip (got "${p2}")`)

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

const zhWittySeen = [zhFirst]
for (let i = 1; i < witty.zh.length; i++) {
  advance(5000) // current witty dwell
  const t = el.getAttribute('data-dshlp')
  assert(tips.zh.includes(t), `zh tip at cycle ${i}`)
  advance(10000) // tip dwell
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
assert(timeouts.size === 0, 'rotation timer cleared on removal')

for (const dispose of disposers) dispose()
assert(observerInstance.disconnected, 'observer disconnected on cleanup')
assert(styleTag.removed, 'style tag removed on cleanup')

console.log(failures === 0 ? '\nALL CLIENT CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
