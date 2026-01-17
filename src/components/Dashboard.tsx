import { Outlet, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Search from "./Search";

const Dashboard = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="w-full">
         <Search />
      </div>

      <div className="flex-1 overflow-hidden p-6 w-full h-full relative"> 
        <div key={location.pathname + location.search} className="h-full w-full">
            <Outlet /> 
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;