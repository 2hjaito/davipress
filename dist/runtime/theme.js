import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { autoSidebar, loadPages } from '../core/content.js';
import { FaUserEdit } from 'react-icons/fa';
import { MdDateRange, MdHistory, MdRebaseEdit } from 'react-icons/md';
import { IoTimerOutline } from 'react-icons/io5';
import { NavBar } from './NavBar.js';
import { loadHome } from '../core/home.js';
import { HomeView } from './HomeView.js';
import { loadPosts } from '../core/posts.js';
import { PostListView } from './PostListView.js';
import { DocsChrome, PostChrome } from './DocsChrome.js';
import { GiscusComments } from './GiscusComments.js';
import { Footer } from './Footer.js';
import Link from 'next/link';
import './theme.css';
import './theme-dark.css';
function formatDate(value) {
    if (!value)
        return '';
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
}
function editLink(config, source) {
    const base = config.repository?.editLink?.replace(/\/$/, '');
    if (!base)
        return undefined;
    const filePath = source.replace(/^.*?docs[\\/]/, 'docs/').replace(/\\/g, '/');
    return `${base}/${filePath}`;
}
function PostView({ page, pages, config }) {
    const tags = Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags : [];
    const index = pages.findIndex(item => item.route === page.route);
    const previous = pages[index - 1];
    const next = pages[index + 1];
    const readingTime = Math.max(1, Math.ceil(page.text.trim().split(/\s+/).filter(Boolean).length / 200));
    const giscus = config.giscus;
    const commentsEnabled = Boolean(giscus?.enabled && page.frontmatter.comments !== false);
    const updated = String(page.frontmatter.updated ?? page.frontmatter.date ?? '');
    const contentHtml = page.html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '');
    const sourceEditLink = editLink(config, page.source);
    return _jsx(PostChrome, { footer: _jsx(Footer, { footer: config.themeConfig?.footer }), headings: page.headings, title: String(page.frontmatter.title ?? ''), hasComments: commentsEnabled, route: page.route, children: _jsx("div", { className: "dp-post", children: _jsxs("article", { className: "dp-post-article dp-post-detail markdown-body", children: [tags.length > 0 && _jsx("div", { className: "dp-post-tags", children: tags.map(tag => _jsx("span", { children: tag }, tag)) }), _jsx("h2", { id: "post-main-title", children: page.frontmatter.title }), _jsxs("div", { className: "dp-post-meta", children: [Boolean(page.frontmatter.author) && _jsxs("span", { children: [_jsx(FaUserEdit, { "aria-hidden": "true" }), String(page.frontmatter.author)] }), Boolean(page.frontmatter.date) && _jsxs("span", { children: [_jsx(MdDateRange, { "aria-hidden": "true" }), formatDate(page.frontmatter.date)] }), _jsxs("span", { children: [_jsx(IoTimerOutline, { "aria-hidden": "true" }), readingTime, " ph\u00FAt \u0111\u1ECDc"] })] }), _jsx("div", { className: "dp-post-content", dangerouslySetInnerHTML: { __html: contentHtml } }), _jsxs("div", { className: "dp-post-update", children: [sourceEditLink && _jsxs("a", { href: sourceEditLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(MdRebaseEdit, { "aria-hidden": "true" }), " Ch\u1EC9nh s\u1EEDa tr\u00EAn GitHub"] }), updated && _jsxs("div", { children: [_jsx(MdHistory, { "aria-hidden": "true" }), _jsxs("span", { children: ["C\u1EADp nh\u1EADt: ", formatDate(updated)] })] })] }), (previous || next) && _jsxs("nav", { className: "dp-post-nav", "aria-label": "Post navigation", children: [_jsx("div", { children: previous && _jsxs(Link, { href: previous.route, children: [_jsx("span", { className: "dp-post-nav-arrow", "aria-hidden": "true", children: "\u2190" }), _jsx("span", { className: "dp-post-nav-label", children: String(previous.frontmatter.title) })] }) }), _jsx("div", { children: next && _jsxs(Link, { href: next.route, children: [_jsx("span", { className: "dp-post-nav-label", children: String(next.frontmatter.title) }), _jsx("span", { className: "dp-post-nav-arrow", "aria-hidden": "true", children: "\u2192" })] }) })] }), commentsEnabled && giscus ? _jsx(GiscusComments, { giscus: giscus }) : _jsx("div", { id: "comments", className: "dp-comments", children: "Comments" })] }) }) });
}
function DocView({ page, config, previous, next }) {
    const tags = Array.isArray(page.frontmatter.tags) ? page.frontmatter.tags : [];
    const contentHtml = page.html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '');
    const readingTime = Math.max(1, Math.ceil(page.text.trim().split(/\s+/).filter(Boolean).length / 200));
    const commentsEnabled = Boolean(config.giscus?.enabled && page.frontmatter.comments !== false);
    const updated = String(page.frontmatter.updated ?? page.frontmatter.date ?? '');
    const sourceEditLink = editLink(config, page.source);
    return _jsx("div", { className: "dp-post", children: _jsxs("article", { className: "dp-post-article dp-tutorial-detail markdown-body", children: [tags.length > 0 && _jsx("div", { className: "dp-post-tags", children: tags.map(tag => _jsx("span", { children: tag }, tag)) }), _jsx("h2", { id: "post-main-title", children: page.frontmatter.title }), Boolean(page.frontmatter.subtitle) && _jsx("p", { className: "dp-post-card-subtitle", children: String(page.frontmatter.subtitle) }), _jsxs("div", { className: "dp-post-meta", children: [Boolean(page.frontmatter.author) && _jsxs("span", { children: [_jsx(FaUserEdit, { "aria-hidden": "true" }), String(page.frontmatter.author)] }), Boolean(page.frontmatter.date) && _jsxs("span", { children: [_jsx(MdDateRange, { "aria-hidden": "true" }), formatDate(page.frontmatter.date)] }), _jsxs("span", { children: [_jsx(IoTimerOutline, { "aria-hidden": "true" }), readingTime, " ph\u00FAt \u0111\u1ECDc"] })] }), _jsx("div", { className: "dp-post-content", dangerouslySetInnerHTML: { __html: contentHtml } }), _jsxs("div", { className: "dp-post-update", children: [sourceEditLink && _jsxs("a", { href: sourceEditLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(MdRebaseEdit, { "aria-hidden": "true" }), " Ch\u1EC9nh s\u1EEDa tr\u00EAn GitHub"] }), updated && _jsxs("div", { children: [_jsx(MdHistory, { "aria-hidden": "true" }), _jsxs("span", { children: ["C\u1EADp nh\u1EADt: ", formatDate(updated)] })] })] }), (previous || next) && _jsxs("nav", { className: "dp-post-nav", "aria-label": "Section navigation", children: [_jsx("div", { children: previous && _jsxs(Link, { href: previous.route, children: [_jsx("span", { className: "dp-post-nav-arrow", "aria-hidden": "true", children: "\u2190" }), _jsx("span", { className: "dp-post-nav-label", children: String(previous.frontmatter.title ?? previous.route) })] }) }), _jsx("div", { children: next && _jsxs(Link, { href: next.route, children: [_jsx("span", { className: "dp-post-nav-label", children: String(next.frontmatter.title ?? next.route) }), _jsx("span", { className: "dp-post-nav-arrow", "aria-hidden": "true", children: "\u2192" })] }) })] }), commentsEnabled && config.giscus ? _jsx(GiscusComments, { giscus: config.giscus }) : _jsx("div", { id: "comments", className: "dp-comments", children: "Comments" })] }) });
}
function sidebarForPage(config, pages, route) {
    const sidebar = config.themeConfig?.sidebar;
    if (sidebar === 'auto')
        return autoSidebar(pages);
    if (!sidebar)
        return [];
    const match = Object.entries(sidebar).sort((a, b) => b[0].length - a[0].length).find(([prefix]) => route === prefix || route.startsWith(prefix.replace(/\/$/, '') + '/'));
    return match?.[1] ?? [];
}
function normalizeRoute(route) {
    if (!route)
        return '';
    return route.replace(/\/$/, '') || '/';
}
function matchesNavRoute(route, link) {
    const normalizedLink = normalizeRoute(link);
    return normalizedLink === '/' ? route === '/' : route === normalizedLink || route.startsWith(normalizedLink + '/');
}
function flattenSidebarLinks(items) {
    return items.flatMap(item => [...(item.link ? [normalizeRoute(item.link)] : []), ...flattenSidebarLinks(item.items ?? item.children ?? [])]);
}
function SimplePage({ page, footer }) {
    return _jsxs("div", { className: "dp-home-view dp-simple-page", children: [_jsx("article", { className: "markdown-body dp-home-content", dangerouslySetInnerHTML: { __html: page.html } }), _jsx(Footer, { footer: footer })] });
}
export async function DocsTheme({ page, config }) {
    const nav = config.themeConfig?.nav ?? [];
    const pages = await loadPages();
    if (page.route === '/') {
        const home = await loadHome();
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(HomeView, { blocks: home.blocks, footer: config.themeConfig?.footer }), _jsx(NavBar, { items: nav, navbar: config.themeConfig?.navbar })] });
    }
    const layout = String(page.frontmatter.layout ?? '').toLowerCase();
    const isPostList = layout === 'post-list';
    const posts = await loadPosts();
    const isPost = posts.some(post => post.source === page.source);
    if (isPostList) {
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(PostListView, { posts: posts }), _jsx(NavBar, { items: nav, navbar: config.themeConfig?.navbar })] });
    }
    if (isPost) {
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(PostView, { page: page, pages: posts, config: config }), _jsx(NavBar, { items: nav, navbar: config.themeConfig?.navbar })] });
    }
    const sectionNav = [...nav].sort((a, b) => b.link.length - a.link.length).find(item => matchesNavRoute(page.route, item.link));
    const sidebar = sectionNav?.items ?? sidebarForPage(config, pages, page.route);
    if (sidebar.length === 0) {
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(SimplePage, { page: page, footer: config.themeConfig?.footer }), _jsx(NavBar, { items: nav, navbar: config.themeConfig?.navbar })] });
    }
    const ordered = flattenSidebarLinks(sidebar).map(link => pages.find(item => normalizeRoute(item.route) === link)).filter((item) => Boolean(item));
    const index = ordered.findIndex(item => item.route === page.route);
    const hasComments = Boolean(config.giscus?.enabled && page.frontmatter.comments !== false);
    return _jsxs("div", { className: "davipress-shell", children: [_jsx(DocsChrome, { sidebar: sidebar, headings: page.headings, activeRoute: page.route, title: String(page.frontmatter.title ?? page.headings[0]?.text ?? ''), hasComments: hasComments, sectionLabel: sectionNav?.text, sectionIcon: sectionNav?.icon, footer: null, reveal: true, children: _jsx(DocView, { page: page, config: config, previous: index > 0 ? ordered[index - 1] : undefined, next: index >= 0 ? ordered[index + 1] : undefined }) }), _jsx(NavBar, { items: nav, navbar: config.themeConfig?.navbar })] });
}
