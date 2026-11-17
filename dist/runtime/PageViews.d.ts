/**
 * Counts one view of `path` when the page mounts (and again whenever `path` changes, so client-side
 * navigation counts too), then shows the total if `show` is set. The API dedupes repeat visits.
 */
export declare function PageViews({ endpoint, path, show }: {
    endpoint: string;
    path: string;
    show: boolean;
}): import("react").JSX.Element | null;
