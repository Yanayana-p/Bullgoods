import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';
import Fnavbar1 from './firstpage/Fnavbar'; // 👈 New Component

function MainPage() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Home />
      </div>
      <div id="developers">
        <Developers />
      </div>
      <div id="mission">
        <Mission />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 👈 Your current page */}
        <Route path="/fnavbar1" element={<Fnavbar1 />} /> {/* 👈 New routed page */}
      </Routes>
    </Router>
  );
}

export default App;
