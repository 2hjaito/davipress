import type { DavipressConfig } from '../config.js';
export { loadPosts } from '../core/posts.js';
export { CodeBlockControls } from './CodeBlockControls.js';
export { ImageZoomClient } from './ImageZoomClient.js';
export { NotFoundView } from './NotFoundView.js';
export declare function generateStaticParams(): Promise<{
    slug: string[];
}[]>;
export declare function DocsPage({ slug, config }: {
    slug?: string[];
    config: DavipressConfig;
}): Promise<import("react").JSX.Element | null>;
export declare function docsMetadata({ slug, config }: {
    slug?: string[];
    config: DavipressConfig;
}): Promise<{
    openGraph: {
        title: string;
        description: string | undefined;
        type: string;
    };
    metadataBase?: URL | undefined;
    alternates?: {
        canonical: string;
    } | undefined;
    title: string;
    description: string | undefined;
}>;
