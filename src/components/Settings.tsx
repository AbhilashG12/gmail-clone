import { FiImage, FiLayout, FiList, FiUpload, FiDroplet } from "react-icons/fi";
import { useSettingsStore } from "../store/useSettingsStore";
import { useRef } from "react";

const COLORS = [
  { name: "Default Blue", value: "#b2d5ee" },
  { name: "Mint", value: "rgb(209, 250, 229)" },
  { name: "Rose", value: "rgb(255, 228, 230)" },
  { name: "Lavender", value: "rgb(237, 233, 254)" },
  { name: "Slate", value: "rgb(241, 245, 249)" },
  { name: "Dark Slate", value: "rgb(15, 23, 42)" },
];

const THEMES = [
  { name: "Mountains", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop" },
  { name: "Forest", url: "https://images.unsplash.com/photo-1507187632231-5beb21a654a2?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop" },
  { name: "Abstract", url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop" },
  { name: "Street" , url : "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { name : "Road" , url : "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
];

const Settings = () => {
  const { bgImage, bgColor, setBgImage, setBgColor, density, setDensity, itemsPerPage, setItemsPerPage } = useSettingsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans flex flex-col max-h-150 overflow-y-auto">
      
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-bold text-gray-700">Display Settings</h3>
      </div>

      <div className="p-5 space-y-6">
        
       
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FiDroplet /> Solid Colors
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setBgColor(color.value)}
                className={`
                  w-8 h-8 rounded-full border-2 transition-all
                  ${bgColor === color.value && !bgImage ? 'border-blue-500 scale-110 shadow-sm' : 'border-transparent hover:scale-105'}
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

      
        <div>
          <div className="flex justify-between items-center mb-3">
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FiImage /> Backgrounds
             </h4>
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
             >
                <FiUpload size={12} /> Upload
             </button>
             
             <input 
               ref={fileInputRef} 
               type="file" 
               accept="image/*" 
               className="hidden" 
               onChange={handleFileUpload}
             />
          </div>

          <div className="grid grid-cols-3 gap-2">
            
            {THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setBgImage(theme.url)}
                className={`
                  relative h-16 rounded-lg overflow-hidden border-2 transition-all
                  ${bgImage === theme.url ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent hover:opacity-80'}
                `}
              >
                <img src={theme.url} alt={theme.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

      
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FiLayout /> Density
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
              <input type="radio" name="density" checked={density === 'comfortable'} onChange={() => setDensity('comfortable')} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Comfortable</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
              <input type="radio" name="density" checked={density === 'compact'} onChange={() => setDensity('compact')} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Compact</span>
            </label>
          </div>
        </div>

       
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
             <FiList /> Page Size
          </h4>
          <select 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value={25}>25 emails</option>
            <option value={50}>50 emails</option>
            <option value={100}>100 emails</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default Settings;