import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function imageUrl(value) {
    return value.startsWith('/') ? value : `/images/cert/${value}`;
}
export function CertGroups({ title, groups }) {
    return _jsxs("section", { className: "dp-home-section dp-certifications dp-cert-groups", children: [title && _jsx("h2", { children: title }), _jsx("div", { className: "dp-cert-group-grid", children: groups.map(group => _jsxs("section", { className: "dp-cert-group", children: [_jsxs("header", { className: "dp-cert-group-header", children: [group.logo && _jsx("img", { src: imageUrl(group.logo), alt: "", loading: "lazy", decoding: "async" }), _jsx("h3", { children: group.org })] }), _jsx("div", { className: "dp-cert-card-grid", children: group.certifications.map(cert => _jsxs("article", { className: "dp-cert-card", children: [_jsx("a", { href: imageUrl(cert.image), className: "dp-cert-card-image", children: _jsx("img", { src: imageUrl(cert.image), alt: cert.title, loading: "lazy", decoding: "async" }) }), _jsx("strong", { children: cert.title }), _jsx("small", { children: cert.level })] }, `${group.org}-${cert.title}-${cert.image}`)) })] }, group.org)) })] });
}
