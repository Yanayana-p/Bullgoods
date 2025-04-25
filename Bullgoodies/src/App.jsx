import React from "react";
import { Route, Routes } from "react-router-dom"; 
import LoginPage from "./pages/LoginPage/LoginPage"; 
import SignupPage from "./pages/SignupPage/SignupPage"; 
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
      </Routes>
    </>
  );
}

export default App;