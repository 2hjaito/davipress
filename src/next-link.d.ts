declare module 'next/link' {
  import type { AnchorHTMLAttributes, ReactNode } from 'react'

  export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }): ReactNode
}