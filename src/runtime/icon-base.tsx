import { createElement, Fragment } from 'react'
import type { ReactElement, SVGProps } from 'react'

type IconNode = [string, Record<string, string | number> | undefined, IconNode[]?]
export type IconData = { viewBox: string; nodes: IconNode[] }
export type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; title?: string }

function toCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_match, char: string) => char.toUpperCase())
}

function parseStyle(value: string) {
  const style: Record<string, string> = {}
  for (const declaration of value.split(';')) {
    const separator = declaration.indexOf(':')
    if (separator === -1) continue
    const property = declaration.slice(0, separator).trim()
    const propertyValue = declaration.slice(separator + 1).trim()
    if (!property || !propertyValue) continue
    style[property.startsWith('--') ? property : toCamelCase(property)] = propertyValue
  }
  return style
}

function renderNode(node: IconNode, key: string): ReactElement {
  const [tag, attributes, children] = node
  const props: Record<string, unknown> = { key }
  for (const [name, value] of Object.entries(attributes ?? {})) {
    if (value === undefined || value === null) continue
    if (name === 'style') props.style = typeof value === 'string' ? parseStyle(value) : value
    else if (name === 'class') props.className = value
    else props[name.startsWith('data-') || name.startsWith('aria-') || name.includes(':') ? name : toCamelCase(name)] = value
  }
  return createElement(tag, props, ...(children ?? []).map((child, index) => renderNode(child, `${key}-${index}`)))
}

export function createIcon(icon: IconData) {
  return function DavipressIcon({ size, width, height, title, ...rest }: IconProps) {
    return createElement(
      'svg',
      {
        viewBox: icon.viewBox,
        width: width ?? size ?? '1em',
        height: height ?? size ?? '1em',
        fill: 'currentColor',
        'aria-hidden': title ? undefined : true,
        role: title ? 'img' : undefined,
        ...rest
      },
      title ? createElement('title', null, title) : null,
      createElement(Fragment, null, ...icon.nodes.map((node, index) => renderNode(node, `${index}`)))
    )
  }
}
