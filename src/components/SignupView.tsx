import React from "react";
import { Link } from "react-router-dom";
import { type UseFormReturn } from "react-hook-form";
import { type SignupFormData } from "../auth/schema";
import { FiLayout, FiLock, FiMail, FiUser, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

interface SignupViewProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => void;
}

export const SignupView: React.FC<SignupViewProps> = ({ form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen w-full bg-[#f0f4f8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-200/40 rounded-full blur-[100px]" />
         <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white/80 backdrop-blur-xl w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/50 relative z-10"
      >

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="bg-teal-500 p-3 rounded-2xl shadow-lg shadow-teal-500/20 mb-4">
            <FiLayout className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Create Account</h1>
          <p className="text-gray-500 text-sm mt-2">Join us to experience the future of email</p>
        </motion.div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-1"
          >
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Username</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                {...register("username")}
                className={`w-full bg-gray-50/50 border text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 block pl-11 p-3 outline-none transition-all ${errors.username ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                placeholder="johndoe"
              />
            </div>
            {errors.username && (
              <p className="ml-1 text-xs text-red-500 font-medium animate-pulse">{errors.username.message}</p>
            )}
          </motion.div>

  
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-1"
          >
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                {...register("email")}
                type="email"
                className={`w-full bg-gray-50/50 border text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 block pl-11 p-3 outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                placeholder="name@example.com"
              />
            </div>
            {errors.email && (
              <p className="ml-1 text-xs text-red-500 font-medium animate-pulse">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-1"
          >
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                {...register("password")}
                type="password"
                className={`w-full bg-gray-50/50 border text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 block pl-11 p-3 outline-none transition-all ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                placeholder="Create a strong password"
              />
            </div>
            {errors.password && (
              <p className="ml-1 text-xs text-red-500 font-medium animate-pulse">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-1"
          >
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
              <input
                {...register("confirmPassword")}
                type="password"
                className={`w-full bg-gray-50/50 border text-gray-800 text-sm rounded-xl focus:ring-2 focus:ring-teal-100 focus:border-teal-500 block pl-11 p-3 outline-none transition-all ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                placeholder="Repeat password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="ml-1 text-xs text-red-500 font-medium animate-pulse">{errors.confirmPassword.message}</p>
            )}
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.7 }}
             className="pt-2"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 focus:ring-4 focus:ring-teal-300 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Create Account <FiArrowRight />
                </>
              )}
            </button>
          </motion.div>
        </form>

     
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-teal-600 hover:text-teal-700 hover:underline">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};