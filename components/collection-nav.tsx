'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/', label: 'ASCII' },
  { href: '/text', label: 'Text' },
] as const

const CollectionNav = ({ compact = false }: { compact?: boolean }) => {
  const pathname = usePathname()
  const current = pathname === '/text' ? '/text' : '/'

  return (
    <nav className="flex items-center gap-1" aria-label="Collections">
      {ITEMS.map((item) => {
        const active = current === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${compact ? 'h-8 px-2.5 text-[10px]' : 'h-9 px-3 text-[11px]'} ${active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default CollectionNav
