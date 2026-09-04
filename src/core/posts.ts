import path from 'node:path'
import { loadPages, discover } from './content.js'
import type { Page } from './content.js'

export async function loadPosts(root = path.resolve(process.cwd(), 'docs')): Promise<Page[]> {
  const postsDir = path.join(root, 'posts')
  const entries = discover(root).filter(item => path.relative(postsDir, item.source).split(path.sep)[0] !== '..')
  const sources = new Set(entries.map(item => item.source))
  const pages = (await loadPages(root)).filter(page => sources.has(page.source))
  return pages
    .filter(page => page.frontmatter.published !== false)
    .sort((a, b) => String(b.frontmatter.date ?? '').localeCompare(String(a.frontmatter.date ?? '')))
}
