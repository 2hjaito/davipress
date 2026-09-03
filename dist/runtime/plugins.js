/** Đọc options của 1 plugin khai báo trong `config.plugins` theo tên, dùng trong component đặt ở widgets/. */
export function getPluginOptions(config, name) {
    return config.plugins?.find(([pluginName]) => pluginName === name)?.[1] ?? {};
}
