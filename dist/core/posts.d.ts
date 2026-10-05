import type { Page } from './content.js';
export declare function resolvePostDir(root: string, postDir?: string): string;
export declare function loadPosts(root?: string, postDir?: string): Promise<Page[]>;
