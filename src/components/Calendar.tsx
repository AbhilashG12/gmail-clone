import { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart); 
  const endDate = endOfWeek(monthEnd);       

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const jumpToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden font-sans">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-50">
        <span className="font-bold text-gray-700 text-sm">
          {format(currentDate, "MMMM yyyy")}
        </span>
        <div className="flex space-x-1">
           <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <FiChevronLeft size={16}/>
          </button>
          <button onClick={jumpToToday} className="p-1 hover:bg-gray-100 rounded-full text-xs font-bold text-blue-600 px-2">
            Today
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
            <FiChevronRight size={16}/>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center py-2 bg-gray-50/50">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 p-2 gap-y-1">
        {calendarDays.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);

          return (
            <div key={day.toString()} className="flex justify-center">
              <button
                onClick={() => setSelectedDate(day)}
                className={`
                  w-8 h-8 text-xs rounded-full flex items-center justify-center transition-all duration-200
                  
                  /* Base Colors for Current/Other Month */
                  ${!isCurrentMonth ? "text-gray-300" : "text-gray-700 font-medium"}

                  /* Hover Effects */
                  hover:bg-blue-50 hover:text-blue-600

                  /* Selected State */
                  ${isSelected && !isDayToday ? "bg-blue-100 text-blue-600 font-bold" : ""}

                  /* Today State (Overrides everything) */
                  ${isDayToday ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-gray-100 p-3 text-center">
        <p className="text-xs text-gray-400">No events scheduled</p>
      </div>

    </div>
  );
};

export default Calendar;