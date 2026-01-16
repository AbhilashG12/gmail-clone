import { create } from 'zustand';

interface ComposeState {
  to: string;
  subject: string;
  body: string;
}

interface ComposeStore {
  isOpen: boolean;
  isMinimized: boolean;
  defaults: ComposeState; 
  openCompose: (defaults?: Partial<ComposeState>) => void;
  closeCompose: () => void;
  minimizeCompose: () => void;
}

export const useComposeStore = create<ComposeStore>((set) => ({
  isOpen: false,
  isMinimized: false,
  defaults: { to: "", subject: "", body: "" },

  openCompose: (defaults = {}) => set({ 
      isOpen: true, 
      isMinimized: false,
      defaults: { to: "", subject: "", body: "", ...defaults } 
  }),
  
  closeCompose: () => set({ isOpen: false, defaults: { to: "", subject: "", body: "" } }),
  minimizeCompose: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));