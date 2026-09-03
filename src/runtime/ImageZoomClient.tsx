'use client'

import { useEffect } from 'react'

const imageSelector = '.markdown-body img, .dp-home-markdown img, .dp-cert-image img'

export function ImageZoomClient() {
  useEffect(() => {
    let activeClone: HTMLImageElement | null = null
    let activeOverlay: HTMLButtonElement | null = null
    let isClosing = false

    const closeZoom = () => {
      const clone = activeClone
      const overlay = activeOverlay
      if (!clone || !overlay || isClosing) return

      isClosing = true
      clone.style.top = clone.dataset.originTop ?? clone.style.top
      clone.style.left = clone.dataset.originLeft ?? clone.style.left
      clone.style.width = clone.dataset.originWidth ?? clone.style.width
      clone.style.height = clone.dataset.originHeight ?? clone.style.height
      overlay.classList.add('dp-image-zoom-overlay-closing')

      const finishClose = () => {
        clone.remove()
        overlay.remove()
        if (activeClone === clone) activeClone = null
        if (activeOverlay === overlay) activeOverlay = null
        isClosing = false
      }
      clone.addEventListener('transitionend', finishClose, { once: true })
      window.setTimeout(finishClose, 350)
    }

    const openZoom = (image: HTMLImageElement) => {
      closeZoom()
      const bounds = image.getBoundingClientRect()
      const ratio = image.naturalWidth > 0 && image.naturalHeight > 0
        ? image.naturalWidth / image.naturalHeight
        : bounds.width / bounds.height
      const maxWidth = window.innerWidth - 32
      const maxHeight = window.innerHeight - 32
      let targetWidth = Math.min(image.naturalWidth || bounds.width, maxWidth)
      let targetHeight = targetWidth / ratio
      if (targetHeight > maxHeight) {
        targetHeight = maxHeight
        targetWidth = targetHeight * ratio
      }
      const clone = image.cloneNode(true) as HTMLImageElement
      const overlay = document.createElement('button')
      overlay.type = 'button'
      overlay.className = 'dp-image-zoom-overlay'
      overlay.setAttribute('aria-label', 'Close enlarged image')
      clone.className = 'dp-image-zoom-clone'
      clone.style.top = `${bounds.top}px`
      clone.style.left = `${bounds.left}px`
      clone.style.width = `${bounds.width}px`
      clone.style.height = `${bounds.height}px`
      clone.dataset.originTop = `${bounds.top}px`
      clone.dataset.originLeft = `${bounds.left}px`
      clone.dataset.originWidth = `${bounds.width}px`
      clone.dataset.originHeight = `${bounds.height}px`
      clone.dataset.targetTop = `${(window.innerHeight - targetHeight) / 2}px`
      clone.dataset.targetLeft = `${(window.innerWidth - targetWidth) / 2}px`
      clone.dataset.targetWidth = `${targetWidth}px`
      clone.dataset.targetHeight = `${targetHeight}px`
      document.body.append(overlay, clone)
      activeClone = clone
      activeOverlay = overlay
      overlay.addEventListener('click', closeZoom)
      clone.addEventListener('click', closeZoom)
      requestAnimationFrame(() => {
        clone.style.top = clone.dataset.targetTop ?? clone.style.top
        clone.style.left = clone.dataset.targetLeft ?? clone.style.left
        clone.style.width = clone.dataset.targetWidth ?? clone.style.width
        clone.style.height = clone.dataset.targetHeight ?? clone.style.height
      })
    }

    const bindImages = () => {
      document.querySelectorAll<HTMLImageElement>(imageSelector).forEach(image => {
        if (image.dataset.zoomBound === 'true') return
        image.dataset.zoomBound = 'true'
        image.addEventListener('click', () => openZoom(image))
      })
    }

    const observer = new MutationObserver(bindImages)
    observer.observe(document.body, { childList: true, subtree: true })
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeZoom()
    }
    document.addEventListener('keydown', handleKeyDown)
    bindImages()

    return () => {
      observer.disconnect()
      document.removeEventListener('keydown', handleKeyDown)
      closeZoom()
    }
  }, [])

  return null
}
