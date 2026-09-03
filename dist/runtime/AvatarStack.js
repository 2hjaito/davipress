'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState } from 'react';
const defaultAvatars = ['/images/profile/1.svg', '/images/profile/2.svg', '/images/profile/3.svg', '/images/profile/4.svg', '/images/profile/5.svg'];
const dragThreshold = 40;
export function AvatarStack({ avatars = defaultAvatars }) {
    const [order, setOrder] = useState(avatars);
    const [drag, setDrag] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const start = useRef({ x: 0, y: 0 });
    function handlePointerDown(event) {
        setDragging(true);
        start.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
    }
    function handlePointerMove(event) {
        if (dragging)
            setDrag({ x: event.clientX - start.current.x, y: event.clientY - start.current.y });
    }
    function handlePointerUp() {
        if (!dragging)
            return;
        setDragging(false);
        if (Math.hypot(drag.x, drag.y) > dragThreshold)
            setOrder(value => [...value.slice(1), value[0]]);
        setDrag({ x: 0, y: 0 });
    }
    return _jsx("div", { className: "dp-avatar-stack", title: "Drag to rotate avatars", "aria-label": "Rotate avatar stack", children: order.map((src, index) => {
            const top = index === 0;
            const rotateY = top ? (drag.x / 100) * 30 : 0;
            const rotateX = top ? -(drag.y / 100) * 30 : 0;
            const translateX = index * 8 + (top ? drag.x : 0);
            const translateY = index * 4 + (top ? drag.y : 0);
            return _jsx("img", { src: src, alt: `Profile avatar ${index + 1}`, className: `dp-avatar${top ? ' dp-avatar-top' : ''}`, draggable: false, loading: top ? 'eager' : 'lazy', fetchPriority: top ? 'high' : 'low', decoding: "async", onPointerDown: top ? handlePointerDown : undefined, onPointerMove: top ? handlePointerMove : undefined, onPointerUp: top ? handlePointerUp : undefined, onPointerCancel: top ? handlePointerUp : undefined, style: { zIndex: order.length - index, transition: dragging && top ? 'none' : 'transform .25s ease', transform: `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${index * 2.5}deg) scale(${1 - index * .04})` } }, src);
        }) });
}
