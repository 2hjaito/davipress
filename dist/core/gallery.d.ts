export type GalleryItem = {
    title: string;
    description: string;
    image: string;
};
export declare function parseGalleryItems(content: string): GalleryItem[];
export declare function parseGalleryDirective(content: string): {
    title: string;
    items: GalleryItem[];
} | undefined;
export declare function galleryHtml(title: string, items: GalleryItem[]): string;
