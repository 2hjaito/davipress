import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { autoSidebar, loadPages } from '../core/content.js';
import { FaUserEdit } from 'react-icons/fa';
import { MdDateRange, MdHistory } from 'react-icons/md';
import { IoTimerOutline } from 'react-icons/io5';
import { AvatarStack } from './AvatarStack.js';
import { NavBar } from './NavBar.js';
import { loadHome } from '../core/home.js';
import { HomeView } from './HomeView.js';
import { loadPosts } from '../core/posts.js';
import { PostListView } from './PostListView.js';
import { DocsChrome, PostChrome } from './DocsChrome.js';
import { GiscusComments } from './GiscusComments.js';
import { Footer } from './Footer.js';
import './theme.css';
import './theme-dark.css';
function formatDate(value) {
    if (!value)
        return '';
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
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
    return _jsx(PostChrome, { headings: page.headings, title: String(page.frontmatter.title ?? ''), hasComments: commentsEnabled, route: page.route, children: _jsx("div", { className: "dp-post", children: _jsxs("article", { className: "dp-post-article markdown-body", children: [tags.length > 0 && _jsx("div", { className: "dp-post-tags", children: tags.map(tag => _jsx("span", { children: tag }, tag)) }), _jsx("h2", { id: "post-main-title", children: page.frontmatter.title }), _jsxs("div", { className: "dp-post-meta", children: [Boolean(page.frontmatter.date) && _jsxs("span", { children: [_jsx(MdDateRange, { "aria-hidden": "true" }), formatDate(page.frontmatter.date)] }), _jsxs("span", { children: [_jsx(IoTimerOutline, { "aria-hidden": "true" }), readingTime, " ph\u00FAt \u0111\u1ECDc"] })] }), _jsx("div", { className: "dp-post-content", dangerouslySetInnerHTML: { __html: contentHtml } }), updated && _jsx("div", { className: "dp-post-update", children: _jsxs("div", { children: [_jsx(MdHistory, { "aria-hidden": "true" }), _jsxs("span", { children: ["C\u1EADp nh\u1EADt: ", formatDate(updated)] })] }) }), (previous || next) && _jsxs("div", { className: "dp-post-nav", children: [_jsx("div", { children: previous && _jsxs("a", { href: previous.route, children: ["\u2190 ", String(previous.frontmatter.title)] }) }), _jsx("div", { children: next && _jsxs("a", { href: next.route, children: [String(next.frontmatter.title), " \u2192"] }) })] }), commentsEnabled && giscus ? _jsx(GiscusComments, { giscus: giscus }) : _jsx("div", { id: "comments", className: "dp-comments", children: "Comments" })] }) }) });
}
function TutorialView({ page, config }) {
    const contentHtml = page.html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/, '');
    const readingTime = Math.max(1, Math.ceil(page.text.trim().split(/\s+/).filter(Boolean).length / 200));
    const commentsEnabled = Boolean(config.giscus?.enabled && page.frontmatter.comments !== false);
    return _jsxs("article", { className: "markdown-body dp-tutorial-article", children: [_jsx("h1", { children: page.frontmatter.title }), Boolean(page.frontmatter.subtitle) && _jsx("p", { className: "dp-tutorial-subtitle", children: String(page.frontmatter.subtitle) }), _jsxs("div", { className: "dp-tutorial-meta", children: [Boolean(page.frontmatter.author) && _jsxs("span", { children: [_jsx(FaUserEdit, { "aria-hidden": "true" }), String(page.frontmatter.author)] }), Boolean(page.frontmatter.date) && _jsxs("span", { children: [_jsx(MdDateRange, { "aria-hidden": "true" }), formatDate(page.frontmatter.date)] }), _jsxs("span", { children: [_jsx(IoTimerOutline, { "aria-hidden": "true" }), readingTime, " ph\u00FAt \u0111\u1ECDc"] })] }), _jsx("div", { dangerouslySetInnerHTML: { __html: contentHtml } }), commentsEnabled && config.giscus ? _jsx(GiscusComments, { giscus: config.giscus }) : _jsx("div", { id: "comments", className: "dp-comments", children: "Comments" })] });
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
export async function DocsTheme({ page, config }) {
    const nav = config.themeConfig?.nav ?? [];
    const pages = await loadPages();
    if (page.route === '/') {
        const home = await loadHome();
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(HomeView, { blocks: home.blocks, footer: config.themeConfig?.footer }), _jsx(NavBar, { items: nav })] });
    }
    const layout = String(page.frontmatter.layout ?? '').toLowerCase();
    const isPostList = layout === 'post-list';
    const posts = await loadPosts();
    const isPost = posts.some(post => post.source === page.source);
    const isTutorial = page.route.startsWith('/tutorials/');
    const hasComments = isTutorial
        ? Boolean(config.giscus?.enabled && page.frontmatter.comments !== false)
        : page.html.includes('id="comments"');
    if (isPostList) {
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(PostListView, { posts: posts }), _jsx(NavBar, { items: nav })] });
    }
    if (isPost) {
        return _jsxs("div", { className: "davipress-shell", children: [_jsx(PostView, { page: page, pages: posts, config: config }), _jsx(NavBar, { items: nav })] });
    }
    const sidebar = sidebarForPage(config, pages, page.route);
    return _jsxs("div", { className: "davipress-shell", children: [_jsxs(DocsChrome, { sidebar: sidebar, headings: page.headings, activeRoute: page.route, title: String(page.frontmatter.title ?? page.headings[0]?.text ?? ''), hasComments: hasComments, footer: _jsx(Footer, { footer: config.themeConfig?.footer }), reveal: isTutorial, children: [page.route === '/' && _jsxs("div", { className: "dp-home-hero", children: [_jsxs("div", { children: [_jsx("h1", { children: page.frontmatter.title }), _jsx("p", { children: page.frontmatter.description })] }), _jsx(AvatarStack, {})] }), isTutorial ? _jsx(TutorialView, { page: page, config: config }) : _jsx("article", { className: `markdown-body ${page.route === '/' ? 'dp-home-content' : ''}`, dangerouslySetInnerHTML: { __html: page.html } })] }), _jsx(NavBar, { items: nav })] });
}
