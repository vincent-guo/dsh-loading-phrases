// dsh-loading-phrases — Client half (plain JS function body for a Cordis Package).
// Renders a rotating witty/tips line in `conversation.composer.dock`, gated by
// the session `running` state (the same gate the shipped `Deep diving...`
// status uses), and hides the shipped status row unless mode is `off`.

function freshDeck(list) {
  const d = list.slice()
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = d[i]
    d[i] = d[j]
    d[j] = tmp
  }
  return { d, i: 0 }
}

function nextFrom(deck) {
  if (deck.i >= deck.d.length) {
    const prev = deck.d[deck.d.length - 1]
    const nd = freshDeck(deck.d)
    if (nd.d.length > 1 && nd.d[0] === prev) {
      nd.d[0] = nd.d[nd.d.length - 1]
      nd.d[nd.d.length - 1] = prev
    }
    deck.d = nd.d
    deck.i = 0
  }
  return deck.d[deck.i++]
}

function formatElapsed(ms) {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  const pad = (n) => String(n).padStart(2, '0')
  if (m >= 60) {
    const h = Math.floor(m / 60)
    return `${h}:${pad(m % 60)}:${pad(s)}`
  }
  return `${pad(m)}:${pad(s)}`
}

return {
  name: 'dsh-loading-phrases',
  inject: ['timer'],
  async apply(ctx) {
    const bootstrap = await host.call('bootstrap', {})
    const config = (bootstrap && bootstrap.config) || {}
    const wittyData = (bootstrap && bootstrap.witty) || { en: [], zh: [] }
    const tipsData = (bootstrap && bootstrap.tips) || { en: [], zh: [] }

    const mode = config.mode || 'all'
    const wittyMs =
      typeof config.wittyIntervalMs === 'number' ? config.wittyIntervalMs : 5000
    const tipsMs =
      typeof config.tipsIntervalMs === 'number' ? config.tipsIntervalMs : 10000
    const shuffle = config.shuffle !== false
    const language = config.language || 'auto'
    const phraseOverride = config.phrases || { en: [], zh: [] }
    const tipsOverride = config.tips || { en: [], zh: [] }

    const resolveLang = (active) => {
      if (language !== 'auto') return language === 'zh' ? 'zh' : 'en'
      return String(active).toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en'
    }

    const pickList = (builtin, override, lang) => {
      const ov = override && override[lang]
      if (ov && ov.length > 0) return ov
      const b = builtin && builtin[lang]
      return b || []
    }

    function PhraseLine(props) {
      const useS = props.useSession
      const running = useS
        ? useS((s) => s.running)
        : Boolean(props.session && props.session.running)

      const localeFace = ctx.get('locale')
      const [langState, setLangState] = React.useState(() =>
        localeFace ? localeFace.getSnapshot().active : 'en',
      )
      React.useEffect(() => {
        if (localeFace === undefined) return
        const update = () => setLangState(localeFace.getSnapshot().active)
        return localeFace.subscribe(update)
      }, [])

      const lang = resolveLang(langState)
      const wittyList = pickList(wittyData, phraseOverride, lang)
      const tipsList = pickList(tipsData, tipsOverride, lang)

      const [phrase, setPhrase] = React.useState(null)
      const [elapsed, setElapsed] = React.useState(0)

      React.useEffect(() => {
        setPhrase(null)
        setElapsed(0)
        if (!running) return

        const decks = {}
        const deckOf = (kind) => {
          if (decks[kind] === undefined) {
            const list = kind === 'witty' ? wittyList : tipsList
            decks[kind] = list.length === 0 ? null : freshDeck(list)
          }
          return decks[kind]
        }
        const draw = (kind) => {
          const deck = deckOf(kind)
          if (deck === null) return null
          if (shuffle) return nextFrom(deck)
          return deck.d[Math.floor(Math.random() * deck.d.length)]
        }

        const channels = []
        if (mode === 'all') channels.push('witty', 'tips')
        else if (mode === 'witty' || mode === 'tips') channels.push(mode)
        const avail = channels.filter((k) => deckOf(k) !== null)
        if (avail.length === 0) return

        let idx = 0
        let timer = null
        const tick = () => {
          const kind = avail[idx % avail.length]
          const text = draw(kind)
          if (text !== null) setPhrase({ text, kind })
          idx += 1
          // Dwell time belongs to the phrase just shown.
          timer = ctx.timeout(tick, kind === 'witty' ? wittyMs : tipsMs)
        }
        tick()

        const startedAt = Date.now()
        const clock = ctx.interval(() => setElapsed(Date.now() - startedAt), 1000)
        return () => {
          if (timer !== null) timer()
          clock()
        }
      }, [running, lang, mode, shuffle, wittyMs, tipsMs])

      if (!running || phrase === null) return null
      return React.createElement(
        'div',
        { className: 'dshlp-line', role: 'status', 'aria-live': 'polite' },
        React.createElement('span', { className: 'dshlp-text' }, phrase.text),
        elapsed >= 15000
          ? React.createElement(
              'span',
              { className: 'dshlp-clock', 'aria-hidden': true },
              formatElapsed(elapsed),
            )
          : null,
      )
    }

    if (mode === 'off') return

    styles.insert(`
      [class*="turnStatus"] { display: none; }
      .dshlp-line {
        display: inline-flex;
        align-items: center;
        font: var(--dsw-font-s-strong-14);
        color: var(--dsw-alias-label-secondary);
        white-space: nowrap;
      }
      .dshlp-clock {
        margin-left: 8px;
        font: var(--dsw-font-xs-13);
        color: var(--dsw-alias-label-caption);
        font-variant-numeric: tabular-nums;
      }
    `)

    const slots = ctx.get('slots')
    if (slots === undefined) return
    slots.inject('conversation.composer.dock', () =>
      slots.register(
        { name: 'conversation.composer.dock', id: 'loading-phrases', order: 5 },
        (props) => React.createElement(PhraseLine, props),
      ),
    )
  },
}
