import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DiIcons from 'davi-icons/di';
import * as FaIcons from 'davi-icons/fa';
import * as FiIcons from 'davi-icons/fi';
import * as GiIcons from 'davi-icons/gi';
import * as IoIcons from 'davi-icons/io';
import * as LuIcons from 'davi-icons/lu';
import * as MdIcons from 'davi-icons/md';
import * as RiIcons from 'davi-icons/ri';
import * as SiIcons from 'davi-icons/si';
import * as TbIcons from 'davi-icons/tb';
import * as TiIcons from 'davi-icons/ti';
const toolIconMap = {
    ...DiIcons,
    ...FaIcons,
    ...FiIcons,
    ...GiIcons,
    ...IoIcons,
    ...LuIcons,
    ...MdIcons,
    ...RiIcons,
    ...SiIcons,
    ...TbIcons,
    ...TiIcons,
};
function resolveToolIcon(icon) {
    if (!icon)
        return TbIcons.TbBrandAdobe;
    return toolIconMap[icon] ?? toolIconMap[icon.toLowerCase()] ?? TbIcons.TbBrandAdobe;
}
export function ToolsSection({ title = 'Tools', items }) {
    return (_jsx("div", { className: "dp-tools-section", children: _jsxs("details", { className: "dp-tools-details", children: [_jsxs("summary", { className: "dp-tools-summary", children: [_jsx("h2", { className: "dp-tools-title", children: title }), _jsx("span", { className: "dp-tools-arrow", "aria-hidden": "true", children: "\u25B6" })] }), _jsx("div", { className: "dp-tools-list", children: items.map((tool) => {
                        const Icon = resolveToolIcon(tool.icon) ?? TbIcons.TbBrandAdobe;
                        return (_jsxs("div", { className: "dp-tool-card", children: [_jsx("div", { className: "dp-tool-icon-col", children: _jsx(Icon, { className: "dp-tool-icon", "aria-hidden": true }) }), _jsxs("div", { className: "dp-tool-info-col", children: [_jsx("a", { href: tool.href || '#', target: "_blank", rel: "noopener noreferrer", className: "dp-tool-name", children: _jsx("h3", { children: tool.title }) }), tool.description && _jsx("p", { className: "dp-tool-desc", children: tool.description })] })] }, tool.title));
                    }) })] }) }));
}
