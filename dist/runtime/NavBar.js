'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export function NavBar({ items = defaultItems }) {
    const [dark, setDark] = useState(false);
    const [active, setActive] = useState(null);
    useEffect(() => {
        const saved = localStorage.getItem('dark-mode');
        const enabled = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }, []);
    useEffect(() => { let lastY = 0; const onScroll = () => { const goingDown = window.scrollY > lastY; document.querySelector('.dp-navbar')?.classList.toggle('dp-nav-hide', goingDown); lastY = window.scrollY; }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
    function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('dark-mode', next ? 'dark' : 'light'); }
    return _jsx("div", { className: "dp-navbar", children: _jsxs("div", { className: "dp-navbar-items", children: [items.map(item => { const { label, href, icon } = navItemInfo(item); const Icon = resolveIcon(icon); return _jsx(Link, { href: href, title: label, onClick: () => setActive(href), className: "dp-nav-item", children: active === href ? _jsx(FaIcons.FaSpinner, { className: "dp-nav-icon dp-spin", "aria-hidden": "true" }) : _jsx(Icon, { className: "dp-nav-icon", "aria-hidden": true }) }, href); }), _jsx("button", { type: "button", onClick: toggle, title: "Toggle theme", className: "dp-nav-item", children: dark ? _jsx(FaIcons.FaMoon, { className: "dp-nav-icon", "aria-hidden": "true" }) : _jsx(FaIcons.FaSun, { className: "dp-nav-icon", "aria-hidden": "true" }) })] }) });
}
