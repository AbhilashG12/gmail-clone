import { useMemo } from "react";
import Sidebar from "./Sidebar"; 
import RightSidebar from "./RightSidebar"; 
import ComposeModal from "./ComposeModal";
import { useComposeStore } from "../store/useComposeStore";

import { FiMail, FiSend, FiStar, FiTrash, FiLayout, FiFileText, FiAlertOctagon } from "react-icons/fi";
import { useSettingsStore } from "../store/useSettingsStore";
import { useEmailStore } from "../store/useEmailStore"; 

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Layout = ({ children, currentTab, onTabChange }: LayoutProps) => {
  const { bgColor, bgImage } = useSettingsStore();
  const { openCompose } = useComposeStore();
  const { emails } = useEmailStore();

  const counts = useMemo(() => {
    return {
      inbox: emails.filter((e) => e.label === "inbox" && !e.isRead).length,
      sent: emails.filter((e) => e.label === "sent").length,
      starred: emails.filter((e) => e.isStarred).length,
      drafts: emails.filter((e) => e.label === "drafts").length,
      spam: emails.filter((e) => e.label === "spam").length,
      trash: emails.filter((e) => e.label === "trash").length,
    };
  }, [emails]);

  return (
    <div 
      className="flex h-screen w-full overflow-hidden bg-cover bg-center transition-colors duration-500"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      }}
    >
      <Sidebar defaultActive={currentTab}>
        <Sidebar.Logo icon={<FiLayout />}>Gmail Clone</Sidebar.Logo>
        
        <Sidebar.Compose onClick={() => openCompose()} />

        <div className="flex-1 mt-2 overflow-y-auto scrollbar-hide">
          <Sidebar.Item 
            id="inbox" 
            icon={<FiMail />} 
            label="Inbox" 
            count={counts.inbox} 
            onClick={() => onTabChange("inbox")} 
          />
          <Sidebar.Item 
            id="starred" 
            icon={<FiStar />} 
            label="Starred" 
            count={counts.starred}
            onClick={() => onTabChange("starred")} 
          />
          <Sidebar.Item 
            id="sent" 
            icon={<FiSend />} 
            label="Sent" 
            count={counts.sent}
            onClick={() => onTabChange("sent")} 
          />
          <Sidebar.Item 
            id="drafts" 
            icon={<FiFileText />} 
            label="Drafts" 
            count={counts.drafts}
            onClick={() => onTabChange("drafts")} 
          />
          <Sidebar.Item 
            id="spam" 
            icon={<FiAlertOctagon />} 
            label="Spam" 
            count={counts.spam}
            onClick={() => onTabChange("spam")} 
          />
          <Sidebar.Item 
            id="trash" 
            icon={<FiTrash />} 
            label="Trash" 
            count={counts.trash}
            onClick={() => onTabChange("trash")} 
          />
        </div>
        
        <Sidebar.Toggle />
      </Sidebar>

      <main className="flex-1 flex flex-col relative min-w-0 p-2">
        {children}
      </main>

      <RightSidebar />
      <ComposeModal />
    </div>
  );
};

export default Layout;