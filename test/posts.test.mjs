import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadPosts } from '../dist/core/posts.js'
import { discover } from '../dist/core/content.js'

function site(dir) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-posts-'))
  fs.mkdirSync(path.join(root, dir))
  fs.writeFileSync(path.join(root, `${dir}/hello.md`), '---\ntitle: Hello\ndate: 2026-09-04\n---\n# Hello')
  fs.writeFileSync(path.join(root, 'guide.md'), '# Guide')
  return root
}

test('loads posts from docs/post by default', async () => {
  assert.deepEqual((await loadPosts(site('post'))).map(post => post.route), ['/hello'])
})

test('falls back to docs/posts when docs/post is missing', async () => {
  assert.deepEqual((await loadPosts(site('posts'))).map(post => post.route), ['/hello'])
})

test('reads posts from a custom postDir', async () => {
  assert.deepEqual((await loadPosts(site('blog'), 'blog')).map(post => post.route), ['/blog/hello'])
})

test('serves posts at the site root, keeping the locale prefix', () => {
  const root = site('post')
  fs.writeFileSync(path.join(root, 'post/slugged.md'), '---\nslug: custom-slug\n---\n# Slugged')
  fs.writeFileSync(path.join(root, 'post/index.md'), '# Post index')
  fs.mkdirSync(path.join(root, 'en/post'), { recursive: true })
  fs.writeFileSync(path.join(root, 'en/post/hello.md'), '# Hello')
  fs.mkdirSync(path.join(root, 'guide/post'), { recursive: true })
  fs.writeFileSync(path.join(root, 'guide/post/nested.md'), '# Nested')
  assert.deepEqual(discover(root).map(item => item.route).sort(), ['/custom-slug', '/en/hello', '/guide', '/guide/post/nested', '/hello', '/post'])
})
