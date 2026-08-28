import path from 'node:path';
import { compile, discover } from './content.js';
export async function loadPosts(root = path.resolve(process.cwd(), 'docs')) {
    const postsDir = path.join(root, 'posts');
    const entries = discover(root).filter(item => path.relative(postsDir, item.source).split(path.sep)[0] !== '..');
    const pages = await Promise.all(entries.map(item => compile(item.source, root)));
    return pages
        .filter(page => page.frontmatter.published !== false)
        .sort((a, b) => String(b.frontmatter.date ?? '').localeCompare(String(a.frontmatter.date ?? '')));
}
