import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useNotesStore } from "../store/useNotesStore";

const Notes = () => {
  const [newNote, setNewNote] = useState("");
  const { notes, addNote, deleteNote } = useNotesStore();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addNote(newNote);
    setNewNote("");
  };

  return (
    <div className="w-80  bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans flex flex-col h-125">
      
      <div className="px-4 py-3 border-b border-gray-100 bg-yellow-50 flex justify-between items-center">
        <span className="font-bold text-gray-700">Keep Notes</span>
        <span className="text-xs text-gray-400">{notes.length} notes</span>
      </div>
      <form onSubmit={handleAdd} className="p-3 bg-white shadow-sm z-10 relative">
        <div className="relative">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Take a note..."
            className="w-full cursor-pointer bg-gray-50 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none pr-10"
            rows={2}
          />
          <button 
            type="submit" 
            disabled={!newNote.trim()}
            className="absolute right-2 bottom-2 text-blue-500 hover:bg-blue-50 p-1.5 rounded-full transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <FiPlus size={18} className="cursor-pointer" />
          </button>
        </div>
      </form>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50/50">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p className="text-sm">Your notes appear here</p>
          </div>
        ) : (
          notes.map((note) => (
            <div 
              key={note.id} 
              className="group bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 relative animate-in fade-in slide-in-from-top-2"
            >
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {note.content}
              </p>
              
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
                <span className="text-[10px] text-gray-400">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Notes;