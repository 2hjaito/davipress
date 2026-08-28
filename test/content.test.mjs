import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { discover, compile, autoSidebar } from '../dist/core/content.js'

test('maps index and nested markdown routes', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-'))
  fs.mkdirSync(path.join(root, 'guide'))
  fs.writeFileSync(path.join(root, 'index.md'), '---\ntitle: Home\n---\n# Home')
  fs.writeFileSync(path.join(root, 'guide/index.md'), '# Guide')
  fs.writeFileSync(path.join(root, 'guide/start.mdx'), '---\ntitle: Start\n---\n# Start\n\n```js\nconst answer = 42\n```')
  assert.deepEqual(discover(root).map(item => item.route).sort(), ['/', '/guide', '/guide/start'])
  const page = await compile(path.join(root, 'guide/start.mdx'), root)
  assert.match(page.html, /id="start"/)
  assert.match(page.html, /answer/)
  assert.equal(autoSidebar([page])[0].link, '/guide/start')
})