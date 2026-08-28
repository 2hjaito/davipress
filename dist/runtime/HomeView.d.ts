import type { HomeBlock } from '../core/home.js';
import type { FooterConfig } from '../config.js';
export declare function HomeView({ blocks, footer }: {
    blocks: HomeBlock[];
    footer?: string | FooterConfig;
}): import("react").JSX.Element;
