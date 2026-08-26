// @vincent-guo/dsh-loading-phrases distribution-manifest test.
//
// Asserts the bundle contract the profile composer and `dsh plugin add`
// rely on: the package declares `dsh.bundle.patch`, the patch file exists
// at the package root and carries the loading-phrases insert row (whose
// `name` matches the package name), the npm `files` allowlist ships both
// the runtime halves, the patch file, and the legal/release files
// (LICENSE, NOTICE.md, CHANGELOG.md), and the publish metadata (license,
// author, keywords) is present. Line-based parsing of the patch is deliberate: the project is
// dependency-free, and these exact lines are what the composer consumes.
//
// Usage: node scripts/test-manifest.mjs

import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
let failures = 0

function assert(condition, label) {
  console.log(`${condition ? 'ok' : 'FAIL'} - ${label}`)
  if (!condition) failures++
}

const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'))
assert(
  manifest.dsh?.bundle?.patch === './cordis.patch.yml',
  'package.json declares dsh.bundle.patch -> ./cordis.patch.yml',
)
assert(
  existsSync(join(root, manifest.dsh.bundle.patch)),
  'the bundle patch file exists at the package root',
)

const patch = readFileSync(join(root, 'cordis.patch.yml'), 'utf-8')
const insertIdx = patch.indexOf('- insert:')
const idIdx = patch.indexOf('- id: loading-phrases')
const nameIdx = patch.indexOf("name: '@vincent-guo/dsh-loading-phrases'")
assert(insertIdx !== -1, 'the patch carries an insert block')
assert(
  idIdx !== -1 && nameIdx !== -1 && insertIdx < idIdx && idIdx < nameIdx,
  'the insert block lists the loading-phrases row (id then name)',
)
assert(
  manifest.name === '@vincent-guo/dsh-loading-phrases',
  'the row name matches the package name (composer resolves by it)',
)

assert(
  Array.isArray(manifest.files) && manifest.files.includes('lib') && manifest.files.includes('cordis.patch.yml'),
  'npm files allowlist ships lib/ and cordis.patch.yml',
)
assert(
  Array.isArray(manifest.files)
    && manifest.files.includes('NOTICE.md')
    && manifest.files.includes('LICENSE')
    && manifest.files.includes('CHANGELOG.md'),
  'npm files allowlist ships the attribution, the license, and the changelog',
)
assert(
  manifest.license === 'MIT'
    && existsSync(join(root, 'LICENSE'))
    && readFileSync(join(root, 'LICENSE'), 'utf-8').includes('MIT License'),
  'an MIT LICENSE file exists and matches the manifest license field',
)
assert(
  existsSync(join(root, 'NOTICE.md'))
    && readFileSync(join(root, 'NOTICE.md'), 'utf-8').includes('Apache-2.0'),
  'NOTICE.md carries the Apache-2.0 attribution for the derived phrases',
)
assert(
  typeof manifest.author === 'string' && manifest.author.length > 0,
  'package.json declares an author',
)
assert(
  Array.isArray(manifest.keywords) && manifest.keywords.length > 0,
  'package.json declares keywords',
)
assert(
  manifest.repository !== undefined
    && String(manifest.repository.url || manifest.repository).includes('github.com/vincent-guo/dsh-loading-phrases'),
  'package.json declares the GitHub repository',
)
assert(
  typeof manifest.homepage === 'string'
    && manifest.homepage.includes('github.com/vincent-guo/dsh-loading-phrases'),
  'package.json declares the homepage URL',
)
assert(
  existsSync(join(root, manifest.main)) && existsSync(join(root, manifest.exports['./client'])),
  'main and ./client export targets exist',
)

console.log(failures === 0 ? '\nALL MANIFEST CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
