import type { DavipressFrontmatter, SidebarItem } from '../config.js';
export interface Page {
    route: string;
    source: string;
    html: string;
    text: string;
    frontmatter: DavipressFrontmatter;
    headings: {
        id: string;
        text: string;
        level: number;
    }[];
}
export declare function discover(root?: string): {
    source: string;
    route: string;
}[];
export declare function markdownToHtml(content: string): Promise<string>;
export declare function compile(source: string, root?: string): Promise<Page>;
export declare function loadPages(root?: string): Promise<Page[]>;
export declare function autoSidebar(pages: Pick<Page, 'route' | 'frontmatter'>[]): SidebarItem[];
