import { motion } from "framer-motion";
import { FiLayout } from "react-icons/fi";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1 }}
          className="text-6xl text-blue-600 mb-4"
        >
          <FiLayout />
        </motion.div>
        <div className="overflow-hidden h-10 mb-8">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-3xl font-bold text-gray-800 tracking-tight"
          >
            Gmail Clone
          </motion.h1>
        </div>

        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;