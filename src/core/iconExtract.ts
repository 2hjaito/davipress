import fs from 'node:fs'
import path from 'node:path'

export type IconData = { viewBox: string; nodes: unknown[] }

const iconNamePattern = /\b([A-Z][a-z][A-Za-z0-9]{2,})\b/g
const packs = new Set(['ai', 'bi', 'ci', 'co', 'di', 'dv', 'fa', 'fc', 'fi', 'fl', 'gi', 'hi', 'io', 'la', 'lu', 'md', 'oi', 'pa', 'pi', 'pr', 'px', 'ri', 'si', 'tb', 'ti', 'vi', 'wi'])

function scan(target: string, found: Set<string>) {
  if (!fs.existsSync(target)) return
  const stats = fs.statSync(target)
  if (stats.isDirectory()) {
    for (const entry of fs.readdirSync(target)) if (entry !== 'node_modules' && !entry.startsWith('.')) scan(path.join(target, entry), found)
    return
  }
  if (!/\.(md|mdx|ts|tsx|js|jsx|json|ya?ml)$/.test(target)) return
  for (const line of fs.readFileSync(target, 'utf8').split('\n')) {
    if (!/\bicons?\b\s*[:=]/.test(line)) continue
    for (const match of line.matchAll(iconNamePattern)) if (packs.has(match[1].slice(0, 2).toLowerCase())) found.add(match[1])
  }
}

/** Icon names referenced from a site's config and content, e.g. `icon: DiPhotoshop`. */
export function findIconNames(cwd: string): string[] {
  const found = new Set<string>()
  for (const target of ['davipress.config.ts', 'config', 'docs', 'src/config']) scan(path.join(cwd, target), found)
  return [...found].sort()
}

/** Reads icon definitions straight out of the davi-icons pack sources so only the used ones get bundled. */
export function extractIcons(names: string[], packsDir: string): Record<string, IconData> {
  const sources = new Map<string, string>()
  const icons: Record<string, IconData> = {}
  for (const name of names) {
    const pack = name.slice(0, 2).toLowerCase()
    const file = path.join(packsDir, `${pack}.js`)
    if (!sources.has(pack)) {
      if (!fs.existsSync(file)) continue
      sources.set(pack, fs.readFileSync(file, 'utf8'))
    }
    const source = sources.get(pack)!
    const start = source.indexOf(`export const ${name} = createDaviIcon(`)
    if (start === -1) continue
    const open = source.indexOf('{', start)
    let depth = 0
    for (let cursor = open; cursor < source.length; cursor++) {
      if (source[cursor] === '{') depth++
      else if (source[cursor] === '}' && --depth === 0) {
        const icon = JSON.parse(source.slice(open, cursor + 1)) as { viewBox: string; nodes: unknown[] }
        icons[name] = { viewBox: icon.viewBox, nodes: icon.nodes }
        break
      }
    }
  }
  return icons
}
