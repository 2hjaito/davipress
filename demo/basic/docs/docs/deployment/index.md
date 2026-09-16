---
title: Build và deploy
description: Build bản production và triển khai website Davipress.
sidebar_position: 6
---

# Build và deploy

Davipress tạo ứng dụng Next.js từ nội dung trong `docs/`. Trước khi đưa website lên môi trường production, hãy kiểm tra build và các URL quan trọng.

## Chạy môi trường phát triển

```bash
npm run dev
```

Môi trường phát triển phù hợp để viết nội dung, kiểm tra bố cục và theo dõi thay đổi frontmatter. Mặc định website chạy ở `http://localhost:3000` nếu cổng này chưa bị chiếm.

## Build bản production

```bash
npm run build
npm run start
```

Build sẽ kiểm tra TypeScript, biên dịch Markdown, tạo các route cần thiết và sinh `rss.xml` cùng `robots.txt`.

Nên chạy build trước khi deploy để phát hiện sớm:

- lỗi frontmatter YAML
- route bị trùng
- config sai type
- asset hoặc link nội bộ sai
- lỗi TypeScript trong config

## Dọn output tạm

Khi cần build lại từ đầu:

```bash
npm run clean
npm run build
```

Lệnh `clean` xóa output tạm do Davipress tạo ra.

## Deploy trên Vercel

1. Push project lên GitHub.
2. Import repository vào Vercel.
3. Chọn framework Next.js nếu Vercel hỏi.
4. Đặt lệnh build là `npm run build`.
5. Đặt lệnh cài dependency là `npm install` nếu cần.
6. Khai báo URL production trong `davipress.config.ts`.

Vercel thường tự nhận diện output Next.js nên không cần commit thư mục `.davipress/`.

Ví dụ config cho production:

```ts
export default defineConfig({
  title: 'Tài liệu của tôi',
  url: 'https://docs.example.com',
})
```

## Deploy trên server Node.js

Nếu deploy lên VPS hoặc server riêng:

```bash
npm install
npm run build
npm run start
```

Cần đảm bảo server dùng Node.js 20.9 trở lên. Với môi trường production thực tế, nên chạy sau reverse proxy như Nginx hoặc dịch vụ tương đương.

## RSS và robots

Davipress tự tạo:

- `/rss.xml`: feed cho nội dung bài viết
- `/robots.txt`: file robots dựa trên `url` trong config

Sau khi deploy, mở trực tiếp hai đường dẫn này để kiểm tra.

## Kiểm tra sau deploy

- Mở trang chủ và các route nested.
- Kiểm tra link sidebar và navbar.
- Mở `/rss.xml` và `/robots.txt`.
- Thử nút chỉnh sửa trên GitHub.
- Kiểm tra Giscus ở cả chế độ sáng và tối.
- Mở website trên màn hình mobile.
- Kiểm tra ảnh trong `public/images/` có hiển thị đúng.

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
  editLink: 'https://github.com/owner/repository/edit/main',
}
```

### Trang không xuất hiện trong sidebar

Kiểm tra `sidebar_position`, route trong sidebar thủ công và tên file `index.md`.

### Ảnh không hiển thị

Nếu ảnh nằm tại:

```text
public/images/banner.png
```

thì Markdown phải dùng:

```md
![Banner](/images/banner.png)
```

Không dùng `public/images/banner.png` hoặc `../public/images/banner.png`.

### Giscus không hiện

Kiểm tra lần lượt:

- repository đã bật GitHub Discussions
- đã cài Giscus app cho repository
- `repo` đúng dạng `owner/repository`
- `repoId` và `categoryId` đúng
- trang hiện tại không đặt `comments: false`

## Bảo mật

Không đặt token, mật khẩu hoặc key riêng tư trong config và Markdown. Dùng biến môi trường của nền tảng deploy cho dữ liệu nhạy cảm.

## Checklist production

- [ ] chạy `npm run build` thành công
- [ ] `url` là domain production thật
- [ ] navbar và sidebar trỏ đúng route
- [ ] ảnh trong `public/` hiển thị đúng
- [ ] `/rss.xml` mở được
- [ ] `/robots.txt` mở được
- [ ] Giscus hoạt động nếu được bật
