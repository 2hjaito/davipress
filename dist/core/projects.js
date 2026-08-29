import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { markdownToHtml } from './content.js';
function fields(content) {
    const result = {};
    let active = '';
    for (const line of content.split('\n')) {
        const match = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
        if (match) {
            active = match[1];
            (result[active] ??= []).push(match[2].trim());
        }
        else if (active && line.trim()) {
            result[active].push(line.trim());
        }
    }
    return result;
}
const value = (group, key) => group[key]?.[0] ?? '';
function groups(content, split) {
    return content
        .split(new RegExp(`(?=^${split}:)`, 'm'))
        .map(fields)
        .filter(group => Object.keys(group).length > 0);
}
function extractUsernameFromConfig(config) {
    if (config?.github?.username)
        return config.github.username;
    if (config?.repository?.url) {
        const match = config.repository.url.match(/github\.com\/([^/?#]+)/);
        if (match?.[1])
            return match[1];
    }
    if (config?.themeConfig?.socialLinks?.github) {
        const match = config.themeConfig.socialLinks.github.match(/github\.com\/([^/?#]+)/);
        if (match?.[1])
            return match[1];
    }
    return process.env.GITHUB_USERNAME || 'dangth';
}
async function fetchGithubRepos(username, topic) {
    try {
        const headers = {
            'User-Agent': 'davipress',
            Accept: 'application/vnd.github.mercy-preview+json'
        };
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }
        let url = '';
        if (topic) {
            url = `https://api.github.com/search/repositories?q=topic:${encodeURIComponent(topic)}+user:${encodeURIComponent(username)}`;
        }
        else {
            url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;
        }
        const res = await fetch(url, { headers, cache: 'force-cache' });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        const rawList = Array.isArray(data) ? data : (data.items || []);
        return rawList.map(repo => {
            const techs = [];
            if (repo.language)
                techs.push(repo.language);
            const rawTopics = Array.isArray(repo.topics) ? repo.topics : [];
            const topics = rawTopics.filter((t) => t.toLowerCase() !== repo.language?.toLowerCase());
            return {
                name: repo.name,
                description: repo.description || undefined,
                url: repo.html_url || `https://github.com/${username}/${repo.name}`,
                stars: repo.stargazers_count ?? 0,
                lastUpdate: repo.updated_at || new Date().toISOString(),
                techs,
                topics,
                license: repo.license?.spdx_id || repo.license?.name
            };
        });
    }
    catch (err) {
        console.error('Failed to fetch GitHub repos:', err);
        return [];
    }
}
function sortProjects(items, sort = 'updated-desc') {
    return [...items].sort((a, b) => {
        switch (sort) {
            case 'updated-asc':
                return new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime();
            case 'stars-desc':
                return b.stars - a.stars;
            case 'stars-asc':
                return a.stars - b.stars;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'updated-desc':
            default:
                return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
        }
    });
}
export async function loadProjects(page, config, root = path.resolve(process.cwd(), 'docs')) {
    let sourceContent = '';
    let title = 'Dự án';
    if (page) {
        const raw = fs.readFileSync(page.source, 'utf8');
        const parsed = matter(raw);
        sourceContent = parsed.content;
        title = String(parsed.data.title ?? page.frontmatter.title ?? 'Dự án');
    }
    else {
        const candidates = [
            path.join(root, 'project.md'),
            path.join(root, 'projects.md'),
            path.join(root, 'pages', 'project.md'),
            path.join(root, 'pages', 'projects.md'),
            path.join(root, 'project', 'index.md'),
            path.join(root, 'projects', 'index.md')
        ];
        const foundPath = candidates.find(p => fs.existsSync(p));
        if (foundPath) {
            const raw = fs.readFileSync(foundPath, 'utf8');
            const parsed = matter(raw);
            sourceContent = parsed.content;
            title = String(parsed.data.title ?? 'Dự án');
        }
    }
    const defaultUsername = extractUsernameFromConfig(config);
    const defaultTopic = config?.github?.topic || undefined;
    const pattern = /^:::(?:davi:([a-z-]+)|davi-([a-z-]+))(?:[ \t]+([^\n]+))?\n([\s\S]*?)^:::\s*$/gm;
    const matches = [...sourceContent.matchAll(pattern)];
    const blocks = [];
    let cursor = 0;
    for (const match of matches) {
        const markdown = sourceContent.slice(cursor, match.index).trim();
        if (markdown) {
            blocks.push({ type: 'markdown', html: await markdownToHtml(markdown) });
        }
        const type = (match[1] || match[2]).toLowerCase();
        const blockTitle = match[3]?.trim();
        const blockContent = match[4];
        if (type === 'projects' || type === 'github-repositories') {
            const group = fields(blockContent);
            const sort = value(group, 'sort') || 'updated-desc';
            const username = value(group, 'username') || defaultUsername;
            const topic = value(group, 'topic') || defaultTopic;
            const manualGroups = groups(blockContent, 'name');
            let items = manualGroups
                .map(g => ({
                name: value(g, 'name'),
                description: value(g, 'description') || undefined,
                url: value(g, 'url') || undefined,
                stars: g['stars'] ? Number(value(g, 'stars')) : 0,
                lastUpdate: value(g, 'lastUpdate') || new Date().toISOString(),
                techs: value(g, 'techs')
                    ? value(g, 'techs').split(',').map(s => s.trim()).filter(Boolean)
                    : value(g, 'languages')
                        ? value(g, 'languages').split(',').map(s => s.trim()).filter(Boolean)
                        : [],
                topics: value(g, 'topics')
                    ? value(g, 'topics').split(',').map(s => s.trim()).filter(Boolean)
                    : [],
                license: value(g, 'license') || undefined
            }))
                .filter(item => Boolean(item.name));
            if (items.length === 0 || value(group, 'github') === 'true') {
                const ghItems = await fetchGithubRepos(username, topic);
                if (ghItems.length > 0) {
                    items = items.concat(ghItems);
                }
            }
            items = sortProjects(items, sort);
            blocks.push({
                type: 'projects',
                title: blockTitle,
                items,
                sort
            });
        }
        else if (type === 'tools') {
            const toolGroups = groups(blockContent, 'title');
            const items = toolGroups
                .map(g => ({
                title: value(g, 'title'),
                icon: value(g, 'icon') || undefined,
                description: value(g, 'description') || undefined,
                href: value(g, 'href') || undefined
            }))
                .filter(item => Boolean(item.title));
            blocks.push({
                type: 'tools',
                title: blockTitle || 'Tools',
                items
            });
        }
        cursor = (match.index ?? 0) + match[0].length;
    }
    const tail = sourceContent.slice(cursor).trim();
    if (tail) {
        blocks.push({ type: 'markdown', html: await markdownToHtml(tail) });
    }
    // If no project blocks were found, default to fetching GitHub repositories
    const hasProjectBlock = blocks.some(b => b.type === 'projects');
    if (!hasProjectBlock) {
        const ghItems = await fetchGithubRepos(defaultUsername, defaultTopic);
        blocks.push({
            type: 'projects',
            title: 'Kho mã nguồn GitHub',
            items: sortProjects(ghItems, 'updated-desc'),
            sort: 'updated-desc'
        });
    }
    return { title, blocks };
}
