import "./index.css"
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { SignUpPage } from "../Pages/signup.tsx"
import { Dashboard } from "../Pages/dashboard.tsx"
import { SignInPage } from "../Pages/signin.tsx"
import Register from "../Pages/register.tsx"
import { MyContext } from "./MyContext.ts";
import { useState } from "react";



function App() {

  const [user, setUser] = useState(undefined)
  return (
    <div className="bg-blue-400 h-full">
      <MyContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App
