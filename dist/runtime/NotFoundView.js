'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const kaomojis = ['(>_<)', '(T_T)', '(o_o)', '(._.)', '(;_;)', '(\u00b4-\ufe4f-`)'];
export function NotFoundView() {
    const [kaomoji, setKaomoji] = useState('(._.)');
    useEffect(() => {
        setKaomoji(kaomojis[Math.floor(Math.random() * kaomojis.length)]);
    }, []);
    return _jsx("main", { className: "dp-not-found", children: _jsxs("div", { children: [_jsx("span", { className: "dp-not-found-kaomoji", title: "Kaomoji ng\u1EABu nhi\u00EAn", children: kaomoji }), _jsx("h1", { children: "L\u1EA1c tr\u00F4i \u0111\u00E2u \u0111\u1EBFyyy ???" }), _jsx("p", { children: "\u0110\u1EEBng m\u00F2 n\u1EEFa, \u1EDF \u0111\u00E2y kh\u00F4ng c\u00F3 g\u00EC ngo\u00E0i s\u1EF1 tr\u1ED1ng v\u1EAFng..." })] }) });
}
