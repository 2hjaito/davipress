'use client'

import { useState } from 'react'
import type { HomeBlock } from '../core/home.js'
import { Footer } from './Footer.js'
import type { FooterConfig } from '../config.js'
import { AvatarStack } from './AvatarStack.js'
import { GithubContributions } from './GithubContributions.js'
import { FiGithub, FiYoutube, TbBrandLinkedin as LuLinkedin, TbBrandFacebook as LuFacebook, TbBrandHackerrank, TbBrandTiktok, SiLeetcode } from './icon-set.js'

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = { github: FiGithub, leetcode: SiLeetcode, hackerrank: TbBrandHackerrank, linkedin: LuLinkedin, youtube: FiYoutube, facebook: LuFacebook, tiktok: TbBrandTiktok }

function ExpandItem({ item }: { item: Extract<HomeBlock, { type: 'expand-list' }>['items'][number] }) {
  const [open, setOpen] = useState(false)
  return <article className={`dp-expand-item${open ? ' dp-expand-item-open' : ''}`}>
    <div className="dp-expand-title" role="button" tabIndex={0} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(value => !value) } }}>
      <span className="dp-expand-heading">{item.logo && <img src={item.logo} alt="" className="dp-expand-logo" loading="lazy" decoding="async" />}<span className="dp-expand-heading-text"><span className="dp-expand-heading-title">{item.title}<span className="dp-expand-arrow">›</span></span><small>{item.subtitle}</small></span></span>
      <strong>{item.meta}</strong>
    </div>
    <div className="dp-expand-details"><div className="dp-expand-details-inner">{item.content}</div></div>
  </article>
}

export function HomeView({ blocks, footer }: { blocks: HomeBlock[]; footer?: string | FooterConfig }) {
  const hero = blocks.find((block): block is Extract<HomeBlock, { type: 'hero' }> => block.type === 'hero')
  const githubUsername = hero?.socials.find(social => social.icon === 'github')?.link.match(/github\.com\/([^/?#]+)/)?.[1]
  return <div className="dp-home-view">{blocks.map((block, index) => {
    if (block.type === 'hero') return <section key={index}><div className="dp-hero"><div className="dp-hero-copy"><h1>{block.title}</h1><p className="dp-hero-name">{block.title}</p><p>{block.description}</p></div><AvatarStack avatars={block.avatars} /></div><div className="dp-socials">{block.socials.map(social => { const Icon = socialIcons[social.icon]; return Icon ? <a key={social.label} href={social.link} target="_blank" rel="noreferrer" title={social.label} aria-label={social.label}><Icon size={20} /></a> : null })}</div></section>
    if (block.type === 'markdown') return <section className="dp-home-markdown" key={index} dangerouslySetInnerHTML={{ __html: block.html }} />
    if (block.type === 'expand-list') return block.title
      ? <section className="dp-home-section" key={index}><h2>{block.title}</h2>{block.items.map(item => <ExpandItem key={`${item.title}-${item.meta}`} item={item} />)}</section>
      : <div className="dp-expand-group" key={index}>{block.items.map(item => <ExpandItem key={`${item.title}-${item.meta}`} item={item} />)}</div>
    if (block.type === 'github-contributions') return <section className="dp-home-section dp-github-section" key={index}>{block.title && <h2>{block.title}</h2>}{githubUsername ? <GithubContributions username={githubUsername} /> : <div className="dp-github-placeholder">GitHub contributions</div>}</section>
    if (block.type === 'avt') return null
    if (block.type === 'certifications') { const certifications = block as Extract<HomeBlock, { type: 'certifications' }>; return <section className="dp-home-section dp-certifications" key={index}><h2>{certifications.title}</h2><div className="dp-cert-grid">{certifications.items.map(item => { const imageSrc = item.img.startsWith('/') ? item.img : `/images/cert/${item.img}`; return <div className="dp-certification" key={item.title}><div className="dp-cert-image"><img src={imageSrc} alt={item.title} loading="lazy" decoding="async" /></div><strong>{item.title}</strong><span>{item.org}</span><small>{item.date}</small></div> })}</div></section> }
    return null
  })}<Footer footer={footer} /></div>
}