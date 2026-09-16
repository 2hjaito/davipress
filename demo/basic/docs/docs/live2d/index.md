---
title: Tích hợp Live2D (next-live2d)
description: Gắn mascot Live2D ngẫu nhiên lên site Davipress bằng thư viện next-live2d và cơ chế widgets/ + plugins của Davipress.
sidebar_position: 7
---

# Tích hợp Live2D (next-live2d)

[next-live2d](https://next-live2d.vercel.app/docs) là thư viện React/Next.js giúp nhúng mascot Live2D (kiểu widget hay thấy ở các blog Nhật) vào website bằng một component duy nhất, chạy cách ly trong `iframe` nên không đụng chạm tới DOM của trang.

Đây không phải tính năng lõi của Davipress — **Davipress không cài, không biết và không phụ thuộc vào `next-live2d`**. Site của bạn tự cài thư viện này như một dependency bình thường; Davipress chỉ cung cấp 2 cơ chế chung (không gắn cứng cho Live2D hay bất kỳ thư viện nào) để bạn gắn component tuỳ chỉnh vào layout một cách bền vững qua các lần build:

1. **Thư mục `widgets/`**: mọi file `.tsx` đặt trong `widgets/` (hoặc `src/widgets/`) ở gốc site sẽ được Davipress tự động import và render vào `<body>` của layout, ở **mọi lần chạy** `davipress dev`/`build`/`start` — không cần sửa tay `.davipress/app/layout.tsx` (file này vốn bị sinh lại/ghi đè mỗi lần chạy).
2. **`plugins` trong `davipress.config.ts`**: một mảng `[tên, options]` thuần dữ liệu để bạn khai báo cấu hình cho từng widget mà không cần hardcode trong file component. Component tự đọc options của mình bằng `getPluginOptions(config, tên)` (import từ `davipress/runtime/plugins`).

Ai muốn tìm hiểu sâu hơn về props của `Live2DWidget`, danh sách model dựng sẵn hoặc cách tự host model riêng thì xem trực tiếp [tài liệu next-live2d](https://next-live2d.vercel.app/docs).

## Cài đặt

```bash
npm install next-live2d
```

## Khai báo options trong davipress.config.ts

```ts
export default defineConfig({
  // ...config khác
  plugins: [
    ['live2d', { models: ['rem_2', 'hibiki', 'HK416-1-normal'], width: 200, height: 300 }],
  ],
})
```

Mỗi phần tử là `[tên_plugin, options]`. Tên plugin (`'live2d'` ở đây) chỉ là một chuỗi tự đặt để component tra lại options của chính nó — Davipress không xử lý gì thêm với chuỗi này.

## Tạo component trong widgets/

Tạo `widgets/live2d.tsx` (bất kỳ tên file nào cũng được, miễn nằm trong thư mục `widgets/`), đánh dấu `'use client'` vì `Live2DWidget` là client component:

```tsx
'use client'
import { useState } from 'react'
import { Live2DWidget } from 'next-live2d'
import { getPluginOptions } from 'davipress/runtime/plugins'
import config from '../davipress.config'

type Live2DOptions = { models?: string[]; width?: number; height?: number }

const options = getPluginOptions(config, 'live2d') as Live2DOptions
const MODEL_POOL = options.models?.length ? options.models : ['histoire']
const WIDGET_WIDTH = options.width ?? 200
const WIDGET_HEIGHT = options.height ?? 300

function pickRandomModel() {
  return MODEL_POOL[Math.floor(Math.random() * MODEL_POOL.length)]!
}

export default function Live2DWidgets() {
  // Random 1 model mỗi khi component mount (mỗi lần reload trang).
  const [model] = useState(() => pickRandomModel())

  return <Live2DWidget key={model} modelName={model} position="left" width={WIDGET_WIDTH} height={WIDGET_HEIGHT} />
}
```

- Dùng `useState(() => ...)` (lazy initializer) để việc random chỉ chạy một lần khi mount, không random lại mỗi lần re-render.
- Vì mỗi lần tải lại trang là một lần mount mới, model hiển thị sẽ tự đổi mỗi khi reload mà không cần thêm logic gì khác.
- Luôn import `getPluginOptions` từ `davipress/runtime/plugins` (không phải `davipress/runtime`) trong file `'use client'` — subpath này không phụ thuộc Node API (`fs`, ...) nên an toàn khi bundle cho trình duyệt. Import nhầm `davipress/runtime` vào 1 client component sẽ gây lỗi build kiểu "chunking context does not support external modules (request: node:fs)".
- Muốn hiện nhiều mascot cùng lúc, thêm nhiều file khác trong `widgets/` (mỗi file 1 component riêng) hoặc render nhiều `Live2DWidget` với `key` khác nhau trong cùng component, truyền `style.left` riêng cho từng cái để không chồng lên nhau.

Chạy `npm run dev`, Davipress sẽ tự phát hiện `widgets/live2d.tsx` và render nó vào layout — không cần đụng vào `.davipress/`.

## Tuỳ chỉnh thêm

- Đổi danh sách model, kích thước qua field `plugins` trong `davipress.config.ts`, không cần sửa component.
- Đổi vị trí/scale/độ mờ qua các prop `position`, `scale`, `opacity`, `hoverOpacity`, `bottomOffset` của `Live2DWidget` — xem đầy đủ trong [phần Props của tài liệu next-live2d](https://next-live2d.vercel.app/docs).
- Muốn dùng model tự host thay vì danh sách dựng sẵn, truyền `baseUrl` trỏ tới thư mục chứa các model của bạn (mỗi model có `model.json` riêng), cũng theo hướng dẫn trong tài liệu trên.

