'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCertificate, FaMoon, FaSpinner, FaSun, FaUser } from 'react-icons/fa';
import { GiEvilBook, GiMagicPortal, GiSpellBook } from 'react-icons/gi';
import { Projects } from './Projects.js';
const defaultItems = [
    ['Home', '/'], ['Projects', '/project'], ['Certs', '/cert'],
    ['Tutorials', '/tutorials'], ['Posts', '/posts'], ['Docs', '/docs']
];
const iconMap = {
    Home: FaUser,
    Projects,
    Certs: FaCertificate,
    Tutorials: GiEvilBook,
    Posts: GiMagicPortal,
    Docs: GiSpellBook,
};
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
    return _jsx("div", { className: "dp-navbar", children: _jsxs("div", { className: "dp-navbar-items", children: [items.map(item => { const label = 'text' in item ? item.text : item[0]; const href = 'text' in item ? item.link : item[1]; const Icon = iconMap[label] ?? GiSpellBook; return _jsx(Link, { href: href, title: label, onClick: () => setActive(href), className: "dp-nav-item", children: active === href ? _jsx(FaSpinner, { className: "dp-spin", "aria-hidden": "true" }) : _jsx(Icon, { "aria-hidden": "true" }) }, href); }), _jsx("button", { type: "button", onClick: toggle, title: "Toggle theme", className: "dp-nav-item", children: dark ? _jsx(FaMoon, { "aria-hidden": "true" }) : _jsx(FaSun, { "aria-hidden": "true" }) })] }) });
}
