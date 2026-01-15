import { useState, useMemo } from "react";
import { 
  addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO 
} from "date-fns";
import Holidays from 'date-holidays';
import { useCalendarStore, type CalendarEvent } from "../store/useCalendarstore";

export const useCalendarLogic = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState("");

  const { events, addEvent, deleteEvent } = useCalendarStore();

  const holidayEngine = useMemo(() => new Holidays('IN'), []);


  const holidayEvents = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    const rawHolidays = [
      ...holidayEngine.getHolidays(currentYear - 1),
      ...holidayEngine.getHolidays(currentYear),
      ...holidayEngine.getHolidays(currentYear + 1)
    ];


    return rawHolidays.map(h => ({
      id: `holiday-${h.date}`,
      date: h.date, 
      title: h.name,
      color: "green",
      isReadOnly: true 
    })) as CalendarEvent[];
  }, [currentDate, holidayEngine]);

  const allEvents = useMemo(() => {
    return [...events, ...holidayEvents];
  }, [events, holidayEvents]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    return eachDayOfInterval({ 
      start: startOfWeek(monthStart), 
      end: endOfWeek(monthEnd) 
    });
  }, [currentDate]);

  const selectedDayEvents = useMemo(() => {
 
    return allEvents.filter(e => {
        const eventDate = typeof e.date === 'string' ? parseISO(e.date) : new Date(e.date);
        return isSameDay(eventDate, selectedDate);
    });
  }, [allEvents, selectedDate]);

  const handlers = {
    nextMonth: () => setCurrentDate(addMonths(currentDate, 1)),
    prevMonth: () => setCurrentDate(subMonths(currentDate, 1)),
    selectDate: (date: Date) => setSelectedDate(date),
    setNewEventTitle: (title: string) => setNewEventTitle(title),
    
    addEvent: (e: React.FormEvent) => {
      e.preventDefault();
      if (!newEventTitle.trim()) return;
      addEvent({
        date: selectedDate.toISOString(),
        title: newEventTitle,
        color: "blue"
      });
      setNewEventTitle("");
    },

    deleteEvent: (id: string) => deleteEvent(id),
  };

  const helpers = {
    getDayEvents: (date: Date) => {
      return allEvents.filter(e => {
        const eventDate = typeof e.date === 'string' ? parseISO(e.date) : new Date(e.date);
        return isSameDay(eventDate, date);
      });
    },
  };

  return {
    state: { currentDate, selectedDate, newEventTitle, calendarDays, selectedDayEvents },
    handlers,
    helpers
  };
};