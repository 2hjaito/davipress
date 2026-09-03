import type { ComponentType } from 'react'
import type { IconProps as DaviIconProps } from './icon-base.js'
import {
  FaJavaBrands as FaJava,
  FaDockerBrands as FaDocker,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiDart,
  SiCmake,
  SiSwift,
  SiKotlin,
  SiSass,
  SiPython,
  SiSharp,
  SiGo,
  SiRust,
  SiPhp,
  SiCss,
  SiHtml5,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  TbBrandMysql,
  DiMicrosoftsqlserverPlain as DiMsqlServer
} from './icon-set.js'

type IconEntry = {
  icon: ComponentType<DaviIconProps>
  color?: string
}

export const techIconMap: Record<string, IconEntry> = {
  mysql: { icon: TbBrandMysql, color: '#016089' },
  mssql: { icon: DiMsqlServer, color: '#E2302A' },
  tsql: { icon: DiMsqlServer, color: '#E2302A' },
  java: { icon: FaJava, color: '#b07219' },
  javascript: { icon: SiJavascript, color: '#f1e05a' },
  js: { icon: SiJavascript, color: '#f1e05a' },
  typescript: { icon: SiTypescript, color: '#3178c6' },
  ts: { icon: SiTypescript, color: '#3178c6' },
  dart: { icon: SiDart, color: '#00B4AB' },
  kotlin: { icon: SiKotlin, color: '#7F52FF' },
  scss: { icon: SiSass, color: '#CD6799' },
  sass: { icon: SiSass, color: '#CD6799' },
  cmake: { icon: SiCmake, color: '#064F8C' },
  swift: { icon: SiSwift, color: '#F05138' },
  cplusplus: { icon: SiCplusplus, color: '#f34b7d' },
  'c++': { icon: SiCplusplus, color: '#f34b7d' },
  cpp: { icon: SiCplusplus, color: '#f34b7d' },
  python: { icon: SiPython, color: '#3572A5' },
  csharp: { icon: SiSharp, color: '#178600' },
  'c#': { icon: SiSharp, color: '#178600' },
  go: { icon: SiGo, color: '#00ADD8' },
  golang: { icon: SiGo, color: '#00ADD8' },
  rust: { icon: SiRust, color: '#dea584' },
  php: { icon: SiPhp, color: '#4F5D95' },
  css: { icon: SiCss, color: '#563d7c' },
  html: { icon: SiHtml5, color: '#e34c26' },
  docker: { icon: FaDocker, color: '#2496ED' },
  dockerfile: { icon: FaDocker, color: '#2496ED' },
  react: { icon: SiReact, color: '#61DAFB' },
  vue: { icon: SiVuedotjs, color: '#4FC08D' },
  nextjs: { icon: SiNextdotjs, color: '#000000' },
  'next.js': { icon: SiNextdotjs, color: '#000000' },
  tailwind: { icon: SiTailwindcss, color: '#06B6D4' },
  tailwindcss: { icon: SiTailwindcss, color: '#06B6D4' }
}

const normalize = (lang: string): string =>
  lang.trim().toLowerCase().replace(/\+/g, 'plus').replace(/#/g, 'sharp')

export function LangBadge({ lang }: { lang: string }) {
  const normalized = normalize(lang)
  const iconEntry = techIconMap[normalized] || techIconMap[lang.trim().toLowerCase()]

  const color = iconEntry?.color ?? '#888'
  const IconComponent = iconEntry?.icon

  if (!IconComponent) {
    return (
      <span className="dp-project-badge-text" title={lang}>
        {lang}
      </span>
    )
  }

  return (
    <span
      className="dp-project-badge"
      style={{ color, fontSize: '1.2rem' }}
      title={lang}
    >
      <IconComponent />
    </span>
  )
}
