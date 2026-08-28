'use client'

import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import Link from 'next/link'
import * as FaIcons from 'react-icons/fa'
import * as Fa6Icons from 'react-icons/fa6'
import * as FiIcons from 'react-icons/fi'
import * as GiIcons from 'react-icons/gi'
import * as IoIcons from 'react-icons/io'
import * as Io5Icons from 'react-icons/io5'
import * as LuIcons from 'react-icons/lu'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import * as SiIcons from 'react-icons/si'
import * as TbIcons from 'react-icons/tb'
import * as TiIcons from 'react-icons/ti'
import type { NavItem } from '../config.js'
import { Projects } from './Projects.js'

const defaultItems = [
  { text: 'Home', link: '/', icon: 'FaUser' },
  { text: 'Projects', link: '/project', icon: 'Projects' },
  { text: 'Certs', link: '/cert', icon: 'FaCertificate' },
  { text: 'Tutorials', link: '/tutorials', icon: 'GiEvilBook' },
  { text: 'Posts', link: '/posts', icon: 'GiMagicPortal' },
  { text: 'Docs', link: '/docs', icon: 'GiSpellBook' },
] as const

type NavBarItem = readonly [string, string] | NavItem
export type NavIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

const iconMap = {
  ...FaIcons,
  ...Fa6Icons,
  ...FiIcons,
  ...GiIcons,
  ...IoIcons,
  ...Io5Icons,
  ...LuIcons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TbIcons,
  ...TiIcons,
  Projects,
} as unknown as Record<string, NavIcon>

function navItemInfo(item: NavBarItem) {
  if ('text' in item) return { label: item.text, href: item.link, icon: item.icon }
  return { label: item[0], href: item[1], icon: undefined }
}

export function resolveNavIcon(icon?: string): NavIcon | undefined {
  return icon ? iconMap[icon] : undefined
}

function resolveIcon(icon: string | undefined): NavIcon {
  return resolveNavIcon(icon) ?? iconMap.GiSpellBook
}

export function NavBar({ items = defaultItems, navbar }: { items?: readonly NavBarItem[]; navbar?: { showThemeToggle?: boolean; showThemeSeparator?: boolean } }) {
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
  return <div className="dp-navbar"><div className="dp-navbar-items">{items.map(item => { const { label, href, icon } = navItemInfo(item); const Icon = resolveIcon(icon); const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href.replace(/\/$/, '')}/`); return <Link key={href} href={href} title={label} aria-current={active ? 'page' : undefined} onClick={() => setPathname(href)} className={`dp-nav-item${active ? ' dp-nav-item-active' : ''}`}><Icon className="dp-nav-icon" aria-hidden={true} /></Link> })}{navbar?.showThemeToggle !== false && <>{navbar?.showThemeSeparator !== false && <span className="dp-nav-separator" aria-hidden="true" />}<button type="button" onClick={toggle} title="Toggle theme" className="dp-nav-item">{dark ? <FaIcons.FaMoon className="dp-nav-icon" aria-hidden="true" /> : <FaIcons.FaSun className="dp-nav-icon" aria-hidden="true" />}</button></>}</div></div>
}