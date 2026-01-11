
import Sidebar from "./Sidebar"; 
import RightSidebar from "./RightSidebar"; // Import the new component
import { FiMail, FiSend, FiStar, FiTrash, FiLayout } from "react-icons/fi";

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Layout = ({ children, currentTab, onTabChange }: LayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      <Sidebar defaultActive={currentTab}>
        <Sidebar.Logo icon={<FiLayout />}>Gmail Clone</Sidebar.Logo>
        <div className="flex-1 mt-4">
          <Sidebar.Item id="inbox" icon={<FiMail />} label="Inbox" onClick={() => onTabChange("inbox")} />
          <Sidebar.Item id="sent" icon={<FiSend />} label="Sent" onClick={() => onTabChange("sent")} />
          <Sidebar.Item id="starred" icon={<FiStar />} label="Starred" onClick={() => onTabChange("starred")} />
          <Sidebar.Item id="trash" icon={<FiTrash />} label="Trash" onClick={() => onTabChange("trash")} />
        </div>
        <Sidebar.Toggle />
      </Sidebar>

      <main className="flex-1 flex flex-col relative min-w-0">
        {children}
      </main>

     
      <RightSidebar />

    </div>
  );
};

export default Layout;