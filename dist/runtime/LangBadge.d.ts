import type { ComponentType } from 'react';
import type { DaviIconProps } from 'davi-icons';
type IconEntry = {
    icon: ComponentType<DaviIconProps>;
    color?: string;
};
export declare const techIconMap: Record<string, IconEntry>;
export declare function LangBadge({ lang }: {
    lang: string;
}): import("react").JSX.Element;
export {};
