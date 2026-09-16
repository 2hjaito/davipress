---
title: Tạo trang
description: Tạo và xuất bản trang Markdown trong Davipress.
sidebar_position: 1
---

# Tạo trang

Davipress biến các file trong `docs/` thành page. Bạn không cần khai báo từng page trong router.

## 1. Tạo file Markdown

Tạo file `docs/about.md`:

```md
---
title: Giới thiệu
description: Một trang giới thiệu ngắn.
---

# Giới thiệu

Viết nội dung trang ở đây.
```

Page này sẽ có route `/about`.

## 2. Tạo page lồng trong thư mục

Thư mục sẽ trở thành một phần của URL. Ví dụ:

```text
docs/
  guide/
    index.md
    creating-pages.md
  about.md
```

Các file trên tương ứng với `/guide`, `/guide/creating-pages` và `/about`.

File `index.md` đại diện cho route của thư mục. Nếu muốn đổi route khác tên file, dùng `slug` trong frontmatter.

```md
---
title: Trang tùy chỉnh
slug: custom-page
---
```

Route khi đó sẽ là `/custom-page`.

## 3. Thêm ảnh và file tĩnh

Đặt asset trong `public/`:

```text
public/
  images/
    profile.png
```

Dùng đường dẫn public tuyệt đối trong Markdown:

```md
![Ảnh đại diện](/images/profile.png)
```

Quy tắc này cũng áp dụng cho file tải xuống, icon và các file tĩnh khác.

## 4. Cấu hình metadata cho page

Frontmatter điều khiển metadata và thứ tự điều hướng:

```md
---
title: Ghi chú dự án
description: Ghi chú ngắn về một dự án.
date: 2026-08-29
updated: 2026-08-29
sidebar_position: 2
sidebar_label: Ghi chú
comments: true
---
```

Các field thường dùng gồm `title`, `description`, `date`, `updated`, `sidebar_position`, `sidebar_label`, `image`, `keywords`, `layout`, `draft` và `comments`.

Dùng `draft: true` để đánh dấu page chưa sẵn sàng xuất bản.

## 5. Thêm page vào sidebar

Với `sidebar: 'auto'`, Davipress tự tìm page và sắp xếp theo `sidebar_position`.

Với sidebar thủ công, thêm route vào `davipress.config.ts`:

```ts
export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide': [
        { text: 'Hướng dẫn', link: '/guide' },
        { text: 'Tạo trang', link: '/guide/davipress/creating-pages' },
      ],
    },
  },
})
```

## 6. Xem trước và build

```bash
npm run dev
npm run build
npm run start
```

Máy chủ phát triển hiển thị thay đổi tại `http://localhost:3000`. Khi build, Davipress cũng chuẩn bị `/rss.xml` và `/robots.txt` theo URL đã cấu hình.

## Checklist tạo page

- Tạo file `.md` hoặc `.mdx` trong `docs/`.
- Thêm frontmatter nếu page cần metadata hoặc thứ tự sidebar.
- Đặt ảnh và file tải xuống trong `public/`.
- Dùng đường dẫn tuyệt đối như `/images/example.png`.
- Chạy `npm run dev` để xem trước và `npm run build` trước khi deploy.
