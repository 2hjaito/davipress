import { TbBrandAdobe } from './icon-set.js'
import { Icon } from './icons.js'
import type { ToolItem } from '../core/projects.js'

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
            return (
              <div key={tool.title} className="dp-tool-card">
                <div className="dp-tool-icon-col">
                  <Icon name={tool.icon} className="dp-tool-icon" fallback={TbBrandAdobe} />
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
