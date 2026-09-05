'use client'

import CollectionNav from '@/components/collection-nav'
import { ModeToggle } from '@/components/toggle-theme'
import { Code2 } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => (
  <header className="border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
    <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
      <Link href="/" className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4" aria-label="Type Lab home">
        <span className="font-cal text-xl tracking-[-0.03em]">TYPE LAB</span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">/ FH—24</span>
      </Link>
      <nav className="flex items-center gap-1" aria-label="Primary navigation">
        <div className="hidden sm:block">
          <CollectionNav />
        </div>
        <Link href="https://github.com/faisal004/text-faisal" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-sm px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary hover:text-foreground active:scale-[0.97]">
          <Code2 className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Source</span>
        </Link>
        <ModeToggle />
      </nav>
    </div>
  </header>
)

export default Navbar
