import { useState } from "react";
import Inbox from "./Inbox";
import Layout from "./Layout";
import Search from "./Search";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("inbox");

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      
      {/* Search Bar Area */}
      <div className="w-full">
         <Search />
      </div>

      {/* Main Content Area */}
      {/* FIX: Use p-6 here instead of margins on the child */}
      <div className="flex-1 overflow-hidden p-6 w-full"> 
         <Inbox />
      </div>

    </Layout>
  );
};

export default Dashboard;