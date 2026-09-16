---
description: Tổng quan các phần hướng dẫn theo từng chủ đề.
sidebar_position: 1
---

<div class="guide-home">
  <div class="guide-home-hero">
    <div class="guide-home-hero__copy">
      <h1 id="davipress-guide" class="guide-home-hero__title">
        <span class="name">Davipress</span>
        <span class="text guide-home-hero__highlight">Docs &amp; Guide</span>
      </h1>
      <p class="guide-home-hero__subtitle">Biến Markdown thành tài liệu đẹp chỉ trong vài phút</p>
      <div class="guide-home-hero__actions">
        <a class="guide-home-hero__button is-primary" href="#davipress-la-gi">Davipress là gì?</a>
        <a class="guide-home-hero__button" href="#bat-dau-nhanh">Bắt đầu nhanh</a>
        <a class="guide-home-hero__button" href="https://github.com/2hjaito/davipress" target="_blank" rel="noreferrer">Mã nguồn GitHub</a>
      </div>
    </div>
    <div class="guide-home-hero__art" aria-hidden="true">
      <div class="guide-home-device">
        <div class="guide-home-device__glow guide-home-device__glow--one"></div>
        <div class="guide-home-device__glow guide-home-device__glow--two"></div>
        <div class="guide-home-logo-wrap">
          <img class="guide-home-logo-svg" src="/davipress.svg" alt="Davipress logo" />
        </div>
      </div>
    </div>
  </div>
</div>

## Davipress là gì?

**Davipress** là công cụ tạo trang tài liệu (documentation site generator) từ file Markdown. Bạn chỉ cần viết nội dung dưới dạng `.md` với frontmatter đơn giản, Davipress sẽ tự động dựng thành một website tài liệu hoàn chỉnh — có navbar, sidebar điều hướng theo cấu trúc thư mục, chế độ sáng/tối, tìm kiếm, bình luận ([Giscus](https://giscus.app/)) và tối ưu SEO sẵn.

Mục tiêu của Davipress là giúp việc viết và xuất bản tài liệu nhanh và gọn nhẹ nhất có thể: không cần cấu hình phức tạp, không cần biết thiết kế — chỉ cần một file `davipress.config.ts` để khai báo tên site, navbar, sidebar, icon, footer, repository và các thông tin SEO cơ bản, phần còn lại Davipress lo.

Một số điểm nổi bật:

- **Viết bằng Markdown thuần**: hỗ trợ heading, link, ảnh, alert (chú thích/cảnh báo), code block có highlight cú pháp, bảng, task list và cả công thức toán học.
- **Cấu trúc thư mục trực quan**: sidebar được sinh tự động dựa theo cách bạn tổ chức thư mục `docs/`, không cần khai báo thủ công từng trang.
- **Giao diện tuỳ biến được**: đổi theme sáng/tối, chỉnh navbar/sidebar, bố cục responsive cho mọi kích thước màn hình, hỗ trợ phóng to ảnh, và có thể tuỳ biến CSS an toàn như trang bạn đang xem.
- **Build & deploy đơn giản**: chạy máy chủ phát triển để xem trước, build ra bản tĩnh cho production, và deploy lên [Vercel](https://vercel.com/) chỉ với vài lệnh.

Nói ngắn gọn: nếu bạn có sẵn nội dung Markdown và muốn biến nó thành một trang tài liệu đẹp, có tổ chức, trong vài phút — đó chính là việc Davipress sinh ra để làm.

## Bắt đầu nhanh

Các bước cơ bản để dựng một site tài liệu với Davipress:

1. **Cài đặt package**

   ```bash
   npm install davipress
   # hoặc
   pnpm add davipress
   # hoặc
   yarn add davipress
   ```

2. **Khởi tạo dự án**

   Chạy lệnh khởi tạo để Davipress tự sinh cấu trúc thư mục mẫu:

   ```bash
   npx davipress init my-docs
   cd my-docs
   ```

3. **Hiểu cấu trúc thư mục**

   Sau khi khởi tạo, dự án của bạn sẽ có dạng:

   ```text
   my-docs/
     docs/
       index.md
       guide/
         index.md
       posts/
     public/
       images/
     davipress.config.ts
     package.json
   ```

   - `docs/` chứa toàn bộ nội dung Markdown, mỗi thư mục con tương ứng với một mục trong sidebar.
   - `public/` chứa ảnh và tài nguyên tĩnh khác.
   - `davipress.config.ts` là nơi cấu hình navbar, sidebar, icon, footer, repository, SEO và Giscus.

4. **Viết trang đầu tiên**

   Mở `docs/index.md`, thêm frontmatter cơ bản và bắt đầu viết nội dung bằng Markdown:

   ```markdown
   ---
   title: Trang đầu tiên
   description: Mô tả ngắn cho trang này
   ---

   Nội dung trang của bạn ở đây...
   ```

5. **Chạy máy chủ phát triển**

   ```bash
   npm run dev
   ```

   Mở trình duyệt để xem trước site, mọi thay đổi trong `docs/` sẽ được cập nhật tức thì.

6. **Build và deploy**

   Khi đã sẵn sàng xuất bản:

   ```bash
   npm run build
   ```

   Sau đó deploy thư mục build lên [Vercel](https://vercel.com/) (hoặc bất kỳ nền tảng hosting tĩnh nào bạn chọn). Nếu gặp lỗi trong lúc build, hãy kiểm tra lại đường dẫn ảnh trong `public/` và cú pháp frontmatter trong các file `.md`.

Sau khi hoàn tất các bước trên, bạn đã có một site tài liệu chạy được — phần tiếp theo bên dưới sẽ đi sâu vào từng mảng: cấu hình, viết Markdown nâng cao, tuỳ chỉnh theme và quy trình deploy chi tiết.

3. [Viết nội dung Markdown](./markdown/)
4. [Tùy chỉnh theme và giao diện](./theme/)
5. [Build và deploy](./deployment/)

## Các phần hướng dẫn

### [Bắt đầu với Davipress](./davipress/)
Cài package, chạy lệnh khởi tạo, hiểu cấu trúc thư mục và tạo page đầu tiên.

### [Cấu hình website](./configuration/)
Thiết lập `davipress.config.ts`, navbar, sidebar, icon, footer, repository, SEO và Giscus.

### [Viết nội dung Markdown](./markdown/)
Sử dụng frontmatter, heading, link, ảnh, alert, code block, bảng, task list và công thức toán.

### [Theme và giao diện](./theme/)
Cấu hình chế độ sáng/tối, navbar, sidebar, bố cục responsive, ảnh phóng to và cách tùy biến CSS an toàn.

### [Build và deploy](./deployment/)
Chạy máy chủ phát triển, build bản production, deploy lên Vercel và kiểm tra lỗi thường gặp.

### [Tích hợp Live2D (next-live2d)](./live2d/)
Gắn mascot Live2D ngẫu nhiên lên site bằng thư viện next-live2d, kèm link tài liệu để tìm hiểu sâu hơn.

## Cấu trúc ví dụ

```text
my-docs/
	docs/
		index.md
		guide/
			index.md
		posts/
	public/
		images/
	davipress.config.ts
	package.json
```

Mỗi phần hướng dẫn sẽ giải thích chi tiết một nhóm file trong cấu trúc trên.