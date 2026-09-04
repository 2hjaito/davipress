import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkAdmonition from './remarkAdmonition.js';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
function rehypeLazyImages() {
    return (tree) => {
        const visit = (node) => {
            if (node.tagName === 'img') {
                node.properties ??= {};
                node.properties.loading ??= 'lazy';
                node.properties.decoding ??= 'async';
            }
            for (const child of node.children ?? [])
                visit(child);
        };
        visit(tree);
    };
}
const sanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames ?? []), 'svg', 'circle', 'path'],
    attributes: {
        ...defaultSchema.attributes,
        a: [...(defaultSchema.attributes?.a ?? []).filter(attribute => (Array.isArray(attribute) ? attribute[0] : attribute) !== 'className'), 'className'],
        div: [...(defaultSchema.attributes?.div ?? []), 'className'],
        h1: [...(defaultSchema.attributes?.h1 ?? []), 'className'],
        img: [...(defaultSchema.attributes?.img ?? []), 'className'],
        p: [...(defaultSchema.attributes?.p ?? []), 'className'],
        span: [...(defaultSchema.attributes?.span ?? []), 'className'],
        svg: ['aria-hidden', 'className', 'viewBox'],
        circle: ['cx', 'cy', 'r', 'fill', 'fillOpacity', 'stroke', 'strokeWidth'],
        path: ['d', 'fill'],
    },
};
function files(dir) {
    if (!fs.existsSync(dir))
        return [];
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : /\.mdx?$/.test(entry.name) ? [path.join(dir, entry.name)] : []);
}
function routeFor(root, file) {
    const relative = path.relative(root, file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
    const route = relative === 'index' ? '' : relative.endsWith('/index') ? relative.slice(0, -6) : relative;
    return `/${route}`.replace(/\/+/g, '/') || '/';
}
function resolveRoute(root, file) {
    const fileRoute = routeFor(root, file);
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    if (typeof data.slug !== 'string' || !data.slug)
        return fileRoute;
    return `${path.posix.dirname(fileRoute)}/${data.slug}`.replace(/\/+/g, '/');
}
export function discover(root = path.resolve(process.cwd(), 'docs')) {
    const entries = files(root).map(source => ({ source, route: resolveRoute(root, source) }));
    const routes = new Map();
    for (const entry of entries) {
        const previous = routes.get(entry.route);
        if (previous)
            throw new Error(`Duplicate content route "${entry.route}" in ${previous} and ${entry.source}`);
        routes.set(entry.route, entry.source);
    }
    return entries;
}
export async function markdownToHtml(content) {
    const result = await remark().use(remarkGfm).use(remarkMath).use(remarkAdmonition).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeSanitize, sanitizeSchema).use(rehypeKatex, { strict: false }).use(rehypeHighlight).use(rehypeSlug).use(rehypeAutolinkHeadings, { behavior: 'wrap' }).use(rehypeLazyImages).use(rehypeStringify, { allowDangerousHtml: true }).process(content);
    return result.toString();
}
export async function compile(source, root = path.resolve(process.cwd(), 'docs')) {
    const raw = fs.readFileSync(source, 'utf8');
    const parsed = matter(raw);
    const first = parsed.content.match(/^#\s+(.+)$/m)?.[1]?.trim();
    const content = parsed.data.title ? parsed.content : parsed.content.replace(/^#\s+.+\n+(?:\n)*/m, '');
    const html = await markdownToHtml(content);
    const headings = [...html.matchAll(/<h([1-6])\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)].map(match => {
        const text = match[3].replace(/<[^>]+>/g, '').trim();
        return { level: Number(match[1]), id: match[2], text };
    });
    return { route: resolveRoute(root, source), source, html, text: content.replace(/[#_*`>\-]/g, ''), frontmatter: { ...parsed.data, title: parsed.data.title ?? first }, headings };
}
const pagesCache = new Map();
export function loadPages(root = path.resolve(process.cwd(), 'docs')) {
    const entries = discover(root);
    const fingerprint = entries.map(item => {
        const stat = fs.statSync(item.source);
        return `${item.source}:${stat.size}:${stat.mtimeMs}`;
    }).join('|');
    const cached = pagesCache.get(root);
    if (cached?.fingerprint === fingerprint)
        return cached.pages;
    const pages = Promise.all(entries.map(item => compile(item.source, root)));
    pagesCache.set(root, { fingerprint, pages });
    return pages;
}
export function autoSidebar(pages) {
    return [...pages].sort((a, b) => (Number(a.frontmatter.sidebar_position ?? 9999) - Number(b.frontmatter.sidebar_position ?? 9999)) || a.route.localeCompare(b.route)).map(page => ({ text: String((page.frontmatter.sidebar_label ?? page.frontmatter.title ?? page.route.slice(1)) || 'Home'), link: page.route }));
}
