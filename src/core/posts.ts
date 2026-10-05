import fs from 'node:fs'
import path from 'node:path'
import { loadPages, discover } from './content.js'
import type { Page } from './content.js'

// Default is `docs/post`; `docs/posts` is still read when `post` is missing so older sites keep working.
export function resolvePostDir(root: string, postDir?: string) {
  if (postDir) return path.join(root, postDir)
  const singular = path.join(root, 'post')
  return fs.existsSync(singular) ? singular : path.join(root, 'posts')
}

export async function loadPosts(root = path.resolve(process.cwd(), 'docs'), postDir?: string): Promise<Page[]> {
  const postsDir = resolvePostDir(root, postDir)
  const entries = discover(root).filter(item => path.relative(postsDir, item.source).split(path.sep)[0] !== '..')
  const sources = new Set(entries.map(item => item.source))
  const pages = (await loadPages(root)).filter(page => sources.has(page.source))
  return pages
    .filter(page => page.frontmatter.published !== false)
    .sort((a, b) => String(b.frontmatter.date ?? '').localeCompare(String(a.frontmatter.date ?? '')))
}
