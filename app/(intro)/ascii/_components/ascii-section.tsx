'use client'

import { ArrowDown, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import CollectionNav from '@/components/collection-nav'
import AsciiCard, { renderAscii, type AsciiStyle } from './ascii-card'

const ASCII_STYLES: { name: string; style: AsciiStyle }[] = [
  { name: 'Block', style: 'block' },
  { name: 'Hash', style: 'hash' },
  { name: 'Outline', style: 'outline' },
  { name: 'Binary', style: 'binary' },
  { name: 'At Sign', style: 'at' },
  { name: 'Asterisk', style: 'star' },
  { name: 'Plus', style: 'plus' },
  { name: 'Shade', style: 'shade' },
]

const DEFAULT_TEXT = 'HELLO'

const AsciiSection = () => {
  const [source, setSource] = useState(DEFAULT_TEXT)
  const preview = renderAscii(source, 'block')

  return (
    <>
      <section className="hairline-grid border-b">
        <div className="mx-auto grid max-w-[1400px] border-x md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-h-[680px] flex-col justify-between bg-background/92 p-5 sm:p-8 md:p-12 lg:p-16">
            <div className="flex items-start justify-between gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">ASCII treatment archive</p>
              <CollectionNav compact />
            </div>

            <div className="my-12 max-w-5xl md:my-16">
              <div className="mb-7 flex items-end justify-between gap-5 border-b pb-4">
                <label htmlFor="ascii-source" className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Type your text</label>
                <span className="font-mono text-[9px] tabular-nums tracking-[0.12em] text-muted-foreground">{source.length} / 32</span>
              </div>
              <input
                id="ascii-source"
                type="text"
                value={source}
                onChange={(event) => setSource(event.target.value.slice(0, 32))}
                maxLength={32}
                spellCheck="false"
                autoComplete="off"
                placeholder="HELLO"
                className="mb-10 block w-full bg-transparent font-cal text-4xl uppercase tracking-[-0.035em] outline-none placeholder:text-muted-foreground/40 sm:text-5xl"
              />

              <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="mr-3 text-lime-600 dark:text-lime-300">●</span>Live block preview</p>
              <pre className="max-h-[360px] overflow-auto font-mono text-[9px] leading-[1.4] text-foreground sm:text-[11px]" aria-live="polite" aria-label="Live block ASCII preview">
                {preview}
              </pre>
              <p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">Type once and every full-size letter treatment below updates live. Choose a material, then copy the actual ASCII output.</p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <a href="#collection" className="inline-flex h-10 items-center gap-2 rounded-sm border bg-background px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97]">Explore ASCII <ArrowDown className="h-3.5 w-3.5" /></a>
              <span className="hidden font-mono text-[10px] leading-5 text-muted-foreground sm:block">┌─ type above<br />└─ copy below</span>
            </div>
          </div>

          <aside className="hidden border-l bg-background/92 p-8 md:flex md:flex-col md:justify-between">
            <pre className="font-mono text-[11px] leading-[1.35] text-muted-foreground" aria-hidden="true">{`┌──────────────┐
│ █  #  @  *   │
│              │
│  08 STYLES   │
│  03 FORMATS  │
│  01 INPUT    │
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
          <div className="flex flex-col gap-5 border-b px-5 py-10 sm:flex-row sm:items-end sm:justify-between md:px-8 md:py-14">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Index / A01—A08</p>
              <h2 className="font-cal text-4xl tracking-[-0.035em] sm:text-5xl">Your words, eight ways.</h2>
            </div>
            <button type="button" onClick={() => setSource(DEFAULT_TEXT)} className="inline-flex h-9 w-fit items-center gap-2 rounded-sm px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><RotateCcw className="h-3.5 w-3.5" /> Reset text</button>
          </div>
          <div className="grid lg:grid-cols-2">
            {ASCII_STYLES.map((item, index) => <AsciiCard key={item.style} {...item} index={index + 1} source={source} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default AsciiSection
