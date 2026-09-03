export type IconData = {
    viewBox: string;
    nodes: unknown[];
};
/** Icon names referenced from a site's config and content, e.g. `icon: DiPhotoshop`. */
export declare function findIconNames(cwd: string): string[];
/** Reads icon definitions straight out of the davi-icons pack sources so only the used ones get bundled. */
export declare function extractIcons(names: string[], packsDir: string): Record<string, IconData>;
