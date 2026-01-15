import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiCheckSquare, FiUser, FiSettings } from "react-icons/fi";
import Profile from "./Profile"; 
import Calendar from "./Calendar";
import Notes from "./Notes"; 
import Settings from "./Settings"; 

const RightSidebar = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setActivePopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePopup = (name: string) => {
    setActivePopup(activePopup === name ? null : name);
  };

  return (
    <aside 
      ref={sidebarRef}
      className="w-16 h-screen bg-white/60 backdrop-blur-xl border-l border-white/40 flex flex-col items-center py-6 shadow-sm z-30 relative transition-colors duration-300"
    >
      <div className="flex flex-col space-y-8">
        <div className="relative">
          <button 
            onClick={() => togglePopup("profile")}
            className={`p-2 rounded-full cursor-pointer transition-colors ${activePopup === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-white/50 text-slate-700'}`} 
            title="Profile"
          >
            <FiUser size={20} />
          </button>
          {activePopup === "profile" && (
            <div className="absolute right-14 top-0 z-50 shadow-2xl bg-white/90 backdrop-blur-xl rounded-xl border border-white/50">
               <Profile />
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => togglePopup("calendar")}
            className={`p-2 rounded-full cursor-pointer transition-colors ${activePopup === 'calendar' ? 'bg-blue-100 text-blue-600' : 'hover:bg-white/50 text-slate-700'}`}
            title="Calendar"
          >
            <FiCalendar size={20} />
          </button>
          {activePopup === "calendar" && (
            <div className="absolute right-14 top-0 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
               <Calendar />
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => togglePopup("notes")}
            className={`p-2 rounded-full cursor-pointer transition-colors ${activePopup === 'notes' ? 'bg-blue-100 text-blue-600' : 'hover:bg-white/50 text-slate-700'}`}
            title="Keep Notes"
          >
            <FiCheckSquare size={20} />
          </button>

          {activePopup === "notes" && (
            <div className="absolute right-14 top-0 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
               <Notes />
            </div>
          )}
        </div>

      </div>

      <div className="mt-auto">
        <div className="relative">
          <button 
            onClick={() => togglePopup("settings")}
            className={`p-2 rounded-full cursor-pointer transition-colors ${activePopup === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-white/50 text-slate-700'}`}
            title="Settings"
          >
            <FiSettings size={20} />
          </button>
          
          {activePopup === "settings" && (
            <div className="absolute right-14 bottom-0 z-50 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
               <Settings />
            </div>
          )}
        </div>
      </div>

    </aside>
  );
};

export default RightSidebar;