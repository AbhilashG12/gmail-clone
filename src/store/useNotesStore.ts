import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  content: string;
  createdAt: number;
}

interface NotesStore {
  notes: Note[];
  addNote: (content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (content) => set((state) => ({
        notes: [
          
          { id: Math.random().toString(36).substr(2, 9), content, createdAt: Date.now() },
          ...state.notes
        ]
      })),

      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
    }),
    {
      name: 'notes-storage',
    }
  )
);