#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const cwd = process.cwd();
const generated = path.join(cwd, '.davipress');
const require = createRequire(import.meta.url);
function writeIfMissing(file, content) {
    if (!fs.existsSync(file)) {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, content);
    }
}
function linkPublicDir() {
    const source = path.join(cwd, 'public');
    const target = path.join(generated, 'public');
    if (!fs.existsSync(source))
        return;
    if (fs.existsSync(target) || fs.lstatSync(target, { throwIfNoEntry: false })) {
        if (fs.lstatSync(target).isSymbolicLink())
            fs.unlinkSync(target);
        else
            return;
    }
    fs.mkdirSync(generated, { recursive: true });
    try {
        fs.symlinkSync(source, target, 'dir');
    }
    catch {
        fs.cpSync(source, target, { recursive: true });
    }
}
function writeGeneratedRoutes() {
    const rssRoute = path.join(generated, 'app/rss.xml/route.ts');
    const robotsRoute = path.join(generated, 'app/robots.txt/route.ts');
    fs.mkdirSync(path.dirname(rssRoute), { recursive: true });
    fs.mkdirSync(path.dirname(robotsRoute), { recursive: true });
    fs.writeFileSync(rssRoute, `import config from '../../../davipress.config'
import { loadPosts } from 'davipress/runtime'

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!)
}

function siteUrl() {
  return String(config.url ?? 'http://localhost:3000').replace(/\\/$/, '')
}

export async function GET() {
  const baseUrl = siteUrl()
  const posts = await loadPosts()
  const items = posts.map(post => {
    const url = baseUrl + post.route
    const date = String(post.frontmatter.updated ?? post.frontmatter.date ?? new Date().toISOString())
    return \`<item><title>\${escapeXml(String(post.frontmatter.title ?? post.route))}</title><description>\${escapeXml(String(post.frontmatter.description ?? ''))}</description><link>\${escapeXml(url)}</link><guid isPermaLink="true">\${escapeXml(url)}</guid><pubDate>\${new Date(date).toUTCString()}</pubDate></item>\`
  }).join('')
  const xml = \`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>\${escapeXml(String(config.title ?? 'Davipress'))}</title><description>\${escapeXml(String(config.description ?? ''))}</description><link>\${escapeXml(baseUrl)}</link><lastBuildDate>\${new Date().toUTCString()}</lastBuildDate><language>\${escapeXml(String(config.lang ?? 'en'))}</language>\${items}</channel></rss>\`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
`);
    fs.writeFileSync(robotsRoute, `import config from '../../../davipress.config'

export function GET() {
  const baseUrl = String(config.url ?? 'http://localhost:3000').replace(/\\/$/, '')
  return new Response(\`User-agent: *\\nAllow: /\\n\\nSitemap: \${baseUrl}/sitemap.xml\\n\`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
`);
}
function generate() {
    if (!fs.existsSync(path.join(cwd, 'package.json')))
        throw new Error('Davipress: package.json is required. Run npm init first.');
    fs.mkdirSync(path.join(cwd, 'docs'), { recursive: true });
    writeIfMissing(path.join(cwd, 'docs/index.md'), '---\ntitle: Welcome\ndescription: Documentation built with Davipress\n---\n\n# Welcome\n\nStart writing your documentation in Markdown.\n');
    writeIfMissing(path.join(cwd, 'davipress.config.ts'), "import { defineConfig } from 'davipress'\n\nexport default defineConfig({\n  title: 'My Documentation',\n  description: 'Documentation built with Davipress',\n  themeConfig: { sidebar: 'auto' }\n})\n");
    writeIfMissing(path.join(cwd, '.gitignore'), 'node_modules\n.next\n.davipress\n');
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
    pkg.type = 'module';
    pkg.scripts ??= {};
    for (const [name, command] of Object.entries({ dev: 'davipress dev', build: 'davipress build', start: 'davipress start', clean: 'davipress clean' }))
        pkg.scripts[name] ??= command;
    fs.writeFileSync(path.join(cwd, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
    writeIfMissing(path.join(generated, 'next.config.mjs'), "const nextConfig = { transpilePackages: ['davipress'] }\nexport default nextConfig\n");
    const globalsCss = ['globals.css', 'src/globals.css'].find(file => fs.existsSync(path.join(cwd, file)));
    const globalsImport = globalsCss ? `\nimport '../../${globalsCss}'` : '';
    fs.mkdirSync(path.join(generated, 'app'), { recursive: true });
    fs.writeFileSync(path.join(generated, 'app/layout.tsx'), `import 'davipress/theme/styles.css'${globalsImport}\nimport type { ReactNode } from 'react'\nimport { CodeBlockControls } from 'davipress/runtime'\nexport default function Layout({ children }: { children: ReactNode }) { return <html lang="en"><body suppressHydrationWarning><CodeBlockControls />{children}</body></html> }\n`);
    fs.writeFileSync(path.join(generated, 'app/not-found.tsx'), "import { NotFoundView } from 'davipress/runtime'\nexport const metadata = { title: '404 - Không tìm thấy trang', robots: { index: false, follow: false } }\nexport default function NotFound() { return <NotFoundView /> }\n");
    linkPublicDir();
    writeGeneratedRoutes();
    fs.writeFileSync(path.join(generated, 'app/[[...slug]]/page.tsx'), "import config from '../../../davipress.config'\nimport { notFound } from 'next/navigation'\nimport { DocsPage, docsMetadata, generateStaticParams as getParams } from 'davipress/runtime'\nexport const generateStaticParams = getParams\nexport async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) { return docsMetadata({ ...(await params), config }) }\nexport default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) { const content = await DocsPage({ ...(await params), config }); return content ?? notFound() }\n");
    if (fs.existsSync(path.join(generated, 'tsconfig.json')))
        fs.unlinkSync(path.join(generated, 'tsconfig.json'));
    writeIfMissing(path.join(generated, 'generated.json'), JSON.stringify({ davipressVersion: '0.1.0', generatorVersion: '1' }, null, 2));
}
function runNext(command, args) {
    generate();
    const nextBin = require.resolve('next/dist/bin/next', { paths: [cwd] });
    const result = spawnSync(process.execPath, [nextBin, command, generated, ...args], { cwd, stdio: 'inherit' });
    process.exitCode = result.status ?? 1;
}
const command = process.argv[2] ?? 'help';
if (command === 'init') {
    generate();
    console.log('Davipress: initialized docs, config, and generated runtime.');
}
else if (['dev', 'build', 'start'].includes(command))
    runNext(command, process.argv.slice(3));
else if (command === 'clean') {
    if (fs.existsSync(generated))
        fs.rmSync(generated, { recursive: true });
    console.log('Davipress: removed generated runtime.');
}
else
    console.log('Usage: davipress init | dev | build | start | clean');
