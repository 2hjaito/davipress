'use client'

import type { ComponentType } from 'react'
import RawGitHubCalendar from 'react-github-calendar'

// react-github-calendar ships types built against an older @types/react, incompatible with React 19's JSX typings
const GitHubCalendar = RawGitHubCalendar as unknown as ComponentType<{ username: string; blockSize?: number; blockMargin?: number; fontSize?: number; theme?: { light: string[]; dark: string[] } }>

const theme = { dark: ['#374151', '#1e4429', '#2d6d32', '#3fa641', '#53d353'], light: ['#f0f0f0', '#b9e6c1', '#81cd95', '#4fb66f', '#2b9c51'] }

export function GithubContributions({ username }: { username: string }) {
  return <div className="dp-github-calendar"><GitHubCalendar username={username} blockSize={12} blockMargin={4} fontSize={12} theme={theme} /></div>
}
