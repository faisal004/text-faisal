'use client'

import { Check, Copy } from 'lucide-react'
import { useMemo, useState } from 'react'

export type AsciiStyle = 'block' | 'frame' | 'terminal' | 'comment' | 'signal'

type AsciiCardProps = {
  index: number
  name: string
  source: string
  style: AsciiStyle
}

const getLines = (source: string) => {
  const lines = source
    .toUpperCase()
    .split('\n')
    .map((line) => line.trim().slice(0, 28))
    .filter(Boolean)
    .slice(0, 3)

  return lines.length ? lines : ['YOUR WORDS HERE']
}

const BLOCK_FONT: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  '.': ['00000', '00000', '00000', '00000', '00000', '00110', '00110'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
}

const renderBlock = (source: string) => {
  const text = source.toUpperCase().replaceAll('\n', ' ').replace(/[^A-Z0-9.!? ]/g, '').trim().slice(0, 60) || 'HELLO'
  const segments = text.match(/.{1,10}/g) ?? ['HELLO']

  return segments.map((segment) => {
    const glyphs = [...segment].map((character) => BLOCK_FONT[character] ?? BLOCK_FONT['?'])
    return Array.from({ length: 8 }, (_, row) =>
      glyphs.map((glyph) =>
        Array.from({ length: 6 }, (_, column) => {
          const solid = row < 7 && column < 5 && glyph[row][column] === '1'
          const shadow = row > 0 && column > 0 && glyph[row - 1]?.[column - 1] === '1'
          return solid ? '██' : shadow ? '░░' : '  '
        }).join('')
      ).join('  ').trimEnd()
    ).join('\n')
  }).join('\n\n')
}

const renderAscii = (source: string, style: AsciiStyle) => {
  if (style === 'block') return renderBlock(source)

  const lines = getLines(source)
  const width = Math.max(...lines.map((line) => line.length), 14)
  const padded = lines.map((line) => line.padEnd(width))

  if (style === 'terminal') {
    return [`$ type --loud`, ...lines.map((line) => `> ${line}`), '█'].join('\n')
  }

  if (style === 'comment') {
    const rule = '='.repeat(width + 4)
    return [`/*${rule}\\`, ...padded.map((line) => `|  ${line}  |`), `\\*${rule}/`].join('\n')
  }

  if (style === 'signal') {
    return [...lines.map((line, index) => `[TX/${String(index + 1).padStart(2, '0')}] ${line.replaceAll(' ', '_')}`), '         // END'].join('\n')
  }

  const rule = '─'.repeat(width + 2)
  return [`┌${rule}┐`, ...padded.map((line) => `│ ${line} │`), `└${rule}┘`].join('\n')
}

const AsciiCard = ({ index, name, source, style }: AsciiCardProps) => {
  const [copied, setCopied] = useState(false)
  const output = useMemo(() => renderAscii(source, style), [source, style])

  const copyAscii = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <article className="flex min-h-[300px] flex-col justify-between border-b p-5 odd:lg:border-r last:lg:col-span-2 last:lg:border-r-0 md:p-7">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>A{String(index).padStart(2, '0')} / {name}</span>
        <span>Plain text</span>
      </div>

      <pre className="my-10 overflow-x-auto font-mono text-[12px] leading-[1.6] text-foreground sm:text-sm" aria-label={`${name} ASCII preview`}>
        {output}
      </pre>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">UTF—8 / TXT</span>
        <button type="button" onClick={copyAscii} className="inline-flex h-9 items-center gap-2 rounded-sm border bg-background px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Copy ${name} ASCII text`}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy ASCII'}
        </button>
      </div>
    </article>
  )
}

export default AsciiCard
