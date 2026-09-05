import { create } from 'zustand'
import type { CSSProperties } from 'react'
interface TextState {
    textColor: string;
    settxtValue: (newValue: string) => void;
    textDynamic: CSSProperties
    settxtDynamicValue: (newValue: CSSProperties) => void;
}
export const useTextStore = create<TextState>((set) => ({
    textColor: '',
    settxtValue: (newValue) => set({ textColor: newValue }),
    textDynamic: {},
    settxtDynamicValue: (newValue) => set({ textDynamic: newValue }),

}))
