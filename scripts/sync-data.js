// dsh-loading-phrases data synchronizer.
//
// Single source of truth for phrase content is src/data/witty.json and
// src/data/tips.json (human-reviewable, bilingual). This script rewrites the
// PHRASES / TIPS blocks inside lib/client.js between the
// `===DATA-<KIND>-START===` / `===DATA-<KIND>-END===` markers, so the client
// bundle never drifts from the reviewed data. No build step required.
//
// Usage: node scripts/sync-data.js

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const witty = JSON.parse(readFileSync(join(root, 'src/data/witty.json'), 'utf-8'))
const tips = JSON.parse(readFileSync(join(root, 'src/data/tips.json'), 'utf-8'))

function block(name, data) {
  const inner = Object.entries(data)
    .map(([lang, list]) => {
      const items = list.map((text) => `        ${JSON.stringify(text)},`).join('\n')
      return `      ${JSON.stringify(lang)}: [\n${items}\n      ],`
    })
    .join('\n')
  return [
    `// ===DATA-${name}-START===`,
    `    const ${name} = {\n${inner}\n    };`,
    `// ===DATA-${name}-END===`,
  ].join('\n')
}

const clientPath = join(root, 'lib/client.js')
let client = readFileSync(clientPath, 'utf-8')

for (const [name, data] of [['PHRASES', witty], ['TIPS', tips]]) {
  const start = `// ===DATA-${name}-START===`
  const end = `// ===DATA-${name}-END===`
  const startIdx = client.indexOf(start)
  const endIdx = client.indexOf(end)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`markers for ${name} not found in lib/client.js`)
  }
  client = client.slice(0, startIdx) + block(name, data) + client.slice(endIdx + end.length)
}

writeFileSync(clientPath, client)
const counts = (data) =>
  Object.entries(data).map(([k, v]) => `${k}:${v.length}`).join(' ')
console.log(`synced PHRASES (${counts(witty)})`)
console.log(`synced TIPS (${counts(tips)})`)
