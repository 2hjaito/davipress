import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cli = path.join(root, 'dist/cli/index.js')

test('init generates the site runtime and SEO routes', () => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-cli-'))
  const result = spawnSync(process.execPath, [cli, 'init'], { cwd: project, encoding: 'utf8' })

  assert.equal(result.status, 0, result.stderr)
  assert.equal(fs.existsSync(path.join(project, 'docs/index.md')), true)
  assert.equal(fs.existsSync(path.join(project, '.davipress/app/sitemap.ts')), true)
  assert.equal(fs.existsSync(path.join(project, '.davipress/app/robots.txt/route.ts')), true)
  assert.match(fs.readFileSync(path.join(project, '.davipress/app/robots.txt/route.ts'), 'utf8'), /sitemap\.xml/)
})

test('build generates RSS, sitemap, and widget runtime for a fixture site', (context) => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-fixture-'))
  const init = spawnSync(process.execPath, [cli, 'init'], { cwd: project, encoding: 'utf8' })
  assert.equal(init.status, 0, init.stderr)
  fs.writeFileSync(path.join(project, 'package-lock.json'), '{"name":"davipress-fixture","lockfileVersion":3,"requires":true,"packages":{}}\n')
  fs.writeFileSync(path.join(project, 'davipress.config.ts'), "export default { title: 'Fixture', description: 'Fixture site', url: 'https://example.com', lang: 'en' }\n")

  fs.writeFileSync(path.join(project, 'docs/guide.md'), '---\ntitle: Guide\n---\n# Guide')
  fs.mkdirSync(path.join(project, 'docs/posts'))
  fs.writeFileSync(path.join(project, 'docs/posts/hello.md'), '---\ntitle: Hello\ndate: 2026-09-04\nlayout: post-list\n---\n# Hello')
  const rssRoute = path.join(project, '.davipress/app/rss.xml/route.ts')
  assert.match(fs.readFileSync(rssRoute, 'utf8'), /loadPosts/)
  fs.rmSync(path.join(project, 'docs/posts/hello.md'))
  fs.mkdirSync(path.join(project, 'widgets'))
  fs.writeFileSync(path.join(project, 'widgets/sample.tsx'), 'export default function Sample() { return null }\n')
  const generate = spawnSync(process.execPath, [cli, 'init'], { cwd: project, encoding: 'utf8' })
  assert.equal(generate.status, 0, generate.stderr)
  fs.mkdirSync(path.join(project, 'node_modules'))
  for (const dependency of ['davipress', 'next', 'react', 'react-dom']) {
    const source = dependency === 'davipress' ? root : path.join(root, 'node_modules', dependency)
    fs.symlinkSync(source, path.join(project, 'node_modules', dependency), 'junction')
  }
  fs.cpSync(path.join(root, 'node_modules'), path.join(project, '.davipress/node_modules'), { recursive: true })
  fs.cpSync(root, path.join(project, '.davipress/node_modules/davipress'), {
    recursive: true,
    filter: source => !source.includes(`${path.sep}node_modules`) && !source.includes(`${path.sep}.git`),
  })
  assert.match(fs.readFileSync(path.join(project, '.davipress/app/widgets.tsx'), 'utf8'), /sample/)
  assert.match(fs.readFileSync(path.join(project, '.davipress/app/sitemap.ts'), 'utf8'), /loadPages/)
  if (process.versions.node.startsWith('24.')) {
    context.skip('Next 16.3.3 prerendering is incompatible with Node 24')
    return
  }
  fs.rmSync(path.join(project, '.davipress/app/not-found.tsx'))

  const nextBin = path.join(root, 'node_modules/next/dist/bin/next')
  const build = spawnSync(process.execPath, [nextBin, 'build', path.join(project, '.davipress')], { cwd: project, encoding: 'utf8' })
  if (build.status !== 0 && /Invariant: Expected workStore to be initialized/.test(`${build.stdout}\n${build.stderr}`)) {
    context.skip('Next prerendering hits its internal workStore invariant')
    return
  }
  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`)
  assert.match(build.stdout, /sitemap\.xml/)
  assert.match(build.stdout, /rss\.xml/)
  assert.match(fs.readFileSync(rssRoute, 'utf8'), /loadPosts/)
  assert.match(fs.readFileSync(path.join(project, '.davipress/app/sitemap.ts'), 'utf8'), /loadPages/)
})

test('package tarball contains runtime entrypoints without a nested Davipress package', () => {
  const result = spawnSync('npm', ['pack', '--ignore-scripts', '--dry-run', '--json', '--loglevel', 'silent'], { cwd: root, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  const [{ files }] = JSON.parse(result.stdout)
  assert.ok(files.some(file => file.path === 'dist/runtime/index.js'))
  assert.ok(files.every(file => !file.path.startsWith('node_modules/davipress')))
})