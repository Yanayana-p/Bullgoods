import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './apage.css';

const Apage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const handleFetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/all-users');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data);
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />

        <div className="nav-menu">
          <button onClick={handleFetchUsers}>User</button>
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

          {/* ✅ Render user rows */}
          {users.map((user, index) => (
            <div className="table-row" key={index}>
              <span>{user.studentId}</span>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
              <span>{user.email}</span>
              <span>{user.phoneNumber}</span>
              <span>{user.password}</span> {/* Optional: Hide in production */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Apage;
