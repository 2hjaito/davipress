import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkAdmonition from './remarkAdmonition.js'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import type { DavipressFrontmatter, SidebarItem } from '../config.js'

export interface Page { route: string; source: string; html: string; text: string; frontmatter: DavipressFrontmatter; headings: { id: string; text: string; level: number }[] }

function files(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : /\.mdx?$/.test(entry.name) ? [path.join(dir, entry.name)] : [])
}
function routeFor(root: string, file: string) {
  const relative = path.relative(root, file).replace(/\\/g, '/').replace(/\.mdx?$/, '')
  const route = relative === 'index' ? '' : relative.endsWith('/index') ? relative.slice(0, -6) : relative
  return `/${route}`.replace(/\/+/g, '/') || '/'
}
function resolveRoute(root: string, file: string) {
  const fileRoute = routeFor(root, file)
  const { data } = matter(fs.readFileSync(file, 'utf8'))
  if (typeof data.slug !== 'string' || !data.slug) return fileRoute
  return `${path.posix.dirname(fileRoute)}/${data.slug}`.replace(/\/+/g, '/')
}
export function discover(root = path.resolve(process.cwd(), 'docs')) { return files(root).map(source => ({ source, route: resolveRoute(root, source) })) }
export async function markdownToHtml(content: string) {
  const result = await remark().use(remarkGfm).use(remarkMath).use(remarkAdmonition).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeKatex, { strict: false }).use(rehypeHighlight).use(rehypeSlug).use(rehypeAutolinkHeadings, { behavior: 'wrap' }).use(rehypeStringify, { allowDangerousHtml: true }).process(content)
  return result.toString()
}
export async function compile(source: string, root = path.resolve(process.cwd(), 'docs')): Promise<Page> {
  const raw = fs.readFileSync(source, 'utf8'); const parsed = matter(raw)
  const first = parsed.content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const content = parsed.data.title ? parsed.content : parsed.content.replace(/^#\s+.+\n+(?:\n)*/m, '')
  const html = await markdownToHtml(content)
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map(match => {
    const text = match[3].replace(/<[^>]+>/g, '').trim()
    return { level: Number(match[1]), id: match[2], text }
  })
  return { route: resolveRoute(root, source), source, html, text: content.replace(/[#_*`>\-]/g, ''), frontmatter: { ...parsed.data, title: parsed.data.title ?? first }, headings }
}
export async function loadPages(root = path.resolve(process.cwd(), 'docs')) { return Promise.all(discover(root).map(item => compile(item.source, root))) }
export function autoSidebar(pages: Pick<Page, 'route' | 'frontmatter'>[]): SidebarItem[] {
  return [...pages].sort((a, b) => (Number(a.frontmatter.sidebar_position ?? 9999) - Number(b.frontmatter.sidebar_position ?? 9999)) || a.route.localeCompare(b.route)).map(page => ({ text: String((page.frontmatter.sidebar_label ?? page.frontmatter.title ?? page.route.slice(1)) || 'Home'), link: page.route }))
}