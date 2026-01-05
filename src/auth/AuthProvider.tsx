import { useEffect,createContext,useState } from "react"
import {type GoogleUser,initGoogleLogin,logoutGoogle} from "./googleAuth"

type AuthType={
    user:GoogleUser | null,
    login : ()=> void,
    logout : ()=>void,
    loading :  boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthType|null>(null)

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<GoogleUser|null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
  initGoogleLogin((googleUser) => {
    localStorage.setItem("gmail_clone_user", JSON.stringify(googleUser));
    setUser(googleUser);
  }).finally(() => setLoading(false));
}, []);


    const login = () =>{
        window.google.accounts.id.prompt();
    }
    const logout=()=>{
        logoutGoogle()
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{user,login,logout,loading}}>
      {children}
      
    </AuthContext.Provider>
  )
}

export default AuthProvider
