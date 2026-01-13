import { useContext, createContext, useState } from "react"

export interface User {
    username?: string;
    email: string;
}

interface ContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<ContextType|undefined>(undefined)

const AuthProvider = ({children}:{children:React.ReactNode}) => {

  const [user, setUser] = useState<User | null>(() => {
      try {
          const savedUser = localStorage.getItem("authUser");
          if (!savedUser || savedUser === "undefined" || savedUser === "null") {
              return null;
          }
          return JSON.parse(savedUser);
      } catch (error) {
          console.error("Found corrupt data, clearing...", error);
          localStorage.removeItem("authUser");
          return null;
      }
  });

  const isAuthenticated = !!user;

  const login = (token: string, userData: User) => {
      localStorage.setItem("authToken", token);
      
      if (userData) {
        localStorage.setItem("authUser", JSON.stringify(userData));
        setUser(userData);
      } else {
        console.error("Attempted to login with invalid user data");
      }
  }

  const logout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProvider = () => {
  const ctx = useContext(AuthContext) 
  if(!ctx){
    throw new Error("must be used inside the provider")
  }
  return ctx
}

export default AuthProvider