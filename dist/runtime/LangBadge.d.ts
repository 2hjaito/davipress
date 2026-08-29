import type { IconType } from 'react-icons';
type IconEntry = {
    icon: IconType;
    color?: string;
};
export declare const techIconMap: Record<string, IconEntry>;
export declare function LangBadge({ lang }: {
    lang: string;
}): import("react").JSX.Element;
export {};
