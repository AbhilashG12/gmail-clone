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
    <div 
      className={`
        flex items-center shadow-2xl border-b px-4 h-18 cursor-pointer transition-colors duration-200 ease-out
        ${email.isRead ? "bg-white hover:bg-gray-50" : "bg-white hover:bg-gray-50"}
      `}
    >
      <div className="mr-4 shrink-0">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300"/>
      </div>

      <div className="mr-4 shrink-0 text-gray-400 hover:text-yellow-400 transition-colors">
        <FiStar className={email.isStarred ? "fill-current text-yellow-400" : ""} />
      </div>

      <div className={`w-48 truncate pr-4 shrink-0 ${!email.isRead ? "font-bold text-black" : "text-gray-900"}`}>
        {email.sender}
      </div>

      <div className="flex-1 flex items-center min-w-0">
        <span className={`truncate mr-2 ${!email.isRead ? "font-bold text-black" : "font-medium text-gray-800"}`}>
          {email.subject}
        </span>
        <span className="text-gray-400 text-sm truncate font-normal">
          - {email.body}
        </span>
      </div>

      <div className={`w-24 text-right text-xs ml-4 shrink-0 whitespace-nowrap ${!email.isRead ? "font-bold text-black" : "text-gray-500"}`}>
        {new Date(email.date).toLocaleDateString([], { month: "short", day: "numeric" })}
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

  // Handlers
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="h-full w-full bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      
      <div className=" shadow-xl p-4 flex justify-between items-center bg-gray-100 z-10 h-15">
        <h2 className="text-xl font-bold text-gray-700">Inbox</h2>
        <span className="text-sm text-gray-500">
          Showing {((page - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(page * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
      </div>
      <div className="flex-1">
        <Virtuoso
          ref={virtuosoRef}
          style={{ height: '100%', width: '100%' }}
          data={currentData}
          totalCount={currentData.length}
          itemContent={(_, email) => <Row email={email} />}
          overscan={10} 
        />
      </div>
      <div className=" shadow-xl p-3 bg-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page <span className="font-bold">{page}</span> of {totalPages}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev} 
            disabled={page === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={page === totalPages}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Inbox;