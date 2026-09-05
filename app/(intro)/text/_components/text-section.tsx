'use client'

import CollectionNav from '@/components/collection-nav'
import TextCard from './text-card'
import { useTextStore } from '@/Store/textStore/textStore'
import { ArrowDown, Check, Copy, RotateCcw, Shuffle } from 'lucide-react'
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
const DEFAULT_COLORS = ['#18181b', '#71717a', '#a1a1aa'] as const
const DEFAULT_STOPS = [0, 50, 100] as const
const STOP_NAMES = ['From', 'Via', 'To'] as const

const PALETTES = [
  ['#c026d3', '#f43f5e', '#fb923c'],
  ['#65a30d', '#10b981', '#06b6d4'],
  ['#1d4ed8', '#4f46e5', '#8b5cf6'],
  ['#d97706', '#f97316', '#f43f5e'],
  ['#7c3aed', '#9333ea', '#ec4899'],
  ['#111827', '#6b7280', '#d1d5db'],
] as const

const TextsSection = () => {
  const [copy, setCopy] = useState(DEFAULT_COPY)
  const [colors, setColors] = useState<string[]>([...DEFAULT_COLORS])
  const [stops, setStops] = useState<number[]>([...DEFAULT_STOPS])
  const [copied, setCopied] = useState(false)
  const { textColor, textDynamic, settxtValue, settxtDynamicValue } = useTextStore()
  const isCustom = Boolean(textDynamic.backgroundImage)
  const activeStyle = isCustom ? 'text-transparent bg-clip-text' : textColor || TEXT_STYLES[0].className
  const customClasses = `text-transparent bg-clip-text bg-linear-to-r from-[${colors[0]}] from-[${stops[0]}%] via-[${colors[1]}] via-[${stops[1]}%] to-[${colors[2]}] to-[${stops[2]}%]`

  const applyGradient = (nextColors: string[], nextStops: number[]) => {
    settxtValue('text-transparent bg-clip-text')
    settxtDynamicValue({
      backgroundImage: `linear-gradient(90deg, ${nextColors[0]} ${nextStops[0]}%, ${nextColors[1]} ${nextStops[1]}%, ${nextColors[2]} ${nextStops[2]}%)`,
    })
  }

  const changeColor = (index: number, color: string) => {
    const nextColors = colors.map((current, position) => position === index ? color : current)
    setColors(nextColors)
    applyGradient(nextColors, stops)
  }

  const changeStop = (index: number, percentage: number) => {
    const nextStops = stops.map((current, position) => position === index ? percentage : current)
    setStops(nextStops)
    applyGradient(colors, nextStops)
  }

  const randomize = () => {
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)]
    const nextColors = [...palette]
    const nextStops = [
      Math.floor(Math.random() * 16),
      35 + Math.floor(Math.random() * 31),
      85 + Math.floor(Math.random() * 16),
    ]
    setColors(nextColors)
    setStops(nextStops)
    applyGradient(nextColors, nextStops)
  }

  const copyClasses = async () => {
    await navigator.clipboard.writeText(isCustom ? customClasses : activeStyle)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const reset = () => {
    setCopy(DEFAULT_COPY)
    setColors([...DEFAULT_COLORS])
    setStops([...DEFAULT_STOPS])
    settxtValue(TEXT_STYLES[0].className)
    settxtDynamicValue({})
  }

  return (
    <>
      <section className="hairline-grid border-b">
        <div className="mx-auto grid max-w-[1400px] border-x md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-h-[680px] flex-col justify-between bg-background/92 p-5 sm:p-8 md:p-12 lg:p-16">
            <div className="flex items-start justify-between gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Text treatment archive</p>
              <CollectionNav compact />
            </div>

            <div className="my-12 max-w-5xl md:my-16">
              <div className="mb-7 flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"><span className="mr-3 text-lime-600 dark:text-lime-300">●</span>Gradient playground</p>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={copyClasses} className="inline-flex h-9 items-center gap-2 rounded-sm px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Copy current Tailwind classes">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy classes'}
                  </button>
                  <button type="button" onClick={randomize} className="inline-flex h-9 items-center gap-2 rounded-sm bg-foreground px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-background transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Shuffle className="h-3.5 w-3.5" /> Random
                  </button>
                </div>
              </div>

              <textarea
                value={copy}
                onChange={(event) => setCopy(event.target.value)}
                rows={2}
                spellCheck="false"
                aria-label="Preview text"
                className={`block min-h-[170px] w-full resize-none overflow-hidden bg-transparent font-cal text-[clamp(3.35rem,9vw,8.5rem)] leading-[0.82] tracking-[-0.055em] outline-none ${activeStyle}`}
                style={textDynamic}
              />

              <div className="mt-8 grid border-y md:grid-cols-3">
                {STOP_NAMES.map((name, index) => (
                  <div key={name} className="border-b p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <label htmlFor={`gradient-color-${index}`} className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{name} color</label>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{colors[index]}</span>
                        <input id={`gradient-color-${index}`} type="color" value={colors[index]} onChange={(event) => changeColor(index, event.target.value)} className="color-well" aria-label={`${name} gradient color`} />
                      </div>
                    </div>
                    <label htmlFor={`gradient-stop-${index}`} className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"><span>{name} position</span><output>{stops[index]}%</output></label>
                    <input id={`gradient-stop-${index}`} type="range" min={index === 0 ? 0 : stops[index - 1]} max={index === 2 ? 100 : stops[index + 1]} step="1" value={stops[index]} onChange={(event) => changeStop(index, Number(event.target.value))} className="playground-range w-full" />
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">Choose three colors and place each stop precisely. Random gives you a balanced gradient to start from.</p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <a href="#collection" className="inline-flex h-10 items-center gap-2 rounded-sm border bg-background px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97]">Explore styles <ArrowDown className="h-3.5 w-3.5" /></a>
              <span className="hidden font-mono text-[10px] leading-5 text-muted-foreground sm:block">┌─ choose colors<br />└─ place the stops</span>
            </div>
          </div>

          <aside className="hidden border-l bg-background/92 p-8 md:flex md:flex-col md:justify-between">
            <pre className="font-mono text-[11px] leading-[1.35] text-muted-foreground" aria-hidden="true">{`┌──────────────┐
│ R → G → B    │
│              │
│  00%         │
│  50%         │
│  100%        │
└──────────────┘`}</pre>
            <div><div className="mb-4 h-px bg-border" /><p className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted-foreground">Three colors.<br />Three stops. That’s it.</p></div>
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
            {TEXT_STYLES.map((style, index) => <TextCard key={style.id} {...style} sample={copy.replace(/\n/g, ' ')} index={index + 1} selected={!isCustom && activeStyle === style.className} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default TextsSection
