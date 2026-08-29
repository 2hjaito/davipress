import { defineConfig } from 'davipress'
import { GISCUS, SITE_CONFIG } from './config'
import { navbarConfig } from './config/navbar.config'
import { footerConfig } from './config/footer.config'
import { layoutMetadata } from './config/layout.config'

export default defineConfig({
  title: typeof layoutMetadata.title === 'object' && layoutMetadata.title && 'default' in layoutMetadata.title ? String(layoutMetadata.title.default) : 'Davipress UI Demo',
  description: layoutMetadata.description ?? 'A visual test site for the Davipress default theme.',
  lang: 'vi',
  url: SITE_CONFIG.url,
  repository: {
    url: SITE_CONFIG.githubRepo,
    editLink: `${SITE_CONFIG.githubRepo}/edit/${SITE_CONFIG.githubBranch}`,
  },
  github: {
    username: '2hjaito',
    topic: 'featured',
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
    repo: GISCUS.repo,
    repoId: GISCUS.repoId,
    category: GISCUS.category,
    categoryId: GISCUS.categoryId,
    mapping: GISCUS.mapping,
    strict: false,
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    theme: GISCUS.theme,
    lang: 'vi',
  },
  seo: {
    twitterCard: 'summary_large_image'
  }
})