import { useState } from "react";
import { FiLogOut, FiUserPlus, FiX } from "react-icons/fi"; 
import { useUserStore } from "../store/useUserStore"; 
import AddAccountModal from "./AddAccountModal"; 
import { useProvider } from "../auth/AuthProvider"; // Import Auth Provider

const Profile = ({ onClose }: { onClose?: () => void }) => {
  const { currentUser, accounts, switchAccount, removeAccount } = useUserStore();
  const { logout } = useProvider(); // Get standard logout
  const [showAddModal, setShowAddModal] = useState(false);

  // Safety Check
  if (!currentUser) return null;

  const otherAccounts = accounts.filter(acc => acc.email !== currentUser.email);
  const getInitials = (name: string) => (name || "").charAt(0).toUpperCase();

  return (
    <>
      <div className="w-80 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col transition-all duration-200 font-sans">
        
        {/* HEADER */}
        <div className="h-20 bg-linear-to-r from-blue-500 to-indigo-600 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
          {onClose && (
            <button onClick={onClose} className="absolute top-2 right-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors">
               <FiX />
            </button>
          )}
        </div>

        {/* MAIN CARD */}
        <div className="px-6 relative flex flex-col items-center -mt-10">
          <div className="p-1 bg-white rounded-full">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white font-bold border-4 border-white shadow-sm ${currentUser.avatarColor}`}>
              {getInitials(currentUser.username)}
            </div>
          </div>
          
          <div className="mt-2 text-center w-full pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {currentUser.username}
            </h2>
            <p className="text-sm text-gray-500 font-medium truncate mb-3">
              {currentUser.email}
            </p>
            <button className="text-xs font-medium border border-gray-300 rounded-full px-4 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors">
              Manage your Google Account
            </button>
          </div>

          {/* LIST OF OTHER ACCOUNTS (SWITCHING) */}
          {otherAccounts.length > 0 && (
            <div className="w-full max-h-40 overflow-y-auto custom-scrollbar py-2 border-b border-gray-100">
                {otherAccounts.map((account) => (
                    <div 
                        key={account.email}
                        onClick={() => switchAccount(account.email)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer group transition-all"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${account.avatarColor}`}>
                            {getInitials(account.username)}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-sm font-bold text-gray-700 truncate">{account.username}</p>
                            <p className="text-xs text-gray-500 truncate">{account.email}</p>
                        </div>
                        
                        {/* Remove Account Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeAccount(account.email); }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            title="Remove account"
                        >
                            <FiLogOut size={14} />
                        </button>
                    </div>
                ))}
            </div>
          )}

          {/* ACTIONS: ADD ACCOUNT & LOGOUT */}
          <div className="w-full py-2 space-y-1 mt-1">
            <button 
                onClick={() => setShowAddModal(true)}
                className="w-full flex items-center cursor-pointer justify-start px-4 py-3 space-x-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
            >
              <FiUserPlus size={18} className="text-gray-500" />
              <span>Add another account</span>
            </button>
            
            <button 
              onClick={() => logout()} 
              className="w-full flex items-center cursor-pointer justify-start px-4 py-3 space-x-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
            >
              <FiLogOut size={18} className="text-gray-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 py-3 text-center border-t border-gray-100 flex justify-center gap-4">
          <button className="text-xs text-gray-500 hover:text-gray-800 hover:underline">Privacy Policy</button>
          <span className="text-gray-300">•</span>
          <button className="text-xs text-gray-500 hover:text-gray-800 hover:underline">Terms of Service</button>
        </div>

      </div>

      <AddAccountModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
};

export default Profile;