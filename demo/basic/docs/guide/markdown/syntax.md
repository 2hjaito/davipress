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
[Davipress](https://github.com/danqth/davipress)

![A profile image](/images/profile.png)
```

Images can be clicked to open the built-in zoom view.

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
