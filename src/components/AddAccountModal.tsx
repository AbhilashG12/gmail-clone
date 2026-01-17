import { useState } from "react";
import { FiX, FiUserPlus } from "react-icons/fi";
import { useUserStore } from "../store/useUserStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddAccountModal = ({ isOpen, onClose }: Props) => {
  const { addAccount } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      addAccount(name, email);
      setName("");
      setEmail("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <h3 className="font-bold text-gray-700">Add another account</h3>
           <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-500">
             <FiX size={20} />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
             <input 
               autoFocus
               type="text" 
               value={name}
               onChange={e => setName(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               placeholder="John Doe"
               required
             />
           </div>
           
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
             <input 
               type="email" 
               value={email}
               onChange={e => setEmail(e.target.value)}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               placeholder="john@example.com"
               required
             />
           </div>

           <button 
             type="submit"
             className="mt-2 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-all active:scale-95"
           >
             <FiUserPlus /> Create Profile
           </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;