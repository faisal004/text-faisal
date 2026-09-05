'use client'

import { ArrowDown } from 'lucide-react'
import CollectionNav from '@/components/collection-nav'
import AsciiCard, { HELLO_BLOCK, type AsciiStyle } from './ascii-card'

const ASCII_STYLES: { name: string; style: AsciiStyle }[] = [
  { name: 'Block', style: 'block' },
  { name: 'Frame', style: 'frame' },
  { name: 'Terminal', style: 'terminal' },
  { name: 'Comment', style: 'comment' },
  { name: 'Signal', style: 'signal' },
]

const AsciiSection = () => (
  <>
    <section className="hairline-grid border-b">
      <div className="mx-auto grid max-w-[1400px] border-x md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-h-[620px] flex-col justify-between bg-background/92 p-5 sm:p-8 md:min-h-[680px] md:p-12 lg:p-16">
          <div className="flex items-start justify-between gap-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">ASCII treatment archive</p>
            <CollectionNav compact />
          </div>

          <div className="my-16 max-w-5xl">
            <p className="mb-7 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="mr-3 text-lime-600 dark:text-lime-300">●</span>Live specimen</p>
            <pre className="overflow-x-auto font-mono text-[11px] leading-[1.45] text-foreground sm:text-sm" aria-label="HELLO block ASCII">
              {HELLO_BLOCK}
            </pre>
            <p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">One word, five treatments. Pick Raw, README, or Comment, then copy and paste it into a project.</p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <a href="#collection" className="inline-flex h-10 items-center gap-2 rounded-sm border bg-background px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97]">Explore ASCII <ArrowDown className="h-3.5 w-3.5" /></a>
            <span className="hidden font-mono text-[10px] leading-5 text-muted-foreground sm:block">┌─ click a card<br />└─ copy into a project</span>
          </div>
        </div>

        <aside className="hidden border-l bg-background/92 p-8 md:flex md:flex-col md:justify-between">
          <pre className="font-mono text-[11px] leading-[1.35] text-muted-foreground" aria-hidden="true">{`┌──────────────┐
│ H E L L O    │
│              │
│  RAW         │
│  README      │
│  COMMENT     │
└──────────────┘`}</pre>
          <div>
            <div className="mb-4 h-px bg-border" />
            <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted-foreground">Built for READMEs,<br />source files, and launch notes.</p>
          </div>
        </aside>
      </div>
    </section>

    <section id="collection" className="scroll-mt-4">
      <div className="mx-auto max-w-[1400px] border-x">
        <div className="border-b px-5 py-10 md:px-8 md:py-14">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Index / A01—A05</p>
          <h2 className="font-cal text-4xl tracking-[-0.035em] sm:text-5xl">HELLO, in ASCII.</h2>
        </div>
        <div className="grid lg:grid-cols-2">
          {ASCII_STYLES.map((item, index) => <AsciiCard key={item.style} {...item} index={index + 1} />)}
        </div>
      </div>
    </section>
  </>
)

export default AsciiSection
