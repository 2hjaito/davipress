'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaMoon, FaSun } from './icon-set.js'
import { Icon, resolveIcon } from './icons.js'
import type { DaviIcon } from './icons.js'
import type { CssLength, DavipressConfig, NavbarConfig, NavItem } from '../config.js'
import { LOCALE_STORAGE_KEY, localizePath, parseLocale } from '../core/i18n.js'

const defaultItems = [
  { text: 'Home', link: '/', icon: 'FaUser' },
  { text: 'Projects', link: '/project', icon: 'DvTerminalBlink' },
  { text: 'Certs', link: '/cert', icon: 'FaCertificate' },
  { text: 'Tutorials', link: '/tutorials', icon: 'GiEvilBook' },
  { text: 'Posts', link: '/posts', icon: 'GiMagicPortal' },
  { text: 'Docs', link: '/docs', icon: 'GiSpellBook' },
] as const

type NavBarItem = readonly [string, string] | NavItem
export type NavIcon = DaviIcon

function navItemInfo(item: NavBarItem) {
  if ('text' in item) return { label: item.text, href: item.link, icon: item.icon }
  return { label: item[0], href: item[1], icon: undefined }
}

function navKey(href: string) {
  const source = href.split('/').filter(Boolean).pop() ?? 'home'
  const normalized = source.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  return normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item'
}

const cssLength = (value: CssLength) => typeof value === 'number' ? `${value}px` : value

// Maps navbar config to the CSS custom properties theme.css reads, so unset options keep the stylesheet defaults
function navbarStyle(navbar?: NavbarConfig) {
  if (!navbar) return undefined
  const vars: Record<string, string | number> = {}
  if (navbar.itemSize !== undefined) vars['--dp-nav-item-size'] = cssLength(navbar.itemSize)
  if (navbar.iconSize !== undefined) vars['--dp-nav-icon-size'] = cssLength(navbar.iconSize)
  if (navbar.gap !== undefined) vars['--dp-nav-gap'] = cssLength(navbar.gap)
  if (navbar.hoverScale !== undefined) vars['--dp-nav-hover-scale'] = Math.max(1, navbar.hoverScale)
  if (navbar.hoverLift !== undefined) vars['--dp-nav-hover-lift'] = cssLength(navbar.hoverLift)
  if (navbar.neighborScale !== undefined) vars['--dp-nav-neighbor-scale'] = Math.max(1, navbar.neighborScale)
  if (navbar.hoverDuration !== undefined) vars['--dp-nav-hover-duration'] = `${Math.max(0, navbar.hoverDuration)}ms`
  return vars as CSSProperties
}

export function resolveNavIcon(icon?: string): NavIcon | undefined {
  return resolveIcon(icon)
}

export function NavBar({ items = defaultItems, navbar, logo, config }: { items?: readonly NavBarItem[]; navbar?: NavbarConfig; logo?: string; config?: DavipressConfig }) {
  const [dark, setDark] = useState(false)
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  useEffect(() => {
    const saved = localStorage.getItem('dark-mode')
    const enabled = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(enabled); document.documentElement.classList.toggle('dark', enabled)
  }, [])
  useEffect(() => { if (navbar?.autoHide === false) return; let lastY = 0; const onScroll = () => { const goingDown = window.scrollY > lastY; document.querySelector('.dp-navbar')?.classList.toggle('dp-nav-hide', goingDown); lastY = window.scrollY }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [navbar?.autoHide])
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('dark-mode', next ? 'dark' : 'light') }
  const activePath = config ? parseLocale(pathname, config).path : pathname
  const currentLocale = config ? parseLocale(pathname, config).locale : undefined
  const localize = (href: string) => config && currentLocale ? localizePath(href, currentLocale, config) : href
  // Trên mount và mỗi lần route đổi (kể cả nút back/forward), nếu locale đã lưu khác locale trong URL thì điều hướng lại theo locale đã lưu — giống cơ chế dark-mode.
  useEffect(() => {
    if (!config?.i18n || !currentLocale) return
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && config.i18n.locales.includes(saved) && saved !== currentLocale) router.replace(localizePath(activePath, saved, config))
  }, [pathname])
  return <div className="dp-navbar" style={navbarStyle(navbar)}><div className="dp-navbar-items">{logo && <Link href={localize('/')} title="Home" className="dp-nav-item dp-nav-logo-item nav-logo"><img src={logo} alt="" className="dp-nav-logo" width={28} height={28} decoding="async" /></Link>}{logo && <span className="dp-nav-separator" aria-hidden="true" />}{items.map((item, index) => { const { label, href, icon } = navItemInfo(item); const active = href === '/' ? activePath === '/' : activePath === href || activePath.startsWith(`${href.replace(/\/$/, '')}/`); return <Link key={`${href}-${index}`} href={localize(href)} title={label} aria-current={active ? 'page' : undefined} className={`dp-nav-item nav-${navKey(href)}${active ? ' dp-nav-item-active' : ''}`}><Icon name={icon} className="dp-nav-icon" /></Link> })}{navbar?.showThemeToggle !== false && <>{navbar?.showThemeSeparator !== false && <span className="dp-nav-separator" aria-hidden="true" />}<button type="button" onClick={toggle} title="Toggle theme" className="dp-nav-item nav-theme-toggle">{dark ? <FaMoon className="dp-nav-icon" aria-hidden="true" /> : <FaSun className="dp-nav-icon" aria-hidden="true" />}</button></>}</div></div>
}