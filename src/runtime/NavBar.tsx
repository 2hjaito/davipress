'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaMoon, FaSun } from './icon-set.js'
import { Icon, resolveIcon } from './icons.js'
import type { DaviIcon } from './icons.js'
import type { NavItem } from '../config.js'

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

export function resolveNavIcon(icon?: string): NavIcon | undefined {
  return resolveIcon(icon)
}

export function NavBar({ items = defaultItems, navbar, logo }: { items?: readonly NavBarItem[]; navbar?: { showThemeToggle?: boolean; showThemeSeparator?: boolean }; logo?: string }) {
  const [dark, setDark] = useState(false)
  const [pathname, setPathname] = useState('')
  useEffect(() => {
    const saved = localStorage.getItem('dark-mode')
    const enabled = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(enabled); document.documentElement.classList.toggle('dark', enabled)
  }, [])
  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname)
    syncPathname()
    window.addEventListener('popstate', syncPathname)
    return () => window.removeEventListener('popstate', syncPathname)
  }, [])
  useEffect(() => { let lastY = 0; const onScroll = () => { const goingDown = window.scrollY > lastY; document.querySelector('.dp-navbar')?.classList.toggle('dp-nav-hide', goingDown); lastY = window.scrollY }; window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('dark-mode', next ? 'dark' : 'light') }
  return <div className="dp-navbar"><div className="dp-navbar-items">{logo && <Link href="/" title="Home" className="dp-nav-item dp-nav-logo-item" onClick={() => setPathname('/')}><img src={logo} alt="" className="dp-nav-logo" width={28} height={28} decoding="async" /></Link>}{logo && <span className="dp-nav-separator" aria-hidden="true" />}{items.map((item, index) => { const { label, href, icon } = navItemInfo(item); const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href.replace(/\/$/, '')}/`); return <Link key={`${href}-${index}`} href={href} title={label} aria-current={active ? 'page' : undefined} onClick={() => setPathname(href)} className={`dp-nav-item${active ? ' dp-nav-item-active' : ''}`}><Icon name={icon} className="dp-nav-icon" /></Link> })}{navbar?.showThemeToggle !== false && <>{navbar?.showThemeSeparator !== false && <span className="dp-nav-separator" aria-hidden="true" />}<button type="button" onClick={toggle} title="Toggle theme" className="dp-nav-item">{dark ? <FaMoon className="dp-nav-icon" aria-hidden="true" /> : <FaSun className="dp-nav-icon" aria-hidden="true" />}</button></>}</div></div>
}