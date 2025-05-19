import { useState } from 'react';
import { Link } from "react-router-dom";
import './Navibar.scss';

function Navibar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`navibar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">Bullgoods</div>

      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="#about">ABOUT US</Link></li>
          <li><Link to="#contact">CONTACT US</Link></li>
          <li><Link to="/loginpage">LOG IN</Link></li>
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

export default Navibar;
