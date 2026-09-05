'use client'

import { Check, Copy } from 'lucide-react'
import { useMemo, useState, type MouseEvent } from 'react'

export type AsciiStyle = 'block' | 'hash' | 'outline' | 'binary' | 'frame' | 'terminal' | 'comment' | 'signal'
type GlyphStyle = Extract<AsciiStyle, 'block' | 'hash' | 'outline' | 'binary'>
type PasteFormat = 'raw' | 'readme' | 'comment'

type AsciiCardProps = {
  index: number
  name: string
  source: string
  style: AsciiStyle
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

const cleanSource = (source: string) => source.toUpperCase().replace(/[^A-Z0-9.!? ]/g, '').trim() || 'HELLO'

const GLYPH_MATERIALS: Record<GlyphStyle, { solid: string; shadow: string }> = {
  block: { solid: '██', shadow: '░░' },
  hash: { solid: '##', shadow: '..' },
  outline: { solid: '[]', shadow: '  ' },
  binary: { solid: '11', shadow: '00' },
}

const renderGlyphs = (source: string, style: GlyphStyle) => {
  const segments = cleanSource(source).slice(0, 48).match(/.{1,8}/g) ?? ['HELLO']
  const material = GLYPH_MATERIALS[style]

  return segments.map((segment) => {
    const glyphs = [...segment].map((character) => BLOCK_FONT[character] ?? BLOCK_FONT['?'])
    return Array.from({ length: 8 }, (_, row) =>
      glyphs.map((glyph) =>
        Array.from({ length: 6 }, (_, column) => {
          const solid = row < 7 && column < 5 && glyph[row][column] === '1'
          const shadow = style !== 'outline' && row > 0 && column > 0 && glyph[row - 1]?.[column - 1] === '1'
          return solid ? material.solid : shadow ? material.shadow : '  '
        }).join('')
      ).join('  ').trimEnd()
    ).join('\n')
  }).join('\n\n')
}

export const renderAscii = (source: string, style: AsciiStyle) => {
  const text = cleanSource(source).slice(0, 48)
  if (style === 'block' || style === 'hash' || style === 'outline' || style === 'binary') return renderGlyphs(text, style)
  if (style === 'terminal') return `$ type --loud\n> ${text}\n█`
  if (style === 'comment') return `/*${'='.repeat(text.length + 4)}\\\n|  ${text}  |\n\\*${'='.repeat(text.length + 4)}/`
  if (style === 'signal') return `[TX/01] ${text.replaceAll(' ', '_')}\n         // END`

  const rule = '─'.repeat(text.length + 2)
  return `┌${rule}┐\n│ ${text} │\n└${rule}┘`
}

const wrapForProject = (output: string, format: PasteFormat, style: AsciiStyle) => {
  if (format === 'readme') return `\`\`\`\n${output}\n\`\`\``
  if (format === 'comment' && style !== 'comment') return `/*\n${output}\n*/`
  return output
}

const PASTE_FORMATS: { id: PasteFormat; label: string }[] = [
  { id: 'raw', label: 'Raw' },
  { id: 'readme', label: 'README' },
  { id: 'comment', label: 'Comment' },
]

const AsciiCard = ({ index, name, source, style }: AsciiCardProps) => {
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<PasteFormat>(style === 'comment' ? 'comment' : 'readme')
  const output = useMemo(() => renderAscii(source, style), [source, style])
  const snippet = wrapForProject(output, format, style)

  const copyAscii = async () => {
    await navigator.clipboard.writeText(`${snippet}\n`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const selectOutput = (event: MouseEvent<HTMLPreElement>) => {
    const range = document.createRange()
    range.selectNodeContents(event.currentTarget)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }

  return (
    <article className="flex min-h-[300px] flex-col justify-between border-b p-5 odd:lg:border-r md:p-7">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>A{String(index).padStart(2, '0')} / {name}</span>
        <span>{style === 'hash' ? '##' : style === 'binary' ? '01' : 'TXT'}</span>
      </div>

      <pre className="my-10 cursor-text overflow-x-auto font-mono text-[11px] leading-[1.55] text-foreground select-all sm:text-[12px]" aria-label={`${name} ASCII preview`} onClick={selectOutput}>
        {output}
      </pre>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="flex items-center gap-1" role="group" aria-label="Paste format">
          {PASTE_FORMATS.map((item) => (
            <button key={item.id} type="button" onClick={() => setFormat(item.id)} aria-pressed={format === item.id} className={`inline-flex h-8 items-center rounded-sm px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${format === item.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={copyAscii} className="inline-flex h-9 items-center gap-2 rounded-sm border bg-background px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Copy ${name} ASCII`}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy ASCII'}
        </button>
      </div>
    </article>
  )
}

export default AsciiCard
