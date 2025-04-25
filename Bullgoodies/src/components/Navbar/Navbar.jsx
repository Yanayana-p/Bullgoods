import { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">Bullgoods</div>

      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="#about">ABOUT US</Link></li>
          <li><Link to="#contact">CONTACT US</Link></li>
          <li><Link to="/login">LOG IN</Link></li>
        </ul>
      </nav>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
