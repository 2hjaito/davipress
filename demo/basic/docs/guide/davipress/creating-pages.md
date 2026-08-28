---
title: Creating Pages
description: Create and publish your own Markdown pages with Davipress.
sidebar_position: 1
---

# Creating Pages

Davipress turns files inside `docs/` into pages. You do not need to register each page in a router.

## 1. Create a Markdown file

Create a file such as `docs/about.md`:

```md
---
title: About me
description: A short introduction.
---

# About me

Write your page content here.
```

The page is available at `/about`.

## 2. Create nested pages

Folders become URL segments. For example:

```text
docs/
  guide/
    index.md
    creating-pages.md
  about.md
```

These files become `/guide`, `/guide/creating-pages`, and `/about`.

A file named `index.md` represents its folder route. A custom `slug` in frontmatter can override the filename route.

## 3. Add images and files

Put static assets in `public/`:

```text
public/
  images/
    profile.png
```

Reference them from Markdown with an absolute public path:

```md
![Profile](/images/profile.png)
```

The same rule applies to downloads, icons, and other static files.

## 4. Configure page metadata

Frontmatter controls metadata and navigation:

```md
---
title: Project notes
description: Notes about a project.
date: 2026-08-28
updated: 2026-08-28
sidebar_position: 2
sidebar_label: Project notes
comments: true
---
```

Useful fields include `title`, `description`, `date`, `updated`, `sidebar_position`, `sidebar_label`, `image`, `keywords`, `layout`, `draft`, and `comments`.

Set `draft: true` to keep a page out of the published page list.

## 5. Add the page to a sidebar

With `sidebar: 'auto'`, Davipress discovers pages and sorts them by `sidebar_position`.

For a custom sidebar, add the route to `davipress.config.ts`:

```ts
export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide': [
        { text: 'Guide', link: '/guide' },
        { text: 'Creating Pages', link: '/guide/creating-pages' }
      ]
    }
  }
})
```

## 6. Preview and build

```bash
npm run dev
npm run build
npm run start
```

The development server previews changes at `http://localhost:3000`. The build command also prepares `/rss.xml` and `/robots.txt` for the configured site URL.

## Page checklist

- Create a `.md` or `.mdx` file under `docs/`.
- Add frontmatter when the page needs metadata or sidebar ordering.
- Put images and downloads under `public/`.
- Use absolute paths such as `/images/example.png`.
- Run `npm run dev` to preview and `npm run build` before deployment.
