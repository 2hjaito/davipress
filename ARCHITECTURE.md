# Davipress Architecture

## Goals

Provide a small user-facing API for Markdown documentation while keeping Next.js, routing, Markdown compilation, SEO and the default theme inside the package. Preserve the server Markdown behavior found in `dangth`.

## Layers

`docs/**/*.md(x)` is content. `src/core` discovers files, maps routes and compiles Markdown. `src/runtime` is the Next App Router adapter and theme. The CLI materializes only the adapter files in `.davipress`.

## Lifecycle

`davipress init` is idempotent: it creates a sample page, config, scripts and generated adapter only when absent. `dev`, `build` and `start` run generation first, then invoke the local Next binary against `.davipress`. `clean` removes generated runtime code. No postinstall side effect is required.

## Content and routing

The scanner is recursive and platform-independent. `docs/index.md` maps to `/`; `docs/guide/index.md` maps to `/guide`; other files map to their extensionless path. Next `generateStaticParams` receives the manifest-derived route list. Route collisions are avoided by the index rule and should be reported by a future manifest validator.

## Markdown and theme

The pipeline mirrors `dangth/lib/core/mdx.ts`: `remark-gfm`, `remark-math`, `remark-rehype`, `rehype-raw`, `rehype-katex`, `rehype-highlight`, `rehype-slug`, `rehype-autolink-headings` and `rehype-stringify`. The theme is intentionally restrained and keeps the source design's blue brand, 20rem sidebar, 800px article width, code colors and responsive collapse.

## Config and SEO

`defineConfig` is a typed identity function. Generated pages import the user's config, and metadata combines page frontmatter with global title, description, URL, canonical and Open Graph defaults. The package boundary exposes only the root API, runtime and stylesheet.

## Packaging and upgrades

The package is compiled before `npm pack`; CSS is copied into `dist`. Generated metadata records the package format version, so a later generator can invalidate old output. A clean fixture installed from the resulting tarball is the publishing compatibility check.

## Known v1 scope

The initial runtime covers the core documentation workflow. Giscus, the richer `dangth` portfolio blocks, language switching, RSS and visual regression fixtures remain separate migration work because they are not part of a generic Markdown documentation runtime yet.