import {Login} from "./components/Login"
import {Signup} from "./components/Signup"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AuthProvider from "./auth/AuthProvider"
import Dashboard from "./components/Dashboard"
import { Protected } from "./routes/Protected"
import { PublicRoute } from "./routes/PublicRoute"
import {useThemeEffect} from "./hooks/useTheme"

const App = () => {
  useThemeEffect();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Route>
          <Route element={<Protected/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
