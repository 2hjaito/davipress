declare module 'next/navigation' {
  export function usePathname(): string | null
  export function useRouter(): { push(href: string): void; replace(href: string): void; refresh(): void }
}
