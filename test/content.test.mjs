import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { discover, compile, loadPages, markdownToHtml, autoSidebar } from '../dist/core/content.js'

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

test('refreshes cached pages when a document changes', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-cache-'))
  const source = path.join(root, 'index.md')
  fs.writeFileSync(source, '---\ntitle: First\n---\nContent')
  assert.equal((await loadPages(root))[0].frontmatter.title, 'First')
  fs.writeFileSync(source, '---\ntitle: Second\n---\nUpdated content')
  assert.equal((await loadPages(root))[0].frontmatter.title, 'Second')
})

test('rejects duplicate content routes', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-duplicate-'))
  fs.writeFileSync(path.join(root, 'guide.md'), '# Guide')
  fs.writeFileSync(path.join(root, 'other.md'), '---\nslug: guide\n---\n# Other')
  assert.throws(() => discover(root), /Duplicate content route "\/guide"/)
})

test('sanitizes unsafe HTML while preserving supported content', async () => {
  const html = await markdownToHtml('<script>alert(1)</script>\n\n[unsafe](javascript:alert(1))')
  assert.doesNotMatch(html, /<script|javascript:/i)
  assert.match(await markdownToHtml('> [!NOTE] Safe note'), /class="admonition note"/)
  assert.match(await markdownToHtml('<span class="custom">Safe</span>'), /class="custom"/)
  const styledHtml = await markdownToHtml('<h1 class="custom">Title</h1><p class="custom">Text</p><a class="custom" href="/">Link</a><img class="custom" src="/image.png" alt="Image">')
  assert.match(styledHtml, /<h1[^>]*class="custom"/)
  assert.match(styledHtml, /<p class="custom">Text<\/p>/)
  assert.match(styledHtml, /<a class="custom" href="\/">Link<\/a>/)
  assert.match(styledHtml, /<img[^>]*class="custom"/)
})