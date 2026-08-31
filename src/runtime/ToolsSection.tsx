import type { ComponentType } from 'react'
import * as DiIcons from 'davi-icons/di'
import * as FaIcons from 'davi-icons/fa'
import * as FiIcons from 'davi-icons/fi'
import * as GiIcons from 'davi-icons/gi'
import * as IoIcons from 'davi-icons/io'
import * as LuIcons from 'davi-icons/lu'
import * as MdIcons from 'davi-icons/md'
import * as RiIcons from 'davi-icons/ri'
import * as SiIcons from 'davi-icons/si'
import * as TbIcons from 'davi-icons/tb'
import * as TiIcons from 'davi-icons/ti'
import type { ToolItem } from '../core/projects.js'

type ToolIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

const toolIconMap = {
  ...DiIcons,
  ...FaIcons,
  ...FiIcons,
  ...GiIcons,
  ...IoIcons,
  ...LuIcons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TbIcons,
  ...TiIcons,
} as unknown as Record<string, ToolIcon>

function resolveToolIcon(icon?: string): ToolIcon {
  if (!icon) return TbIcons.TbBrandAdobe

  return toolIconMap[icon] ?? toolIconMap[icon.toLowerCase()] ?? TbIcons.TbBrandAdobe
}

export function ToolsSection({ title = 'Tools', items }: { title?: string; items: ToolItem[] }) {
  return (
    <div className="dp-tools-section">
      <details className="dp-tools-details">
        <summary className="dp-tools-summary">
          <h2 className="dp-tools-title">{title}</h2>
          <span className="dp-tools-arrow" aria-hidden="true">
            ▶
          </span>
        </summary>

        <div className="dp-tools-list">
          {items.map((tool) => {
            const Icon = resolveToolIcon(tool.icon) ?? TbIcons.TbBrandAdobe

            return (
              <div key={tool.title} className="dp-tool-card">
                <div className="dp-tool-icon-col">
                  <Icon className="dp-tool-icon" aria-hidden={true} />
                </div>
                <div className="dp-tool-info-col">
                  <a
                    href={tool.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dp-tool-name"
                  >
                    <h3>{tool.title}</h3>
                  </a>
                  {tool.description && <p className="dp-tool-desc">{tool.description}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </details>
    </div>
  )
}
