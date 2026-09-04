import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TbBrandAdobe } from './icon-set.js';
import { Icon } from './icons.js';
import { RiArrowDropDownFill } from 'davi-icons/ri';
export function ToolsSection({ title = 'Tools', items }) {
    return (_jsx("div", { className: "dp-tools-section", children: _jsxs("details", { className: "dp-tools-details", children: [_jsxs("summary", { className: "dp-tools-summary", children: [_jsx("h2", { className: "dp-tools-title", children: title }), _jsx("span", { className: "dp-tools-arrow", "aria-hidden": "true", children: _jsx(RiArrowDropDownFill, {}) })] }), _jsx("div", { className: "dp-tools-list", children: items.map((tool) => {
                        return (_jsxs("div", { className: "dp-tool-card", children: [_jsx("div", { className: "dp-tool-icon-col", children: _jsx(Icon, { name: tool.icon, className: "dp-tool-icon", fallback: TbBrandAdobe }) }), _jsxs("div", { className: "dp-tool-info-col", children: [_jsx("a", { href: tool.href || '#', target: "_blank", rel: "noopener noreferrer", className: "dp-tool-name", children: _jsx("h3", { children: tool.title }) }), tool.description && _jsx("p", { className: "dp-tool-desc", children: tool.description })] })] }, tool.title));
                    }) })] }) }));
}
