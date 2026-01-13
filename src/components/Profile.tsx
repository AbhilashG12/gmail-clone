import { FaUserAlt } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi"; 
import { useProvider } from "../auth/AuthProvider";

const Profile = () => {
  const { logout, user } = useProvider();

  return (
    <div className="w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col transition-all duration-200">
      <div className="h-24 bg-linear-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
      </div>
      <div className="px-6 relative flex flex-col items-center -mt-12">
        <div className="p-1 bg-white rounded-full">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-400 border-4 border-white shadow-sm">
            <FaUserAlt />
          </div>
        </div>
        <div className="mt-3 text-center w-full pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {user?.username || "Guest User"}
          </h2>
          <p className="text-sm text-gray-500 font-medium truncate">
            {user?.email || "no-email@example.com"}
          </p>
          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
            Active
          </span>
        </div>
        <div className="w-full py-4 space-y-2">
          <button className="w-full flex items-center cursor-pointer justify-center space-x-2 p-2.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 text-sm font-medium border border-transparent hover:border-gray-200">
            <FiSettings size={16} />
            <span>Manage Account</span>
          </button>
          <button 
            onClick={() => logout()}
            className="w-full flex items-center cursor-pointer justify-center space-x-2 p-2.5 rounded-xl text-white bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-200 text-sm font-semibold mt-2"
          >
            <FiLogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-50 py-3 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">Gmail Clone v1.0</p>
      </div>

    </div>
  );
};

export default Profile;