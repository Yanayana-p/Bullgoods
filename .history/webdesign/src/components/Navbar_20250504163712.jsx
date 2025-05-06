import React, { useEffect, useState } from 'react';
import './navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Update active section
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

      // Update scrolled state
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
        <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
        <li><a href="#developers" className={activeSection === 'developers' ? 'active' : ''}>About</a></li>
        <li><a href="#footer" className={activeSection === 'footer' ? 'active' : ''}>Contact</a></li>
      </ul>
      <button className="navbar-button">Log In</button>
    </nav>
  );
}

export default Navbar;
