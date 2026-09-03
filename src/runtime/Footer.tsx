import { FaCode, FaRss } from './icon-set.js'
import type { FooterConfig } from '../config.js'

const footerIconMap = {
  source: FaCode,
  rss: FaRss,
} as const

export function Footer({ footer }: { footer?: string | FooterConfig }) {
  const config = typeof footer === 'string' ? { copyright: footer } : footer
  const links = config?.links ?? [
    { type: 'source' as const, label: 'SRC', href: 'https://github.com/2hjaito/dangth', ariaLabel: 'View source on GitHub', external: true },
    { type: 'rss' as const, label: 'RSS', href: '/rss.xml', ariaLabel: 'View RSS feed', external: false },
  ]

  return <footer className="dp-site-footer">
    <p className="dp-site-footer-copy">
      <span>{config?.copyright ?? '© Davipress 2026'}</span>
      {config?.attribution && <span> · {config.attribution.label}{' '}<a href={config.attribution.href} target={config.attribution.external ? '_blank' : undefined} rel={config.attribution.external ? 'noopener noreferrer' : undefined}>{config.attribution.text}</a></span>}
    </p>
    <p className="dp-site-footer-links">
      {links.map(link => {
        const Icon = footerIconMap[link.type]
        return <a key={link.href} href={link.href} aria-label={link.ariaLabel} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>
          <Icon aria-hidden="true" /> <span>{link.label}</span>
        </a>
      })}
    </p>
  </footer>
}
