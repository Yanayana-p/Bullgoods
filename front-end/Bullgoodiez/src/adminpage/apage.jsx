import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './apage.css';

const Apage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />
        
        <div className="nav-menu">
          <button>User</button>
          <button>Wishlist</button>
          <button>Products</button>
        </div>

        <div className="action-buttons">
          <button>UPDATE</button>
          <button>DELETE</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
        </div>

        <div className="admin-table">
          <div className="table-header">
            <span>User ID</span>
            <span>First Name</span>
            <span>Last Name</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span>Password</span>
          </div>
          
          {/* Add rows if need/want */}
        </div>
      </main>
    </div>
  );
};

export default Apage;