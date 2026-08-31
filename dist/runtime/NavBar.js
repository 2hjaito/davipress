'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as FaIcons from 'davi-icons/fa';
import * as FiIcons from 'davi-icons/fi';
import * as GiIcons from 'davi-icons/gi';
import * as IoIcons from 'davi-icons/io';
import * as LuIcons from 'davi-icons/lu';
import * as MdIcons from 'davi-icons/md';
import * as RiIcons from 'davi-icons/ri';
import * as SiIcons from 'davi-icons/si';
import * as TbIcons from 'davi-icons/tb';
import * as TiIcons from 'davi-icons/ti';
import { Projects } from './Projects.js';
const defaultItems = [
    { text: 'Home', link: '/', icon: 'FaUser' },
    { text: 'Projects', link: '/project', icon: 'Projects' },
    { text: 'Certs', link: '/cert', icon: 'FaCertificate' },
    { text: 'Tutorials', link: '/tutorials', icon: 'GiEvilBook' },
    { text: 'Posts', link: '/posts', icon: 'GiMagicPortal' },
    { text: 'Docs', link: '/docs', icon: 'GiSpellBook' },
];
const iconMap = {
    ...FaIcons,
    ...FiIcons,
    ...GiIcons,
    ...IoIcons,
    ...LuIcons,
    ...MdIcons,
    ...RiIcons,
    ...SiIcons,
    ...TbIcons,
    ...TiIcons,
    Projects,
};
function navItemInfo(item) {
    if ('text' in item)
        return { label: item.text, href: item.link, icon: item.icon };
    return { label: item[0], href: item[1], icon: undefined };
}
export function resolveNavIcon(icon) {
    return icon ? iconMap[icon] : undefined;
}
function resolveIcon(icon) {
    return resolveNavIcon(icon) ?? iconMap.GiSpellBook;
}
export function NavBar({ items = defaultItems, navbar, logo }) {
    const [dark, setDark] = useState(false);
    const [pathname, setPathname] = useState('');
    useEffect(() => {
        const saved = localStorage.getItem('dark-mode');
        const enabled = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }, []);
    useEffect(() => {
        const syncPathname = () => setPathname(window.location.pathname);
        syncPathname();
        window.addEventListener('popstate', syncPathname);
        return () => window.removeEventListener('popstate', syncPathname);
    }, []);
    useEffect(() => { let lastY = 0; const onScroll = () => { const goingDown = window.scrollY > lastY; document.querySelector('.dp-navbar')?.classList.toggle('dp-nav-hide', goingDown); lastY = window.scrollY; }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
    function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('dark-mode', next ? 'dark' : 'light'); }
    return _jsx("div", { className: "dp-navbar", children: _jsxs("div", { className: "dp-navbar-items", children: [logo && _jsx(Link, { href: "/", title: "Home", className: "dp-nav-item dp-nav-logo-item", onClick: () => setPathname('/'), children: _jsx("img", { src: logo, alt: "", className: "dp-nav-logo" }) }), logo && _jsx("span", { className: "dp-nav-separator", "aria-hidden": "true" }), items.map(item => { const { label, href, icon } = navItemInfo(item); const Icon = resolveIcon(icon); const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href.replace(/\/$/, '')}/`); return _jsx(Link, { href: href, title: label, "aria-current": active ? 'page' : undefined, onClick: () => setPathname(href), className: `dp-nav-item${active ? ' dp-nav-item-active' : ''}`, children: _jsx(Icon, { className: "dp-nav-icon", "aria-hidden": true }) }, href); }), navbar?.showThemeToggle !== false && _jsxs(_Fragment, { children: [navbar?.showThemeSeparator !== false && _jsx("span", { className: "dp-nav-separator", "aria-hidden": "true" }), _jsx("button", { type: "button", onClick: toggle, title: "Toggle theme", className: "dp-nav-item", children: dark ? _jsx(FaIcons.FaMoon, { className: "dp-nav-icon", "aria-hidden": "true" }) : _jsx(FaIcons.FaSun, { className: "dp-nav-icon", "aria-hidden": "true" }) })] })] }) });
}
