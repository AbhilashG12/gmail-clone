import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiCheckSquare, FiUser, FiSettings } from "react-icons/fi";
import Profile from "./Profile"; 


const RightSidebar = () => {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-16 h-screen bg-white border-l border-gray-200 flex flex-col items-center py-6 shadow-sm z-30 relative">
      
      <div className="flex flex-col space-y-8">
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`p-2 rounded-full cursor-pointer transition-colors ${isProfileOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`} 
            title="Profile"
          >
            <FiUser size={20} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-14 top-0 z-50 shadow-2xl bg-white rounded-xl">
               <Profile />
            </div>
          )}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiCalendar size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiCheckSquare size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="mt-auto">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FiSettings size={20} className="text-gray-600" />
        </button>
      </div>

    </aside>
  );
};

export default RightSidebar;