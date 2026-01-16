import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  bgImage: string;
  bgColor: string;
  density: 'comfortable' | 'compact';
  itemsPerPage: number;
  // New State
  sortBy: 'date-desc' | 'date-asc' | 'unread' | 'starred';

  setBgImage: (url: string) => void;
  setBgColor: (color: string) => void;
  setDensity: (density: 'comfortable' | 'compact') => void;
  setItemsPerPage: (count: number) => void;
  // New Action
  setSortBy: (sort: 'date-desc' | 'date-asc' | 'unread' | 'starred') => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      bgImage: '', 
      bgColor: '#b2d5ee',
      density: 'comfortable',
      itemsPerPage: 50,
      sortBy: 'date-desc', // Default to Newest First

      setBgImage: (url) => set({ bgImage: url }),
      setBgColor: (color) => set({ bgColor: color, bgImage: '' }),
      setDensity: (density) => set({ density }),
      setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    { name: 'app-settings' }
  )
);