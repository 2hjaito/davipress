---
title: Getting Started
description: Create your first Davipress page.
sidebar_position: 1
---

# Getting Started

Create a Markdown file under `docs/` and Davipress turns its path into a URL.

## A small example

```ts
import { defineConfig } from 'davipress'

export default defineConfig({
  title: 'My docs',
  themeConfig: { sidebar: 'auto' }
})
```

## Math

Inline math: $E = mc^2$.

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$