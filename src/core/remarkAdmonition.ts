import type { Plugin } from 'unified'

type MarkdownNode = {
  type?: string
  value?: string
  children?: MarkdownNode[]
  data?: {
    hName?: string
    hProperties?: { className?: string[] }
  }
}

const alertTypes = new Set(['info', 'note', 'tip', 'important', 'warning', 'caution'])
const alertIcons: Record<string, string> = {
  info: '<svg class="octicon admonition-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="8" r="1.5"/><path fill="currentColor" d="M10.5 11h3v7h-3z"/></svg>',
  note: '<svg class="octicon admonition-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="8" r="1.5"/><path fill="currentColor" d="M10.5 11h3v7h-3z"/></svg>',
  tip: '<svg class="octicon admonition-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21h6v-2H9v2Zm3-20C7.58 1 4 4.58 4 9c0 2.62 1.27 4.64 3 6.07V17h10v-1.93c1.73-1.43 3-3.45 3-6.07 0-4.42-3.58-8-8-8Zm3.75 12.62L15 14.1V15H9v-.9l-.75-.48C6.84 12.72 6 11.02 6 9a6 6 0 1 1 12 0c0 2.02-.84 3.72-2.25 4.62Z"/></svg>',
  important: '<svg class="octicon admonition-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-9 9c0 1.69.47 3.27 1.28 4.62L3 21l4.38-1.28A8.96 8.96 0 0 0 12 21a9 9 0 1 0 0-18Zm-4 8h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Z"/></svg>',
  warning: '<svg class="octicon admonition-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368ZM9.5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 5.75a1 1 0 0 0-2 0v2.5a1 1 0 0 0 2 0Z"/></svg>',
  caution: '<svg class="octicon admonition-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1Zm1 17h-2v-2h2Zm0-4h-2V6h2Z"/></svg>',
}

function transform(node: MarkdownNode) {
  if (node.type === 'blockquote') {
    const firstChild = node.children?.[0]
    const firstText = firstChild?.type === 'paragraph' ? firstChild.children?.[0] : undefined
    if (firstText?.type === 'text' && firstText.value) {
      const match = firstText.value.match(/^\[!(INFO|NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i)
      if (match) {
        const type = match[1].toLowerCase()
        if (alertTypes.has(type)) {
          firstText.value = firstText.value.slice(match[0].length)
          node.children?.unshift({
            type: 'html',
            value: `<div class="admonition-title ${type}">${alertIcons[type]}</div>`,
          })
          node.data = {
            hName: 'div',
            hProperties: { className: ['admonition', type] },
          }
        }
      }
    }
  }

  node.children?.forEach(transform)
}

const remarkAdmonition: Plugin = () => (tree: MarkdownNode) => transform(tree)

export default remarkAdmonition
