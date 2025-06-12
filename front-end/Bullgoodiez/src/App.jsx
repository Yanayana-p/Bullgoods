import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';

import { AuthProvider } from './context/AuthContext';
// Main page components
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';

// First page components
import Fnavbar1 from './firstpage/Fnavbar';
import Fhome from './firstpage/Fhome';
import Fcategory from './firstpage/Fcategory';
import Fproducts from './firstpage/Fproducts';
import Ffooter from './firstpage/Ffooter';

// User page components
import Unavbar from './userpage/Unavbar';
import Uprofile from './userpage/Uprofile';
import Uinfo from './userpage/Uinfo';
import Ufooter from './userpage/Ufooter';

//Seller
import Snavbar from './sellerpage/Snavbar';
import Sprofile from './sellerpage/Sprofile';
import Sinfo from './sellerpage/Sinfo';
import Sfooter from './sellerpage/Sfooter';

import LoginPage from './loginpage/loginpage';
import SignUpPage from './signuppage/signuppage';
import Navibar from './components/Navibar'; 

import Pnavbar from './dproductpage/Pnavbar';
import Pproduct from './dproductpage/Pproduct';
import Pfooter from './dproductpage/Pfooter';

import Alogin from './adminlogin/alogin';
import Apage from './adminpage/apage';

//RemoveProduct
import RemoveProduct from "./removeproduct/removeproduct";

import SellingPageRegis from './sellingpageregis/SellingPagerRegis';

import WishlistPage from './wishlistpage/wishlistpage';
import { WishlistProvider } from './context/WishlistContext';

import ProductCatalog from './dproductpage/ProductCatalog';

import AddProductPage from './sellerpage/Saddprouct';

import { useEffect } from 'react'; //call backend

import ScrollToHash from './components/ScrollToHash';

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
    <div className="firstpage-container">
      <Fnavbar1 />
      <div className="fhome-wrapper">
        <Fhome />
      </div>
      {/* <div className="fcategory-wrapper">
        <Fcategory />
      </div> */}
      {/* <div className="fproducts-wrapper">
        <Fproducts />
      </div> */}
      <div className="ffooter-wrapper">
        <Ffooter />
      </div>
    </div>
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

function SellerPage() {
  return (
    <>
      <Snavbar />
      <div className="Sprofile-wrapper">
        <Sprofile />
      </div>
      <div className="Sinfo-wrapper">
        <Sinfo />
      </div>
      <div className="Sfooter-wrapper">
        <Sfooter />
      </div>
    </>
  );
}

function ProductPage() {
  const { id } = useParams();
  return (
    <>
      <Pnavbar />
      <div className="product-wrapper">
        <Pproduct productId={id} />
      </div>
      <Pfooter />
    </>
  );
}

function AdminLogin() {
  return (
    <>
      <Alogin />
    </>
  );
}

function AdminPage() {
  return (
    <>
      <Apage />
    </>
  );
}

function App() {
  useEffect(() => {
    fetch('/api/examples')
      .then(res => res.json())
      .then(data => {
        console.log("Backend Response:", data);
      })
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);
  
  return (
    <AuthProvider>
      <WishlistProvider>
        <ProductProvider>
          <Router>
            <ScrollToHash />
            <Routes>
              <Route path="/" element={<MainPage />} /> 
              <Route path="/firstpage" element={<FirstPage />} /> 
              <Route path="/userpage" element={<UserPage />} /> 
              <Route path="/sellerpage" element= {<SellerPage />} />
              <Route path="/loginpage" element={<><LoginPage /></>} />
              <Route path="/signup" element={<><SignUpPage /></>} />
              <Route path ="/firstpage/start-selling" element = {<><Navibar/> <SellingPageRegis /></>} />
              <Route path="/addproduct" element={<AddProductPage />} />
              <Route path="/dproductpage/:id" element={<ProductPage />} /> 
              <Route path ="/products" element ={<ProductCatalog />} />
              <Route path ="/wishlist" element ={<WishlistPage />} />
              <Route path="/adminlogin" element={<AdminLogin />} /> 
              <Route path="/adminpage" element={<AdminPage />} /> 
              <Route path="/removeproduct" element={<RemoveProduct />} />
            </Routes>
          </Router>
        </ProductProvider>
      </WishlistProvider>
    </AuthProvider>
  )
};

export default App;