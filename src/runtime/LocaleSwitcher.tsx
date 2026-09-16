'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { DavipressConfig } from '../config.js'
import { LOCALE_STORAGE_KEY, localizePath, parseLocale } from '../core/i18n.js'

export function LocaleSwitcher({ config, className }: { config: DavipressConfig; className?: string }) {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const i18n = config.i18n

  const clearCloseTimer = () => { if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null } }
  const openMenu = () => { clearCloseTimer(); setOpen(true) }
  const closeMenuWithDelay = () => { clearCloseTimer(); closeTimerRef.current = setTimeout(() => setOpen(false), 180) }
  useEffect(() => () => clearCloseTimer(), [])

  if (!i18n || i18n.locales.length === 0) return null
  const { locale: current, path } = parseLocale(pathname, config)
  const others = i18n.locales.filter(locale => locale !== current)
  const label = (locale: string) => i18n.localeLabels?.[locale] ?? locale.toUpperCase()

  return (
    <div
      className={className ?? 'dp-locale-switcher'}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuWithDelay}
      onFocus={openMenu}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { clearCloseTimer(); setOpen(false) } }}
    >
      <button
        type="button"
        onClick={() => setOpen(previous => !previous)}
        className="dp-locale-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open language menu"
        title="Language"
      >
        {label(current)}
      </button>
      {open && others.length > 0 && (
        <div role="menu" className="dp-locale-menu">
          {others.map(locale => (
            <Link
              key={locale}
              href={localizePath(path, locale, config)}
              role="menuitem"
              className="dp-locale-menu-item"
              onClick={() => { localStorage.setItem(LOCALE_STORAGE_KEY, locale); setOpen(false) }}
              aria-label={`Switch language to ${locale}`}
              title={locale}
            >
              {label(locale)}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
