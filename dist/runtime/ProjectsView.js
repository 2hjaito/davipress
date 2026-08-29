'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { LangBadge } from './LangBadge.js';
import { ToolsSection } from './ToolsSection.js';
import { Footer } from './Footer.js';
function RepoCard({ name, description, url, stars, lastUpdate, techs, topics = [], license, selectedTag, onSelectTag }) {
    const formattedDate = new Date(lastUpdate).toLocaleDateString('vi-VN');
    return (_jsx("div", { className: "dp-project-card", children: _jsxs("div", { className: "dp-project-card-inner", children: [_jsxs("div", { className: "dp-project-header", children: [_jsx("a", { href: url || '#', target: "_blank", rel: "noopener noreferrer", className: "dp-project-name", children: name }), _jsxs("span", { className: "dp-project-stars", children: [_jsx(FaRegStar, { className: "dp-project-star-icon" }), " ", stars] })] }), _jsx("p", { className: "dp-project-desc", children: description || 'Không có mô tả' }), techs.length > 0 && (_jsx("div", { className: "dp-project-techs", children: techs.map((tech) => (_jsx("button", { type: "button", onClick: () => onSelectTag?.(tech.toLowerCase() === selectedTag?.toLowerCase() ? '' : tech), className: `dp-project-tag-button${tech.toLowerCase() === selectedTag?.toLowerCase() ? ' dp-project-tag-active' : ''}`, title: `Lọc theo ${tech}`, children: _jsx(LangBadge, { lang: tech }) }, tech))) })), topics && topics.length > 0 && (_jsx("div", { className: "dp-project-topics", children: topics.map((topic) => (_jsxs("button", { type: "button", onClick: () => onSelectTag?.(topic.toLowerCase() === selectedTag?.toLowerCase() ? '' : topic), className: `dp-project-topic-badge${topic.toLowerCase() === selectedTag?.toLowerCase() ? ' dp-project-topic-active' : ''}`, title: `Lọc theo #${topic}`, children: ["#", topic] }, topic))) })), _jsxs("div", { className: "dp-project-meta", children: [license && _jsx("span", { className: "dp-project-license", children: license }), _jsxs("span", { className: "dp-project-updated", children: ["Last updated ", formattedDate] })] })] }) }));
}
function ProjectsSection({ title, items }) {
    const [selectedTag, setSelectedTag] = useState('');
    const [showMoreTags, setShowMoreTags] = useState(false);
    const tagCounts = {};
    items.forEach((item) => {
        const allItemTags = [...item.techs, ...(item.topics || [])];
        allItemTags.forEach((tech) => {
            const trimmed = tech.trim();
            if (trimmed && trimmed.toLowerCase() !== 'featured') {
                const key = trimmed.toLowerCase();
                if (!tagCounts[key]) {
                    tagCounts[key] = { display: trimmed, count: 0 };
                }
                tagCounts[key].count += 1;
            }
        });
    });
    const allTags = Object.values(tagCounts).sort((a, b) => b.count - a.count || a.display.localeCompare(b.display));
    const INITIAL_LIMIT = 8;
    const hasMore = allTags.length > INITIAL_LIMIT;
    let visibleTags = allTags;
    if (hasMore && !showMoreTags) {
        visibleTags = allTags.slice(0, INITIAL_LIMIT);
        if (selectedTag) {
            const isSelectedInVisible = visibleTags.some((t) => t.display.toLowerCase() === selectedTag.toLowerCase());
            if (!isSelectedInVisible) {
                const found = allTags.find((t) => t.display.toLowerCase() === selectedTag.toLowerCase());
                if (found) {
                    visibleTags = [...visibleTags, found];
                }
            }
        }
    }
    const filteredItems = selectedTag
        ? items.filter((item) => item.techs.some((t) => t.trim().toLowerCase() === selectedTag.toLowerCase()) ||
            (item.topics &&
                item.topics.some((t) => t.trim().toLowerCase() === selectedTag.toLowerCase())))
        : items;
    return (_jsxs("section", { className: "dp-projects-section", children: [title && _jsx("h2", { className: "dp-projects-title", children: title }), allTags.length > 0 && (_jsxs("div", { className: "dp-post-filter dp-project-filter", children: [_jsxs("button", { type: "button", onClick: () => setSelectedTag(''), className: `dp-post-filter-button${selectedTag === '' ? ' dp-post-filter-button-active' : ''}`, children: ["T\u1EA5t c\u1EA3 ", _jsx("span", { children: items.length })] }), visibleTags.map(({ display, count }) => {
                        const isActive = selectedTag.toLowerCase() === display.toLowerCase();
                        return (_jsxs("button", { type: "button", onClick: () => setSelectedTag(isActive ? '' : display), className: `dp-post-filter-button${isActive ? ' dp-post-filter-button-active' : ''}`, children: [display, " ", _jsx("span", { children: count })] }, display));
                    }), hasMore && (_jsx("button", { type: "button", onClick: () => setShowMoreTags((prev) => !prev), className: "dp-post-filter-button dp-project-filter-more", children: showMoreTags
                            ? 'Thu gọn'
                            : `+ Xem thêm (${allTags.length - visibleTags.length})` }))] })), filteredItems.length === 0 && (_jsx("p", { className: "dp-post-list-empty", children: "Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EF1 \u00E1n ph\u00F9 h\u1EE3p." })), _jsx("div", { className: "dp-projects-grid", children: filteredItems.map((repo) => (_jsx(RepoCard, { ...repo, selectedTag: selectedTag, onSelectTag: (tag) => setSelectedTag(tag) }, repo.name))) })] }));
}
export function ProjectsView({ blocks, footer }) {
    return (_jsxs("div", { className: "dp-projects-view", children: [blocks.map((block, index) => {
                if (block.type === 'markdown') {
                    return (_jsx("section", { className: "dp-projects-markdown markdown-body", dangerouslySetInnerHTML: { __html: block.html } }, index));
                }
                if (block.type === 'projects') {
                    return _jsx(ProjectsSection, { title: block.title, items: block.items }, index);
                }
                if (block.type === 'tools') {
                    return _jsx(ToolsSection, { title: block.title, items: block.items }, index);
                }
                return null;
            }), _jsx(Footer, { footer: footer })] }));
}
