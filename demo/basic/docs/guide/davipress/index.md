---
title: Bắt đầu với Davipress
description: Cài đặt Davipress, khởi tạo project và tạo trang đầu tiên.
sidebar_position: 2
---

# Bắt đầu với Davipress

Phần này hướng dẫn từ lúc tạo project mới đến khi chạy được website đầu tiên trên máy local.

## Yêu cầu môi trường

Bạn cần có:

- Node.js 20.9 trở lên
- npm đi kèm Node.js
- một editor như VS Code

Kiểm tra phiên bản:

```bash
node -v
npm -v
```

## Tạo project mới

Tạo thư mục, khởi tạo `package.json`, cài Davipress và chạy lệnh tạo cấu trúc ban đầu:

```bash
mkdir my-docs
cd my-docs
npm init -y
npm install davipress
npx davipress init
```

Sau khi init, project sẽ có các file chính:

```text
my-docs/
  docs/
    index.md
  public/
  davipress.config.ts
  package.json
```

## Thêm scripts

Nếu `package.json` chưa có scripts, thêm vào:

```json
{
  "scripts": {
    "dev": "davipress dev",
    "build": "davipress build",
    "start": "davipress start",
    "clean": "davipress clean"
  }
}
```

Ý nghĩa từng lệnh:

- `npm run dev`: chạy môi trường viết nội dung
- `npm run build`: build bản production
- `npm run start`: chạy bản production sau khi build xong
- `npm run clean`: xóa output tạm của Davipress

## Chạy website local

```bash
npm run dev
```

Mở `http://localhost:3000` để xem website. Khi sửa file trong `docs/`, trang sẽ tự cập nhật trong máy chủ phát triển.

## Tạo trang đầu tiên

Tạo file `docs/about.md`:

```md
---
title: Giới thiệu
description: Giới thiệu về website.
---

# Giới thiệu

Đây là trang giới thiệu đầu tiên của tôi.
```

Route tương ứng là `/about`.

Quy tắc route cơ bản:

```text
docs/index.md                 -> /
docs/about.md                 -> /about
docs/guide/index.md           -> /guide
docs/guide/getting-started.md -> /guide/getting-started
```

## Tạo thư mục nội dung

Bạn nên nhóm nội dung theo chủ đề:

```text
docs/
  index.md
  guide/
    index.md
    installation.md
  posts/
    first-post.md
  tutorials/
    nextjs.md
```

Mỗi thư mục có thể có `index.md` làm trang chính của route đó.

## Lưu ảnh và file tĩnh

File tĩnh nằm trong `public/`:

```text
public/
  images/
    banner.png
    avatar.jpg
  icons/
    logo.svg
```

Trong Markdown, dùng đường dẫn bắt đầu từ `/`:

```md
![Banner](/images/banner.png)
```

Không viết `../public/images/banner.png`, vì `public/` đã là thư mục gốc của asset khi chạy web.

## Checklist sau khi tạo project

- [ ] cài được `davipress`
- [ ] chạy được `npm run dev`
- [ ] có file `docs/index.md`
- [ ] tạo thử được route `/about`
- [ ] ảnh trong `public/images/` hiển thị được
- [ ] chạy được `npm run build`