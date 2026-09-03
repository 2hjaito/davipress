import type { ComponentType } from 'react';
import type { IconProps as DaviIconProps } from './icon-base.js';
type IconEntry = {
    icon: ComponentType<DaviIconProps>;
    color?: string;
};
export declare const techIconMap: Record<string, IconEntry>;
export declare function LangBadge({ lang }: {
    lang: string;
}): import("react").JSX.Element;
export {};
