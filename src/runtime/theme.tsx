import type { DavipressConfig, SidebarItem } from '../config.js'
import { autoSidebar, loadPages } from '../core/content.js'
import type { Page } from '../core/content.js'
import { FaUserEdit } from 'react-icons/fa'
import { MdDateRange, MdHistory, MdRebaseEdit } from 'react-icons/md'
import { IoTimerOutline } from 'react-icons/io5'
import { NavBar } from './NavBar.js'
import { loadHome } from '../core/home.js'
import { HomeView } from './HomeView.js'
import { loadPosts } from '../core/posts.js'
import { PostListView } from './PostListView.js'
import { DocsChrome, PostChrome } from './DocsChrome.js'
import { GiscusComments } from './GiscusComments.js'
import { Footer } from './Footer.js'
import Link from 'next/link'
import './theme.css'
import './theme-dark.css'

function formatDate(value: unknown) {
  if (!value) return ''
  const date = new Date(String(value))
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
}

function editLink(config: DavipressConfig, source: string) {
  const base = config.repository?.editLink?.replace(/\/$/, '')
  if (!base) return undefined
  const filePath = source.replace(/^.*?docs[\\/]/, 'docs/').replace(/\\/g, '/')
  return `${base}/${filePath}`
}

function PostView({ page, pages, config }: { page: Page; pages: Page[]; config: DavipressConfig }) {
  const tags = Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags as string[] : []
  const index = pages.findIndex(item => item.route === page.route)
  const previous = pages[index - 1]
  const next = pages[index + 1]
  const readingTime = Math.max(1, Math.ceil(page.text.trim().split(/\s+/).filter(Boolean).length / 200))
  const giscus = config.giscus
  const commentsEnabled = Boolean(giscus?.enabled && page.frontmatter.comments !== false)
  const updated = String(page.frontmatter.updated ?? page.frontmatter.date ?? '')
  const contentHtml = page.html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '')
  const sourceEditLink = editLink(config, page.source)

  return <PostChrome footer={<Footer footer={config.themeConfig?.footer} />} headings={page.headings} title={String(page.frontmatter.title ?? '')} hasComments={commentsEnabled} route={page.route}>
    <div className="dp-post">
      <article className="dp-post-article dp-post-detail markdown-body">
        {tags.length > 0 && <div className="dp-post-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
        <h2 id="post-main-title">{page.frontmatter.title}</h2>
        <div className="dp-post-meta">
          {Boolean(page.frontmatter.author) && <span><FaUserEdit aria-hidden="true" />{String(page.frontmatter.author)}</span>}
          {Boolean(page.frontmatter.date) && <span><MdDateRange aria-hidden="true" />{formatDate(page.frontmatter.date)}</span>}
          <span><IoTimerOutline aria-hidden="true" />{readingTime} phút đọc</span>
        </div>
        <div className="dp-post-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <div className="dp-post-update">
          {sourceEditLink && <a href={sourceEditLink} target="_blank" rel="noopener noreferrer"><MdRebaseEdit aria-hidden="true" /> Chỉnh sửa trên GitHub</a>}
          {updated && <div><MdHistory aria-hidden="true" /><span>Cập nhật: {formatDate(updated)}</span></div>}
        </div>
        {(previous || next) && <nav className="dp-post-nav" aria-label="Post navigation"><div>{previous && <Link href={previous.route}><span className="dp-post-nav-arrow" aria-hidden="true">←</span><span className="dp-post-nav-label">{String(previous.frontmatter.title)}</span></Link>}</div><div>{next && <Link href={next.route}><span className="dp-post-nav-label">{String(next.frontmatter.title)}</span><span className="dp-post-nav-arrow" aria-hidden="true">→</span></Link>}</div></nav>}
        {commentsEnabled && giscus ? <GiscusComments giscus={giscus} /> : <div id="comments" className="dp-comments">Comments</div>}
      </article>
    </div>
  </PostChrome>
}

function DocView({ page, config, previous, next }: { page: Page; config: DavipressConfig; previous?: Page; next?: Page }) {
  const tags = Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags as string[] : []
  const contentHtml = page.html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '')
  const readingTime = Math.max(1, Math.ceil(page.text.trim().split(/\s+/).filter(Boolean).length / 200))
  const commentsEnabled = Boolean(config.giscus?.enabled && page.frontmatter.comments !== false)
  const updated = String(page.frontmatter.updated ?? page.frontmatter.date ?? '')
  const sourceEditLink = editLink(config, page.source)

  return <div className="dp-post">
    <article className="dp-post-article dp-tutorial-detail markdown-body">
      {tags.length > 0 && <div className="dp-post-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
      <h2 id="post-main-title">{page.frontmatter.title}</h2>
      {Boolean(page.frontmatter.subtitle) && <p className="dp-post-card-subtitle">{String(page.frontmatter.subtitle)}</p>}
      <div className="dp-post-meta">
        {Boolean(page.frontmatter.author) && <span><FaUserEdit aria-hidden="true" />{String(page.frontmatter.author)}</span>}
        {Boolean(page.frontmatter.date) && <span><MdDateRange aria-hidden="true" />{formatDate(page.frontmatter.date)}</span>}
        <span><IoTimerOutline aria-hidden="true" />{readingTime} phút đọc</span>
      </div>
      <div className="dp-post-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className="dp-post-update">
        {sourceEditLink && <a href={sourceEditLink} target="_blank" rel="noopener noreferrer"><MdRebaseEdit aria-hidden="true" /> Chỉnh sửa trên GitHub</a>}
        {updated && <div><MdHistory aria-hidden="true" /><span>Cập nhật: {formatDate(updated)}</span></div>}
      </div>
      {(previous || next) && <nav className="dp-post-nav" aria-label="Section navigation"><div>{previous && <Link href={previous.route}><span className="dp-post-nav-arrow" aria-hidden="true">←</span><span className="dp-post-nav-label">{String(previous.frontmatter.title ?? previous.route)}</span></Link>}</div><div>{next && <Link href={next.route}><span className="dp-post-nav-label">{String(next.frontmatter.title ?? next.route)}</span><span className="dp-post-nav-arrow" aria-hidden="true">→</span></Link>}</div></nav>}
      {commentsEnabled && config.giscus ? <GiscusComments giscus={config.giscus} /> : <div id="comments" className="dp-comments">Comments</div>}
    </article>
  </div>
}

function sidebarForPage(config: DavipressConfig, pages: Page[], route: string) {
  const sidebar = config.themeConfig?.sidebar
  if (sidebar === 'auto') return autoSidebar(pages)
  if (!sidebar) return []
  const match = Object.entries(sidebar).sort((a, b) => b[0].length - a[0].length).find(([prefix]) => route === prefix || route.startsWith(prefix.replace(/\/$/, '') + '/'))
  return match?.[1] ?? []
}

function normalizeRoute(route?: string) {
  if (!route) return ''
  return route.replace(/\/$/, '') || '/'
}

function matchesNavRoute(route: string, link: string) {
  const normalizedLink = normalizeRoute(link)
  return normalizedLink === '/' ? route === '/' : route === normalizedLink || route.startsWith(normalizedLink + '/')
}

function flattenSidebarLinks(items: readonly SidebarItem[]): string[] {
  return items.flatMap(item => [...(item.link ? [normalizeRoute(item.link)] : []), ...flattenSidebarLinks(item.items ?? item.children ?? [])])
}

function SimplePage({ page, footer }: { page: Page; footer?: string | import('../config.js').FooterConfig }) {
  return <div className="dp-home-view dp-simple-page"><article className="markdown-body dp-home-content" dangerouslySetInnerHTML={{ __html: page.html }} /><Footer footer={footer} /></div>
}

export async function DocsTheme({ page, config }: { page: Page; config: DavipressConfig }) {
  const nav = config.themeConfig?.nav ?? []
  const pages = await loadPages()
  if (page.route === '/') {
    const home = await loadHome()
    return <div className="davipress-shell"><HomeView blocks={home.blocks} footer={config.themeConfig?.footer} /><NavBar items={nav} navbar={config.themeConfig?.navbar} /></div>
  }
  const layout = String(page.frontmatter.layout ?? '').toLowerCase()
  const isPostList = layout === 'post-list'
  const posts = await loadPosts()
  const isPost = posts.some(post => post.source === page.source)

  if (isPostList) {
    return <div className="davipress-shell"><PostListView posts={posts} /><NavBar items={nav} navbar={config.themeConfig?.navbar} /></div>
  }

  if (isPost) {
    return <div className="davipress-shell"><PostView page={page} pages={posts} config={config} /><NavBar items={nav} navbar={config.themeConfig?.navbar} /></div>
  }

  const sectionNav = [...nav].sort((a, b) => b.link.length - a.link.length).find(item => matchesNavRoute(page.route, item.link))
  const sidebar = sectionNav?.items ?? sidebarForPage(config, pages, page.route)

  if (sidebar.length === 0) {
    return <div className="davipress-shell"><SimplePage page={page} footer={config.themeConfig?.footer} /><NavBar items={nav} navbar={config.themeConfig?.navbar} /></div>
  }

  const ordered = flattenSidebarLinks(sidebar).map(link => pages.find(item => normalizeRoute(item.route) === link)).filter((item): item is Page => Boolean(item))
  const index = ordered.findIndex(item => item.route === page.route)
  const hasComments = Boolean(config.giscus?.enabled && page.frontmatter.comments !== false)
  return <div className="davipress-shell">
    <DocsChrome sidebar={sidebar} headings={page.headings} activeRoute={page.route} title={String(page.frontmatter.title ?? page.headings[0]?.text ?? '')} hasComments={hasComments} sectionLabel={sectionNav?.text} sectionIcon={sectionNav?.icon} footer={null} reveal>
      <DocView page={page} config={config} previous={index > 0 ? ordered[index - 1] : undefined} next={index >= 0 ? ordered[index + 1] : undefined} />
    </DocsChrome>
    <NavBar items={nav} navbar={config.themeConfig?.navbar} />
  </div>
}