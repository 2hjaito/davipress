import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DiIcons from 'react-icons/di';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as TiIcons from 'react-icons/ti';
const toolIconMap = {
    ...DiIcons,
    ...FaIcons,
    ...Fa6Icons,
    ...FiIcons,
    ...GiIcons,
    ...IoIcons,
    ...Io5Icons,
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
