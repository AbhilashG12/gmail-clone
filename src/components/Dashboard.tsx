import { useState, lazy, Suspense } from "react";
import Layout from "./Layout";
import Search from "./Search";
import InboxLoader from "./InboxLoader"; 

const Inbox = lazy(() => import("./Inbox"));

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("inbox");

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      
      <div className="w-full">
         <Search />
      </div>

      <div className="flex-1 overflow-hidden p-6 w-full"> 
        <Suspense fallback={<InboxLoader />}>
          {currentTab === "inbox" && <Inbox />}
          {currentTab === "sent" && <div className="text-gray-500">Sent Folder</div>}
          {currentTab === "starred" && <div className="text-gray-500">Starred Messages</div>}
          {currentTab === "trash" && <div className="text-gray-500">Trash Can</div>}
        </Suspense>
      </div>

    </Layout>
  );
};

export default Dashboard;