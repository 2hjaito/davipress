---
title: Hướng dẫn Davipress
description: Tổng quan các phần hướng dẫn theo từng chủ đề.
sidebar_position: 1
---

# Hướng dẫn Davipress

Davipress là framework dựng website tài liệu bằng Markdown. Trang này chỉ là mục lục tổng quan; phần hướng dẫn chi tiết nằm trong từng thư mục bên dưới để dễ đọc và dễ tra cứu.

## Lộ trình học nhanh

Nếu bạn mới bắt đầu, hãy đi theo thứ tự này:

1. [Bắt đầu với Davipress](./davipress/)
2. [Cấu hình website](./configuration/)
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
Cấu hình light/dark mode, navbar, sidebar, responsive layout, ảnh zoom và cách tùy biến CSS an toàn.

### [Build và deploy](./deployment/)
Chạy development server, build production, deploy lên Vercel và kiểm tra lỗi thường gặp.

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
