export type GalleryItem = { title: string; description: string; image: string }

function fields(content: string) {
  const result: Record<string, string[]> = {}
  let active = ''
  for (const line of content.split('\n')) {
    const match = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/)
    if (match) {
      active = match[1]
        ; (result[active] ??= []).push(match[2].trim())
    } else if (active && line.trim()) {
      result[active].push(line.trim())
    }
  }
  return result
}

export function parseGalleryItems(content: string): GalleryItem[] {
  return content.split(/(?=^title:)/m).map(fields).filter(item => item.title?.[0] && item.image?.[0]).map(item => ({
    title: item.title[0],
    description: item.description?.[0] ?? '',
    image: item.image[0],
  }))
}

export function parseGalleryDirective(content: string) {
  const match = content.match(/^:::davi:gallery(?:[ \t]+([^\n]+))?\n([\s\S]*?)^:::\s*$/m)
  if (!match) return undefined
  return { title: match[1]?.trim() ?? '', items: parseGalleryItems(match[2]) }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character)
}

export function galleryHtml(title: string, items: GalleryItem[]) {
  return `<div class="dp-gallery-showcase"><h2 class="dp-gallery-showcase-title">${escapeHtml(title)}</h2><div class="dp-gallery-showcase-list">${items.map(item => `<div class="dp-gallery-showcase-item"><div class="dp-gallery-showcase-copy"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><a class="dp-gallery-showcase-image" href="${escapeHtml(item.image)}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async"></a></div>`).join('')}</div></div>`
}
