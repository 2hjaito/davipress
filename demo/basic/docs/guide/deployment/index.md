---
title: Build và deploy
description: Chạy production build và triển khai website Davipress.
sidebar_position: 5
---

# Build và deploy

Davipress tạo ứng dụng Next.js từ nội dung trong `docs/`. Trước khi đưa website lên production, hãy kiểm tra build và các URL quan trọng.

## Development

```bash
npm run dev
```

Development server phù hợp để viết nội dung, kiểm tra layout và theo dõi thay đổi frontmatter.

## Production build

```bash
npm run build
npm run start
```

Build sẽ kiểm tra TypeScript, compile Markdown, tạo static pages và generate các route `rss.xml` cùng `robots.txt`.

## Deploy trên Vercel

1. Push project lên GitHub.
2. Import repository vào Vercel.
3. Chọn framework Next.js nếu Vercel hỏi.
4. Đặt build command là `npm run build`.
5. Khai báo production URL trong `davipress.config.ts`.

Vercel thường tự nhận diện output Next.js nên không cần commit thư mục `.davipress/`.

## Kiểm tra sau deploy

- Mở trang chủ và các route nested.
- Kiểm tra link sidebar và navbar.
- Mở `/rss.xml` và `/robots.txt`.
- Thử nút chỉnh sửa trên GitHub.
- Kiểm tra Giscus ở cả light mode và dark mode.
- Mở website trên màn hình mobile.

## Lỗi thường gặp

### URL không hợp lệ

`url` phải là URL đầy đủ:

```ts
url: 'https://example.com'
```

Không dùng chỉ `example.com` vì metadata cần một URL tuyệt đối.

### Không thấy nút chỉnh sửa

Kiểm tra `repository.editLink` có tồn tại và trỏ đến branch đúng:

```ts
repository: {
  url: 'https://github.com/owner/repository',
  editLink: 'https://github.com/owner/repository/edit/main'
}
```

### Trang không xuất hiện trong sidebar

Kiểm tra `sidebar_position`, route trong sidebar thủ công và tên file `index.md`.

## Bảo mật

Không đặt token, mật khẩu hoặc key riêng tư trong config và Markdown. Dùng environment variables của nền tảng deploy cho dữ liệu nhạy cảm.
