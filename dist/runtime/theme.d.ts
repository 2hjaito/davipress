import type { DavipressConfig } from '../config.js';
import type { Page } from '../core/content.js';
import './theme.css';
import './theme-dark.css';
export declare function DocsTheme({ page, config }: {
    page: Page;
    config: DavipressConfig;
}): Promise<import("react").JSX.Element>;
