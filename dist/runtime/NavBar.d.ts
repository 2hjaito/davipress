import type { DaviIcon } from './icons.js';
import type { DavipressConfig, NavbarConfig, NavItem } from '../config.js';
type NavBarItem = readonly [string, string] | NavItem;
export type NavIcon = DaviIcon;
export declare function resolveNavIcon(icon?: string): NavIcon | undefined;
export declare function NavBar({ items, navbar, logo, config }: {
    items?: readonly NavBarItem[];
    navbar?: NavbarConfig;
    logo?: string;
    config?: DavipressConfig;
}): import("react").JSX.Element;
export {};
