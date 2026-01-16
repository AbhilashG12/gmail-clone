import { useState } from "react";
import Layout from "./Layout";
import Search from "./Search";
import Inbox from "./Inbox";      
import EmailDetail from "./EmailDetail";
import { useReadingStore } from "../store/useReadingStore";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("inbox");
  const { selectedEmail } = useReadingStore(); 

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      
      <div className="w-full">
         <Search />
      </div>

      <div className="flex-1 overflow-hidden p-6 w-full h-full"> 
           {selectedEmail ? (
               <div className="h-full w-full">
                   <EmailDetail />
               </div>
           ) : (
               <div className="h-full w-full">
                   <Inbox currentTab={currentTab} />
               </div>
           )}
      </div>

    </Layout>
  );
};

export default Dashboard;