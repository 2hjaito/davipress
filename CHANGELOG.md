# Changelog

All notable changes to Davipress are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [0.1.3] - 2026-08-28

### Fixed

- Use SPA navigation for navbar links.
- Apply the saved dark mode before hydration to prevent a light-mode flash.

## [0.1.2] - 2026-08-28

### Added

- Click-to-zoom support for Markdown and certification images.
- Escape-key and backdrop controls for closing enlarged images.

## [0.1.1] - 2026-08-28

### Fixed

- Remove indentation from the generated starter Markdown so YAML frontmatter parses correctly.
- Allow `davipress init` to create a missing `package.json`.

## [0.1.0] - 2026-08-28

### Added

- Markdown and MDX documentation site generation with Next.js App Router.
- Responsive home page with hero, avatar stack, expandable sections, GitHub contributions, and certifications.
- Light and dark theme support with configurable runtime CSS tokens.
- Giscus comments with live light/dark theme synchronization.
- Configurable footer with attribution, source, and RSS links.
- Automatic `/rss.xml` and `/robots.txt` routes during `dev`, `build`, and `start`.
- `npx davipress init` starter project scaffolding with sample content and local SVG assets.
- GitHub-flavored Markdown, syntax highlighting, KaTeX math, raw HTML, heading anchors, tables, and task lists.

### Fixed

- Mobile home layout spacing and hero/avatar/social ordering.
- Certificate image rendering and square certificate frames.
- GitHub contributions dark-mode colors, legend colors, scrollbar styling, and spacing.
- Fresh-project initialization when `package.json` is missing.
