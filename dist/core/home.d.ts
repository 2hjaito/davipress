export type HomeBlock = {
    type: 'markdown';
    html: string;
} | {
    type: 'hero';
    title: string;
    description: string;
    socials: {
        icon: string;
        link: string;
        label: string;
    }[];
    avatars?: string[];
} | {
    type: 'avt';
    avatars: string[];
} | {
    type: 'expand-list';
    title?: string;
    items: {
        title: string;
        subtitle: string;
        meta: string;
        logo?: string;
        content: string;
    }[];
} | {
    type: 'github-contributions';
    title?: string;
} | {
    type: 'certifications';
    title?: string;
    items: {
        img: string;
        title: string;
        org: string;
        date: string;
    }[];
};
export declare function loadHome(root?: string): Promise<{
    title: string;
    blocks: HomeBlock[];
}>;
