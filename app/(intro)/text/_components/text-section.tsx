'use client'

import CollectionNav from '@/components/collection-nav'
import TextCard from './text-card'
import { useTextStore } from '@/Store/textStore/textStore'
import { ArrowDown, RotateCcw } from 'lucide-react'
import { useState } from 'react'

const TEXT_STYLES = [
  { id: 'graphite', name: 'Graphite', note: 'Quiet / Editorial', className: 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-400 dark:from-stone-50 dark:via-stone-300 dark:to-stone-500' },
  { id: 'infrared', name: 'Infrared', note: 'Warm / Electric', className: 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 dark:from-fuchsia-400 dark:via-rose-400 dark:to-amber-300' },
  { id: 'signal', name: 'Signal', note: 'Sharp / Vital', className: 'text-transparent bg-clip-text bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-500 dark:from-lime-300 dark:via-emerald-300 dark:to-cyan-300' },
  { id: 'cobalt', name: 'Cobalt', note: 'Cool / Focused', className: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-500 dark:from-sky-300 dark:via-indigo-300 dark:to-violet-300' },
  { id: 'solar', name: 'Solar', note: 'Bright / Optimistic', className: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-yellow-300 dark:via-orange-300 dark:to-rose-300' },
  { id: 'ultraviolet', name: 'Ultraviolet', note: 'Deep / Expressive', className: 'text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 dark:from-violet-300 dark:via-purple-300 dark:to-pink-300' },
]

const DEFAULT_COPY = 'Make words\nfeel visible.'

const TextsSection = () => {
  const [copy, setCopy] = useState(DEFAULT_COPY)
  const { textColor, settxtValue } = useTextStore()
  const activeStyle = textColor || TEXT_STYLES[0].className

  const reset = () => {
    setCopy(DEFAULT_COPY)
    settxtValue(TEXT_STYLES[0].className)
  }

  return (
    <>
      <section className="hairline-grid border-b">
        <div className="mx-auto grid max-w-[1400px] border-x md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-h-[620px] flex-col justify-between bg-background/92 p-5 sm:p-8 md:min-h-[680px] md:p-12 lg:p-16">
            <div className="flex items-start justify-between gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Text treatment archive</p>
              <CollectionNav compact />
            </div>

            <div className="my-16 max-w-5xl">
              <p className="mb-7 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="mr-3 text-lime-600 dark:text-lime-300">●</span>Live specimen</p>
              <textarea value={copy} onChange={(event) => setCopy(event.target.value)} rows={2} spellCheck="false" aria-label="Preview text" className={`block w-full resize-none overflow-hidden bg-transparent font-cal text-[clamp(3.35rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.055em] outline-none ${activeStyle}`} />
              <p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">A small collection of expressive, copy-ready text treatments. Edit the words, choose a finish, then take the class.</p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <a href="#collection" className="inline-flex h-10 items-center gap-2 rounded-sm border bg-background px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97]">Explore styles <ArrowDown className="h-3.5 w-3.5" /></a>
              <span className="hidden font-mono text-[10px] leading-5 text-muted-foreground sm:block">┌─ edit above<br />└─ preview below</span>
            </div>
          </div>

          <aside className="hidden border-l bg-background/92 p-8 md:flex md:flex-col md:justify-between">
            <pre className="font-mono text-[11px] leading-[1.35] text-muted-foreground" aria-hidden="true">{`┌──────────────┐
│ T Y P E / 24│
│              │
│  Aa  Bb  Cc  │
│  01  02  03  │
│              │
└──────────────┘`}</pre>
            <div><div className="mb-4 h-px bg-border" /><p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted-foreground">Built for headlines,<br />launches, and loud ideas.</p></div>
          </aside>
        </div>
      </section>

      <section id="collection" className="scroll-mt-4">
        <div className="mx-auto max-w-[1400px] border-x">
          <div className="flex flex-col gap-5 border-b px-5 py-10 sm:flex-row sm:items-end sm:justify-between md:px-8 md:py-14">
            <div><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Index / 01—06</p><h2 className="font-cal text-4xl tracking-[-0.035em] sm:text-5xl">Choose a voice.</h2></div>
            <button type="button" onClick={reset} className="inline-flex h-9 w-fit items-center gap-2 rounded-sm px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><RotateCcw className="h-3.5 w-3.5" /> Reset specimen</button>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {TEXT_STYLES.map((style, index) => <TextCard key={style.id} {...style} sample={copy.replace(/\n/g, ' ')} index={index + 1} selected={activeStyle === style.className} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default TextsSection
