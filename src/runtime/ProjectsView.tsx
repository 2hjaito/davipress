'use client'

import React, { useState } from 'react'
import { FaStarRegular as FaRegStar } from './icon-set.js'
import { LangBadge } from './LangBadge.js'
import { ToolsSection } from './ToolsSection.js'
import { Footer } from './Footer.js'
import type { ProjectBlock, ProjectItem } from '../core/projects.js'
import type { FooterConfig } from '../config.js'

function RepoCard({
  name,
  description,
  url,
  stars,
  lastUpdate,
  techs,
  topics = [],
  license,
  selectedTag,
  onSelectTag
}: ProjectItem & {
  selectedTag?: string
  onSelectTag?: (tag: string) => void
}) {
  const formattedDate = new Date(lastUpdate).toLocaleDateString('vi-VN')

  return (
    <div className="dp-project-card">
      <div className="dp-project-card-inner">
        <div className="dp-project-header">
          <a
            href={url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="dp-project-name"
          >
            {name}
          </a>
          <span className="dp-project-stars">
            <FaRegStar className="dp-project-star-icon" /> {stars}
          </span>
        </div>

        <p className="dp-project-desc">{description || 'Không có mô tả'}</p>

        {/* Line 1: Techs */}
        {techs.length > 0 && (
          <div className="dp-project-techs">
            {techs.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => onSelectTag?.(tech.toLowerCase() === selectedTag?.toLowerCase() ? '' : tech)}
                className={`dp-project-tag-button${tech.toLowerCase() === selectedTag?.toLowerCase() ? ' dp-project-tag-active' : ''}`}
                title={`Lọc theo ${tech}`}
              >
                <LangBadge lang={tech} />
              </button>
            ))}
          </div>
        )}

        {/* Line 2: Topics */}
        {topics && topics.length > 0 && (
          <div className="dp-project-topics">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => onSelectTag?.(topic.toLowerCase() === selectedTag?.toLowerCase() ? '' : topic)}
                className={`dp-project-topic-badge${topic.toLowerCase() === selectedTag?.toLowerCase() ? ' dp-project-topic-active' : ''}`}
                title={`Lọc theo #${topic}`}
              >
                #{topic}
              </button>
            ))}
          </div>
        )}

        {/* Line 3: Meta info */}
        <div className="dp-project-meta">
          {license && <span className="dp-project-license">{license}</span>}
          <span className="dp-project-updated">
            Last updated {formattedDate}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProjectsSection({
  title,
  items
}: {
  title?: string
  items: ProjectItem[]
}) {
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [showMoreTags, setShowMoreTags] = useState<boolean>(false)

  const tagCounts: Record<string, { display: string; count: number }> = {}
  items.forEach((item) => {
    const allItemTags = [...item.techs, ...(item.topics || [])]
    allItemTags.forEach((tech) => {
      const trimmed = tech.trim()
      if (trimmed && trimmed.toLowerCase() !== 'featured') {
        const key = trimmed.toLowerCase()
        if (!tagCounts[key]) {
          tagCounts[key] = { display: trimmed, count: 0 }
        }
        tagCounts[key].count += 1
      }
    })
  })

  const allTags = Object.values(tagCounts).sort(
    (a, b) => b.count - a.count || a.display.localeCompare(b.display)
  )

  const INITIAL_LIMIT = 8
  const hasMore = allTags.length > INITIAL_LIMIT

  let visibleTags = allTags
  if (hasMore && !showMoreTags) {
    visibleTags = allTags.slice(0, INITIAL_LIMIT)
    if (selectedTag) {
      const isSelectedInVisible = visibleTags.some(
        (t) => t.display.toLowerCase() === selectedTag.toLowerCase()
      )
      if (!isSelectedInVisible) {
        const found = allTags.find(
          (t) => t.display.toLowerCase() === selectedTag.toLowerCase()
        )
        if (found) {
          visibleTags = [...visibleTags, found]
        }
      }
    }
  }

  const filteredItems = selectedTag
    ? items.filter((item) =>
      item.techs.some(
        (t) => t.trim().toLowerCase() === selectedTag.toLowerCase()
      ) ||
      (item.topics &&
        item.topics.some(
          (t) => t.trim().toLowerCase() === selectedTag.toLowerCase()
        ))
    )
    : items

  return (
    <section className="dp-projects-section">
      {title && <h2 className="dp-projects-title">{title}</h2>}

      {allTags.length > 0 && (
        <div className="dp-post-filter dp-project-filter">
          <button
            type="button"
            onClick={() => setSelectedTag('')}
            className={`dp-post-filter-button${selectedTag === '' ? ' dp-post-filter-button-active' : ''}`}
          >
            Tất cả <span>{items.length}</span>
          </button>

          {visibleTags.map(({ display, count }) => {
            const isActive = selectedTag.toLowerCase() === display.toLowerCase()
            return (
              <button
                key={display}
                type="button"
                onClick={() => setSelectedTag(isActive ? '' : display)}
                className={`dp-post-filter-button${isActive ? ' dp-post-filter-button-active' : ''}`}
              >
                {display} <span>{count}</span>
              </button>
            )
          })}

          {hasMore && (
            <button
              type="button"
              onClick={() => setShowMoreTags((prev) => !prev)}
              className="dp-post-filter-button dp-project-filter-more"
            >
              {showMoreTags
                ? 'Thu gọn'
                : `+ Xem thêm (${allTags.length - visibleTags.length})`}
            </button>
          )}
        </div>
      )}

      {filteredItems.length === 0 && (
        <p className="dp-post-list-empty">Không tìm thấy dự án phù hợp.</p>
      )}

      <div className="dp-projects-grid">
        {filteredItems.map((repo) => (
          <RepoCard
            key={repo.name}
            {...repo}
            selectedTag={selectedTag}
            onSelectTag={(tag) => setSelectedTag(tag)}
          />
        ))}
      </div>
    </section>
  )
}

export function ProjectsView({
  blocks,
  footer
}: {
  blocks: ProjectBlock[]
  footer?: string | FooterConfig
}) {
  return (
    <div className="dp-projects-view">
      {blocks.map((block, index) => {
        if (block.type === 'markdown') {
          return (
            <section
              key={index}
              className="dp-projects-markdown markdown-body"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          )
        }

        if (block.type === 'projects') {
          return <ProjectsSection key={index} title={block.title} items={block.items} />
        }

        if (block.type === 'tools') {
          return <ToolsSection key={index} title={block.title} items={block.items} />
        }

        return null
      })}
      <Footer footer={footer} />
    </div>
  )
}
