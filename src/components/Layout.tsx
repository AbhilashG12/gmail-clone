import Sidebar from "./Sidebar"; 
import RightSidebar from "./RightSidebar"; 
import { FiMail, FiSend, FiStar, FiTrash, FiLayout, FiFileText, FiAlertOctagon } from "react-icons/fi";
import { useSettingsStore } from "../store/useSettingsStore"; // <--- 1. Import Store

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Layout = ({ children, currentTab, onTabChange }: LayoutProps) => {
  // 2. Get Theme State
  const { bgColor, bgImage } = useSettingsStore();

  return (
    // 3. Apply Dynamic Styles to the Main Wrapper
    <div 
      className="flex h-screen w-full overflow-hidden bg-cover bg-center transition-colors duration-500"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      }}
    >
      
      {/* Sidebar (Glassmorphism handles the contrast automatically) */}
      <Sidebar defaultActive={currentTab}>
        <Sidebar.Logo icon={<FiLayout />}>Gmail Clone</Sidebar.Logo>
        
        <Sidebar.Compose onClick={() => alert("Compose Modal Triggered!")} />

        <div className="flex-1 mt-2 overflow-y-auto scrollbar-hide">
          <Sidebar.Item 
            id="inbox" 
            icon={<FiMail />} 
            label="Inbox" 
            count={12} 
            onClick={() => onTabChange("inbox")} 
          />
          <Sidebar.Item 
            id="starred" 
            icon={<FiStar />} 
            label="Starred" 
            onClick={() => onTabChange("starred")} 
          />
          <Sidebar.Item 
            id="sent" 
            icon={<FiSend />} 
            label="Sent" 
            onClick={() => onTabChange("sent")} 
          />
          <Sidebar.Item 
            id="drafts" 
            icon={<FiFileText />} 
            label="Drafts" 
            count={3}
            onClick={() => onTabChange("drafts")} 
          />
          <Sidebar.Item 
            id="spam" 
            icon={<FiAlertOctagon />} 
            label="Spam" 
            onClick={() => onTabChange("spam")} 
          />
          <Sidebar.Item 
            id="trash" 
            icon={<FiTrash />} 
            label="Trash" 
            onClick={() => onTabChange("trash")} 
          />
        </div>
        
        <Sidebar.Toggle />
      </Sidebar>

      {/* Main Content Area - Transparent so background shows through */}
      <main className="flex-1 flex flex-col relative min-w-0 p-2">
        {children}
      </main>

      <RightSidebar />

    </div>
  );
};

export default Layout;