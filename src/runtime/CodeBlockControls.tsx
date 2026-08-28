'use client'

import { useEffect } from 'react'

function icon(type: 'copy' | 'check') {
  return type === 'copy'
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>'
}

export function CodeBlockControls() {
  useEffect(() => {
    let overlay: HTMLButtonElement | null = null

    const frameFor = (pre: HTMLPreElement) => pre.closest<HTMLDivElement>('.dp-code-frame')
    const closeZoom = () => {
      document.querySelectorAll<HTMLDivElement>('.dp-code-frame.dp-code-zoomed').forEach(frame => frame.classList.remove('dp-code-zoomed'))
      overlay?.remove()
      overlay = null
    }
    const toggleCollapsed = (pre: HTMLPreElement) => {
      const frame = frameFor(pre)
      if (!frame) return
      if (frame.classList.toggle('dp-code-collapsed')) closeZoom()
    }
    const addControls = () => {
      document.querySelectorAll<HTMLPreElement>('.markdown-body pre').forEach(pre => {
        const existingFrame = frameFor(pre)
        if (existingFrame?.querySelector('.dp-copy-code')) return

        const frame = existingFrame ?? document.createElement('div')
        frame.className = 'dp-code-frame'
        if (!existingFrame) {
          pre.parentNode?.insertBefore(frame, pre)
          frame.appendChild(pre)
        }

        const controls = document.createElement('div')
        controls.className = 'dp-code-controls'
          ;[['dp-code-close', 'x'], ['dp-code-minimize', '-'], ['dp-code-zoom', '+']].forEach(([className, label]) => {
            const button = document.createElement('button')
            button.type = 'button'
            button.className = `dp-code-control ${className}`
            button.textContent = label
            button.setAttribute('aria-label', label === '+' ? 'Phóng to block code' : 'Thu nhỏ block code')
            button.title = button.getAttribute('aria-label') ?? ''
            button.onclick = () => {
              if (label === '+') {
                if (frame.classList.contains('dp-code-zoomed')) return closeZoom()
                closeZoom()
                frame.classList.remove('dp-code-collapsed')
                frame.classList.add('dp-code-zoomed')
                overlay = document.createElement('button')
                overlay.type = 'button'
                overlay.className = 'dp-code-overlay'
                overlay.setAttribute('aria-label', 'Đóng block code phóng to')
                overlay.onclick = closeZoom
                document.body.appendChild(overlay)
              } else {
                toggleCollapsed(pre)
              }
            }
            controls.appendChild(button)
          })
        frame.appendChild(controls)

        const language = Array.from(pre.querySelector('code')?.classList ?? []).find(value => value.startsWith('language-'))?.replace('language-', '')
        if (language) {
          const label = document.createElement('span')
          label.className = 'dp-code-language'
          label.textContent = language === 'typescript' ? 'ts' : language
          frame.appendChild(label)
        }

        const restore = document.createElement('button')
        restore.type = 'button'
        restore.className = 'dp-code-restore'
        restore.textContent = '</>'
        restore.setAttribute('aria-label', 'Mở lại block code')
        restore.title = 'Mở lại block code'
        restore.onclick = () => frame.classList.remove('dp-code-collapsed')
        frame.appendChild(restore)

        const copy = document.createElement('button')
        copy.type = 'button'
        copy.className = 'dp-copy-code'
        copy.innerHTML = icon('copy')
        copy.setAttribute('aria-label', 'Copy code')
        copy.title = 'Copy code'
        copy.onclick = async () => {
          try {
            await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '')
            copy.innerHTML = icon('check')
            copy.title = 'Copied!'
            window.setTimeout(() => { copy.innerHTML = icon('copy'); copy.title = 'Copy code' }, 1500)
          } catch {
            copy.title = 'Unable to copy'
          }
        }
        frame.appendChild(copy)
      })
    }

    addControls()
    const observer = new MutationObserver(addControls)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => { observer.disconnect(); closeZoom() }
  }, [])

  return null
}