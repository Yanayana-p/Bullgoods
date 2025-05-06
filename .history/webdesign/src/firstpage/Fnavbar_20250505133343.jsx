import React, { useState, useEffect } from 'react';
import './Fnavbar.css';
import { FaUserCircle, FaGift } from 'react-icons/fa';

function Fnavbar1() {
  const [scrolled, setScrolled] = useState(false);

  // Listen to scroll events to detect scrolling direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true); // Set state to true if scrolled down
      } else {
        setScrolled(false); // Set state to false if at top
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fnavbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="fnavbar-left">
        {/* Empty div for alignment */}
      </div>
      <div className="fnavbar-center">
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
