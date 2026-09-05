import { create } from 'zustand'
interface BackgroundState {
    backgroundColor: string;
    setBgValue: (newValue: string) => void;
    backgroundDynamic: Record<string, string | number>;
    setBgDynamicValue: (newValue: Record<string, string | number>) => void;
}
export const useBackgroundStore = create<BackgroundState>((set) => ({
    backgroundColor: '',
    setBgValue: (newValue) => set({ backgroundColor: newValue }),
    backgroundDynamic: {},
    setBgDynamicValue: (newValue) => set({ backgroundDynamic: newValue }),

}))
