'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as TiIcons from 'react-icons/ti';
import { GiEvilBook, GiHamburgerMenu } from 'react-icons/gi';
import { FaJava, FaJs } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { RiJavaLine } from 'react-icons/ri';
const sidebarIcons = {
    ...FaIcons,
    ...Fa6Icons,
    ...FiIcons,
    ...GiIcons,
    ...IoIcons,
    ...Io5Icons,
    ...LuIcons,
    ...MdIcons,
    ...RiIcons,
    ...SiIcons,
    ...TbIcons,
    ...TiIcons,
    FaJava,
    FaJs,
    RiJavaLine,
};
function childItems(item) { return (item.items ?? item.children ?? []); }
function normalizeLink(link) {
    if (!link)
        return '';
    return link.replace(/\/$/, '') || '/';
}
function SidebarIcon({ icon }) {
    const Icon = icon ? sidebarIcons[icon] : undefined;
    return Icon ? _jsx(Icon, { className: "dp-sidebar-icon" }) : _jsx("span", { className: "dp-sidebar-icon" });
}
function openKeysForRoute(items, route, trail = []) {
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const key = `${trail.join('/')}/${item.text}-${index}`;
        if (normalizeLink(item.link) === normalizeLink(route))
            return trail;
        const children = childItems(item);
        if (children.length > 0) {
            const next = openKeysForRoute(children, route, [...trail, key]);
            if (next.length > 0)
                return next;
        }
    }
    return [];
}
function SidebarTree({ items, activeRoute }) {
    const [openMap, setOpenMap] = useState({});
    const activeTrail = openKeysForRoute(items, activeRoute);
    function renderItems(nodes, level = 0, trail = []) {
        return _jsx("ul", { className: `dp-sidebar-list ${level > 1 ? 'dp-sidebar-list-nested' : ''}`, children: nodes.map((item, index) => {
                const key = `${trail.join('/')}/${item.text}-${index}`;
                const children = childItems(item);
                const hasChildren = children.length > 0;
                const isOpen = activeTrail.includes(key) || (openMap[key] ?? (item.collapsed === false || level === 0));
                const isCollapsible = item.collapsible !== false && item.collapsed !== false && hasChildren;
                const active = normalizeLink(item.link) === normalizeLink(activeRoute);
                if (hasChildren && isCollapsible) {
                    return _jsxs("li", { children: [_jsxs("button", { type: "button", className: "dp-sidebar-group-button", onClick: () => setOpenMap(value => ({ ...value, [key]: !isOpen })), children: [_jsxs("span", { className: "dp-sidebar-group-content", children: [_jsx(SidebarIcon, { icon: item.icon }), _jsx("span", { className: "dp-sidebar-group-label", children: item.text })] }), _jsx("span", { className: `dp-sidebar-chevron${isOpen ? ' dp-sidebar-chevron-open' : ''}`, children: "\u203A" })] }), isOpen && renderItems(children, level + 1, [...trail, key])] }, key);
                }
                if (hasChildren) {
                    return _jsxs("li", { children: [item.text && _jsx("div", { className: "dp-sidebar-section-title", children: item.text }), renderItems(children, level + 1, [...trail, key])] }, key);
                }
                return _jsx("li", { children: _jsxs(Link, { href: item.link ?? '#', title: item.text, className: `dp-sidebar-link${active ? ' dp-sidebar-link-active' : ''}`, children: [_jsx(SidebarIcon, { icon: item.icon }), _jsx("span", { children: item.text })] }) }, key);
            }) });
    }
    return _jsx("nav", { className: "dp-sidebar-nav", children: renderItems(items) });
}
function FloatingToc({ headings, hasComments, initiallyCollapsed = true }) {
    const [collapsed, setCollapsed] = useState(initiallyCollapsed);
    const [zoomed, setZoomed] = useState(false);
    const [activeId, setActiveId] = useState(headings[0]?.id ?? '');
    const headingKey = headings.map(heading => `${heading.id}:${heading.level}`).join('|');
    const isCenterZoom = zoomed && !collapsed;
    useEffect(() => {
        setActiveId(headings[0]?.id ?? '');
        setCollapsed(initiallyCollapsed);
        setZoomed(false);
    }, [headingKey, initiallyCollapsed]);
    useEffect(() => {
        if (headings.length === 0 && !hasComments)
            return;
        const updateActive = () => {
            const comments = document.getElementById('comments');
            if (comments && comments.getBoundingClientRect().top <= 180) {
                setActiveId('comments');
                return;
            }
            let next = headings[0]?.id ?? '';
            for (const heading of headings) {
                const element = document.getElementById(heading.id);
                if (!element)
                    continue;
                if (element.getBoundingClientRect().top <= 180)
                    next = heading.id;
                else
                    break;
            }
            setActiveId(next);
        };
        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);
        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [headings, hasComments]);
    if (headings.length === 0 && !hasComments)
        return null;
    return _jsxs(_Fragment, { children: [isCenterZoom && _jsx("button", { type: "button", className: "dp-toc-backdrop", "aria-label": "Close table of contents", onClick: () => setZoomed(false) }), _jsx("div", { className: isCenterZoom ? 'dp-toc-wrap dp-toc-wrap-center' : 'dp-toc-wrap', children: _jsx("div", { className: `dp-toc-panel${collapsed ? ' dp-toc-panel-collapsed' : ''}${zoomed ? ' dp-toc-panel-zoomed' : ''}`, children: collapsed ? _jsx("button", { type: "button", className: "dp-toc-trigger", "aria-label": "Open table of contents", title: "M\u1EDF m\u1EE5c l\u1EE5c", onClick: () => setCollapsed(false), children: _jsx(MdOutlineFormatListBulleted, { "aria-hidden": "true" }) }) : _jsxs("aside", { className: "dp-toc-card", children: [_jsxs("div", { className: "dp-toc-header", children: [_jsxs("div", { className: "dp-toc-window-buttons", children: [_jsx("button", { type: "button", className: "dp-toc-dot dp-toc-dot-red", "aria-label": "\u0110\u00F3ng m\u1EE5c l\u1EE5c", title: "\u0110\u00F3ng m\u1EE5c l\u1EE5c", onClick: () => { setCollapsed(true); setZoomed(false); }, children: "x" }), _jsx("button", { type: "button", className: "dp-toc-dot dp-toc-dot-yellow", "aria-label": "Thu nh\u1ECF m\u1EE5c l\u1EE5c", title: "Thu nh\u1ECF m\u1EE5c l\u1EE5c", onClick: () => { setCollapsed(true); setZoomed(false); }, children: "-" }), _jsx("button", { type: "button", className: "dp-toc-dot dp-toc-dot-green", "aria-label": zoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục', title: zoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục', onClick: () => setZoomed(value => !value), children: "+" })] }), _jsx("strong", { children: "M\u1EE5c l\u1EE5c" })] }), _jsxs("ul", { className: "dp-toc-list", children: [headings.map(heading => _jsx("li", { style: { marginLeft: `${Math.max(heading.level - 2, 0) * 16}px` }, children: _jsx("a", { href: `#${heading.id}`, className: activeId === heading.id ? 'dp-toc-active' : '', children: heading.text }) }, heading.id)), hasComments && _jsx("li", { children: _jsx("a", { href: "#comments", className: activeId === 'comments' ? 'dp-toc-active' : '', children: "Th\u1EA3o lu\u1EADn" }) })] })] }) }) })] });
}
export function PostChrome({ children, headings, title, hasComments, route }) {
    const [stickyVisible, setStickyVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const tocHeadings = headings.filter(heading => heading.level >= 2 && heading.level <= 4);
    useEffect(() => {
        const updateProgress = () => {
            const doc = document.documentElement;
            const maxScroll = doc.scrollHeight - window.innerHeight;
            setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);
    useEffect(() => {
        const heading = document.getElementById('post-main-title');
        if (!heading)
            return;
        const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' });
        observer.observe(heading);
        return () => observer.disconnect();
    }, []);
    return _jsxs("div", { className: "dp-post-chrome", children: [_jsx("div", { className: "dp-reading-progress", children: _jsx("div", { style: { transform: `scaleX(${progress})` } }) }), _jsx(FloatingToc, { headings: tocHeadings, hasComments: hasComments, initiallyCollapsed: false }), stickyVisible && title && _jsx("div", { className: "dp-sticky-title", children: _jsx("p", { children: title }) }), _jsx("div", { className: "dp-page-reveal", children: children }, route)] });
}
export function DocsChrome({ children, footer, headings, sidebar, activeRoute, title, hasComments, reveal = false }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [stickyVisible, setStickyVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const tocHeadings = headings.filter(heading => heading.level >= 2 && heading.level <= 4);
    useEffect(() => {
        const updateProgress = () => {
            const doc = document.documentElement;
            const maxScroll = doc.scrollHeight - window.innerHeight;
            setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0);
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, [activeRoute]);
    useEffect(() => {
        const firstHeading = document.querySelector('#tutorial-main-content h1, #tutorial-main-content h2');
        if (!firstHeading)
            return;
        const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' });
        observer.observe(firstHeading);
        return () => observer.disconnect();
    }, [activeRoute]);
    return _jsxs("div", { className: "davipress-body", children: [_jsx("div", { className: "dp-reading-progress", children: _jsx("div", { style: { transform: `scaleX(${progress})` } }) }), _jsx(FloatingToc, { headings: tocHeadings, hasComments: hasComments }), stickyVisible && title && _jsx("div", { className: "dp-sticky-title", children: _jsx("p", { children: title }) }), _jsx("div", { className: "dp-sidebar-spacer" }), _jsx("aside", { className: "dp-sidebar", children: _jsx(SidebarTree, { items: sidebar, activeRoute: activeRoute }) }), mobileOpen && _jsxs("div", { className: "dp-mobile-sidebar", children: [_jsx("button", { type: "button", className: "dp-mobile-sidebar-close", onClick: () => setMobileOpen(false), children: _jsxs("span", { children: [_jsx(IoMdClose, { "aria-hidden": "true" }), " ", _jsx(GiEvilBook, { "aria-hidden": "true" }), " Tutorials"] }) }), _jsx("div", { className: "dp-mobile-sidebar-inner", children: _jsx(SidebarTree, { items: sidebar, activeRoute: activeRoute }) })] }), _jsxs("main", { id: "tutorial-main-content", children: [!mobileOpen && _jsx("button", { type: "button", className: "dp-mobile-sidebar-open", onClick: () => setMobileOpen(true), children: _jsxs("span", { children: [_jsx(GiHamburgerMenu, { "aria-hidden": "true" }), " ", _jsx(GiEvilBook, { "aria-hidden": "true" }), " Tutorials"] }) }), _jsxs("div", { className: reveal ? 'dp-page-reveal' : undefined, children: [children, footer] }, reveal ? activeRoute : undefined)] })] });
}
