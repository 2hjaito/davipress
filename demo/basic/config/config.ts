export const SITE_CONFIG = {
  url: 'https://davipress.vercel.app',
  githubRepo: 'https://github.com/2hjaito/davipress',
  githubBranch: 'main', // Hoặc 'dev', 'next' tùy bạn
  postDir: 'demo/basic/docs/posts',
  tutorialDir: 'docs/tutorials',
}

export const GISCUS = {
  termPrefix: "davipress",
  id: "comments",
  repo: "2hjaito/davipress" as `${string}/${string}`,
  repoId: "R_kgDOUGl8kA",
  category: "General", // đổi theo tên category bạn tạo trong Giscus
  categoryId: "", // điền ID category thực tế từ Giscus, ví dụ DIC_xxx...
  mapping: 'pathname' as const,
  light: "light",
  dark: "transparent_dark"
}

export const GITHUB = {
  username: "2hjaito",
  topic: "featured"
}