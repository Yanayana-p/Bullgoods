import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Developers from './components/Developers';
import Mission from './components/Mission1';
import Footer from './components/Footer1';
import Fnavbar1 from './firstpage/fnavbar1';


function App() {
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

export default App;
