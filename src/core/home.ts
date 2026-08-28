import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { markdownToHtml } from './content.js'

export type HomeBlock =
  | { type: 'markdown'; html: string }
  | { type: 'hero'; title: string; description: string; socials: { icon: string; link: string; label: string }[]; avatars?: string[] }
  | { type: 'avt'; avatars: string[] }
  | { type: 'expand-list'; title?: string; items: { title: string; subtitle: string; meta: string; logo?: string; content: string }[] }
  | { type: 'github-contributions'; title?: string }
  | { type: 'certifications'; title?: string; items: { img: string; title: string; org: string; date: string }[] }

function fields(content: string) {
  const result: Record<string, string[]> = {}; let active = ''
  for (const line of content.split('\n')) { const match = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/); if (match) { active = match[1]; (result[active] ??= []).push(match[2].trim()) } else if (active && line.trim()) result[active].push(line.trim()) }
  return result
}
const value = (group: Record<string, string[]>, key: string) => group[key]?.[0] ?? ''
function groups(content: string, split: string) { return content.split(new RegExp(`(?=^${split}:)`, 'm')).map(fields).filter(group => Object.keys(group).length > 0) }
function parseBlock(type: string, title: string | undefined, content: string): HomeBlock {
  if (type === 'hero') { const group = fields(content); return { type, title: value(group, 'title'), description: value(group, 'description'), socials: (group.social ?? []).map(item => { const [icon, link, label] = item.split('|').map(part => part.trim()); return { icon, link, label } }) } }
  if (type === 'avt') return { type, avatars: content.split('\n').map(line => line.trim()).filter(Boolean) }
  if (type === 'expand-list') return { type, title, items: groups(content, 'title').map(group => ({ title: value(group, 'title'), subtitle: value(group, 'subtitle'), meta: value(group, 'meta'), logo: value(group, 'logo') || undefined, content: value(group, 'content') })) }
  if (type === 'github-contributions') return { type, title }
  return { type: 'certifications', title, items: groups(content, 'title').map(group => ({ img: value(group, 'img'), title: value(group, 'title'), org: value(group, 'org'), date: value(group, 'date') })) }
}
export async function loadHome(root = path.resolve(process.cwd(), 'docs')) {
  const parsed = matter(fs.readFileSync(path.join(root, 'index.md'), 'utf8')); const pattern = /^:::davi:([a-z-]+)(?:[ \t]+([^\n]+))?\n([\s\S]*?)^:::\s*$/gm; const matches = [...parsed.content.matchAll(pattern)]; const blocks: HomeBlock[] = []; let cursor = 0
  for (const match of matches) { const markdown = parsed.content.slice(cursor, match.index).trim(); if (markdown) blocks.push({ type: 'markdown', html: await markdownToHtml(markdown) }); blocks.push(parseBlock(match[1], match[2]?.trim(), match[3])); cursor = (match.index ?? 0) + match[0].length }
  const tail = parsed.content.slice(cursor).trim(); if (tail) blocks.push({ type: 'markdown', html: await markdownToHtml(tail) })
  for (let index = blocks.length - 1; index > 0; index--) { const block = blocks[index]; const previous = blocks[index - 1]; if (block.type === 'avt' && previous.type === 'hero') { previous.avatars = block.avatars; blocks.splice(index, 1) } }
  return { title: String(parsed.data.title ?? 'Home'), blocks }
}