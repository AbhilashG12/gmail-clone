import { create } from 'zustand';
import { type Email } from '../data/emails';

interface ReadingStore {
  selectedEmail: Email | null;
  selectEmail: (email: Email) => void;
  clearSelection: () => void;
}

export const useReadingStore = create<ReadingStore>((set) => ({
  selectedEmail: null,
  selectEmail: (email) => set({ selectedEmail: email }),
  clearSelection: () => set({ selectedEmail: null }),
}));