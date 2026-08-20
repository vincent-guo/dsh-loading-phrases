// dsh-loading-phrases — Host half (plain JS function body for a Cordis Package).
// Reads the config and the built-in phrase/tips data from the session
// workspace, then serves one `bootstrap` payload to the Client half.
return {
  apply(ctx) {
    const DEFAULTS = {
      mode: 'all',
      wittyIntervalMs: 5000,
      tipsIntervalMs: 10000,
      shuffle: true,
      language: 'auto',
    }
    const fs = ctx.get('fs')
    const policy = ctx.get('sandboxPolicy')
    const root = policy && policy.workspaceRoot ? policy.workspaceRoot : ''

    const readJson = async (rel) => {
      if (fs === undefined) return undefined
      try {
        const path = root ? `${root}/${rel}` : rel
        const target = root
          ? await fs.resolve(path, { cwd: root })
          : await fs.resolve(path)
        const text = await fs.readText(target)
        return JSON.parse(text)
      } catch (error) {
        console.error(`dsh-loading-phrases: cannot read ${rel}: ${String(error)}`)
        return undefined
      }
    }

    harness.handle('bootstrap', async () => {
      const fileCfg = await readJson('dsh-loading-phrases.json')
      const section =
        fileCfg && fileCfg.loadingPhrases ? fileCfg.loadingPhrases : {}
      const witty = await readJson('src/data/witty.json')
      const tips = await readJson('src/data/tips.json')
      const config = {
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
      return {
        config,
        witty: witty || { en: [], zh: [] },
        tips: tips || { en: [], zh: [] },
      }
    })
  },
}
