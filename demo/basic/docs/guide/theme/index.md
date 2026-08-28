---
title: Theme và giao diện
description: Tìm hiểu theme mặc định, responsive layout và navbar.
sidebar_position: 4
---

# Theme và giao diện

Davipress cung cấp theme mặc định cho documentation site với light mode, dark mode, navbar nổi, sidebar, table of contents và các trạng thái responsive.

## Light và dark mode

Người dùng có thể đổi theme bằng nút mặt trời hoặc mặt trăng trên navbar. Trạng thái được lưu trong `localStorage` để lần truy cập sau giữ nguyên lựa chọn.

```ts
themeConfig: {
  navbar: {
    showThemeToggle: true,
    showThemeSeparator: true
  }
}
```

## Navbar

Các mục điều hướng được khai báo trong `themeConfig.nav`:

```ts
nav: [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide' },
  { text: 'Tutorials', link: '/tutorials' }
]
```

Một mục có thể chứa `items` hoặc `children` để tạo menu nhiều cấp.

## Sidebar

Sidebar tự động phù hợp với project nhỏ. Với tài liệu lớn, bạn có thể chia nội dung theo prefix route và sắp xếp bằng `sidebar_position`.

## Responsive

Trên màn hình nhỏ:

- Sidebar chuyển thành menu mở rộng.
- Bảng và GitHub contributions có thể cuộn ngang.
- Navigation trước/sau giữ hai cột và cắt tiêu đề dài hợp lý.
- Nội dung Markdown dùng font nhỏ hơn để dễ đọc trên điện thoại.

## Hình ảnh và zoom

Hình ảnh trong `.markdown-body` được gắn cursor zoom. Khi click, ảnh mở từ vị trí ban đầu rồi chuyển đến vùng trung tâm màn hình. Click nền tối hoặc nhấn `Escape` để đóng.

## Tùy biến an toàn

Không chỉnh sửa trực tiếp `.davipress/` vì thư mục này được generate lại. Hãy thay đổi `davipress.config.ts`, Markdown và các file CSS của project.
