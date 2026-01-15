import { format, isSameMonth, isSameDay, isToday } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCalendarLogic } from "../hooks/useCalendar";

const Calendar = () => {
  const { state, handlers, helpers } = useCalendarLogic();
  const { currentDate, selectedDate, newEventTitle, calendarDays, selectedDayEvents } = state;

  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans flex flex-col max-h-125">
      <div className="p-2 border-b border-gray-100">
        <div className="flex items-center justify-between px-2 py-2 mb-2">
          <span className="font-bold text-gray-700 text-sm">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <div className="flex space-x-1">
            <button onClick={handlers.prevMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
              <FiChevronLeft size={16}/>
            </button>
            <button onClick={handlers.nextMonth} className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
              <FiChevronRight size={16}/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7  text-center mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-[10px] font-bold text-gray-400">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {calendarDays.map((day) => {
            const dayEvents = helpers.getDayEvents(day);
            const hasEvents = dayEvents.length > 0;
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);

            return (
              <div key={day.toString()} className="flex flex-col items-center">
                <button
                  onClick={() => handlers.selectDate(day)}
                  className={`
                    w-8 h-8 text-xs rounded-full flex flex-col cursor-pointer items-center justify-center transition-all relative
                    ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                    ${isSelected ? "bg-blue-100 text-blue-600 font-bold" : "hover:bg-gray-50"}
                    ${isDayToday ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white" : ""}
                  `}
                >
                  <span>{format(day, "d")}</span>
                  
                  {hasEvents && (
                    <div className="flex space-x-0.5 mt-0.5">
                  
                      {dayEvents.slice(0, 3).map((ev, i) => (
                        <div 
                           key={i} 
                           
                           className={`w-1 h-1 rounded-full ${isDayToday ? "bg-white" : `bg-${ev.color}-500`}`}
                        ></div>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100 bg-white text-xs font-bold text-gray-500 uppercase tracking-wider">
          {isToday(selectedDate) ? "Today's Schedule" : format(selectedDate, "EEEE, MMM do")}
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {selectedDayEvents.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-xs">No events</div>
          ) : (
            
            selectedDayEvents.map(event => (
              <div key={event.id} className="group bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className={`w-1.5 h-8 rounded-full bg-${event.color}-500`}></div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700 font-medium">{event.title}</span>
                    {event.isReadOnly && <span className="text-[10px] text-green-600 font-bold uppercase">Holiday</span>}
                  </div>
                </div>
                
                {!event.isReadOnly && (
                  <button 
                    onClick={() => handlers.deleteEvent(event.id)} 
                    className="text-gray-300 cursor-pointer hover:text-red-500 p-1"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <form onSubmit={handlers.addEvent} className="p-3 bg-white border-t border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <input 
              type="text" 
              value={newEventTitle}
              onChange={(e) => handlers.setNewEventTitle(e.target.value)}
              placeholder="Add task..." 
              className="bg-transparent cursor-pointer border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
            <button type="submit" disabled={!newEventTitle} className="text-blue-500 hover:text-blue-700 disabled:opacity-50">
              <FiPlus size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calendar;