'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaMoon, FaSun } from './icon-set.js';
import { Icon, resolveIcon } from './icons.js';
import { LOCALE_STORAGE_KEY, localizePath, parseLocale } from '../core/i18n.js';
const defaultItems = [
    { text: 'Home', link: '/', icon: 'FaUser' },
    { text: 'Projects', link: '/project', icon: 'DvTerminalBlink' },
    { text: 'Certs', link: '/cert', icon: 'FaCertificate' },
    { text: 'Tutorials', link: '/tutorials', icon: 'GiEvilBook' },
    { text: 'Posts', link: '/posts', icon: 'GiMagicPortal' },
    { text: 'Docs', link: '/docs', icon: 'GiSpellBook' },
];
function navItemInfo(item) {
    if ('text' in item)
        return { label: item.text, href: item.link, icon: item.icon };
    return { label: item[0], href: item[1], icon: undefined };
}
function navKey(href) {
    const source = href.split('/').filter(Boolean).pop() ?? 'home';
    const normalized = source.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    return normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
}
export function resolveNavIcon(icon) {
    return resolveIcon(icon);
}
export function NavBar({ items = defaultItems, navbar, logo, config }) {
    const [dark, setDark] = useState(false);
    const pathname = usePathname() ?? '/';
    const router = useRouter();
    useEffect(() => {
        const saved = localStorage.getItem('dark-mode');
        const enabled = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }, []);
    useEffect(() => { let lastY = 0; const onScroll = () => { const goingDown = window.scrollY > lastY; document.querySelector('.dp-navbar')?.classList.toggle('dp-nav-hide', goingDown); lastY = window.scrollY; }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
    function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('dark-mode', next ? 'dark' : 'light'); }
    const activePath = config ? parseLocale(pathname, config).path : pathname;
    const currentLocale = config ? parseLocale(pathname, config).locale : undefined;
    const localize = (href) => config && currentLocale ? localizePath(href, currentLocale, config) : href;
    // Trên mount và mỗi lần route đổi (kể cả nút back/forward), nếu locale đã lưu khác locale trong URL thì điều hướng lại theo locale đã lưu — giống cơ chế dark-mode.
    useEffect(() => {
        if (!config?.i18n || !currentLocale)
            return;
        const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (saved && config.i18n.locales.includes(saved) && saved !== currentLocale)
            router.replace(localizePath(activePath, saved, config));
    }, [pathname]);
    return _jsx("div", { className: "dp-navbar", children: _jsxs("div", { className: "dp-navbar-items", children: [logo && _jsx(Link, { href: localize('/'), title: "Home", className: "dp-nav-item dp-nav-logo-item nav-logo", children: _jsx("img", { src: logo, alt: "", className: "dp-nav-logo", width: 28, height: 28, decoding: "async" }) }), logo && _jsx("span", { className: "dp-nav-separator", "aria-hidden": "true" }), items.map((item, index) => { const { label, href, icon } = navItemInfo(item); const active = href === '/' ? activePath === '/' : activePath === href || activePath.startsWith(`${href.replace(/\/$/, '')}/`); return _jsx(Link, { href: localize(href), title: label, "aria-current": active ? 'page' : undefined, className: `dp-nav-item nav-${navKey(href)}${active ? ' dp-nav-item-active' : ''}`, children: _jsx(Icon, { name: icon, className: "dp-nav-icon" }) }, `${href}-${index}`); }), navbar?.showThemeToggle !== false && _jsxs(_Fragment, { children: [navbar?.showThemeSeparator !== false && _jsx("span", { className: "dp-nav-separator", "aria-hidden": "true" }), _jsx("button", { type: "button", onClick: toggle, title: "Toggle theme", className: "dp-nav-item nav-theme-toggle", children: dark ? _jsx(FaMoon, { className: "dp-nav-icon", "aria-hidden": "true" }) : _jsx(FaSun, { className: "dp-nav-icon", "aria-hidden": "true" }) })] })] }) });
}
