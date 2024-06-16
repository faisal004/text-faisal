'use client'
import { useBackgroundStore } from '@/Store/backgroundStore'
import { useTextStore } from '@/Store/textStore/textStore'

export default function Template({ children }: { children: React.ReactNode }) {
  const { backgroundColor, backgroundDynamic } = useBackgroundStore()
  const { textColor } = useTextStore()
  console.log(textColor)
  return <div className={`${backgroundColor} ${textColor} `} style={backgroundDynamic} >{children}</div>
}
