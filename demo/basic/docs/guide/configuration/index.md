---
title: Cấu hình Davipress
description: Cấu hình site, repository, navbar, sidebar và Giscus.
sidebar_position: 2
---

# Cấu hình Davipress

Mọi thiết lập chính của website nằm trong `davipress.config.ts`. File này được đọc khi chạy dev, build và start.

## Cấu hình tối thiểu

```ts
import { defineConfig } from 'davipress'

export default defineConfig({
  title: 'My Documentation',
  description: 'Tài liệu sản phẩm.',
  url: 'https://example.com',
  lang: 'vi',
  themeConfig: {
    sidebar: 'auto'
  }
})
```

## Site metadata

- `title`: tên mặc định của website.
- `description`: mô tả khi chia sẻ hoặc lập chỉ mục.
- `url`: domain production đầy đủ, bao gồm `https://`.
- `lang`: ngôn ngữ mặc định của nội dung.

## Repository và link chỉnh sửa

```ts
repository: {
  url: 'https://github.com/owner/repository',
  editLink: 'https://github.com/owner/repository/edit/main'
}
```

Davipress nối đường dẫn file Markdown vào `editLink`, vì vậy người đọc có thể mở trực tiếp file nguồn trên GitHub.

## Navbar

```ts
themeConfig: {
  navbar: {
    showThemeToggle: true,
    showThemeSeparator: true
  }
}
```

`showThemeToggle` bật nút chuyển light/dark mode. `showThemeSeparator` hiển thị vạch ngăn cách kiểu macOS trước nút theme.

## Giscus

```ts
giscus: {
  enabled: true,
  repo: 'owner/repository',
  repoId: 'repository-id',
  category: 'Announcements',
  categoryId: 'category-id',
  mapping: 'pathname',
  reactionsEnabled: true,
  theme: 'preferred_color_scheme',
  lang: 'vi'
}
```

Repository cần bật Discussions và được cài đặt ứng dụng Giscus. Không dùng URL đầy đủ ở trường `repo`; giá trị phải có dạng `owner/repository`.

## Kiểm tra cấu hình

Sau khi chỉnh config, chạy:

```bash
npm run build
```

Lỗi URL, type hoặc frontmatter sẽ được phát hiện trong bước build.
