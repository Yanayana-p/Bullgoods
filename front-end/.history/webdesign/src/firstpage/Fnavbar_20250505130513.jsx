import React from 'react';
import './Fnavbar.css';
import { FaUserCircle, FaGift } from 'react-icons/fa'; // FontAwesome icons

function Fnavbar1() {
  return (
    <nav className="fnavbar">
      <div className="fnavbar-left">
        {/* Updated to use relative path from public folder */}
        <img src="/webcon.png" alt="Logo" className="fnavbar-logo" />
      </div>
      <div className="fnavbar-right">
        <button className="icon-button"><FaUserCircle /></button>
        <button className="icon-button"><FaGift /></button>
        <button className="start-selling">Start Selling</button>
      </div>
    </nav>
  );
}

export default Fnavbar1;
