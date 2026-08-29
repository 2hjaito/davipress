import path from 'node:path'
import type { DavipressConfig } from '../config.js'
import { compile, discover } from '../core/content.js'
import { DocsTheme } from './theme.js'

export { loadPosts } from '../core/posts.js'
export { loadProjects } from '../core/projects.js'

export { CodeBlockControls } from './CodeBlockControls.js'
export { ImageZoomClient } from './ImageZoomClient.js'
export { NotFoundView } from './NotFoundView.js'
export { ProjectsView } from './ProjectsView.js'
export { LangBadge } from './LangBadge.js'
export { ToolsSection } from './ToolsSection.js'

export async function generateStaticParams() { return discover().map(({ route }) => ({ slug: route === '/' ? [] : route.slice(1).split('/') })) }
export async function DocsPage({ slug, config }: { slug?: string[]; config: DavipressConfig }) {
  const route = slug?.length ? `/${slug.join('/')}` : '/'
  const found = discover().find(item => item.route === route)
  if (!found) return null
  const page = await compile(found.source)
  return DocsTheme({ page, config })
}
export async function docsMetadata({ slug, config }: { slug?: string[]; config: DavipressConfig }) {
  const route = slug?.length ? `/${slug.join('/')}` : '/'; const found = discover().find(item => item.route === route)
  const page = found ? await compile(found.source) : undefined; const title = page?.frontmatter.title ?? config.title ?? 'Davipress'
  return { title, description: page?.frontmatter.description ?? config.description, ...(config.url ? { metadataBase: new URL(config.url), alternates: { canonical: route } } : {}), openGraph: { title, description: page?.frontmatter.description ?? config.description, type: 'article' } }
}