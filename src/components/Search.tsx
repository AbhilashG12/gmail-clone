import { useSearchParams, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  
  const handleSearch = (term: string) => {
      if (term) {
          navigate(`/mail/search?q=${encodeURIComponent(term)}`);
      } else {
          navigate(`/mail/inbox`);
      }
  };

  return (
    <div className="relative w-full mt-5 max-w-3xl mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
      </div>
      <input 
        type="text" 
        placeholder="Search mail" 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full py-3 pl-12 pr-12 bg-gray-100/50 hover:bg-white focus:bg-white border-transparent hover:shadow-md focus:shadow-lg rounded-full outline-none transition-all duration-200 text-gray-700 placeholder-gray-500 font-medium"
      />
      
    </div>
  );
};

export default Search;