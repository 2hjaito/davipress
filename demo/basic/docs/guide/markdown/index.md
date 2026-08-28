---
title: Markdown nâng cao
description: Các tính năng Markdown nâng cao trong Davipress.
sidebar_position: 3
---

# Markdown nâng cao

Davipress hỗ trợ Markdown và MDX, phù hợp cho tài liệu kỹ thuật, blog và portfolio.

## Heading và link

```md
## Tiêu đề phần

### Tiêu đề nhỏ

[Liên kết nội bộ](../configuration/)
```

Heading sẽ được tạo id tự động để có thể liên kết trực tiếp đến từng phần.

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

## Code

```ts
const site = {
  title: 'My docs',
  language: 'vi'
}
```

Thêm tên ngôn ngữ sau dấu mở code fence để bật syntax highlighting.

## Hình ảnh

```md
![Ảnh minh hoạ](/images/example.png)
```

File phải nằm trong thư mục `public/`. Hình ảnh trong nội dung có thể click để phóng to.

## Bảng

```md
| Tên | Trạng thái |
| --- | --- |
| Markdown | Hoạt động |
| MDX | Hoạt động |
```

## Công thức

Inline math: `$a^2 + b^2 = c^2$`.

```md
$$
E = mc^2
$$
```

## Lưu ý

Giữ nội dung Markdown rõ ràng, dùng heading theo thứ tự và tránh chèn HTML phức tạp nếu không thật sự cần thiết.
