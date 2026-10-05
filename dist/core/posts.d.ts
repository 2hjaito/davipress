import { resolvePostDir } from './content.js';
import type { Page } from './content.js';
export { resolvePostDir };
export declare function loadPosts(root?: string, postDir?: string): Promise<Page[]>;
