import type { DavipressConfig } from '../config.js'

/** Key dùng để lưu locale người dùng chọn vào localStorage, giống cơ chế dark-mode. */
export const LOCALE_STORAGE_KEY = 'dp-locale'

/** Tách locale khỏi đầu route dựa theo `config.i18n.locales`. defaultLocale không có tiền tố. */
export function parseLocale(route: string, config: DavipressConfig): { locale: string; path: string } {
  const i18n = config.i18n
  const defaultLocale = i18n?.defaultLocale ?? ''
  if (!i18n) return { locale: defaultLocale, path: route }
  const segments = route.split('/').filter(Boolean)
  const [first, ...rest] = segments
  if (first && i18n.locales.includes(first)) {
    const path = `/${rest.join('/')}`.replace(/\/+/g, '/')
    return { locale: first, path: path === '' ? '/' : path }
  }
  return { locale: defaultLocale, path: route }
}

/** Gắn tiền tố locale vào path; defaultLocale giữ nguyên path không tiền tố. */
export function localizePath(path: string, locale: string, config: DavipressConfig): string {
  const defaultLocale = config.i18n?.defaultLocale
  const clean = path === '/' ? '' : path
  if (!locale || locale === defaultLocale) return clean || '/'
  return `/${locale}${clean}` || `/${locale}`
}
