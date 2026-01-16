import { useState, useEffect } from "react";
import { 
  FiArrowLeft, FiTrash2,  FiStar, FiMoreVertical, 
  FiCornerUpLeft, FiCornerUpRight, FiDownload, FiPaperclip, FiMail 
} from "react-icons/fi";
import { useReadingStore } from "../store/useReadingStore";
import { useEmailStore } from "../store/useEmailStore";
import { useComposeStore } from "../store/useComposeStore";

const EmailDetail = () => {
  const { selectedEmail, clearSelection } = useReadingStore();
  const { emails, updateEmail, moveToTrash } = useEmailStore();
  const { openCompose } = useComposeStore();
  
  const [showMenu, setShowMenu] = useState(false);

  const email = selectedEmail 
    ? (emails.find(e => e.id === selectedEmail.id) || selectedEmail) 
    : null;


  useEffect(() => {
    
    if (email && !email.isRead) {
      updateEmail(email.id, { isRead: true });
    }
  }, [email, updateEmail]); 

  
  if (!email) return null;

  
  const handleReply = () => {
    openCompose({
      to: email.senderEmail,
      subject: `Re: ${email.subject}`,
      body: `<br><br>--- On ${new Date(email.date).toLocaleString()}, ${email.sender} wrote: ---<br>${email.body}`
    });
  };

  const handleForward = () => {
    openCompose({
      subject: `Fwd: ${email.subject}`,
      body: `<br><br>---------- Forwarded message ---------<br>From: ${email.sender} <${email.senderEmail}><br>Date: ${new Date(email.date).toLocaleString()}<br>Subject: ${email.subject}<br><br>${email.body}`
    });
  };

  const handleDelete = () => {
    moveToTrash(email.id);
    clearSelection();
  };

  const toggleStar = () => {
    updateEmail(email.id, { isStarred: !email.isStarred });
  };

  const markUnread = () => {
    updateEmail(email.id, { isRead: false });
    clearSelection();
  };

  const initials = email.sender.slice(0, 1).toUpperCase();
  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="h-full w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col font-sans border border-white/50 relative">
      
      <div className="px-6 py-3 flex justify-between items-center bg-white/60 border-b border-gray-100/50 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button 
            onClick={clearSelection}
            className="p-2 hover:bg-gray-200/50 rounded-full transition-colors text-gray-700 mr-2 flex items-center gap-2"
            title="Back to Inbox"
          >
            <FiArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300/50 mx-1" />

          <button onClick={handleDelete} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-500 transition-colors" title="Delete">
            <FiTrash2 size={18} />
          </button>

          <button onClick={markUnread} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Mark as Unread">
             <FiMail size={18} />
          </button>

          <div className="relative">
             <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                <FiMoreVertical size={18} />
             </button>
             {showMenu && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                   <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-1 text-sm text-gray-700">
                      <button onClick={markUnread} className="w-full text-left px-4 py-2 hover:bg-gray-50">Mark as unread</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-50">Filter messages like this</button>
                   </div>
                 </>
             )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-white">
        
       
        <div className="flex flex-col gap-4 mb-8 border-b border-gray-100 pb-6">
           <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{email.subject}</h1>
              <button onClick={toggleStar} className="p-2 hover:bg-yellow-50 rounded-full transition-colors">
                 <FiStar size={24} className={email.isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
              </button>
           </div>
           
           <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${getAvatarColor(email.sender)} flex items-center justify-center text-white text-xl font-bold`}>
                 {initials}
              </div>
              <div className="flex-1">
                 <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">{email.sender}</span>
                    <span className="text-gray-500 text-sm">&lt;{email.senderEmail}&gt;</span>
                 </div>
                 <div className="text-xs text-gray-500">
                    {new Date(email.date).toLocaleString()}
                 </div>
              </div>
           </div>
        </div>

     =
        <div 
            className="prose prose-slate max-w-none text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap mb-8"
            dangerouslySetInnerHTML={{ __html: email.body }} 
        />
        
        
        {email.body.toLowerCase().includes("attachment") && (
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg w-fit bg-gray-50 mb-8 cursor-pointer hover:bg-gray-100">
                <div className="bg-red-100 p-2 rounded text-red-600"><FiPaperclip /></div>
                <div>
                    <div className="text-sm font-bold text-gray-700">Attachment.pdf</div>
                    <div className="text-xs text-gray-500">1.2 MB</div>
                </div>
                <FiDownload className="text-gray-400 ml-2" />
            </div>
        )}

        
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
           <button onClick={handleReply} className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm">
             <FiCornerUpLeft /> Reply
           </button>
           <button onClick={handleForward} className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm">
             <FiCornerUpRight /> Forward
           </button>
        </div>

      </div>
    </div>
  );
};

export default EmailDetail;