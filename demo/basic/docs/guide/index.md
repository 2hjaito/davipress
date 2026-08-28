---
title: Hướng dẫn sử dụng Davipress
description: Hướng dẫn đầy đủ cách cài đặt, viết nội dung và triển khai website với Davipress.
sidebar_position: 1
---

# Hướng dẫn sử dụng Davipress

Davipress là framework documentation theo hướng Markdown-first. Bạn chỉ cần viết nội dung trong thư mục `docs/`, sau đó Davipress sẽ tự biến các file Markdown thành những trang web có route, sidebar, tìm kiếm điều hướng, syntax highlighting, công thức toán và giao diện responsive.

Tài liệu này đi từ những bước đầu tiên đến các cấu hình thường dùng khi xây dựng một documentation site hoặc portfolio cá nhân.

## 1. Cài đặt

Davipress cần Node.js 20.9 trở lên. Tạo một thư mục mới và cài package:

```bash
mkdir my-docs
cd my-docs
npm init -y
npm install davipress
npx davipress init
```

Sau khi khởi tạo, chạy development server:

```bash
npm run dev
```

Mở `http://localhost:3000` trong trình duyệt. Khi chỉnh sửa file trong `docs/`, trang sẽ được cập nhật trong development server.

## 2. Cấu trúc project

Một project Davipress thường có cấu trúc như sau:

```text
my-docs/
	docs/
		index.md
		guide/
			index.md
			getting-started.md
	public/
		images/
		fonts/
	davipress.config.ts
	package.json
```

Vai trò của từng thư mục:

- `docs/`: nội dung Markdown hoặc MDX của website.
- `public/`: hình ảnh, icon, font và các file tĩnh.
- `davipress.config.ts`: cấu hình site, navigation, sidebar, repository và comments.
- `.davipress/`: ứng dụng Next.js được generate tự động, không nên chỉnh sửa trực tiếp.

## 3. Tạo trang mới

Tạo file `docs/about.md`:

```md
---
title: Giới thiệu
description: Thông tin về website.
---

# Giới thiệu

Đây là trang giới thiệu đầu tiên.
```

File trên sẽ trở thành route `/about`. File `index.md` đại diện cho route của thư mục:

```text
docs/index.md                 -> /
docs/guide/index.md           -> /guide
docs/guide/about.md           -> /guide/about
```

Bạn cũng có thể dùng `slug` để thay đổi route:

```md
---
title: Bài viết đầu tiên
slug: welcome
---
```

## 4. Frontmatter

Frontmatter là phần YAML nằm ở đầu file Markdown. Các trường thường dùng:

```md
---
title: Tên trang
description: Mô tả dùng cho metadata.
date: 2026-08-28
updated: 2026-08-28
sidebar_position: 2
sidebar_label: Tên hiển thị trong sidebar
image: /images/cover.png
keywords:
	- documentation
	- markdown
comments: true
draft: false
---
```

- `title`: tiêu đề trang và tiêu đề hiển thị trong navigation.
- `description`: mô tả SEO của trang.
- `date`, `updated`: ngày tạo và ngày cập nhật.
- `sidebar_position`: thứ tự trang trong sidebar tự động.
- `sidebar_label`: tên thay thế trong sidebar.
- `image`: ảnh đại diện hoặc ảnh chia sẻ.
- `comments`: bật/tắt comments cho từng trang.
- `draft`: đánh dấu nội dung chưa sẵn sàng xuất bản.

## 5. Markdown và MDX

Davipress hỗ trợ Markdown phổ biến:

```md
## Tiêu đề

**Đậm**, *nghiêng*, ~~gạch ngang~~ và `inline code`.

- Danh sách không thứ tự
- Mục thứ hai

1. Danh sách có thứ tự
2. Mục thứ hai

- [x] Đã hoàn thành
- [ ] Chưa hoàn thành
```

### Link và hình ảnh

```md
[Trang chủ Davipress](https://github.com/2hjaito/davipress)

![Ảnh minh hoạ](/images/example.png)
```

File trong `public/` được tham chiếu bằng đường dẫn bắt đầu từ `/`. Hình ảnh trong nội dung có thể được click để mở chế độ phóng to.

### Code block

Thêm tên ngôn ngữ sau dấu mở fence để bật syntax highlighting:

```ts
export function greet(name: string) {
	return `Xin chào, ${name}`
}
```

### Bảng

```md
| Tính năng | Trạng thái |
| --- | --- |
| Markdown | Hỗ trợ |
| Bảng | Hỗ trợ |
| Công thức | Hỗ trợ |
```

### Công thức toán

Công thức inline dùng một cặp `$` như `$E = mc^2$`.

```md
$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$
```

## 6. GitHub-style alerts

Alert dùng blockquote với marker ở dòng đầu tiên:

```md
> [!INFO]
> Đây là thông tin cần biết.

> [!TIP]
> Đây là một mẹo hữu ích.

> [!WARNING]
> Hãy kiểm tra cấu hình trước khi build production.
```

Davipress hỗ trợ `INFO`, `NOTE`, `TIP`, `IMPORTANT`, `WARNING` và `CAUTION`. Mỗi loại có màu border và icon riêng, tự thích ứng với light/dark mode.

> [!INFO]
> Nội dung alert có thể chứa **Markdown**, link và `inline code`.

## 7. Sidebar và navigation

### Sidebar tự động

Cách đơn giản nhất là dùng:

```ts
export default defineConfig({
	themeConfig: {
		sidebar: 'auto'
	}
})
```

Davipress sẽ lấy các trang trong `docs/` và sắp xếp theo `sidebar_position`.

### Navigation thủ công

Khi website có nhiều nhóm nội dung, khai báo navigation trong `davipress.config.ts`:

```ts
export default defineConfig({
	themeConfig: {
		nav: [
			{ text: 'Guide', link: '/guide' },
			{ text: 'Tutorials', link: '/tutorials' }
		],
		sidebar: {
			'/guide': [
				{ text: 'Bắt đầu', link: '/guide' },
				{ text: 'Tạo trang', link: '/guide/creating-pages' }
			]
		}
	}
})
```

Các item có thể chứa `items` hoặc `children` để tạo nhóm lồng nhau.

## 8. Cấu hình website

Ví dụ cấu hình tối thiểu:

```ts
import { defineConfig } from 'davipress'

export default defineConfig({
	title: 'My Documentation',
	description: 'Tài liệu sản phẩm của tôi.',
	url: 'https://example.com',
	lang: 'vi',
	themeConfig: {
		sidebar: 'auto',
		navbar: {
			showThemeToggle: true,
			showThemeSeparator: true
		}
	}
})
```

`url` nên là URL đầy đủ có `https://`. Davipress dùng giá trị này để tạo canonical URL, RSS và robots file.

## 9. Link chỉnh sửa trên GitHub

Để hiện nút chỉnh sửa trên từng trang, thêm repository config:

```ts
export default defineConfig({
	repository: {
		url: 'https://github.com/2hjaito/davipress',
		editLink: 'https://github.com/2hjaito/davipress/edit/main'
	}
})
```

Davipress sẽ tự nối đường dẫn file Markdown vào `editLink`. Ví dụ trang `docs/guide/index.md` sẽ trỏ đến:

```text
https://github.com/2hjaito/davipress/edit/main/docs/guide/index.md
```

## 10. Comments với Giscus

Giscus cần repository public trên GitHub đã bật Discussions. Thêm thông tin do trang Giscus cung cấp:

```ts
export default defineConfig({
	giscus: {
		enabled: true,
		repo: 'owner/repository',
		repoId: 'repository-id',
		category: 'Announcements',
		categoryId: 'category-id',
		mapping: 'pathname',
		reactionsEnabled: true,
		inputPosition: 'bottom',
		theme: 'preferred_color_scheme',
		lang: 'vi'
	}
})
```

`theme: 'preferred_color_scheme'` cho phép Giscus tự theo chế độ sáng/tối của thiết bị. Có thể tắt comments cho một trang bằng `comments: false` trong frontmatter.

## 11. Theme và responsive layout

Theme mặc định có light mode và dark mode. Người dùng có thể chuyển chế độ bằng nút mặt trời/mặt trăng trên navbar. Separator giữa nhóm navigation và theme toggle có thể cấu hình:

```ts
themeConfig: {
	navbar: {
		showThemeToggle: true,
		showThemeSeparator: true
	}
}
```

Trên màn hình nhỏ, sidebar chuyển thành menu mở từ cạnh trên. Nội dung, bảng và GitHub contributions có thể cuộn ngang khi không đủ chiều rộng.

## 12. RSS, robots và build

Các file sau được generate tự động:

- `/rss.xml`: RSS từ các bài trong `docs/posts`.
- `/robots.txt`: robots file có sitemap theo `url` đã cấu hình.

Trước khi deploy, chạy:

```bash
npm run build
npm run start
```

Nếu build lỗi, kiểm tra lần lượt frontmatter YAML, đường dẫn file trong `docs/`, asset trong `public/` và các route bị trùng.

## 13. Deploy

Davipress generate một ứng dụng Next.js nên có thể deploy trên Vercel hoặc bất kỳ nền tảng nào hỗ trợ Node.js.

Quy trình cơ bản:

1. Push project lên GitHub.
2. Import repository vào nền tảng deploy.
3. Dùng `npm run build` làm build command.
4. Dùng `npm run start` nếu nền tảng cần start command.
5. Đặt `url` production trong `davipress.config.ts`.

Không commit secrets vào Markdown hoặc config. Với các giá trị nhạy cảm, dùng environment variables của nền tảng deploy.

## 14. Checklist nhanh

- [ ] `docs/index.md` tồn tại.
- [ ] Mỗi trang có `title` và `description` phù hợp.
- [ ] Ảnh được đặt trong `public/` và dùng path bắt đầu bằng `/`.
- [ ] Sidebar có link đúng với route thực tế.
- [ ] `repository.editLink` trỏ đến đúng branch.
- [ ] Giscus dùng đúng `repoId` và `categoryId`.
- [ ] Đã chạy `npm run build` trước khi deploy.
---
title: Markdown Syntax
description: Common Markdown features supported by Davipress.
sidebar_position: 1
---

# Markdown Syntax

Davipress supports GitHub-flavored Markdown together with syntax highlighting, math, heading links, tables, task lists, and raw HTML.

## Headings and paragraphs

Use one or more `#` characters for headings. Keep one blank line between paragraphs.

```md
# Page title

## Section title

This is a paragraph with **bold text**, *italic text*, and `inline code`.
```

## Links and images

Use normal Markdown links. Images can point to files in the `public/` directory.

```md
[Davipress](https://www.npmjs.com/package/davipress)

![A profile image](/images/profile.png)
```

Images can be clicked to open the built-in zoom view.

## Alerts

Davipress supports GitHub-style alerts. Put the alert marker on the first line of a blockquote:

```md
> [!INFO]
> Khi đã xác nhận tham gia vào Repo, bạn có các quyền như một **Owner**, có thể add, commit, push và create branch.
```

Available types are `INFO`, `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION`.

> [!INFO]
> Đây là một thông tin ngắn được hiển thị dưới dạng callout.

> [!NOTE]
> Đây là ghi chú giúp bổ sung thêm ngữ cảnh cho nội dung chính.

> [!TIP]
> Dùng `npm run dev` để xem thay đổi Markdown ngay trong quá trình viết.

> [!IMPORTANT]
> Hãy đặt file Markdown trong thư mục `docs/` để Davipress tự phát hiện route.

> [!WARNING]
> Hãy kiểm tra frontmatter và đường dẫn asset trước khi build production.

> [!CAUTION]
> Không chỉnh sửa trực tiếp thư mục `.davipress/` vì đây là output được generate tự động.

## Lists and task lists

```md
- First item
- Second item
	- Nested item

- [x] Completed task
- [ ] Open task
```

## Code blocks

Add a language after the opening fence to enable syntax highlighting.

```ts
export function greet(name: string) {
	return `Hello, ${name}`
}
```

## Tables

```md
| Feature | Supported |
| --- | --- |
| Tables | Yes |
| Task lists | Yes |
| Math | Yes |
```

## Math

Inline math uses single dollar signs: `$a^2 + b^2 = c^2$`.

Display math uses a pair of dollar signs:

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

## Frontmatter

Add YAML frontmatter at the beginning of a file to control its metadata and navigation.

```md
---
title: My page
description: A short page description.
sidebar_position: 2
comments: true
---
```
