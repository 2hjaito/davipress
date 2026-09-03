import type { ComponentType } from 'react';
import type { IconData } from './icon-base.js';
export type DaviIcon = ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
}>;
export declare function registerIcons(icons: Record<string, IconData>): void;
export declare function resolveIcon(name?: string): DaviIcon | undefined;
export declare function Icon({ name, className, fallback }: {
    name?: string;
    className?: string;
    fallback?: DaviIcon;
}): import("react").JSX.Element;
