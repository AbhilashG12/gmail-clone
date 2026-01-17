import { memo, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useNavigate } from "react-router-dom";
import { type Email } from "../data/emails"; 
import { FiStar, FiChevronLeft, FiChevronRight, FiFilter, FiTrash2, FiMail, FiCheckSquare, FiX } from "react-icons/fi";
import { useInboxLogic } from "../hooks/useInbox";
import { useSettingsStore } from "../store/useSettingsStore";
import { useEmailStore } from "../store/useEmailStore";
import { useKeyboardStore } from "../store/useKeyboardStore";
import { useInboxShortcuts } from "../hooks/useInboxShortcuts";
import DeleteModal from "./DeleteModal";
import GlobalLoader from "..//animations/GlobalLoader";

type SortOption = 'date-desc' | 'date-asc' | 'unread' | 'starred';

interface RowProps {
  email: Email;
  isSelected: boolean;
  isFocused: boolean;
  onSelect: () => void;
  onStar: () => void;
  onClick: () => void;
}

const Row = memo(({ email, isSelected, isFocused, onSelect, onStar, onClick }: RowProps) => {
  return (
    <div className={`px-2 py-1 h-full ${isSelected ? "bg-blue-50/50" : ""}`}>
      <div 
        className={`
          relative flex items-center px-4 h-full w-full rounded-xl cursor-pointer
          border transition-all duration-75 ease-out
          ${isFocused 
            ? "bg-gray-50 shadow-md z-20 border-blue-400" 
            : "border-transparent"
          }
          ${isSelected 
            ? "bg-blue-100 border-blue-200 z-10" 
            : email.isRead 
                ? "bg-white/90 text-gray-600" 
                : "bg-white text-gray-900 font-semibold shadow-sm ring-1 ring-gray-100"
          }
          hover:scale-[1.005] hover:shadow-md hover:z-10 hover:bg-white
        `}
        onClick={onClick}
      >
        
        {isFocused && (
            <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue-600 rounded-r-md shadow-sm z-50"></div>
        )}

        <div className="mr-4 shrink-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        <div 
          className="mr-4 shrink-0 hover:scale-110 transition-transform duration-100"
          onClick={(e) => { e.stopPropagation(); onStar(); }}
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
  const { currentData, totalItems, itemHeight, searchQuery, activeFolder, selectedIds, page, totalPages, sortBy } = state;
  const navigate = useNavigate();
  const { setSortBy } = useSettingsStore(); 
  const { toggleStar, bulkDelete, bulkMarkRead } = useEmailStore();
  const { focusedIndex, resetFocus } = useKeyboardStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useInboxShortcuts(currentData, virtuosoRef, handlers);

  useEffect(() => {
    resetFocus();
  }, [activeFolder, searchQuery, resetFocus]);

  const title = activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1);
  const isSelectionMode = selectedIds.size > 0;

  const handleRowClick = (emailId: string) => {
    const basePath = searchQuery ? "search" : activeFolder;
    navigate(`/mail/${basePath}/${emailId}${searchQuery ? `?q=${searchQuery}` : ''}`);
 };

  const handleBulkDeleteClick = () => setShowDeleteModal(true);
  
  const confirmDelete = async () => {
    setIsProcessing(true);
    setShowDeleteModal(false);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    bulkDelete(Array.from(selectedIds));
    handlers.clearSelection();
    setIsProcessing(false);
  };

  const handleBulkMarkRead = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    bulkMarkRead(Array.from(selectedIds), true);
    handlers.clearSelection();
    setIsProcessing(false);
  };

  const handleBulkMarkUnread = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    bulkMarkRead(Array.from(selectedIds), false);
    handlers.clearSelection();
    setIsProcessing(false);
  };

  return (
    <>
      {isProcessing && <GlobalLoader />}

      <div className="h-full w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden flex flex-col font-sans border border-white/50">
        
        <div className={`px-6 py-4 flex justify-between items-center border-b border-gray-100/50 z-10 h-16 transition-colors duration-200 ${isSelectionMode ? "bg-blue-50" : "bg-white/50"}`}>
          
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                  <input 
                      type="checkbox"
                      checked={currentData.length > 0 && currentData.every(e => selectedIds.has(e.id))}
                      onChange={handlers.toggleAllPage}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  
                  {isSelectionMode ? (
                      <span className="font-bold text-blue-700">{selectedIds.size} Selected</span>
                  ) : (
                      <>
                          <h2 className="text-xl font-bold text-gray-800">{searchQuery ? `Search: "${searchQuery}"` : title}</h2>
                          <span className="text-xs font-bold text-gray-500 bg-white/50 px-3 py-1 rounded-full uppercase tracking-wide">
                              {totalItems} Items
                          </span>
                      </>
                  )}
              </div>
          </div>

          <div className="flex items-center gap-2">
              {isSelectionMode ? (
                  <div className="flex items-center gap-1 animate-in fade-in duration-200">
                      <button onClick={handleBulkMarkRead} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-full" title="Mark Read">
                          <FiCheckSquare size={18} />
                      </button>
                      <button onClick={handleBulkMarkUnread} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-full" title="Mark Unread">
                          <FiMail size={18} />
                      </button>
                      <button onClick={handleBulkDeleteClick} className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-full" title="Delete">
                          <FiTrash2 size={18} />
                      </button>
                      <div className="h-4 w-px bg-gray-300 mx-2" />
                      <button onClick={handlers.clearSelection} className="p-2 text-gray-500 hover:text-gray-800 rounded-full">
                          <FiX size={18} />
                      </button>
                  </div>
              ) : (
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
              )}
          </div>
        </div>

        <div className="flex-1 px-2 pt-2">
          {totalItems === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No emails found</p>
              </div>
          ) : (
              <Virtuoso
                ref={virtuosoRef}
                style={{ height: '100%', width: '100%' }}
                data={currentData}
                totalCount={totalItems}
                itemContent={(index, email) => (
                  <div style={{ height: `${itemHeight}px` }}>
                    <Row 
                      email={email} 
                      isSelected={selectedIds.has(email.id)}
                      isFocused={index === focusedIndex}
                      onSelect={() => handlers.toggleSelection(email.id)}
                      onStar={() => toggleStar(email.id)}
                      onClick={() => handleRowClick(email.id)}
                    />
                  </div>
                )}
                overscan={20}
                className="scrollbar-hide"
              />
          )}
        </div>

        <div className="px-6 py-3 bg-white/50 border-t border-gray-100/50 flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">
            Page <span className="text-gray-900">{page}</span> of {totalPages || 1}
          </span>
          <div className="flex space-x-2">
            <button onClick={handlers.handleNext} disabled={page === 1} className="p-2 rounded-lg hover:bg-white/50 text-gray-600 disabled:opacity-30">
              <FiChevronLeft size={20} />
            </button>
            <button onClick={handlers.handlePrev} disabled={page === totalPages || totalPages === 0} className="p-2 rounded-lg hover:bg-white/50 text-gray-600 disabled:opacity-30">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={showDeleteModal} 
        count={selectedIds.size} 
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Inbox;