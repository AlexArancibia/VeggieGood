import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Production from "./pages/Production"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

function App() {
 
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Layout />} >
       <Route index element={<Dashboard />} />  
      <Route path="production" element={<Production />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />

      </Route>
      
    </Routes>
  </BrowserRouter>
    
  )
}

export default App
