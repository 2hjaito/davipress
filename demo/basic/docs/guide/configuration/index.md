---
title: Cấu hình Davipress
description: Cấu hình site, navbar, sidebar, icon, footer, repository, SEO và Giscus.
sidebar_position: 3
---

# Cấu hình Davipress

Mọi thiết lập chính của website nằm trong `davipress.config.ts`. File này được đọc khi chạy `dev`, `build` và `start`.

## Cấu hình tối thiểu

```ts
import { defineConfig } from 'davipress'

export default defineConfig({
  title: 'Tài liệu của tôi',
  description: 'Website tài liệu được xây dựng bằng Davipress.',
  url: 'https://example.com',
  lang: 'vi',
  themeConfig: {
    sidebar: 'auto',
  },
})
```

## Site metadata

- `title`: tên mặc định của website.
- `description`: mô tả khi chia sẻ hoặc lập chỉ mục.
- `url`: domain production đầy đủ, bao gồm `https://`.
- `lang`: ngôn ngữ mặc định của nội dung.

Ví dụ thực tế:

```ts
export default defineConfig({
  title: 'Davipress Demo',
  description: 'Bộ tài liệu mẫu cho Davipress.',
  url: 'https://docs.example.com',
  lang: 'vi',
})
```

## Navbar

Navbar được khai báo trong `themeConfig.nav`:

```ts
themeConfig: {
  nav: [
    { text: 'Trang chủ', link: '/', icon: 'FaHouse' },
    { text: 'Hướng dẫn', link: '/guide', icon: 'FaBook' },
    { text: 'Bài viết', link: '/posts', icon: 'FaPenNib' },
  ],
}
```

`icon` nhận trực tiếp tên icon từ `react-icons`, ví dụ `FaBook`, `FaGithub`, `SiNextdotjs`, `DiNodejsSmall`. Chỉ cần tên đó tồn tại trong package `react-icons` đang cài.

Navbar nhiều cấp dùng `items`:

```ts
themeConfig: {
  nav: [
    {
      text: 'Tài liệu',
      link: '/guide',
      icon: 'FaBook',
      items: [
        { text: 'Bắt đầu', link: '/guide/davipress' },
        { text: 'Cấu hình', link: '/guide/configuration' },
      ],
    },
  ],
}
```

## Sidebar tự động

Với website nhỏ hoặc vừa, dùng:

```ts
themeConfig: {
  sidebar: 'auto',
}
```

Davipress sẽ đọc các file trong `docs/`, sau đó sắp xếp theo `sidebar_position` trong frontmatter.

Ví dụ:

```md
---
title: Cấu hình
sidebar_position: 3
---
```

## Sidebar thủ công

Khi muốn tự kiểm soát nhóm menu:

```ts
themeConfig: {
  sidebar: {
    '/guide': [
      { text: 'Bắt đầu', link: '/guide/davipress', icon: 'FaRocket' },
      { text: 'Cấu hình', link: '/guide/configuration', icon: 'FaGear' },
      {
        text: 'Markdown',
        icon: 'FaMarkdown',
        items: [
          { text: 'Tổng quan', link: '/guide/markdown' },
          { text: 'Cú pháp', link: '/guide/markdown/syntax' },
        ],
      },
    ],
  },
}
```

Một item có thể dùng `items` hoặc `children` để chứa cấp con.

## Cấu hình theme trên navbar

```ts
themeConfig: {
  navbar: {
    showThemeToggle: true,
    showThemeSeparator: true,
  },
}
```

- `showThemeToggle`: hiển thị nút đổi sáng/tối.
- `showThemeSeparator`: hiển thị vạch ngăn trước cụm theme.

## Footer

Footer có thể là chuỗi đơn giản:

```ts
themeConfig: {
  footer: '© 2026 Tài liệu của tôi',
}
```

Hoặc object đầy đủ:

```ts
themeConfig: {
  footer: {
    copyright: '© 2026 Tài liệu của tôi',
    links: [
      {
        type: 'source',
        label: 'GitHub',
        href: 'https://github.com/owner/repository',
        ariaLabel: 'Mở mã nguồn trên GitHub',
        external: true,
      },
      {
        type: 'rss',
        label: 'RSS',
        href: '/rss.xml',
        ariaLabel: 'Mở RSS feed',
      },
    ],
  },
}
```

## Repository và link chỉnh sửa

```ts
repository: {
  url: 'https://github.com/owner/repository',
  editLink: 'https://github.com/owner/repository/edit/main',
}
```

Davipress nối đường dẫn file Markdown vào `editLink`, vì vậy người đọc có thể mở trực tiếp file nguồn trên GitHub.

## GitHub project list

```ts
github: {
  username: 'owner',
  topic: 'featured',
}
```

Nếu dùng layout danh sách project, Davipress có thể lấy repository theo `username` và lọc theo `topic`.

## SEO

```ts
seo: {
  defaultImage: '/images/cover.png',
  twitterCard: 'summary_large_image',
}
```

- `defaultImage`: ảnh mặc định khi chia sẻ trang.
- `twitterCard`: kiểu card khi chia sẻ lên mạng xã hội.

## Giscus

```ts
giscus: {
  enabled: true,
  repo: 'owner/repository',
  repoId: 'repository-id',
  category: 'Announcements',
  categoryId: 'category-id',
  mapping: 'pathname',
  strict: false,
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lightTheme: 'light',
  darkTheme: 'transparent_dark',
  lang: 'vi',
}
```

Repository cần bật Discussions và được cài đặt ứng dụng Giscus. Không dùng URL đầy đủ ở trường `repo`; giá trị phải có dạng `owner/repository`.

## Ví dụ cấu hình đầy đủ

```ts
import { defineConfig } from 'davipress'

export default defineConfig({
  title: 'Tài liệu của tôi',
  description: 'Website tài liệu được xây dựng bằng Davipress.',
  url: 'https://example.com',
  lang: 'vi',
  repository: {
    url: 'https://github.com/owner/repository',
    editLink: 'https://github.com/owner/repository/edit/main',
  },
  themeConfig: {
    nav: [
      { text: 'Trang chủ', link: '/', icon: 'FaHouse' },
      { text: 'Hướng dẫn', link: '/guide', icon: 'FaBook' },
    ],
    sidebar: 'auto',
    navbar: {
      showThemeToggle: true,
      showThemeSeparator: true,
    },
    footer: '© 2026 Tài liệu của tôi',
  },
  seo: {
    defaultImage: '/images/cover.png',
    twitterCard: 'summary_large_image',
  },
})
```

## Kiểm tra cấu hình

Sau khi chỉnh config, chạy:

```bash
npm run build
```

Lỗi URL, type hoặc frontmatter thường được phát hiện trong bước build.
