import { create } from 'zustand'
interface TextState {
    textColor: string;
    settxtValue: (newValue: string) => void;
    textDynamic: Record<string, string | number>
    settxtDynamicValue: (newValue: Record<string, string | number>) => void;
}
export const useTextStore = create<TextState>((set) => ({
    textColor: '',
    settxtValue: (newValue) => set({ textColor: newValue }),
    textDynamic: {},
    settxtDynamicValue: (newValue) => set({ textDynamic: newValue }),

}))
