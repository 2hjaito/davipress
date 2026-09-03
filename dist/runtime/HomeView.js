'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Footer } from './Footer.js';
import { AvatarStack } from './AvatarStack.js';
import { GithubContributions } from './GithubContributions.js';
import { FiGithub, FiYoutube, TbBrandLinkedin as LuLinkedin, TbBrandFacebook as LuFacebook, TbBrandHackerrank, TbBrandTiktok, SiLeetcode } from './icon-set.js';
const socialIcons = { github: FiGithub, leetcode: SiLeetcode, hackerrank: TbBrandHackerrank, linkedin: LuLinkedin, youtube: FiYoutube, facebook: LuFacebook, tiktok: TbBrandTiktok };
function ExpandItem({ item }) {
    const [open, setOpen] = useState(false);
    return _jsxs("article", { className: `dp-expand-item${open ? ' dp-expand-item-open' : ''}`, children: [_jsxs("div", { className: "dp-expand-title", role: "button", tabIndex: 0, onClick: () => setOpen(value => !value), onKeyDown: event => { if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setOpen(value => !value);
                } }, children: [_jsxs("span", { className: "dp-expand-heading", children: [item.logo && _jsx("img", { src: item.logo, alt: "", className: "dp-expand-logo", loading: "lazy", decoding: "async" }), _jsxs("span", { className: "dp-expand-heading-text", children: [_jsxs("span", { className: "dp-expand-heading-title", children: [item.title, _jsx("span", { className: "dp-expand-arrow", children: "\u203A" })] }), _jsx("small", { children: item.subtitle })] })] }), _jsx("strong", { children: item.meta })] }), _jsx("div", { className: "dp-expand-details", children: _jsx("div", { className: "dp-expand-details-inner", children: item.content }) })] });
}
export function HomeView({ blocks, footer }) {
    const hero = blocks.find((block) => block.type === 'hero');
    const githubUsername = hero?.socials.find(social => social.icon === 'github')?.link.match(/github\.com\/([^/?#]+)/)?.[1];
    return _jsxs("div", { className: "dp-home-view", children: [blocks.map((block, index) => {
                if (block.type === 'hero')
                    return _jsxs("section", { children: [_jsxs("div", { className: "dp-hero", children: [_jsxs("div", { className: "dp-hero-copy", children: [_jsx("h1", { children: block.title }), _jsx("p", { className: "dp-hero-name", children: block.title }), _jsx("p", { children: block.description })] }), _jsx(AvatarStack, { avatars: block.avatars })] }), _jsx("div", { className: "dp-socials", children: block.socials.map(social => { const Icon = socialIcons[social.icon]; return Icon ? _jsx("a", { href: social.link, target: "_blank", rel: "noreferrer", title: social.label, "aria-label": social.label, children: _jsx(Icon, { size: 20 }) }, social.label) : null; }) })] }, index);
                if (block.type === 'markdown')
                    return _jsx("section", { className: "dp-home-markdown", dangerouslySetInnerHTML: { __html: block.html } }, index);
                if (block.type === 'expand-list')
                    return block.title
                        ? _jsxs("section", { className: "dp-home-section", children: [_jsx("h2", { children: block.title }), block.items.map(item => _jsx(ExpandItem, { item: item }, `${item.title}-${item.meta}`))] }, index)
                        : _jsx("div", { className: "dp-expand-group", children: block.items.map(item => _jsx(ExpandItem, { item: item }, `${item.title}-${item.meta}`)) }, index);
                if (block.type === 'github-contributions')
                    return _jsxs("section", { className: "dp-home-section dp-github-section", children: [block.title && _jsx("h2", { children: block.title }), githubUsername ? _jsx(GithubContributions, { username: githubUsername }) : _jsx("div", { className: "dp-github-placeholder", children: "GitHub contributions" })] }, index);
                if (block.type === 'avt')
                    return null;
                if (block.type === 'certifications') {
                    const certifications = block;
                    return _jsxs("section", { className: "dp-home-section dp-certifications", children: [_jsx("h2", { children: certifications.title }), _jsx("div", { className: "dp-cert-grid", children: certifications.items.map(item => { const imageSrc = item.img.startsWith('/') ? item.img : `/images/cert/${item.img}`; return _jsxs("div", { className: "dp-certification", children: [_jsx("div", { className: "dp-cert-image", children: _jsx("img", { src: imageSrc, alt: item.title, loading: "lazy", decoding: "async" }) }), _jsx("strong", { children: item.title }), _jsx("span", { children: item.org }), _jsx("small", { children: item.date })] }, item.title); }) })] }, index);
                }
                return null;
            }), _jsx(Footer, { footer: footer })] });
}
