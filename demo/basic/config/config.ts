export const SITE_CONFIG = {
  url: 'dangth.dev',
  githubRepo: 'https://github.com/2hjaito/dangth',
  githubBranch: 'main', // Hoặc 'dev', 'next' tùy bạn
  postDir: 'docs/posts',
  tutorialDir: 'docs/tutorials',
}

export const GISCUS = {
  termPrefix: "davipress",
  id: "comments",
  repo: "danqth/davipress" as `${string}/${string}`,
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