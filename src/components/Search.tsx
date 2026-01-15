import { ImSearch } from "react-icons/im";
import { FiX } from "react-icons/fi";
import { useSearchLogic } from "../hooks/useSearch";

const Search = () => {

  const { isOpen, searchTerm, containerRef, inputRef, handlers } = useSearchLogic();

  return (
    <div 
      ref={containerRef}
      onClick={handlers.open}
      className={`
        h-14 ml-10 mt-6 rounded-2xl flex items-center px-5 cursor-pointer
        transition-all duration-500 ease-out border border-white/30 shadow-sm
        
        bg-white/40 backdrop-blur-md hover:bg-white/50
        
        ${isOpen ? "w-150" : "w-14 justify-center px-0 bg-transparent shadow-none border-transparent hover:bg-white/20"}
      `}
    >
      
      <ImSearch 
        className={`
          text-xl text-slate-700 transition-transform duration-300
          ${isOpen ? "scale-100" : "scale-110"}
        `}
      />

      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handlers.handleInputChange}
        placeholder="Search in mail..."
        className={`
          bg-transparent outline-none text-slate-800 placeholder-slate-600 font-medium
          transition-all duration-500 ease-in-out h-full
          ${isOpen ? "w-full ml-4 opacity-100" : "w-0 opacity-0 ml-0 pointer-events-none"}
        `}
      />

      {isOpen && searchTerm && (
        <button 
            onClick={(e) => { e.stopPropagation(); handlers.clearSearch(); }}
            className="p-1 hover:bg-slate-200/50 rounded-full text-slate-600 transition-colors"
        >
            <FiX />
        </button>
      )}
      
    </div>
  );
};

export default Search;