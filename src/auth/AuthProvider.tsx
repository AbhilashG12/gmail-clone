import { useContext,createContext, useState } from "react"

interface ContextType {
    isAuthenticated : boolean,
    login : (token:string)=>void,
    logout : ()=>void,
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<ContextType|undefined>(undefined)

const AuthProvider = ({children}:{children:React.ReactNode}) => {

  const [isAuthenticated,setAuth] = useState<boolean>(()=>{
      const savedToken = localStorage.getItem("authToken");
      return !!savedToken
  })

  const login=(token:string)=>{
      localStorage.setItem("authToken",token)
      setAuth(true)
  }
  const logout=()=>{
      localStorage.removeItem("authToken")
      setAuth(false)
  }

  return (
    <AuthContext.Provider value={{isAuthenticated,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider=()=>{
  const ctx = useContext(AuthContext) 
  if(!ctx){
    throw new Error("must be used inside the provider")
  }
  return ctx
}

export default AuthProvider
