import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';
import Fnavbar1 from './firstpage/Fnavbar';
import Fhome from './firstpage/Fhome';
import Fcategory from './firstpage/fcategory';
import Fproducts from './firstpage/Fproducts';
import FFooter from './components/Footer1';


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

function FirstPage() {
  return (
    <>
      <Fnavbar1 />
      <div className="fhome-wrapper">
        <Fhome />
      </div>
      <div className="fcategory-wrapper">
        <Fcategory />
      </div>
      <div className="fproducts-wrapper">
        <Fproducts />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/firstpage" element={<FirstPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
