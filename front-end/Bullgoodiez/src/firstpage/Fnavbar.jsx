import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaGift } from 'react-icons/fa';
import './Fnavbar.css';
import { useAuth } from '../context/AuthContext';

function Fnavbar1() {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  // Helper function to check if user is a seller
  const isUserSeller = () => {
    return user?.isSeller === true || user?.is_seller === true || user?.role === 'seller';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
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

  const handleIconButtonClick = () => {
    if (isUserSeller()) {
      navigate('/sellerpage');
    } else {
      navigate('/userpage');
    }
  };

  const handleStartSellingClick = () => {
    if (!user) {
      navigate('/loginpage');
    } else if (isUserSeller()) {
      navigate('/addproduct');
    } else {
      navigate('/firstpage/start-selling');
    }
  };

  return (
    <nav className={`fnavbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="fnavbar-left"></div>

      <div className="fnavbar-center">
        <Link to="/">
          <img src="/webcon.png" alt="Logo" className="fnavbar-logo" />
        </Link>
      </div>

      <div className="fnavbar-right">
        <button className="icon-button" onClick={handleIconButtonClick}>
          <FaUserCircle />
        </button>

        <button className="icon-button" onClick={() => navigate('/wishlist')}>
          <FaGift />
        </button>

        <button className="start-selling-button" onClick={handleStartSellingClick}>
          {isUserSeller() ? 'Start Selling' : 'Become a Seller'}
        </button>

        {!loading && user ? (
          <div className="navbar-user" ref={dropdownRef}>
            <FaUserCircle
              className="user-icon"
              size={37}
              onClick={handleUserClick}
              style={{ cursor: 'pointer', color: '#f48c8c' }}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/loginpage">
                  <button onClick={logout}>Log Out</button>
                </Link>
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

export default Fnavbar1;
