'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import RawGitHubCalendar from 'react-github-calendar';
// react-github-calendar ships types built against an older @types/react, incompatible with React 19's JSX typings
const GitHubCalendar = RawGitHubCalendar;
const theme = { dark: ['#374151', '#1e4429', '#2d6d32', '#3fa641', '#53d353'], light: ['#f0f0f0', '#b9e6c1', '#81cd95', '#4fb66f', '#2b9c51'] };
export function GithubContributions({ username }) {
    const ref = useRef(null);
    // The calendar loads its data asynchronously, so keep it scrolled to the latest week (today) whenever it (re)renders
    useEffect(() => {
        const root = ref.current;
        if (!root)
            return;
        const scrollToEnd = () => {
            root.scrollLeft = root.scrollWidth;
            root.querySelectorAll('.react-activity-calendar__scroll-container').forEach(container => { container.scrollLeft = container.scrollWidth; });
        };
        scrollToEnd();
        const mutations = new MutationObserver(scrollToEnd);
        mutations.observe(root, { childList: true, subtree: true });
        const resize = new ResizeObserver(scrollToEnd);
        resize.observe(root);
        return () => { mutations.disconnect(); resize.disconnect(); };
    }, [username]);
    return _jsx("div", { ref: ref, className: "dp-github-calendar", children: _jsx(GitHubCalendar, { username: username, blockSize: 12, blockMargin: 4, fontSize: 12, theme: theme }) });
}
