import type { ComponentType } from 'react';
import type { NavItem } from '../config.js';
type NavBarItem = readonly [string, string] | NavItem;
export type NavIcon = ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
}>;
export declare function resolveNavIcon(icon?: string): NavIcon | undefined;
export declare function NavBar({ items }: {
    items?: readonly NavBarItem[];
}): import("react").JSX.Element;
export {};
