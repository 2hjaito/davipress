import type { Page } from './content.js';
import type { DavipressConfig } from '../config.js';
export interface ProjectItem {
    name: string;
    description?: string;
    url?: string;
    stars: number;
    lastUpdate: string;
    techs: string[];
    topics?: string[];
    license?: string;
}
export interface ToolItem {
    title: string;
    icon?: string;
    description?: string;
    href?: string;
}
export type ProjectBlock = {
    type: 'markdown';
    html: string;
} | {
    type: 'projects';
    title?: string;
    items: ProjectItem[];
    sort?: string;
} | {
    type: 'tools';
    title?: string;
    items: ToolItem[];
};
export declare function loadProjects(page?: Page, config?: DavipressConfig, root?: string): Promise<{
    title: string;
    blocks: ProjectBlock[];
}>;
