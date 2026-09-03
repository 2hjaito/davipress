'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createIcon } from './icon-base.js';
import { FaBook, FaCertificate, FaGear, FaGraduationCap, FaHouse, FaLayerGroup, FaMoon, FaPenNib, FaRocket, FaSun, FaUser, GiEvilBook, GiFrogPrince, GiMagicPortal, GiSpellBook, DvAnkhWingsTome, DvTerminalBlink, TbBrandAdobe } from './icon-set.js';
/** Statically bundled icons: everything the default theme can render without a network round-trip. */
const coreIcons = {
    FaBook,
    FaCertificate,
    FaGear,
    FaGraduationCap,
    FaHouse,
    FaLayerGroup,
    FaMoon,
    FaPenNib,
    FaRocket,
    FaSun,
    FaUser,
    GiEvilBook,
    GiFrogPrince,
    GiMagicPortal,
    GiSpellBook,
    DvAnkhWingsTome,
    DvTerminalBlink,
    TbBrandAdobe
};
/** Icons the CLI extracted from the site's own config and content, registered before the first render. */
const siteIcons = {};
export function registerIcons(icons) {
    for (const [name, data] of Object.entries(icons))
        siteIcons[name] ??= createIcon(data);
}
export function resolveIcon(name) {
    if (!name)
        return undefined;
    return coreIcons[name] ?? siteIcons[name];
}
export function Icon({ name, className, fallback }) {
    const Resolved = resolveIcon(name) ?? fallback;
    // Placeholder keeps the icon slot at its final size when a name cannot be resolved.
    if (!Resolved)
        return _jsx("span", { className: className, "aria-hidden": "true" });
    return _jsx(Resolved, { className: className, "aria-hidden": true });
}
