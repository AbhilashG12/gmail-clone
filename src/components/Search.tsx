import { useState } from "react";
import { ImSearch } from "react-icons/im";

const Search = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-200 h-15 p-5 ml-10 mt-10 rounded-2xl bg-[#a0bfd5] flex flex-row items-center transition-all">
      
      <ImSearch 
        className="cursor-pointer text-xl text-gray-700 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)} 
      />
      <input
        type="search"
        placeholder="Search for a mail"
        className={`
          ml-5 h-8 bg-white rounded-md px-2 outline-none
          transition-all duration-500 ease-in-out
          ${isOpen ? "w-150 opacity-100" : "w-0 opacity-0 p-0 ml-0"}
        `}
      />
    </div>
  );
};

export default Search;