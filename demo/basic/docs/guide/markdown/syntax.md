---
title: Cú pháp Markdown
description: Bảng cú pháp Markdown được hỗ trợ trong Davipress.
sidebar_position: 1
---

# Cú pháp Markdown

Davipress hỗ trợ Markdown, MDX, Markdown kiểu GitHub, tô màu cú pháp, công thức toán, anchor cho heading, bảng, task list và alert.

## Heading và đoạn văn

Dùng các ký tự `#` để tạo heading. Nên giữ thứ tự heading từ `h1` đến `h2`, `h3` để tài liệu dễ đọc và hỗ trợ khả năng truy cập.

```md
# Tiêu đề trang

## Tiêu đề phần

### Tiêu đề mục nhỏ

Đây là một đoạn văn có **chữ đậm**, *chữ nghiêng* và `inline code`.
```

Không nên có nhiều hơn một `# Tiêu đề trang` trong cùng một file.

## Link và hình ảnh

```md
[Trang chủ Davipress](https://github.com/2hjaito/davipress)

![Ảnh minh hoạ](/images/example.png)
```

File hình ảnh cần nằm trong thư mục `public/`. Đường dẫn trong Markdown bắt đầu từ `/`, tương ứng với thư mục `public/`.

Hình ảnh trong nội dung có thể click để mở chế độ phóng to. Nhấn vào nền tối hoặc phím `Escape` để đóng ảnh.

## Alert

Alert dùng blockquote với marker ở dòng đầu tiên:

```md
> [!INFO]
> Đây là thông tin cần biết.

> [!TIP]
> Đây là một mẹo hữu ích.

> [!WARNING]
> Hãy kiểm tra cấu hình trước khi build production.
```

Davipress hỗ trợ `INFO`, `NOTE`, `TIP`, `IMPORTANT`, `WARNING` và `CAUTION`.

> [!INFO]
> Alert có thể chứa **Markdown**, link và `inline code`.

> [!NOTE]
> Dùng NOTE để bổ sung ngữ cảnh mà không làm gián đoạn nội dung chính.

> [!TIP]
> Chạy `npm run dev` để xem thay đổi ngay khi đang viết tài liệu.

> [!IMPORTANT]
> Luôn kiểm tra frontmatter trước khi xuất bản một trang mới.

> [!WARNING]
> Không commit token hoặc thông tin bí mật vào repository.

> [!CAUTION]
> Không chỉnh sửa trực tiếp thư mục `.davipress/` vì đây là output được generate.

## Danh sách

```md
- Mục thứ nhất
- Mục thứ hai
	- Mục con

1. Bước đầu tiên
2. Bước thứ hai

- [x] Công việc đã hoàn thành
- [ ] Công việc chưa hoàn thành
```

## Code block

Thêm tên ngôn ngữ sau dấu mở fence để bật tô màu cú pháp:

```ts
export function greet(name: string) {
	return `Xin chào, ${name}`
}
```

```bash
npm install davipress
npm run dev
```

Code block dài có thể cuộn ngang trên màn hình nhỏ. Nút copy được hiển thị ở góc của code block.

## Bảng

```md
| Tính năng | Trạng thái | Ghi chú |
| --- | --- | --- |
| Markdown | Hỗ trợ | CommonMark |
| Alerts | Hỗ trợ | GitHub-style |
| Math | Hỗ trợ | KaTeX |
```

## Blockquote

Blockquote thông thường không có marker alert:

```md
> Đây là một trích dẫn thông thường.
```

## Công thức toán

Công thức inline dùng một cặp `$`: `$E = mc^2$`.

```md
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$
```

Kết quả hiển thị:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## Frontmatter

Frontmatter nằm ở đầu file và dùng YAML:

```md
---
title: Tên trang
description: Mô tả trang.
date: 2026-08-28
updated: 2026-08-28
sidebar_position: 2
sidebar_label: Tên trong sidebar
comments: true
draft: false
---
```

Các trường thường dùng là `title`, `description`, `date`, `updated`, `sidebar_position`, `sidebar_label`, `image`, `keywords`, `comments` và `draft`.

## Layout trong frontmatter

Một số trang có thể dùng layout riêng:

```md
---
title: Bài viết
description: Danh sách bài viết.
layout: post-list
---
```

Các layout thường dùng:

- `post-list`: danh sách bài viết
- `project-list`: danh sách project

Nếu không khai báo `layout`, Davipress sẽ render như trang tài liệu thông thường.

## Quy tắc viết tốt

- Mỗi trang nên có `title` và `description` rõ ràng.
- Dùng heading theo thứ tự, không nhảy trực tiếp từ `h2` sang `h4`.
- Dùng alert cho thông tin thật sự cần nhấn mạnh.
- Đặt asset trong `public/` và kiểm tra link trước khi deploy.
- Chạy `npm run build` để phát hiện lỗi trước khi xuất bản.
