import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const hero = document.getElementById('hero');
      const developers = document.getElementById('developers');
      const footer = document.getElementById('footer');

      if (footer && footer.offsetTop <= scrollPosition) {
        setActiveSection('footer');
      } else if (developers && developers.offsetTop <= scrollPosition) {
        setActiveSection('developers');
      } else {
        setActiveSection('hero');
      }

      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <img src="webcon.png" alt="BullGoods Logo" />

      <ul className="navbar-menu">
        <li>
          <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
        </li>
        <li>
          <a href="#developers" className={activeSection === 'developers' ? 'active' : ''}>About Us</a>
        </li>
        <li>
          <a href="#footer" className={activeSection === 'footer' ? 'active' : ''}>Contact Us</a>
        </li>
      </ul>

      {user ? (
        <div className="navbar-user" ref={dropdownRef}>
          <FaUserCircle 
            className="user-icon"
            size={30}
            onClick={handleUserClick}
            style={{ cursor: 'pointer', color: '#f48c8c' }}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => navigate('/userpage')}>Go to User</button>
              <button onClick={logout}>Log Out</button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/loginpage">
          <button className="navbar-button">Log In</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
