import { motion } from "framer-motion";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/50 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <motion.span
          className="absolute w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default GlobalLoader;