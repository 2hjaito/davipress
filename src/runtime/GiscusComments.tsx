"use client"

import { useEffect, useRef } from 'react'
import type { DavipressConfig } from '../config.js'

export function GiscusComments({ giscus }: { giscus: NonNullable<DavipressConfig['giscus']> }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lightTheme = giscus.lightTheme ?? (giscus.theme === 'preferred_color_scheme' ? 'light' : giscus.theme ?? 'light')
  const darkTheme = giscus.darkTheme ?? 'transparent_dark'

  function updateTheme() {
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (!iframe?.contentWindow) return
    iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: document.documentElement.classList.contains('dark') ? darkTheme : lightTheme } } }, 'https://giscus.app')
  }

  function watchIframe() {
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (!iframe || iframe.dataset.themeListener === 'true') return
    iframe.dataset.themeListener = 'true'
    iframe.addEventListener('load', updateTheme)
    updateTheme()
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    if (!container.querySelector('script[data-giscus-script="true"]')) {
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.async = true
      script.setAttribute('data-giscus-script', 'true')
      script.setAttribute('data-repo', giscus.repo)
      script.setAttribute('data-repo-id', giscus.repoId)
      script.setAttribute('data-category', giscus.category)
      script.setAttribute('data-category-id', giscus.categoryId)
      script.setAttribute('data-mapping', giscus.mapping ?? 'pathname')
      script.setAttribute('data-strict', String(giscus.strict ?? 0))
      script.setAttribute('data-reactions-enabled', String(giscus.reactionsEnabled ?? 1))
      script.setAttribute('data-emit-metadata', String(giscus.emitMetadata ?? 0))
      script.setAttribute('data-input-position', giscus.inputPosition ?? 'bottom')
      script.setAttribute('data-theme', document.documentElement.classList.contains('dark') ? darkTheme : lightTheme)
      script.setAttribute('data-lang', giscus.lang ?? 'vi')
      script.setAttribute('crossorigin', 'anonymous')
      container.appendChild(script)
    }

    const observer = new MutationObserver(() => {
      watchIframe()
      updateTheme()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    const iframeObserver = new MutationObserver(watchIframe)
    iframeObserver.observe(container, { childList: true, subtree: true })
    watchIframe()
    window.setTimeout(watchIframe, 500)
    return () => {
      observer.disconnect()
      iframeObserver.disconnect()
    }
  }, [darkTheme, giscus, lightTheme])

  return <div id="comments" className="dp-comments" ref={containerRef} />
}
