import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { type Email } from "../data/emails"; 
import { FiStar, FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import { useInboxLogic } from "../hooks/useInbox";
import { useSettingsStore } from "../store/useSettingsStore";

type SortOption = 'date-desc' | 'date-asc' | 'unread' | 'starred';

interface RowProps {
  email: Email; 
}

const Row = memo(({ email }: RowProps) => {
  return (
    <div className="px-2 py-1 h-full">
      <div 
        className={`
          relative flex items-center px-4 h-full w-full rounded-xl cursor-pointer
          border border-transparent
          transition-transform duration-75 ease-out
          ${email.isRead 
            ? "bg-white/90 text-gray-600 shadow-sm" 
            : "bg-white text-gray-900 font-semibold shadow-sm ring-1 ring-gray-100"
          }
          hover:scale-[1.005] 
          hover:shadow-md 
          hover:z-10 
          hover:bg-white
        `}
      >
        <div className="mr-4 shrink-0 flex items-center justify-center">
          <input 
            type="checkbox" 
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div 
          className="mr-4 shrink-0 hover:scale-110 transition-transform duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <FiStar 
            className={`w-5 h-5 ${email.isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-gray-400"}`} 
          />
        </div>

        <div className={`w-48 truncate pr-4 shrink-0 text-sm ${!email.isRead ? "font-bold text-gray-900" : "font-medium"}`}>
          {email.sender}
        </div>

        <div className="flex-1 flex items-center min-w-0 text-sm">
          <span className={`truncate mr-2 ${!email.isRead ? "font-bold text-gray-900" : "font-medium"}`}>
            {email.subject}
          </span>
          <span className="text-gray-400 truncate font-normal">
            - {email.body}
          </span>
        </div>

        <div className={`w-24 text-right text-xs ml-4 shrink-0 whitespace-nowrap ${!email.isRead ? "font-bold text-gray-900" : "text-gray-500"}`}>
          {new Date(email.date).toLocaleDateString([], { month: "short", day: "numeric" })}
        </div>
      </div>
    </div>
  );
});

const Inbox = () => {
  const { state, virtuosoRef, handlers } = useInboxLogic();
  const { page, totalPages, totalItems, currentData, itemHeight, query, sortBy } = state;
  const { setSortBy } = useSettingsStore(); 

  return (
    <div className="h-full w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans border border-white/50">
      
      {/* HEADER */}
      <div className="px-6 py-4 flex justify-between items-center bg-white/50 border-b border-gray-100/50 z-10 h-16">
        <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">{query ? `Search: "${query}"` : "Inbox"}</h2>
            <span className="text-xs font-bold text-gray-500 bg-white/50 px-3 py-1 rounded-full uppercase tracking-wide">
             {totalItems} Items
            </span>
        </div>

        {/* SORTING DROPDOWN */}
        <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-semibold text-gray-600 outline-none cursor-pointer hover:text-blue-600 border-none focus:ring-0"
            >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="unread">Unread First</option>
                <option value="starred">Starred First</option>
            </select>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 px-2 pt-2">
        {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No emails found matching "{query}"</p>
            </div>
        ) : (
            <Virtuoso
              ref={virtuosoRef}
              style={{ height: '100%', width: '100%' }}
              data={currentData}
              totalCount={totalItems}
              itemContent={(_, email) => (
                <div style={{ height: `${itemHeight}px` }}>
                  <Row email={email} />
                </div>
              )}
              overscan={20}
              className="scrollbar-hide"
            />
        )}
      </div>

      {/* FOOTER */}
      <div className="px-6 py-3 bg-white/50 border-t border-gray-100/50 flex justify-between items-center">
        <span className="text-sm text-gray-500 font-medium">
          Page <span className="text-gray-900">{page}</span> of {totalPages || 1}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlers.handlePrev} 
            disabled={page === 1}
            className="p-2 rounded-lg hover:bg-white/50 active:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handlers.handleNext} 
            disabled={page === totalPages || totalPages === 0}
            className="p-2 rounded-lg hover:bg-white/50 active:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Inbox;