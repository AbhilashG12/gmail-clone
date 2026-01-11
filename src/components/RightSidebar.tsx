import { FiCalendar, FiCheckSquare, FiUser, FiSettings } from "react-icons/fi";

const RightSidebar = () => {
  return (
    <aside className="w-16 h-screen bg-white border-l border-gray-200 flex flex-col items-center py-6 shadow-sm z-20">
      
      {/* Top Tools */}
      <div className="flex flex-col space-y-8">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Calendar">
          <FiCalendar size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Tasks">
          <FiCheckSquare size={20} className="text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Profile">
          <FiUser size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Bottom Tools (e.g. Settings) */}
      <div className="mt-auto">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Settings">
          <FiSettings size={20} className="text-gray-600" />
        </button>
      </div>

    </aside>
  );
};

export default RightSidebar;