import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

export const useAuth=()=>{
    const ctx = useContext(AuthContext);

    if(!ctx){
        throw new Error("useAuth must be inside the AuthProvider")
    }
    return ctx
}
