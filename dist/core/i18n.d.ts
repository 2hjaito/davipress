import type { DavipressConfig } from '../config.js';
/** Key dùng để lưu locale người dùng chọn vào localStorage, giống cơ chế dark-mode. */
export declare const LOCALE_STORAGE_KEY = "dp-locale";
/** Tách locale khỏi đầu route dựa theo `config.i18n.locales`. defaultLocale không có tiền tố. */
export declare function parseLocale(route: string, config: DavipressConfig): {
    locale: string;
    path: string;
};
/** Gắn tiền tố locale vào path; defaultLocale giữ nguyên path không tiền tố. */
export declare function localizePath(path: string, locale: string, config: DavipressConfig): string;
