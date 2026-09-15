import type { CertificationGroup } from '../core/certifications.js'

function imageUrl(value: string) {
  return value.startsWith('/') ? value : `/images/cert/${value}`
}

export function CertGroups({ title, groups }: { title?: string; groups: CertificationGroup[] }) {
  return <section className="dp-home-section dp-certifications dp-cert-groups">
    {title && <h2>{title}</h2>}
    <div className="dp-cert-group-grid">
      {groups.map(group => <section className="dp-cert-group" key={group.org}>
        <header className="dp-cert-group-header">{group.logo && <img src={imageUrl(group.logo)} alt="" loading="lazy" decoding="async" />}<h3>{group.org}</h3></header>
        <div className="dp-cert-card-grid">
          {group.certifications.map(cert => <article className="dp-cert-card" key={`${group.org}-${cert.title}-${cert.image}`}>
            <a href={imageUrl(cert.image)} className="dp-cert-card-image"><img src={imageUrl(cert.image)} alt={cert.title} loading="lazy" decoding="async" /></a>
            <strong>{cert.title}</strong>
            <small>{cert.level}</small>
          </article>)}
        </div>
      </section>)}
    </div>
  </section>
}