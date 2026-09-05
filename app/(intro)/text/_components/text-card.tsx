'use client'

import { useTextStore } from '@/Store/textStore/textStore'
import { Check, Copy, Eye } from 'lucide-react'
import { useState } from 'react'

type TextCardProps = { className: string; id: string; index: number; name: string; note: string; sample: string; selected: boolean }

const TextCard = ({ className, id, index, name, note, sample, selected }: TextCardProps) => {
  const [copied, setCopied] = useState(false)
  const { settxtValue, settxtDynamicValue } = useTextStore()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(className)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <article className="specimen-enter group relative flex min-h-[330px] flex-col justify-between border-b p-5 even:md:border-l xl:border-l xl:first:border-l-0" style={{ animationDelay: `${Math.min(index - 1, 5) * 45}ms` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-muted-foreground"><p>{String(index).padStart(2, '0')} / {name}</p><p>{note}</p></div>
        {selected && <span className="rounded-full bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-foreground">Live</span>}
      </div>

      <p className={`my-12 line-clamp-2 break-words font-cal text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.045em] ${className}`}>{sample || 'Your words here'}</p>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">#{id}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => { settxtDynamicValue({}); settxtValue(className) }} className="inline-flex h-9 items-center gap-2 rounded-sm px-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-[background-color,color,transform] duration-150 ease-out hover:bg-secondary active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Preview ${name}`}><Eye className="h-3.5 w-3.5" /> Preview</button>
          <button type="button" onClick={handleCopy} className="inline-flex h-9 min-w-9 items-center justify-center rounded-sm border bg-background px-2.5 transition-[background-color,color,transform] duration-150 ease-out hover:bg-foreground hover:text-background active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={copied ? `${name} class copied` : `Copy ${name} class`} title={copied ? 'Copied' : 'Copy class'}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}</button>
        </div>
      </div>
    </article>
  )
}

export default TextCard
