'use client'

import type { ComponentType } from 'react'
import { createIcon } from './icon-base.js'
import type { IconData } from './icon-base.js'
import {
  FaBook,
  FaCertificate,
  FaGear,
  FaGraduationCap,
  FaHouse,
  FaLayerGroup,
  FaMoon,
  FaPenNib,
  FaRocket,
  FaSun,
  FaUser,
  GiEvilBook,
  GiFrogPrince,
  GiMagicPortal,
  GiSpellBook,
  DvAnkhWingsTome,
  DvTerminalBlink,
  TbBrandAdobe
} from './icon-set.js'

export type DaviIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

/** Statically bundled icons: everything the default theme can render without a network round-trip. */
const coreIcons = {
  FaBook,
  FaCertificate,
  FaGear,
  FaGraduationCap,
  FaHouse,
  FaLayerGroup,
  FaMoon,
  FaPenNib,
  FaRocket,
  FaSun,
  FaUser,
  GiEvilBook,
  GiFrogPrince,
  GiMagicPortal,
  GiSpellBook,
  DvAnkhWingsTome,
  DvTerminalBlink,
  TbBrandAdobe
} as unknown as Record<string, DaviIcon>

/** Icons the CLI extracted from the site's own config and content, registered before the first render. */
const siteIcons: Record<string, DaviIcon> = {}

export function registerIcons(icons: Record<string, IconData>) {
  for (const [name, data] of Object.entries(icons)) siteIcons[name] ??= createIcon(data) as DaviIcon
}

export function resolveIcon(name?: string): DaviIcon | undefined {
  if (!name) return undefined
  return coreIcons[name] ?? siteIcons[name]
}

export function Icon({ name, className, fallback }: { name?: string; className?: string; fallback?: DaviIcon }) {
  const Resolved = resolveIcon(name) ?? fallback
  // Placeholder keeps the icon slot at its final size when a name cannot be resolved.
  if (!Resolved) return <span className={className} aria-hidden="true" />
  return <Resolved className={className} aria-hidden={true} />
}
