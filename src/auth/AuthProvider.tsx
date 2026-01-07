import { createContext, useEffect, useRef, useState } from "react";
import {
  type GoogleUser,
  initGoogle,
  promptGoogleLogin,
  logoutGoogle,
} from "./googleAuth";

type AuthType = {
  user: GoogleUser | null;
  login: () => void;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    const saved = localStorage.getItem("gmail_clone_user");
    return saved ? JSON.parse(saved) : null;
  });

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    initGoogle((googleUser) => {
      console.log("AUTH USER:", googleUser);
      localStorage.setItem("gmail_clone_user", JSON.stringify(googleUser));
      setUser(googleUser);
    });
  }, []);

  const login = () => {
    console.log("LOGIN CLICKED");
    promptGoogleLogin();
  };

  const logout = () => {
    logoutGoogle();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
