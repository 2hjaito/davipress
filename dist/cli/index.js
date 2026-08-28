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
    const packageFile = path.join(cwd, 'package.json');
    if (!fs.existsSync(packageFile)) {
        const projectName = path.basename(cwd).toLowerCase().replace(/[^a-z0-9._-]+/g, '-') || 'davipress-site';
        fs.writeFileSync(packageFile, `${JSON.stringify({ name: projectName, version: '0.1.0', private: true, type: 'module', dependencies: { davipress: '^0.1.0' } }, null, 2)}\n`);
    }
    fs.mkdirSync(path.join(cwd, 'docs'), { recursive: true });
    writeIfMissing(path.join(cwd, 'docs/index.md'), `---
  title: My Davipress Site
  description: A documentation and portfolio site built with Davipress
  ---

  :::davi:hero
  title: Your Name
  description: Fullstack Developer and technical writer
  social: github | https://github.com/your-name | GitHub
  social: linkedin | https://www.linkedin.com/in/your-name | LinkedIn
  :::

  :::davi:avt
  /images/profile/1.svg
  /images/profile/2.svg
  /images/profile/3.svg
  :::

  Welcome to your new Davipress site. Replace this paragraph with a short introduction.

  ## Experience
  :::davi:expand-list
  title: Fullstack Development
  subtitle: Web Applications and Internal Platforms
  meta: 2024 - Present
  content: Build and maintain reliable web applications for your team and users.
  :::

  ## GitHub Contributions
  :::davi:github-contributions
  :::

  ## Certifications
  :::davi:certifications
  title: Add your first certification
  img: /images/cert/certification.svg
  org: Organization
  date: Jan 01, 2026
  :::
  `.replace(/^  /gm, ''));
    writeIfMissing(path.join(cwd, 'davipress.config.ts'), "import { defineConfig } from 'davipress'\n\nexport default defineConfig({\n  title: 'My Davipress Site',\n  description: 'A documentation and portfolio site built with Davipress',\n  url: 'http://localhost:3000',\n  lang: 'en',\n  themeConfig: { sidebar: 'auto' }\n})\n");
    writeIfMissing(path.join(cwd, 'public/images/profile/1.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#e2e6ee"/><circle cx="60" cy="44" r="25" fill="#377bb5"/><path d="M20 115c4-30 20-45 40-45s36 15 40 45" fill="#377bb5"/></svg>\n');
    writeIfMissing(path.join(cwd, 'public/images/profile/2.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#dbeafe"/><circle cx="60" cy="44" r="25" fill="#2563eb"/><path d="M20 115c4-30 20-45 40-45s36 15 40 45" fill="#2563eb"/></svg>\n');
    writeIfMissing(path.join(cwd, 'public/images/profile/3.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#dcfce7"/><circle cx="60" cy="44" r="25" fill="#16a34a"/><path d="M20 115c4-30 20-45 40-45s36 15 40 45" fill="#16a34a"/></svg>\n');
    writeIfMissing(path.join(cwd, 'public/images/cert/certification.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><rect width="140" height="140" fill="#e2e6ee"/><path d="M70 20l12 25 28 4-20 20 5 28-25-13-25 13 5-28-20-20 28-4z" fill="#377bb5"/></svg>\n');
    writeIfMissing(path.join(cwd, '.gitignore'), 'node_modules\n.next\n.davipress\n');
    const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
    pkg.type = 'module';
    pkg.scripts ??= {};
    for (const [name, command] of Object.entries({ dev: 'davipress dev', build: 'davipress build', start: 'davipress start', clean: 'davipress clean' }))
        pkg.scripts[name] ??= command;
    fs.writeFileSync(packageFile, `${JSON.stringify(pkg, null, 2)}\n`);
    fs.mkdirSync(generated, { recursive: true });
    fs.writeFileSync(path.join(generated, 'next.config.mjs'), "const nextConfig = { transpilePackages: ['davipress'] }\nexport default nextConfig\n");
    const globalsCss = ['globals.css', 'src/globals.css'].find(file => fs.existsSync(path.join(cwd, file)));
    const globalsImport = globalsCss ? `\nimport '../../${globalsCss}'` : '';
    fs.mkdirSync(path.join(generated, 'app'), { recursive: true });
    fs.mkdirSync(path.join(generated, 'app/[[...slug]]'), { recursive: true });
    fs.writeFileSync(path.join(generated, 'app/layout.tsx'), `import 'davipress/theme/styles.css'${globalsImport}\nimport type { ReactNode } from 'react'\nimport Script from 'next/script'\nimport { CodeBlockControls, ImageZoomClient } from 'davipress/runtime'\nconst themeScript = \`(() => { const saved = localStorage.getItem('dark-mode'); const dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.classList.toggle('dark', dark); })()\`\nexport default function Layout({ children }: { children: ReactNode }) { return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><Script id="davipress-theme-bootstrap" strategy="beforeInteractive">{themeScript}</Script><CodeBlockControls /><ImageZoomClient />{children}</body></html> }\n`);
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
    if (fs.existsSync(generated)) {
        const removing = `${generated}.removing-${Date.now()}`;
        fs.renameSync(generated, removing);
        fs.rmSync(removing, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    }
    console.log('Davipress: removed generated runtime.');
}
else
    console.log('Usage: davipress init | dev | build | start | clean');
