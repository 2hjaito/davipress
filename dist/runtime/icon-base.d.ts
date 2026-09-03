import type { SVGProps } from 'react';
type IconNode = [string, Record<string, string | number> | undefined, IconNode[]?];
export type IconData = {
    viewBox: string;
    nodes: IconNode[];
};
export type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    title?: string;
};
export declare function createIcon(icon: IconData): ({ size, width, height, title, ...rest }: IconProps) => import("react").ReactSVGElement;
export {};
