import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main page components
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';

// First page components
import Fnavbar1 from './firstpage/Fnavbar';
import Fhome from './firstpage/Fhome';
import Fcategory from './firstpage/fcategory';
import Fproducts from './firstpage/Fproducts';
import Ffooter from './firstpage/Ffooter';

// User page components
import Unavbar from './userpage/Unavbar';
import Uprofile from './userpage/Uprofile';
import Uinfo from './userpage/Uinfo';
import Ufooter from './userpage/Ufooter';

import LoginPage from './loginpage/loginpage';
import Navibar from './components/Navibar'; 

import Product from './components/product'; 

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
      <div className="ffooter-wrapper">
        <Ffooter />
      </div>
    </>
  );
}

function UserPage() {
  return (
    <>
      <Unavbar />
      <div className="Uprofile-wrapper">
        <Uprofile />
      </div>
      <div className="Uinfo-wrapper">
        <Uinfo />
      </div>
      <div className="Ufooter-wrapper">
        <Ufooter />
      </div>
    </>
  );
}

function ProductPage() {
  return (
    <>
    <div className="productss">
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
        <Route path="/userpage" element={<UserPage />} /> 
        <Route path="/loginpage" element={<><Navibar /> <LoginPage /></>} />
        <Route path="/productpage" element={<ProductPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
