import { Navigate,Outlet } from "react-router-dom";
import { useProvider } from "../auth/AuthProvider";

export const Protected=()=>{
    const {isAuthenticated} = useProvider();

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}