import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './apage.css';
import { useWishlist } from "../context/WishlistContext";

const Apage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('user'); // 'user', 'wishlist', or 'products'
  const navigate = useNavigate();
  const { wishlistUpdated } = useWishlist();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/all-users');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
      setUsers(data);
    } catch (err) {
      alert(err.message);
    }
  };

   useEffect(() => {
    fetchAllUsers(); // Re-run when wishlist updates
  }, [wishlistUpdated]); // 🔁

  const renderTableHeaders = () => {
    switch (view) {
      case 'wishlist':
        return (
          <>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Wishlist</th>
          </>
        );
      case 'products':
        return (
          <>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Products</th>
          </>
        );
      default:
        return (
          <>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Role</th>
            <th>Timestamp</th>
          </>
        );
    }
  };

  const renderTableRows = () => {
    return users.map((user, index) => {
      switch (view) {
        case 'wishlist':
          return (
            <tr key={index}>
              <td>{user.studentId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
  {user.wishlist && user.wishlist.length > 0
    ? user.wishlist.map(item => item.name).join(', ')
    : 'N/A'}
</td>

            </tr>
          );
        case 'products':
          return (
            <tr key={index}>
              <td>{user.studentId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.products ? user.products.join(', ') : 'N/A'}</td>
            </tr>
          );
        default:
          return (
            <tr key={index}>
              <td>{user.studentId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>{user.timestamp}</td>
            </tr>
          );
      }
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />

        <div className="nav-menu">
          <button onClick={() => {
              setView('user');
              fetchAllUsers(); // refetch on clicking User
            }}>
              User
          </button>

          <button onClick={() => {
              setView('wishlist');
              fetchAllUsers(); // <-- Refetch latest data from backend
            }}>
              Wishlist
          </button>

          <button onClick={() => setView('products')}>Products</button>
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
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Apage;
