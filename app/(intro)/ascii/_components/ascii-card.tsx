'use client'

import { Check, Copy } from 'lucide-react'
import { useMemo, useState, type MouseEvent } from 'react'

export type AsciiStyle = 'block' | 'frame' | 'terminal' | 'comment' | 'signal'
type PasteFormat = 'raw' | 'readme' | 'comment'

type AsciiCardProps = {
  index: number
  name: string
  style: AsciiStyle
}

const HELLO = 'HELLO'

const BLOCK_FONT: Record<string, string[]> = {
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
}

const renderBlockHello = () => {
  const glyphs = [...HELLO].map((character) => BLOCK_FONT[character])

  return Array.from({ length: 8 }, (_, row) =>
    glyphs
      .map((glyph) =>
        Array.from({ length: 6 }, (_, column) => {
          const solid = row < 7 && column < 5 && glyph[row][column] === '1'
          const shadow = row > 0 && column > 0 && glyph[row - 1]?.[column - 1] === '1'
          return solid ? '██' : shadow ? '░░' : '  '
        }).join('')
      )
      .join('  ')
      .trimEnd()
  ).join('\n')
}

export const HELLO_BLOCK = renderBlockHello()

export const renderHello = (style: AsciiStyle) => {
  if (style === 'block') return HELLO_BLOCK
  if (style === 'terminal') return `$ type --loud\n> ${HELLO}\n█`
  if (style === 'comment') return `/*==================\\\n|  ${HELLO.padEnd(14)}  |\n\\*==================/`
  if (style === 'signal') return `[TX/01] ${HELLO}\n         // END`

  return `┌────────────────┐\n│ ${HELLO.padEnd(14)} │\n└────────────────┘`
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

const AsciiCard = ({ index, name, style }: AsciiCardProps) => {
  const [copied, setCopied] = useState(false)
  const [format, setFormat] = useState<PasteFormat>(style === 'comment' ? 'comment' : 'readme')
  const output = useMemo(() => renderHello(style), [style])
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
    <article className="flex min-h-[300px] flex-col justify-between border-b p-5 odd:lg:border-r last:lg:col-span-2 last:lg:border-r-0 md:p-7">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>A{String(index).padStart(2, '0')} / {name}</span>
        <span>HELLO</span>
      </div>

      <pre
        className="my-10 cursor-text overflow-x-auto font-mono text-[12px] leading-[1.6] text-foreground select-all sm:text-sm"
        aria-label={`${name} HELLO ASCII`}
        onClick={selectOutput}
      >
        {output}
      </pre>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="flex items-center gap-1" role="group" aria-label="Paste format">
          {PASTE_FORMATS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFormat(item.id)}
              aria-pressed={format === item.id}
              className={`inline-flex h-8 items-center rounded-sm px-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${format === item.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copyAscii}
          className="inline-flex h-9 items-center gap-2 rounded-sm border bg-background px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Copy ${name} HELLO for a project`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy to project'}
        </button>
      </div>
    </article>
  )
}

export default AsciiCard
