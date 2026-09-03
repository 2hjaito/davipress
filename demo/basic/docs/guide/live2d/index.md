---
title: Tích hợp Live2D (next-live2d)
description: Gắn mascot Live2D ngẫu nhiên lên site Davipress bằng thư viện next-live2d.
sidebar_position: 7
---

# Tích hợp Live2D (next-live2d)

[next-live2d](https://next-live2d.vercel.app/docs) là thư viện React/Next.js giúp nhúng mascot Live2D (kiểu widget hay thấy ở các blog Nhật) vào website bằng một component duy nhất, chạy cách ly trong `iframe` nên không đụng chạm tới DOM của trang.

Đây không phải tính năng lõi của Davipress — bạn có thể dùng thư viện này (hoặc bất kỳ thư viện React nào khác) trong site của mình theo cách dưới đây. Ai muốn tìm hiểu sâu hơn về props, danh sách model dựng sẵn hoặc cách tự host model riêng thì xem trực tiếp [tài liệu next-live2d](https://next-live2d.vercel.app/docs).

## Cài đặt

```bash
npm install next-live2d
```

## Tạo component hiển thị mascot

Tạo file component ở gốc site (ví dụ `widgets.tsx` hoặc `Live2DWidgets.tsx`), đánh dấu `'use client'` vì `Live2DWidget` là client component:

```tsx
'use client'
import { useState } from 'react'
import { Live2DWidget } from 'next-live2d'

// Chỉ chọn random trong danh sách này, không dùng toàn bộ BUILT_IN_MODELS.
const MODEL_POOL = ['rem_2', 'hibiki', 'HK416-1-normal', 'HK416-2-destroy', 'Kar98k-normal', 'kp31']

function pickRandomModel() {
  return MODEL_POOL[Math.floor(Math.random() * MODEL_POOL.length)]!
}

export default function Live2DWidgets() {
  // Random 1 model mỗi khi component mount (mỗi lần reload trang).
  const [model] = useState(() => pickRandomModel())

  return <Live2DWidget key={model} modelName={model} position="left" width={200} height={300} />
}
```

- Dùng `useState(() => ...)` (lazy initializer) để việc random chỉ chạy một lần khi mount, không random lại mỗi lần re-render.
- Vì mỗi lần tải lại trang là một lần mount mới, model hiển thị sẽ tự đổi mỗi khi reload mà không cần thêm logic gì khác.
- Muốn hiện nhiều mascot cùng lúc thay vì 1 con, render nhiều `Live2DWidget` với `key`/`modelName` khác nhau và truyền `style.left` riêng cho từng cái để chúng không chồng lên nhau.

## Gắn component vào layout

Davipress sinh Next.js App Router từ `docs/` vào thư mục `.davipress/` mỗi khi chạy `davipress dev`, `build` hoặc `start` — bao gồm cả `.davipress/app/layout.tsx`. Vì file này được **sinh lại (ghi đè) ở mỗi lần chạy**, nên:

1. Chạy `npm run dev` (hoặc `build`/`start`) trước để Davipress sinh `.davipress/app/layout.tsx`.
2. Mở file đó và import component vừa tạo, render nó ngay trong `<body>` (trước `{children}`):

```tsx
import Live2DWidgets from '../../Live2DWidgets' // đường dẫn tới file component ở bước trên

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Live2DWidgets />
        {children}
      </body>
    </html>
  )
}
```

Trong lúc dev server đang chạy, Turbopack sẽ tự hot-reload theo thay đổi này. Lưu ý: mỗi lần bạn dừng rồi chạy lại `davipress dev`/`build`/`start`, `.davipress/app/layout.tsx` sẽ được sinh lại từ đầu và mất đoạn import/`<Live2DWidgets />` bạn vừa thêm — cần thêm lại thủ công sau khi lệnh chạy xong.

## Tuỳ chỉnh thêm

- Đổi số lượng model bằng cách truyền số khác cho `pickRandomModels(...)`.
- Đổi vị trí/scale/độ mờ qua các prop `position`, `scale`, `opacity`, `hoverOpacity`, `bottomOffset` — xem đầy đủ trong [phần Props của tài liệu next-live2d](https://next-live2d.vercel.app/docs).
- Muốn dùng model tự host thay vì danh sách dựng sẵn, truyền `baseUrl` trỏ tới thư mục chứa các model của bạn (mỗi model có `model.json` riêng), cũng theo hướng dẫn trong tài liệu trên.
