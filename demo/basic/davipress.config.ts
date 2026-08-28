import { defineConfig, type SidebarItem } from 'davipress'
import { SITE_CONFIG } from './config'
import { navbarConfig } from './config/navbar.config'
import { footerConfig } from './config/footer.config'
import { layoutMetadata } from './config/layout.config'
import { tutorialSidebar, type TutorialConfigItem } from './config/tutorial.config'

function tutorialLink(link?: string) {
  return link?.replace(/^\/tutorial\//, '/tutorials/')
}

function toSidebarItem(item: TutorialConfigItem): SidebarItem & { collapsible?: boolean; icon?: string } {
  return {
    text: item.text,
    link: tutorialLink(item.link),
    icon: item.icon,
    collapsed: item.collapsible === false ? false : undefined,
    collapsible: item.collapsible,
    items: item.children?.map(toSidebarItem),
  }
}

const tutorialSidebarItems = tutorialSidebar.map(toSidebarItem)

export default defineConfig({
  title: typeof layoutMetadata.title === 'object' && layoutMetadata.title && 'default' in layoutMetadata.title ? String(layoutMetadata.title.default) : 'Davipress UI Demo',
  description: layoutMetadata.description ?? 'A visual test site for the Davipress default theme.',
  lang: 'vi',
  url: `https://${SITE_CONFIG.url}`,
  themeConfig: {
    nav: navbarConfig.items.map(item => ({ text: item.label, link: item.href })),
    sidebar: {
      '/guide': [
        { text: 'Guide', link: '/guide' },
        { text: 'Creating Pages', link: '/guide/creating-pages' },
      ],
      '/tutorial': tutorialSidebarItems,
      '/tutorials': tutorialSidebarItems,
    },
    footer: footerConfig
  },
  giscus: {
    enabled: true,
    repo: 'danqth/davipress',
    repoId: 'R_kgDOUGl8kA',
    category: 'Announcements',
    categoryId: 'DIC_kwDOUGl8kM4DEWKm',
    mapping: 'pathname',
    strict: false,
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    theme: 'light',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    lang: 'vi',
  },
  seo: {
    twitterCard: 'summary_large_image'
  }
})