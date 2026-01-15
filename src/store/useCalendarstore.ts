import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CalendarEvent {
  id: string;
  date: string; 
  title: string;
  color: string;
  isReadOnly?: boolean; 
}

interface CalendarStore {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      events: [], 
      addEvent: (newEvent) => set((state) => ({
        events: [...state.events, { ...newEvent, id: Math.random().toString(36).substr(2, 9) }]
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),
    }),
    { name: 'calendar-storage' }
  )
);