import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const hero = document.getElementById('hero');
      const developers = document.getElementById('developers');
      const footer = document.getElementById('footer');

      if (footer.offsetTop <= scrollPosition) {
        setActiveSection('footer');
      } else if (developers.offsetTop <= scrollPosition) {
        setActiveSection('developers');
      } else {
        setActiveSection('hero');
      }

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <img src="webcon.png" alt="BullGoods Logo" />
      <ul className="navbar-menu">
        <li>
          <Link to="/home" className={activeSection === 'hero' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={activeSection === 'developers' ? 'active' : ''}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className={activeSection === 'footer' ? 'active' : ''}>
            Contact Us
          </Link>
        </li>
      </ul>
      <button className="navbar-button">Log In</button>
    </nav>
  );
}

export default Navbar;

