// Node-free subpath: keeps LocaleSwitcher (and its helpers) out of the client
// bundle that would otherwise pull in `davipress/runtime`'s fs-based loaders.
export { LocaleSwitcher } from './LocaleSwitcher.js';
export { parseLocale, localizePath } from '../core/i18n.js';
