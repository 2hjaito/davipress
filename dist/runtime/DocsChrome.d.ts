import type { SidebarItem } from '../config.js';
type Heading = {
    id: string;
    text: string;
    level: number;
};
export declare function PostChrome({ children, footer, headings, title, hasComments, route }: {
    children: React.ReactNode;
    footer: React.ReactNode;
    headings: Heading[];
    title: string;
    hasComments: boolean;
    route: string;
}): import("react").JSX.Element;
export declare function DocsChrome({ children, footer, headings, sidebar, activeRoute, title, hasComments, sectionLabel, sectionIcon, reveal }: {
    children: React.ReactNode;
    footer: React.ReactNode;
    headings: Heading[];
    sidebar: readonly SidebarItem[];
    activeRoute: string;
    title: string;
    hasComments: boolean;
    sectionLabel?: string;
    sectionIcon?: string;
    reveal?: boolean;
}): import("react").JSX.Element;
export {};
