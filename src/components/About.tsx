import { FiCommand, FiInfo, FiAlertTriangle, FiDatabase, FiLock, FiCpu, FiLayers } from "react-icons/fi";

const About = () => {
  return (
    <div className="w-96 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
      
      <div className="bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white rounded-t-2xl shrink-0 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 p-4 opacity-10 rotate-12">
            <FiLayers size={120} />
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
           <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
             <FiInfo size={24} />
           </div>
           <div>
             <h2 className="text-lg font-bold tracking-tight">System Architecture</h2>
             <p className="text-blue-200 text-xs font-medium tracking-wide">Frontend-Only Implementation</p>
           </div>
        </div>
      </div>


      <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
        
        <div className="bg-orange-50/60 rounded-xl p-4 border border-orange-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
           
           <div className="flex items-center gap-2 mb-3 text-orange-700 relative z-10">
             <FiAlertTriangle className="shrink-0" />
             <h3 className="text-xs font-bold uppercase tracking-wider">Mock Mode Active</h3>
           </div>
           
           <p className="text-sm text-gray-700 leading-relaxed mb-4 relative z-10">
             This application is a <strong>pure frontend demonstration</strong>. It simulates a complex backend environment directly in your browser.
           </p>
           
           <div className="space-y-2 relative z-10">
             <InfoItem icon={<FiLock />} label="Auth" value="Accepts any Email & Password" />
             <InfoItem icon={<FiDatabase />} label="Data" value="Generated locally in-memory" />
             <InfoItem icon={<FiCpu />} label="State" value="Persisted via LocalStorage" />
           </div>
        </div>


        <div>
           <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
               <FiCommand /> Command Palette
             </h3>
             <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium border border-gray-200">
                Vim Style
             </span>
           </div>
           
           <div className="space-y-1">
              <Shortcut k="i" label="Toggle System Info" />
              <div className="h-px bg-gray-100 my-2" />
              <Shortcut k="j" label="Next Email" />
              <Shortcut k="k" label="Previous Email" />
              <Shortcut k="x" label="Select / Deselect" />
              <Shortcut k="s" label="Star / Unstar" />
              <Shortcut k="Enter" label="Open Selection" />
              <Shortcut k="Esc" label="Close / Go Back" />
           </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl text-center shrink-0">
          <p className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-2">
            <span>React 18</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>TypeScript</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Tailwind</span>
          </p>
      </div>
    </div>
  );
};


const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center text-xs">
    <span className="text-orange-400 mr-2">{icon}</span>
    <span className="font-semibold text-gray-600 w-12">{label}:</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const Shortcut = ({ k, label }: { k: string, label: string }) => (
  <div className="flex justify-between items-center text-sm group hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-default select-none">
    <span className="text-gray-600 font-medium">{label}</span>
    <kbd className="font-mono text-[10px] bg-white border border-gray-200 border-b-2 rounded-md px-2 py-1 text-gray-500 group-hover:border-blue-300 group-hover:text-blue-600 transition-all min-w-6 text-center">
      {k}
    </kbd>
  </div>
);

export default About;