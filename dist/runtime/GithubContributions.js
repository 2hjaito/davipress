'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import RawGitHubCalendar from 'react-github-calendar';
// react-github-calendar ships types built against an older @types/react, incompatible with React 19's JSX typings
const GitHubCalendar = RawGitHubCalendar;
const theme = { dark: ['#374151', '#1e4429', '#2d6d32', '#3fa641', '#53d353'], light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] };
export function GithubContributions({ username }) {
    return _jsx("div", { className: "dp-github-calendar", children: _jsx(GitHubCalendar, { username: username, blockSize: 12, blockMargin: 4, fontSize: 12, theme: theme }) });
}
