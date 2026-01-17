import { create } from 'zustand';

interface KeyboardStore {
  focusedIndex: number;
  setFocusedIndex: (index: number | ((prev: number) => number)) => void;
  resetFocus: () => void;
}

export const useKeyboardStore = create<KeyboardStore>((set) => ({
  focusedIndex: -1,
  setFocusedIndex: (fn) => set((state) => ({
    focusedIndex: typeof fn === 'function' ? fn(state.focusedIndex) : fn
  })),
  resetFocus: () => set({ focusedIndex: -1 })
}));