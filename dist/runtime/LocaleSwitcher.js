'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALE_STORAGE_KEY, localizePath, parseLocale } from '../core/i18n.js';
export function LocaleSwitcher({ config, className }) {
    const pathname = usePathname() ?? '/';
    const [open, setOpen] = useState(false);
    const closeTimerRef = useRef(null);
    const i18n = config.i18n;
    const clearCloseTimer = () => { if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
    } };
    const openMenu = () => { clearCloseTimer(); setOpen(true); };
    const closeMenuWithDelay = () => { clearCloseTimer(); closeTimerRef.current = setTimeout(() => setOpen(false), 180); };
    useEffect(() => () => clearCloseTimer(), []);
    if (!i18n || i18n.locales.length === 0)
        return null;
    const { locale: current, path } = parseLocale(pathname, config);
    const others = i18n.locales.filter(locale => locale !== current);
    const label = (locale) => i18n.localeLabels?.[locale] ?? locale.toUpperCase();
    return (_jsxs("div", { className: className ?? 'dp-locale-switcher', onMouseEnter: openMenu, onMouseLeave: closeMenuWithDelay, onFocus: openMenu, onBlur: event => { if (!event.currentTarget.contains(event.relatedTarget)) {
            clearCloseTimer();
            setOpen(false);
        } }, children: [_jsx("button", { type: "button", onClick: () => setOpen(previous => !previous), className: "dp-locale-trigger", "aria-haspopup": "menu", "aria-expanded": open, "aria-label": "Open language menu", title: "Language", children: label(current) }), open && others.length > 0 && (_jsx("div", { role: "menu", className: "dp-locale-menu", children: others.map(locale => (_jsx(Link, { href: localizePath(path, locale, config), role: "menuitem", className: "dp-locale-menu-item", onClick: () => { localStorage.setItem(LOCALE_STORAGE_KEY, locale); setOpen(false); }, "aria-label": `Switch language to ${locale}`, title: locale, children: label(locale) }, locale))) }))] }));
}
