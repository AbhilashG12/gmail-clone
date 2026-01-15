import React, { createContext, useContext, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; 

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: React.ReactNode;
  defaultActive?: string;
}

export const Sidebar = ({ children, defaultActive = "1" }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(defaultActive);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, activeItem, setActiveItem }}>
      <aside
        className={`
          h-screen shadow-xl 
          transition-all duration-300 ease-in-out flex flex-col z-20
          ${isOpen ? "w-64" : "w-20"}
          bg-white/60 backdrop-blur-xl text-slate-800 border-r border-white/40
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
    <div className="h-20 flex items-center justify-center border-b border-white/40">
      <div className="text-2xl text-blue-700 p-2">{icon}</div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "w-auto opacity-100 ml-2" : "w-0 opacity-0"
        }`}
      >
        <span className="font-bold text-xl whitespace-nowrap text-slate-800">{children}</span>
      </div>
    </div>
  );
};

interface ItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const Item = ({ id, icon, label, onClick }: ItemProps) => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Item must be used within Sidebar");
  const { isOpen, activeItem, setActiveItem } = context;

  const isActive = activeItem === id;

  const handleClick = () => {
    setActiveItem(id);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center p-3 cursor-pointer my-1 mx-2 rounded-lg
        transition-colors duration-200
        ${!isOpen ? "justify-center" : ""}
        ${isActive 
          ? "bg-blue-600/90 text-white shadow-md backdrop-blur-sm" 
          : "text-slate-700 hover:bg-white/40 hover:text-slate-900" 
        }
      `}
    >
      <div className="text-xl min-w-5">{icon}</div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "w-auto opacity-100 ml-4" : "w-0 opacity-0"
        }`}
      >
        <span className="whitespace-nowrap font-medium">{label}</span>
      </div>
    </div>
  );
};

const Toggle = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar.Toggle must be used within Sidebar");
  const { isOpen, toggle } = context;

  return (
    <div className="mt-auto p-4 border-t border-white/40 flex justify-end">
      <button
        onClick={toggle}
        className="p-2 rounded-lg cursor-pointer bg-white/40 hover:bg-white/60 text-slate-800 transition-colors shadow-sm"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
    </div>
  );
};

Sidebar.Logo = Logo;
Sidebar.Item = Item;
Sidebar.Toggle = Toggle;

export default Sidebar;