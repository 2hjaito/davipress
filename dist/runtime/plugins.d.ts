import type { DavipressConfig } from '../config.js';
/** Đọc options của 1 plugin khai báo trong `config.plugins` theo tên, dùng trong component đặt ở widgets/. */
export declare function getPluginOptions(config: DavipressConfig, name: string): Record<string, unknown>;
