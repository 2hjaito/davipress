import type { DaviIcon } from './icons.js';
import type { NavItem } from '../config.js';
type NavBarItem = readonly [string, string] | NavItem;
export type NavIcon = DaviIcon;
export declare function resolveNavIcon(icon?: string): NavIcon | undefined;
export declare function NavBar({ items, navbar, logo }: {
    items?: readonly NavBarItem[];
    navbar?: {
        showThemeToggle?: boolean;
        showThemeSeparator?: boolean;
    };
    logo?: string;
}): import("react").JSX.Element;
export {};
