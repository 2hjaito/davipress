---
title: Theme và giao diện
description: Tìm hiểu theme mặc định, responsive layout và navbar.
sidebar_position: 5
---

# Theme và giao diện

Davipress cung cấp theme mặc định cho website tài liệu với chế độ sáng/tối, navbar, sidebar, mục lục trong trang, ảnh zoom và responsive layout.

## Chế độ sáng và tối

Người dùng có thể đổi giao diện bằng nút theme trên navbar. Trạng thái được lưu trong `localStorage` để lần truy cập sau giữ nguyên lựa chọn.

```ts
themeConfig: {
  navbar: {
    showThemeToggle: true,
    showThemeSeparator: true,
  },
}
```

Nếu không muốn hiện nút đổi theme:

```ts
themeConfig: {
  navbar: {
    showThemeToggle: false,
  },
}
```

## Navbar

Các mục điều hướng được khai báo trong `themeConfig.nav`:

```ts
nav: [
  { text: 'Trang chủ', link: '/', icon: 'FaHouse' },
  { text: 'Hướng dẫn', link: '/guide', icon: 'FaBook' },
  { text: 'Tutorial', link: '/tutorials', icon: 'FaGraduationCap' },
]
```

Một mục có thể chứa `items` hoặc `children` để tạo menu nhiều cấp:

```ts
nav: [
  {
    text: 'Nội dung',
    link: '/guide',
    icon: 'FaLayerGroup',
    items: [
      { text: 'Cài đặt', link: '/guide/davipress' },
      { text: 'Cấu hình', link: '/guide/configuration' },
    ],
  },
]
```

Icon dùng tên export từ `react-icons`. Ví dụ `FaBook`, `FaGithub`, `SiNextdotjs`, `DiReact`.

## Sidebar

Sidebar tự động phù hợp với project nhỏ:

```ts
themeConfig: {
  sidebar: 'auto',
}
```

Với tài liệu lớn, bạn có thể khai báo thủ công theo prefix route:

```ts
themeConfig: {
  sidebar: {
    '/guide': [
      { text: 'Bắt đầu', link: '/guide/davipress', icon: 'FaRocket' },
      { text: 'Cấu hình', link: '/guide/configuration', icon: 'FaGear' },
    ],
  },
}
```

Trong Markdown, dùng `sidebar_position` để sắp xếp thứ tự khi sidebar tự động.

## Mục lục trong trang

Davipress tạo mục lục từ các heading trong nội dung. Vì vậy hãy viết heading theo thứ tự:

```md
# Tiêu đề trang

## Phần lớn

### Phần nhỏ
```

Không nên nhảy từ `##` xuống `####`, vì mục lục sẽ khó đọc.

## Responsive

Trên màn hình nhỏ:

- Sidebar chuyển thành menu mở rộng.
- Bảng và block code có thể cuộn ngang.
- Điều hướng trước/sau cắt tiêu đề dài hợp lý.
- Nội dung Markdown dùng font nhỏ hơn để dễ đọc trên điện thoại.

Khi viết nội dung, nên tránh bảng quá nhiều cột và heading quá dài.

## Hình ảnh và phóng to

Hình ảnh trong nội dung có thể click để phóng to. Khi mở, ảnh giữ tỉ lệ gốc và hiển thị trong vùng nhìn trung tâm. Click nền tối hoặc nhấn `Escape` để đóng.

```md
![Giao diện dashboard](/images/dashboard.png)
```

Với ảnh cần hiển thị đủ, nên dùng ảnh có tỷ lệ phù hợp với nơi đặt. Với ảnh card vuông, Davipress giữ khung vuông và crop theo tỉ lệ để không làm méo ảnh.

## Tùy biến CSS

Nếu project có file CSS riêng, import vào entry phù hợp của app hoặc cấu hình theo template của Davipress. Nên ưu tiên CSS variable để dễ đổi theme:

```css
:root {
  --brand-color: #2563eb;
}

[data-theme='dark'] {
  --brand-color: #60a5fa;
}
```

Không nên sửa trực tiếp CSS trong `.davipress/` vì thư mục này sẽ được tạo lại.

## Tùy biến an toàn

Hãy tùy biến qua:

- `davipress.config.ts`
- file Markdown trong `docs/`
- asset trong `public/`
- CSS riêng của project

Không chỉnh sửa trực tiếp `.davipress/` vì đây là output được generate.
