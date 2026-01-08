import { Navigate, Outlet } from "react-router-dom";
import { useProvider } from "../auth/AuthProvider"

export const PublicRoute = () => {
  const { isAuthenticated } = useProvider();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};