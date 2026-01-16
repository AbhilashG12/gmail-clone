import { useState, useRef, useEffect } from "react";
import { 
  FiX, FiMinus, FiMaximize2, FiMinimize2,
  FiPaperclip, FiTrash2, FiImage, FiLink, FiSmile,
  FiBold, FiItalic, FiUnderline
} from "react-icons/fi";
import { useComposeStore } from "../store/useComposeStore";
import { useEmailStore } from "../store/useEmailStore";

const ComposeModal = () => {
  const { isOpen, isMinimized, defaults, closeCompose, minimizeCompose } = useComposeStore();
  const { sendEmail, saveDraft } = useEmailStore();
  

  const [to, setTo] = useState(defaults.to || "");
  const [subject, setSubject] = useState(defaults.subject || "");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (isOpen && editorRef.current) {
        
        if (editorRef.current.innerHTML !== (defaults.body || "")) {
            editorRef.current.innerHTML = defaults.body || "";
        }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);


  const getContent = () => {
    const htmlBody = editorRef.current?.innerHTML || "";
    let finalBody = htmlBody;
    if (attachments.length > 0) {
        finalBody += `<br/><br/><strong>Attachments:</strong><br/>${attachments.map(f => f.name).join('<br/>')}`;
    }
    return finalBody;
  };

 
  const handleSend = () => {
    if (!to) return alert("Please specify a recipient.");
    sendEmail(to, subject, getContent());
    resetAndClose();
  };

  const handleClose = () => {
    const hasContent = to || subject || (editorRef.current?.innerText.trim()) || attachments.length > 0;
    
    if (hasContent) {
        saveDraft(to, subject, getContent());
        console.log("Draft Saved");
    }
    resetAndClose();
  };

  const handleDiscard = () => {
    resetAndClose();
  };

  const resetAndClose = () => {
    setTo("");
    setSubject("");
    setAttachments([]);
    if (editorRef.current) editorRef.current.innerHTML = "";
    closeCompose();
  };

  
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => execCommand('insertImage', event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed z-50 bg-white shadow-2xl overflow-hidden font-sans flex flex-col
        transition-all duration-300 ease-in-out border border-gray-200
        ${isFullScreen 
            ? "inset-10 rounded-xl" 
            : isMinimized 
                ? "bottom-0 right-16 h-12 w-72 rounded-t-xl"
                : "bottom-0 right-20 h-150 w-150 rounded-t-2xl"
        }
      `}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
      <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

     
      <div 
        className={`
          flex justify-between items-center px-4 py-3 cursor-pointer select-none
          transition-colors duration-200
          ${isMinimized ? "bg-slate-100 hover:bg-slate-200" : "bg-slate-50 border-b border-gray-100"}
        `}
        onClick={minimizeCompose}
      >
        <span className="font-semibold text-sm text-slate-700">New Message</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); minimizeCompose(); }} className="p-1 text-slate-400 hover:text-slate-700 rounded"><FiMinus size={14} /></button>
          {!isMinimized && (
             <button onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }} className="p-1 text-slate-400 hover:text-slate-700 rounded">
               {isFullScreen ? <FiMinimize2 size={12} /> : <FiMaximize2 size={12} />}
             </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="p-1 text-slate-400 hover:text-red-600 rounded" title="Save & Close"><FiX size={16} /></button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-4 pt-2">
             <div className="border-b border-gray-100 flex items-center">
                 <span className="text-gray-400 text-sm font-medium w-10">To</span>
                 <input 
                    type="text" 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="flex-1 py-2 outline-none text-sm text-gray-800"
                 />
             </div>
             <div className="border-b border-gray-100 mt-1">
                 <input 
                    type="text" 
                    placeholder="Subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full py-2 outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400"
                 />
             </div>
          </div>

          <div 
            ref={editorRef}
            contentEditable
            className="flex-1 w-full p-4 outline-none overflow-y-auto text-sm text-gray-700 leading-relaxed custom-scrollbar empty:before:content-[attr(placeholder)] empty:before:text-gray-400"
            role="textbox"
            aria-multiline="true"
            onInput={(e) => { if (e.currentTarget.textContent === "") e.currentTarget.innerHTML = ""; }}
          />

          {attachments.length > 0 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-gray-50 bg-gray-50/50">
                {attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                        <FiPaperclip size={10} />
                        <span className="max-w-25 truncate">{file.name}</span>
                        <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-500"><FiX size={10} /></button>
                    </div>
                ))}
            </div>
          )}

          <div className="flex flex-col gap-2 p-3 pb-4 border-t border-gray-100">
             <div className="flex items-center gap-1 px-1">
                 <ToolBtn icon={<FiBold />} onClick={() => execCommand('bold')} label="Bold" />
                 <ToolBtn icon={<FiItalic />} onClick={() => execCommand('italic')} label="Italic" />
                 <ToolBtn icon={<FiUnderline />} onClick={() => execCommand('underline')} label="Underline" />
                 <div className="w-px h-4 bg-gray-200 mx-2" />
                 <ToolBtn icon={<FiLink />} onClick={() => { const url = prompt("Enter URL:"); if (url) execCommand('createLink', url); }} label="Link" />
                 <ToolBtn icon={<FiImage />} onClick={() => imageInputRef.current?.click()} label="Insert Image" />
                 <ToolBtn icon={<FiSmile />} onClick={() => execCommand('insertText', '😊')} label="Emoji" />
             </div>

             <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md shadow-blue-200 transition-all"
                    >
                        Send
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Attach files">
                        <FiPaperclip size={18} />
                    </button>
                </div>
                
                <button onClick={handleDiscard} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Discard">
                    <FiTrash2 size={16} />
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ToolBtn = ({ icon, onClick, label }: { icon: React.ReactNode, onClick: () => void, label: string }) => (
    <button onClick={onClick} title={label} className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors">
        <div className="text-sm">{icon}</div>
    </button>
);

export default ComposeModal;