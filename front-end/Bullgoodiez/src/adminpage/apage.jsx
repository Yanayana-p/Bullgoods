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

        <div className="nav-menu">
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
  <table className="user-table">
    <thead>
      <tr>
        <th>User ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Password</th>
        <th>Role</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td>{user.studentId}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.password}</td>
          <td>{user.Role}</td>
          <td>{user.TImestamp}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </main>
    </div>
  );
};

export default Apage;
