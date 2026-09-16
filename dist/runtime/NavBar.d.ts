import type { DaviIcon } from './icons.js';
import type { DavipressConfig, NavItem } from '../config.js';
type NavBarItem = readonly [string, string] | NavItem;
export type NavIcon = DaviIcon;
export declare function resolveNavIcon(icon?: string): NavIcon | undefined;
export declare function NavBar({ items, navbar, logo, config }: {
    items?: readonly NavBarItem[];
    navbar?: {
        showThemeToggle?: boolean;
        showThemeSeparator?: boolean;
    };
    logo?: string;
    config?: DavipressConfig;
}): import("react").JSX.Element;
export {};
