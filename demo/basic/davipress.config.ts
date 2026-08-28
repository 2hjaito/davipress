import { defineConfig } from 'davipress'
import { SITE_CONFIG } from './config'
import { navbarConfig } from './config/navbar.config'
import { footerConfig } from './config/footer.config'
import { layoutMetadata } from './config/layout.config'

const githubRepository = new URL(SITE_CONFIG.githubRepo)
const giscusRepository = githubRepository.pathname.replace(/^\//, '') as `${string}/${string}`

export default defineConfig({
  title: typeof layoutMetadata.title === 'object' && layoutMetadata.title && 'default' in layoutMetadata.title ? String(layoutMetadata.title.default) : 'Davipress UI Demo',
  description: layoutMetadata.description ?? 'A visual test site for the Davipress default theme.',
  lang: 'vi',
  url: `https://${SITE_CONFIG.url}`,
  repository: {
    url: SITE_CONFIG.githubRepo,
    editLink: `${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}`,
  },
  themeConfig: {
    nav: navbarConfig.items.map(item => ({ text: item.label, link: item.href, icon: item.icon, items: 'items' in item ? item.items : undefined })),
    navbar: {
      showThemeToggle: true,
      showThemeSeparator: true,
    },
    footer: footerConfig
  },
  giscus: {
    enabled: true,
    repo: giscusRepository,
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