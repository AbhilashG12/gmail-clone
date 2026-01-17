import Sidebar from "./Sidebar"; 
import RightSidebar from "./RightSidebar"; 
import ComposeModal from "./ComposeModal";
import { FiMail, FiSend, FiStar, FiTrash, FiLayout, FiFileText, FiAlertOctagon, FiUsers, FiTag, FiInfo } from "react-icons/fi";
import { useSettingsStore } from "../store/useSettingsStore";
import { useComposeStore } from "../store/useComposeStore";
import { useEmailStore } from "../store/useEmailStore"; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { bgColor, bgImage } = useSettingsStore();
  const { openCompose } = useComposeStore();
  const { emails } = useEmailStore(); 

  const counts = {
    inbox: emails.filter(e => e.label === "inbox").length,
    starred: emails.filter(e => e.isStarred).length,
    sent: emails.filter(e => e.label === "sent").length,
    drafts: emails.filter(e => e.label === "drafts").length,
    spam: emails.filter(e => e.label === "spam").length,
    trash: emails.filter(e => e.label === "trash").length,

    primary: emails.filter(e => e.category === "primary").length,
    social: emails.filter(e => e.category === "social").length,
    promotions: emails.filter(e => e.category === "promotions").length,
    updates: emails.filter(e => e.category === "updates").length,
  };

  return (
    <div 
      className="flex h-screen w-full overflow-hidden bg-cover bg-center transition-colors duration-500"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      }}
    >
      <Sidebar>
        <Sidebar.Logo icon={<FiLayout />}>Gmail Clone</Sidebar.Logo>
        
        <Sidebar.Compose onClick={() => openCompose()} />

        <div className="flex-1 overflow-y-auto mt-2 scrollbar-hide">
    
          <Sidebar.Item to="/mail/inbox" icon={<FiMail />} label="Inbox" count={counts.inbox} />
          <Sidebar.Item to="/mail/starred" icon={<FiStar />} label="Starred" count={counts.starred} />
          <Sidebar.Item to="/mail/sent" icon={<FiSend />} label="Sent" count={counts.sent} />
          <Sidebar.Item to="/mail/drafts" icon={<FiFileText />} label="Drafts" count={counts.drafts} />
          
          <div className="my-2 border-t border-gray-100/50 mx-4" />
          
       
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Categories
          </div>
          <Sidebar.Item to="/mail/primary" icon={<FiMail />} label="Primary" count={counts.primary} />
          <Sidebar.Item to="/mail/social" icon={<FiUsers />} label="Social" count={counts.social} />
          <Sidebar.Item to="/mail/promotions" icon={<FiTag />} label="Promotions" count={counts.promotions} />
          <Sidebar.Item to="/mail/updates" icon={<FiInfo />} label="Updates" count={counts.updates} />

          <div className="my-2 border-t border-gray-100/50 mx-4" />

          <Sidebar.Item to="/mail/spam" icon={<FiAlertOctagon />} label="Spam" count={counts.spam} />
          <Sidebar.Item to="/mail/trash" icon={<FiTrash />} label="Trash" count={counts.trash} />
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