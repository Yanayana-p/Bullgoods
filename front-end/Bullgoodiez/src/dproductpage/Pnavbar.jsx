import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Pnavbar.css';

function Pnavbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const hero = document.getElementById('hero');
      const developers = document.getElementById('developers');
      const footer = document.getElementById('footer');

      if (footer?.offsetTop <= scrollPosition) {
        setActiveSection('footer');
      } else if (developers?.offsetTop <= scrollPosition) {
        setActiveSection('developers');
      } else {
        setActiveSection('hero');
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li><Link to="/" className={activeSection === 'hero' ? 'active' : ''}>Home</Link></li>
          <li><a href="#developers" className={activeSection === 'developers' ? 'active' : ''}>About Us</a></li>
          <li><a href="#footer" className={activeSection === 'footer' ? 'active' : ''}>Contact Us</a></li>
        </ul>
        <button className="navbar-button" onClick={() => {
          navigate('/firstpage');
          window.location.reload();
        }}>
          Back
        </button>

      </div>
    </nav>
  );
}

export default Pnavbar;
