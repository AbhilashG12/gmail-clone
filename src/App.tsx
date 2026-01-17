import { useState, useEffect, lazy, Suspense } from "react"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; 
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import AuthProvider from "./auth/AuthProvider";
import Dashboard from "./components/Dashboard";
import EmailDetail from "./components/EmailDetail";
import { Protected } from "./routes/Protected";
import { PublicRoute } from "./routes/PublicRoute";
import { useThemeEffect } from "./hooks/useTheme";
import SplashScreen from "./animations/SplashScreen"; 
import InboxLoader from "./animations/InboxLoader"; 


const Inbox = lazy(() => import("./components/Inbox"));

const App = () => {
  useThemeEffect();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route element={<Protected />}>
                <Route path="/dashboard" element={<Navigate to="/mail/inbox" replace />} />
                
                <Route path="/mail" element={<Dashboard />}>
                  <Route index element={<Navigate to="inbox" replace />} />
                
                  <Route 
                    path=":folder" 
                    element={
                      <Suspense fallback={<InboxLoader />}>
                        <Inbox />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="search" 
                    element={
                      <Suspense fallback={<InboxLoader />}>
                        <Inbox />
                      </Suspense>
                    } 
                  />
                  
                  <Route path=":folder/:emailId" element={<EmailDetail />} />
                  <Route path="search/:emailId" element={<EmailDetail />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      )}
    </>
  );
};

export default App;