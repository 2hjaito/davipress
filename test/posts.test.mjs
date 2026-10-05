import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadPosts } from '../dist/core/posts.js'

function site(dir) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-posts-'))
  fs.mkdirSync(path.join(root, dir))
  fs.writeFileSync(path.join(root, `${dir}/hello.md`), '---\ntitle: Hello\ndate: 2026-09-04\n---\n# Hello')
  fs.writeFileSync(path.join(root, 'guide.md'), '# Guide')
  return root
}

test('loads posts from docs/post by default', async () => {
  assert.deepEqual((await loadPosts(site('post'))).map(post => post.route), ['/post/hello'])
})

test('falls back to docs/posts when docs/post is missing', async () => {
  assert.deepEqual((await loadPosts(site('posts'))).map(post => post.route), ['/posts/hello'])
})

test('reads posts from a custom postDir', async () => {
  assert.deepEqual((await loadPosts(site('blog'), 'blog')).map(post => post.route), ['/blog/hello'])
})
