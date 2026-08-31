# Changelog

All notable changes to Davipress are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [0.1.12] - 2026-08-31

### Changed

- **Breaking:** replace `react-icons` with `davi-icons` across all runtime components (navbar, sidebar, footer, tech badges, tools/projects sections). Icon name strings in theme config (`icon: 'FaBook'`, ...) must now match `davi-icons` export names, which differ from `react-icons` for some packs (notably `md`, `io`, and Font Awesome regular/brand variants).

## [0.1.10] - 2026-08-28

### Added

- Add GitHub-style alerts with icons and light/dark theme styling.
- Set Markdown body typography to a readable 16px base size.

## [0.1.9] - 2026-08-28

### Fixed

- Keep mobile post navigation horizontal and clamp long labels without hiding arrows.

## [0.1.8] - 2026-08-28

### Fixed

- Apply the light GitHub contributions palette consistently.

## [0.1.7] - 2026-08-28

### Fixed

- Include configurable navbar types in the published package.

## [0.1.6] - 2026-08-28

### Added

- Add configurable navbar theme toggle and macOS-style separator.
- Add MIT license metadata and file.

### Fixed

- Anchor image zoom transitions to the source image position.
- Keep navbar active state stable without a looping spinner.

## [0.1.4] - 2026-08-28

### Added

- Add Vietnamese labels for the post list and empty state.
- Add a Markdown syntax guide to the basic demo.

### Fixed

- Remove the accidental self-dependency that could break dependency resolution on Vercel.
- Keep post-card typography aligned with the home page on mobile and desktop.
- Hide the footer on documentation and tutorial pages that use nested navigation.

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
