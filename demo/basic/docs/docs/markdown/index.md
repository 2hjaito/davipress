---
title: Markdown nâng cao
description: Các tính năng Markdown nâng cao trong Davipress.
sidebar_position: 4
---

# Markdown nâng cao

Davipress hỗ trợ Markdown và MDX, phù hợp cho tài liệu kỹ thuật, blog, tutorial và portfolio. Trang này là phần tổng quan; nếu cần bảng cú pháp đầy đủ, xem thêm [Cú pháp Markdown](./syntax/).

## Một file Markdown chuẩn

```md
---
title: Tên trang
description: Mô tả ngắn của trang.
sidebar_position: 1
---

# Tên trang

Nội dung chính bắt đầu ở đây.
```

Phần giữa hai dòng `---` là frontmatter. Phần bên dưới là nội dung hiển thị.

## Frontmatter thường dùng

```md
---
title: Bài viết đầu tiên
description: Một bài viết mẫu trong Davipress.
date: 2026-08-29
updated: 2026-08-29
sidebar_position: 2
sidebar_label: Bài viết mẫu
image: /images/posts/cover.png
keywords:
  - davipress
  - markdown
comments: true
draft: false
---
```

- `title`: tiêu đề trang.
- `description`: mô tả SEO.
- `sidebar_position`: thứ tự trong sidebar.
- `sidebar_label`: nhãn rút gọn trong sidebar.
- `image`: ảnh đại diện khi chia sẻ.
- `keywords`: từ khóa SEO.
- `comments`: bật hoặc tắt bình luận cho trang.
- `draft`: đánh dấu nội dung chưa xuất bản.

## Heading và link

```md
## Tiêu đề phần

### Tiêu đề nhỏ

[Liên kết nội bộ](../configuration/)
```

Heading sẽ được tạo id tự động để người đọc có thể liên kết trực tiếp đến từng phần.

## Link nội bộ

Với cấu trúc:

```text
docs/
  guide/
    markdown/
      index.md
    configuration/
      index.md
```

Từ trang Markdown, bạn có thể link tới trang cấu hình như:

```md
[Xem cấu hình](../configuration/)
```

Nếu link tới asset trong `public/`, hãy bắt đầu bằng `/`:

```md
[Tải file mẫu](/files/example.pdf)
```

## Alert

```md
> [!INFO]
> Một thông tin quan trọng.

> [!TIP]
> Một mẹo hữu ích.

> [!WARNING]
> Một cảnh báo cần chú ý.
```

Các loại được hỗ trợ là `INFO`, `NOTE`, `TIP`, `IMPORTANT`, `WARNING` và `CAUTION`.

Ví dụ hiển thị:

> [!INFO]
> Đây là một thông tin ngắn.

> [!TIP]
> Dùng alert cho nội dung thật sự cần nhấn mạnh.

> [!WARNING]
> Không đưa token hoặc mật khẩu vào Markdown.

## Code

```ts
const site = {
  title: 'Tài liệu của tôi',
  language: 'vi',
}
```

Thêm tên ngôn ngữ sau dấu mở code fence để bật tô màu cú pháp:

````md
```ts
export function hello(name: string) {
  return `Xin chào ${name}`
}
```
````

## Hình ảnh

```md
![Ảnh minh hoạ](/images/example.png)
```

File phải nằm trong thư mục `public/`. Hình ảnh trong nội dung có thể click để phóng to.

Ví dụ lưu ảnh:

```text
public/
  images/
    docs/
      setup.png
```

Trong Markdown:

```md
![Màn hình cài đặt](/images/docs/setup.png)
```

## Bảng

```md
| Tên | Trạng thái |
| --- | --- |
| Markdown | Hoạt động |
| MDX | Hoạt động |
```

Giữ bảng ngắn để dễ đọc trên điện thoại. Nếu bảng quá rộng, Davipress sẽ cho phép cuộn ngang.

## Task list

```md
- [x] Tạo project
- [x] Viết trang đầu tiên
- [ ] Chạy build bản production
```

## Công thức

Inline math: `$a^2 + b^2 = c^2$`.

```md
$$
E = mc^2
$$
```

Khi viết công thức nhiều dòng, dùng `$$` ở đầu và cuối block.

## Gợi ý tổ chức nội dung

Một bộ tài liệu dễ đọc thường có cấu trúc:

```text
docs/
  index.md
  guide/
    index.md
    installation.md
    configuration.md
  tutorials/
    index.md
    first-project.md
  posts/
    2026-08-29-release.md
```

Nên giữ mỗi page tập trung vào một chủ đề. Nếu một page quá dài, tách thành thư mục con giống phần guide này.

## Lưu ý

Giữ nội dung Markdown rõ ràng, dùng heading theo thứ tự và tránh chèn HTML phức tạp nếu không thật sự cần thiết.
