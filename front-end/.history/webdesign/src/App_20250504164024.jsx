import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
      <Navbar />
      <div id="hero">Home Section</div>
      <div id="developers">About Section</div>
      <div id="footer">Contact Section</div>
    </>
  );
}

export default App;
