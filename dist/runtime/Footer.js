import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaCode, FaRss } from './icon-set.js';
const footerIconMap = {
    source: FaCode,
    rss: FaRss,
};
export function Footer({ footer }) {
    const config = typeof footer === 'string' ? { copyright: footer } : footer;
    const links = config?.links ?? [
        { type: 'source', label: 'SRC', href: 'https://github.com/2hjaito/dangth', ariaLabel: 'View source on GitHub', external: true },
        { type: 'rss', label: 'RSS', href: '/rss.xml', ariaLabel: 'View RSS feed', external: false },
    ];
    return _jsxs("footer", { className: "dp-site-footer", children: [_jsxs("p", { className: "dp-site-footer-copy", children: [_jsx("span", { children: config?.copyright ?? '© Davipress 2026' }), config?.attribution && _jsxs("span", { children: [" \u00B7 ", config.attribution.label, ' ', _jsx("a", { href: config.attribution.href, target: config.attribution.external ? '_blank' : undefined, rel: config.attribution.external ? 'noopener noreferrer' : undefined, children: config.attribution.text })] })] }), _jsx("p", { className: "dp-site-footer-links", children: links.map(link => {
                    const Icon = footerIconMap[link.type];
                    return _jsxs("a", { href: link.href, "aria-label": link.ariaLabel, target: link.external ? '_blank' : undefined, rel: link.external ? 'noopener noreferrer' : undefined, children: [_jsx(Icon, { "aria-hidden": "true" }), " ", _jsx("span", { children: link.label })] }, link.href);
                }) })] });
}
