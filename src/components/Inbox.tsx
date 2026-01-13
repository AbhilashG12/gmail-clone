import { memo, useState, useMemo, useRef, useEffect } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { type Email } from "../data/emails"; 
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { hugeEmails } from "../data/generateEmails";

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

const ITEMS_PER_PAGE = 100;

const Inbox = () => {
  const [page, setPage] = useState(1);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  
  const totalItems = hugeEmails.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return hugeEmails.slice(start, end);
  }, [page]);

  useEffect(() => {
    virtuosoRef.current?.scrollTo({ top: 0 });
  }, [page]);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="h-full w-full bg-gray-50/50 rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans">
      
      <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 z-10 h-16">
        <h2 className="text-xl font-bold text-gray-800">Inbox</h2>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {((page - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(page * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
      </div>

      <div className="flex-1 px-2 pt-2">
        <Virtuoso
          ref={virtuosoRef}
          style={{ height: '100%', width: '100%' }}
          data={currentData}
          totalCount={currentData.length}
          itemContent={(_, email) => (
            <div style={{ height: '72px' }}>
              <Row email={email} />
            </div>
          )}
          overscan={20}
          className="scrollbar-hide"
        />
      </div>

      <div className="px-6 py-3 bg-white border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500 font-medium">
          Page <span className="text-gray-900">{page}</span> of {totalPages}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev} 
            disabled={page === 1}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={page === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-gray-600"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Inbox;