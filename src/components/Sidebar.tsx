import React, { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiEdit3 } from "react-icons/fi"; 

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      <aside
        className={`
          h-screen shadow-2xl z-50
          transition-all duration-300 ease-in-out flex flex-col 
          ${isOpen ? "w-64" : "w-20"}
          bg-white/70 backdrop-blur-xl border-r border-white/50
        `}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

const Logo = ({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Logo must be used within Sidebar");
  const { isOpen } = context;

  return (
    <div className="h-20 flex items-center px-6 border-b border-gray-100/50">
      <div className="text-3xl text-blue-600 min-w-8 flex justify-center">{icon}</div>
      <div
        className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-w-50 opacity-100 ml-3" : "max-w-0 opacity-0 ml-0"}
        `}
      >
        <span className="font-bold text-xl whitespace-nowrap text-slate-800 tracking-tight">{children}</span>
      </div>
    </div>
  );
};

const Compose = ({ onClick }: { onClick?: () => void }) => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Compose must be used within Sidebar");
  const { isOpen } = context;

  return (
    <div className="p-4 border-b border-gray-100/50">
        <button
          onClick={onClick}
          className={`
            flex items-center justify-center rounded-2xl shadow-lg 
            transition-all duration-300 ease-in-out cursor-pointer
            bg-blue-600 hover:bg-blue-700 text-white
            ${isOpen ? "w-full h-12 px-4" : "w-12 h-12 rounded-full"}
          `}
        >
            <FiEdit3 size={isOpen ? 20 : 24} />
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-w-50 opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}
                `}
            >
                <span className="font-bold whitespace-nowrap">Compose</span>
            </div>
        </button>
    </div>
  );
};

interface ItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
}

const Item = ({ to, icon, label, count }: ItemProps) => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Item must be used within Sidebar");
  const { isOpen } = context;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        group flex items-center px-4 py-3 cursor-pointer mx-3 rounded-xl mb-1
        transition-all duration-200 ease-out
        ${isActive 
          ? "bg-blue-100/80 text-blue-700 font-semibold shadow-sm" 
          : "text-slate-600 hover:bg-white/60 hover:text-slate-900" 
        }
      `}
    >
      {({ isActive }) => (
        <>
          <div className={`text-xl flex items-center justify-center transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
            {icon}
          </div>
          
          <div
            className={`
              flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out
              ${isOpen ? "max-w-50 opacity-100 ml-4 flex-1" : "max-w-0 opacity-0 ml-0"}
            `}
          >
            <span className="whitespace-nowrap text-sm">{label}</span>
            {count !== undefined && count > 0 && (
                 <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                     {count}
                 </span>
            )}
          </div>
        </>
      )}
    </NavLink>
  );
};

const Toggle = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Toggle must be used within Sidebar");
  const { isOpen, toggle } = context;

  return (
    <div className="mt-auto p-4 border-t border-gray-100/50 flex justify-end">
      <button
        onClick={toggle}
        className="p-2 rounded-lg cursor-pointer bg-white/50 hover:bg-white text-slate-500 hover:text-slate-800 transition-all shadow-sm border border-transparent hover:border-gray-200"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </div>
  );
};

Sidebar.Logo = Logo;
Sidebar.Compose = Compose; 
Sidebar.Item = Item;
Sidebar.Toggle = Toggle;

export default Sidebar;