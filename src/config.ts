export interface DavipressFrontmatter {
  title?: string; description?: string; date?: string; updated?: string
  sidebar_position?: number; sidebar_label?: string; draft?: boolean
  image?: string; keywords?: string[]; layout?: string; comments?: boolean
  [key: string]: unknown
}

export interface SidebarItem { text: string; link?: string; icon?: string; items?: readonly SidebarItem[]; children?: readonly SidebarItem[]; collapsed?: boolean; collapsible?: boolean }
export interface NavItem { text: string; link: string; icon?: string; items?: readonly SidebarItem[] }
export interface FooterConfig { copyright: string; attribution?: { label: string; text: string; href: string; external?: boolean }; links?: ReadonlyArray<{ type: 'source' | 'rss'; label: string; href: string; ariaLabel: string; external?: boolean }> }
export interface DavipressConfig {
  title?: string; description?: string; url?: string; lang?: string
  themeConfig?: { logo?: string; nav?: NavItem[]; sidebar?: 'auto' | Record<string, SidebarItem[]>; socialLinks?: Record<string, string>; footer?: string | FooterConfig }
  giscus?: {
    enabled: boolean
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number'
    strict?: boolean
    reactionsEnabled?: boolean
    emitMetadata?: boolean
    inputPosition?: 'top' | 'bottom'
    theme?: string
    lightTheme?: string
    darkTheme?: string
    lang?: string
  }
  seo?: { defaultImage?: string; twitterCard?: 'summary' | 'summary_large_image' }
}

export function defineConfig(config: DavipressConfig): DavipressConfig { return config }