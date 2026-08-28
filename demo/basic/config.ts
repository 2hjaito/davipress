export const SITE_CONFIG = {
  url: 'https://davipress.vercel.app',
  githubRepo: 'https://github.com/2hjaito/davipress',
  githubBranch: 'main', // Hoặc 'dev', 'next' tùy bạn
  postDir: 'docs/posts',
  tutorialDir: 'docs/tutorials',
}

export const GISCUS = {
  termPrefix: "davipress",
  id: "comments",
  repo: "2hjaito/davipress" as `${string}/${string}`,
  repoId: "R_kgDOT_faxA",
  category: "Announcements",
  categoryId: "DIC_kwDOT_faxM4DEXW0",
  mapping: 'pathname' as const,
  theme: "preferred_color_scheme"
}

export const GITHUB = {
  username: "2hjaito",
  topic: "featured"
}