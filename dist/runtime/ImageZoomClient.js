'use client';
import { useEffect } from 'react';
const imageSelector = '.markdown-body img, .dp-home-markdown img, .dp-cert-image img';
export function ImageZoomClient() {
    useEffect(() => {
        let activeClone = null;
        let activeOverlay = null;
        const closeZoom = () => {
            activeClone?.remove();
            activeOverlay?.remove();
            activeClone = null;
            activeOverlay = null;
        };
        const openZoom = (image) => {
            closeZoom();
            const bounds = image.getBoundingClientRect();
            const clone = image.cloneNode(true);
            const overlay = document.createElement('button');
            overlay.type = 'button';
            overlay.className = 'dp-image-zoom-overlay';
            overlay.setAttribute('aria-label', 'Close enlarged image');
            clone.className = 'dp-image-zoom-clone';
            clone.style.top = `${bounds.top}px`;
            clone.style.left = `${bounds.left}px`;
            clone.style.width = `${bounds.width}px`;
            clone.style.height = `${bounds.height}px`;
            document.body.append(overlay, clone);
            activeClone = clone;
            activeOverlay = overlay;
            overlay.addEventListener('click', closeZoom);
            clone.addEventListener('click', closeZoom);
            requestAnimationFrame(() => {
                clone.classList.add('dp-image-zoom-clone-open');
            });
        };
        const bindImages = () => {
            document.querySelectorAll(imageSelector).forEach(image => {
                if (image.dataset.zoomBound === 'true')
                    return;
                image.dataset.zoomBound = 'true';
                image.addEventListener('click', () => openZoom(image));
            });
        };
        const observer = new MutationObserver(bindImages);
        observer.observe(document.body, { childList: true, subtree: true });
        const handleKeyDown = (event) => {
            if (event.key === 'Escape')
                closeZoom();
        };
        document.addEventListener('keydown', handleKeyDown);
        bindImages();
        return () => {
            observer.disconnect();
            document.removeEventListener('keydown', handleKeyDown);
            closeZoom();
        };
    }, []);
    return null;
}
