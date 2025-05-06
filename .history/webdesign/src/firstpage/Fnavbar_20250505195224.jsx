import React, { useState, useEffect } from 'react';
import './Fnavbar.css';
import { FaUserCircle, FaGift } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ Add this line

function Fnavbar1() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fnavbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="fnavbar-left"></div>
      <div className="fnavbar-center">
        <Link to="/MainPage"> {/* ✅ Make logo clickable */}
          <img src="/webcon.png" alt="Logo" className="fnavbar-logo" />
        </Link>
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
