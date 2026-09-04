'use client'

import { useState } from 'react'
import type { Page } from '../core/content.js'
import { FaUserPen as FaUserEdit, MdCalendarRange as MdDateRange } from './icon-set.js'
import { formatDate } from './date.js'
import Link from 'next/link'

export function PostListView({ posts }: { posts: Page[] }) {
  const [selectedTag, setSelectedTag] = useState<string>('')

  const tagCounts: Record<string, number> = {}
  posts.forEach((post) => {
    const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []
    tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const allTags = Object.entries(tagCounts)
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])

  const filteredPosts = selectedTag
    ? posts.filter((post) => {
      const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []
      return tags.includes(selectedTag)
    })
    : posts

  return (
    <div className="dp-post-list">
      <h1>Bài viết</h1>

      <div className="dp-post-filter">
        <button
          onClick={() => setSelectedTag('')}
          className={`dp-post-filter-button${selectedTag === '' ? ' dp-post-filter-button-active' : ''}`}
        >
          Tất cả <span>{posts.length}</span>
        </button>

        {allTags.map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`dp-post-filter-button${selectedTag === tag ? ' dp-post-filter-button-active' : ''}`}
          >
            {tag} <span>{count}</span>
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 && <p className="dp-post-list-empty">Không tìm thấy bài viết.</p>}

      {filteredPosts.map((post) => {
        const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []
        return (
          <div
            key={post.route}
            className="dp-post-card"
          >
            {post.frontmatter.image && (
              <div className="dp-post-card-image">
                <Link href={post.route}>
                  <img
                    src={String(post.frontmatter.image)}
                    alt={String(post.frontmatter.title ?? '')}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              </div>
            )}

            <div className="dp-post-card-content">
              <Link
                href={post.route}
                className="dp-post-card-title"
              >
                {String(post.frontmatter.title ?? post.route)}
              </Link>

              {Boolean(post.frontmatter.subtitle) && (
                <p className="dp-post-card-subtitle">
                  {String(post.frontmatter.subtitle)}
                </p>
              )}

              <div className="dp-post-card-meta">
                {Boolean(post.frontmatter.author) && (
                  <span>
                    <FaUserEdit />
                    {String(post.frontmatter.author)}
                  </span>
                )}
                {Boolean(post.frontmatter.date) && (
                  <span>
                    <MdDateRange />
                    {formatDate(post.frontmatter.date)}
                  </span>
                )}
              </div>

              {tags.length > 0 && (
                <div className="dp-post-card-tags">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="dp-post-tag"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
