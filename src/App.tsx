import { Dashboard } from "./components/Dashboard"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/Login"
import AuthProvider from "./auth/AuthProvider"

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

      <Routes>
        <Route path="/mail" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
