---
title: Building a Documentation Theme
description: A post layout compatibility page.
date: 2026-08-27
updated: 2026-08-27
layout: post
tags:
  - Davipress
  - UI
---

# Building a Documentation Theme

This page uses the post renderer. It checks the metadata row, tags, article width, code block and navigation around a long-form article.

## Why the layout matters

The original `dangth` post view keeps the article centered, places the table of contents on the right and leaves generous space around headings.

## Example code

```tsx
export default function Post() {
  return <article>Readable content</article>
}
```

## Conclusion

The post remains comfortable to read on both desktop and mobile screens.