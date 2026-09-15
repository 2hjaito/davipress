function fields(content) {
    const result = {};
    for (const line of content.split('\n')) {
        const match = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
        if (!match)
            continue;
        (result[match[1]] ??= []).push(match[2].trim());
    }
    return result;
}
export function parseCertificationGroups(content) {
    return content.split(/(?=^org:)/m).map(fields).filter(group => group.org?.[0]).map(group => ({
        org: group.org[0],
        logo: group.logo?.[0] ?? '',
        certifications: (group.cert ?? []).map(cert => {
            const [title = '', image = '', level = ''] = cert.split('|').map(value => value.trim());
            return { title, image, level };
        }),
    }));
}
export function parseCertificationDirective(content) {
    const match = content.match(/^:::davi:cert-groups(?:[ \t]+([^\n]+))?\n([\s\S]*?)^:::\s*$/m);
    if (!match)
        return undefined;
    return { title: match[1]?.trim() ?? '', groups: parseCertificationGroups(match[2]) };
}
function escapeHtml(value) {
    return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}
function imageUrl(value) {
    return value.startsWith('/') ? value : `/images/cert/${value}`;
}
export function certificationGroupsHtml(title, groups) {
    return `<div class="dp-home-section dp-certifications dp-cert-groups"><div class="dp-cert-group-grid">${groups.map(group => `<div class="dp-cert-group"><div class="dp-cert-group-header">${group.logo ? `<img src="${escapeHtml(imageUrl(group.logo))}" alt="" loading="lazy" decoding="async">` : ''}<h3>${escapeHtml(group.org)}</h3></div><div class="dp-cert-card-grid">${group.certifications.map(cert => `<div class="dp-cert-card"><a href="${escapeHtml(imageUrl(cert.image))}" class="dp-cert-card-image"><img src="${escapeHtml(imageUrl(cert.image))}" alt="${escapeHtml(cert.title)}" loading="lazy" decoding="async"></a><strong>${escapeHtml(cert.title)}</strong><small>${escapeHtml(cert.level)}</small></div>`).join('')}</div></div>`).join('')}</div></div>`;
}
