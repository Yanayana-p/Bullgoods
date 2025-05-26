import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Navbar from './components/Navbar';
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Navbar />
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/home" element={<Home />} /> {/* Use element */}
        <Route path="/about" element={<Developers />} /> {/* Use element */}
        <Route path="/contact" element={<Footer />} /> {/* Use element */}
        <Route path="/" element={<Home />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
