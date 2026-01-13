import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type LoginFormData } from "../auth/schema"; 

interface LoginViewProps {
  form: UseFormReturn<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 cursor-pointer py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};