'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { SidebarItem } from '../config.js'
import { GiHamburgerMenu } from 'davi-icons/gi'
import { IoClose as IoMdClose } from 'davi-icons/io'
import { MdFormatListBulleted as MdOutlineFormatListBulleted } from 'davi-icons/md'
import { resolveNavIcon } from './NavBar.js'

type Heading = { id: string; text: string; level: number }
type SidebarNode = SidebarItem & { children?: readonly SidebarNode[]; collapsible?: boolean; icon?: string }

function childItems(item: SidebarNode) { return (item.items ?? item.children ?? []) as readonly SidebarNode[] }

function normalizeLink(link?: string) {
  if (!link) return ''
  return link.replace(/\/$/, '') || '/'
}

function SidebarIcon({ icon }: { icon?: string }) {
  const Icon = resolveNavIcon(icon)
  return Icon ? <Icon className="dp-sidebar-icon" /> : <span className="dp-sidebar-icon" />
}

function openKeysForRoute(items: readonly SidebarNode[], route: string, trail: string[] = []): string[] {
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    const key = `${trail.join('/')}/${item.text}-${index}`
    if (normalizeLink(item.link) === normalizeLink(route)) return trail
    const children = childItems(item)
    if (children.length > 0) {
      const next = openKeysForRoute(children, route, [...trail, key])
      if (next.length > 0) return next
    }
  }
  return []
}

function SidebarTree({ items, activeRoute }: { items: readonly SidebarNode[]; activeRoute: string }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})
  const activeTrail = openKeysForRoute(items, activeRoute)

  function renderItems(nodes: readonly SidebarNode[], level = 0, trail: string[] = []) {
    return <ul className={`dp-sidebar-list ${level > 1 ? 'dp-sidebar-list-nested' : ''}`}>{nodes.map((item, index) => {
      const key = `${trail.join('/')}/${item.text}-${index}`
      const children = childItems(item)
      const hasChildren = children.length > 0
      const isOpen = activeTrail.includes(key) || (openMap[key] ?? (item.collapsed === false || level === 0))
      const isCollapsible = item.collapsible !== false && item.collapsed !== false && hasChildren
      const active = normalizeLink(item.link) === normalizeLink(activeRoute)

      if (hasChildren && isCollapsible) {
        return <li key={key}>
          <button type="button" className="dp-sidebar-group-button" onClick={() => setOpenMap(value => ({ ...value, [key]: !isOpen }))}>
            <span className="dp-sidebar-group-content"><SidebarIcon icon={item.icon} /><span className="dp-sidebar-group-label">{item.text}</span></span>
            <span className={`dp-sidebar-chevron${isOpen ? ' dp-sidebar-chevron-open' : ''}`}>›</span>
          </button>
          {isOpen && renderItems(children, level + 1, [...trail, key])}
        </li>
      }

      if (hasChildren) {
        return <li key={key}>
          {item.text && <div className="dp-sidebar-section-title">{item.text}</div>}
          {renderItems(children, level + 1, [...trail, key])}
        </li>
      }

      return <li key={key}>
        <Link href={item.link ?? '#'} title={item.text} className={`dp-sidebar-link${active ? ' dp-sidebar-link-active' : ''}`}>
          <SidebarIcon icon={item.icon} />
          <span>{item.text}</span>
        </Link>
      </li>
    })}</ul>
  }

  return <nav className="dp-sidebar-nav">{renderItems(items)}</nav>
}

function FloatingToc({ headings, hasComments, initiallyCollapsed = true }: { headings: Heading[]; hasComments: boolean; initiallyCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed)
  const [zoomed, setZoomed] = useState(false)
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')
  const headingKey = headings.map(heading => `${heading.id}:${heading.level}`).join('|')
  const isCenterZoom = zoomed && !collapsed

  useEffect(() => {
    setActiveId(headings[0]?.id ?? '')
    setCollapsed(initiallyCollapsed)
    setZoomed(false)
  }, [headingKey, initiallyCollapsed])

  useEffect(() => {
    if (headings.length === 0 && !hasComments) return
    const updateActive = () => {
      const comments = document.getElementById('comments')
      if (comments && comments.getBoundingClientRect().top <= 180) {
        setActiveId('comments')
        return
      }
      let next = headings[0]?.id ?? ''
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= 180) next = heading.id
        else break
      }
      setActiveId(next)
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [headings, hasComments])

  if (headings.length === 0 && !hasComments) return null

  return <>
    {isCenterZoom && <button type="button" className="dp-toc-backdrop" aria-label="Close table of contents" onClick={() => setZoomed(false)} />}
    <div className={isCenterZoom ? 'dp-toc-wrap dp-toc-wrap-center' : 'dp-toc-wrap'}>
      <div className={`dp-toc-panel${collapsed ? ' dp-toc-panel-collapsed' : ''}${zoomed ? ' dp-toc-panel-zoomed' : ''}`}>
        {collapsed ? <button type="button" className="dp-toc-trigger" aria-label="Open table of contents" title="Mở mục lục" onClick={() => setCollapsed(false)}><MdOutlineFormatListBulleted aria-hidden="true" /></button> : <aside className="dp-toc-card">
          <div className="dp-toc-header">
            <div className="dp-toc-window-buttons">
              <button type="button" className="dp-toc-dot dp-toc-dot-red" aria-label="Đóng mục lục" title="Đóng mục lục" onClick={() => { setCollapsed(true); setZoomed(false) }}>x</button>
              <button type="button" className="dp-toc-dot dp-toc-dot-yellow" aria-label="Thu nhỏ mục lục" title="Thu nhỏ mục lục" onClick={() => { setCollapsed(true); setZoomed(false) }}>-</button>
              <button type="button" className="dp-toc-dot dp-toc-dot-green" aria-label={zoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục'} title={zoomed ? 'Thu nhỏ mục lục' : 'Phóng to mục lục'} onClick={() => setZoomed(value => !value)}>+</button>
            </div>
            <strong>Mục lục</strong>
          </div>
          <ul className="dp-toc-list">
            {headings.map(heading => <li key={heading.id} style={{ marginLeft: `${Math.max(heading.level - 2, 0) * 16}px` }}><a href={`#${heading.id}`} className={activeId === heading.id ? 'dp-toc-active' : ''}>{heading.text}</a></li>)}
            {hasComments && <li><a href="#comments" className={activeId === 'comments' ? 'dp-toc-active' : ''}>Thảo luận</a></li>}
          </ul>
        </aside>}
      </div>
    </div>
  </>
}

export function PostChrome({ children, footer, headings, title, hasComments, route }: { children: React.ReactNode; footer: React.ReactNode; headings: Heading[]; title: string; hasComments: boolean; route: string }) {
  const [stickyVisible, setStickyVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const tocHeadings = headings.filter(heading => heading.level >= 2 && heading.level <= 4)

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const heading = document.getElementById('post-main-title')
    if (!heading) return
    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' })
    observer.observe(heading)
    return () => observer.disconnect()
  }, [])

  return <div className="dp-post-chrome">
    <div className="dp-reading-progress"><div style={{ transform: `scaleX(${progress})` }} /></div>
    <FloatingToc headings={tocHeadings} hasComments={hasComments} initiallyCollapsed={false} />
    {stickyVisible && title && <div className="dp-sticky-title"><p>{title}</p></div>}
    <div key={route} className="dp-page-reveal">{children}{footer}</div>
  </div>
}

export function DocsChrome({ children, footer, headings, sidebar, activeRoute, title, hasComments, sectionLabel = 'Docs', sectionIcon, reveal = false }: { children: React.ReactNode; footer: React.ReactNode; headings: Heading[]; sidebar: readonly SidebarItem[]; activeRoute: string; title: string; hasComments: boolean; sectionLabel?: string; sectionIcon?: string; reveal?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const tocHeadings = headings.filter(heading => heading.level >= 2 && heading.level <= 4)
  const SectionIcon = resolveNavIcon(sectionIcon) ?? resolveNavIcon('GiSpellBook')

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [activeRoute])

  useEffect(() => {
    const firstHeading = document.querySelector('#tutorial-main-content h1, #tutorial-main-content h2')
    if (!firstHeading) return
    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' })
    observer.observe(firstHeading)
    return () => observer.disconnect()
  }, [activeRoute])

  return <div className={`davipress-body${reveal ? ' dp-tutorial-chrome' : ''}`}>
    <div className="dp-reading-progress"><div style={{ transform: `scaleX(${progress})` }} /></div>
    <FloatingToc headings={tocHeadings} hasComments={hasComments} />
    {!reveal && stickyVisible && title && <div className="dp-sticky-title"><p>{title}</p></div>}
    <div className="dp-sidebar-spacer" />
    <aside className="dp-sidebar"><SidebarTree items={sidebar as readonly SidebarNode[]} activeRoute={activeRoute} /></aside>
    {mobileOpen && <div className="dp-mobile-sidebar">
      <button type="button" className="dp-mobile-sidebar-close" onClick={() => setMobileOpen(false)}><span><IoMdClose aria-hidden="true" /> {SectionIcon && <SectionIcon />} {sectionLabel}</span></button>
      <div className="dp-mobile-sidebar-inner"><SidebarTree items={sidebar as readonly SidebarNode[]} activeRoute={activeRoute} /></div>
    </div>}
    <main id="tutorial-main-content" className={reveal ? 'dp-tutorial-main' : undefined}>
      {!mobileOpen && <button type="button" className="dp-mobile-sidebar-open" onClick={() => setMobileOpen(true)}><span><GiHamburgerMenu aria-hidden="true" /> {SectionIcon && <SectionIcon />} {sectionLabel}</span></button>}
      <div key={reveal ? activeRoute : undefined} className={reveal ? 'dp-page-reveal' : undefined}>
        {children}
        {footer}
      </div>
    </main>
  </div>
}