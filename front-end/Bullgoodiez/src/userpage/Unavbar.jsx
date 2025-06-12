import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ make sure this path is correct
import { FaUserCircle } from 'react-icons/fa';
import './Unavbar.css';

function Unavbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth(); // ✅ get auth state
  //const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
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
      <Link to="/"><img src="webcon.png" alt="BullGoods Logo" /></Link>

<div className="navbar-right">
      <ul className="navbar-menu">
        <li>
          <Link to="/firstpage" className={activeSection === 'hero' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/#developers" className={activeSection === 'developers' ? 'active' : ''}>About Us</Link>
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
              <button onClick={logout}>Log Out</button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/loginpage">
          <button className="navbar-button">Log In</button>
        </Link>
      )}
    </div>
    </nav>
  );
}

export default Unavbar;