"use client"

import { useEffect, useState } from 'react'
import { IoEyeOutline } from './icon-set.js'

/**
 * Counts one view of `path` when the page mounts (and again whenever `path` changes, so client-side
 * navigation counts too), then shows the total if `show` is set. The API dedupes repeat visits.
 */
export function PageViews({ endpoint, path, show }: { endpoint: string; path: string; show: boolean }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    setViews(null)
    const controller = new AbortController()
    // text/plain keeps this a "simple" CORS request, so the browser sends no preflight.
    fetch(endpoint, { method: 'POST', body: JSON.stringify({ path }), headers: { 'Content-Type': 'text/plain' }, signal: controller.signal, keepalive: true })
      .then(response => (response.ok ? response.json() : null))
      .then((data: { views?: unknown } | null) => {
        if (typeof data?.views === 'number') setViews(data.views)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [endpoint, path])

  if (!show || views === null) return null
  return <span className="dp-post-views"><IoEyeOutline aria-hidden="true" />{new Intl.NumberFormat('vi-VN').format(views)} lượt xem</span>
}
