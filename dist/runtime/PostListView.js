'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaUserPen as FaUserEdit, MdCalendarRange as MdDateRange } from './icon-set.js';
import { formatDate } from './date.js';
import Link from 'next/link';
export function PostListView({ posts }) {
    const [selectedTag, setSelectedTag] = useState('');
    const tagCounts = {};
    posts.forEach((post) => {
        const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [];
        tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    const allTags = Object.entries(tagCounts)
        .filter(([, count]) => count > 1)
        .sort((a, b) => b[1] - a[1]);
    const filteredPosts = selectedTag
        ? posts.filter((post) => {
            const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [];
            return tags.includes(selectedTag);
        })
        : posts;
    return (_jsxs("div", { className: "dp-post-list", children: [_jsx("h1", { children: "B\u00E0i vi\u1EBFt" }), _jsxs("div", { className: "dp-post-filter", children: [_jsxs("button", { onClick: () => setSelectedTag(''), className: `dp-post-filter-button${selectedTag === '' ? ' dp-post-filter-button-active' : ''}`, children: ["T\u1EA5t c\u1EA3 ", _jsx("span", { children: posts.length })] }), allTags.map(([tag, count]) => (_jsxs("button", { onClick: () => setSelectedTag(tag), className: `dp-post-filter-button${selectedTag === tag ? ' dp-post-filter-button-active' : ''}`, children: [tag, " ", _jsx("span", { children: count })] }, tag)))] }), filteredPosts.length === 0 && _jsx("p", { className: "dp-post-list-empty", children: "Kh\u00F4ng t\u00ECm th\u1EA5y b\u00E0i vi\u1EBFt." }), filteredPosts.map((post) => {
                const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [];
                return (_jsxs("div", { className: "dp-post-card", children: [post.frontmatter.image && (_jsx("div", { className: "dp-post-card-image", children: _jsx(Link, { href: post.route, children: _jsx("img", { src: String(post.frontmatter.image), alt: String(post.frontmatter.title ?? ''), loading: "lazy", decoding: "async" }) }) })), _jsxs("div", { className: "dp-post-card-content", children: [_jsx(Link, { href: post.route, className: "dp-post-card-title", children: String(post.frontmatter.title ?? post.route) }), Boolean(post.frontmatter.subtitle) && (_jsx("p", { className: "dp-post-card-subtitle", children: String(post.frontmatter.subtitle) })), _jsxs("div", { className: "dp-post-card-meta", children: [Boolean(post.frontmatter.author) && (_jsxs("span", { children: [_jsx(FaUserEdit, {}), String(post.frontmatter.author)] })), Boolean(post.frontmatter.date) && (_jsxs("span", { children: [_jsx(MdDateRange, {}), formatDate(post.frontmatter.date)] }))] }), tags.length > 0 && (_jsx("div", { className: "dp-post-card-tags", children: tags.map((tag) => (_jsx("button", { onClick: () => setSelectedTag(tag), className: "dp-post-tag", children: tag }, tag))) }))] })] }, post.route));
            })] }));
}
