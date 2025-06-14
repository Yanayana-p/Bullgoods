import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './apage.css';

const Apage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [view, setView] = useState('user'); // 'user', 'wishlist', or 'products'
  const [showPasswords, setShowPasswords] = useState({});
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const navigate = useNavigate();
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if (view === 'products') {
      const stored = localStorage.getItem('allProducts');
      if (stored) {
        try {
          setLocalProducts(JSON.parse(stored));
        } catch (e) {
          console.error('Invalid product data in localStorage');
        }
      }
    }
    if (view === 'wishlist') {
      fetchAllWishlists();
    }
    if (view === 'user') {
      fetchAllUsers();
    }
  }, [view]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/all-users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log('Fetched users from backend:', data);
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setUsers([]);
      alert(err.message);
    }
  };

  const fetchAllWishlists = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/all');
      if (!response.ok) throw new Error('Failed to fetch wishlists');
      const data = await response.json();
      setWishlists(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const togglePassword = (userId) => {
    setShowPasswords(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const renderTableHeaders = () => {
    switch (view) {
      case 'wishlist':
        return (
          <>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
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
            <th>
              Password
              <button
                style={{ marginLeft: 6, background: 'none', border: 'none', cursor: 'pointer', verticalAlign: 'middle' }}
                title={showAllPasswords ? 'Hide All Passwords' : 'Show All Passwords'}
                onClick={() => setShowAllPasswords((prev) => !prev)}
              >
                <span role="img" aria-label="Show Password">👁️‍🗨️</span>
              </button>
            </th>
            <th>Role</th>
            <th>Timestamp</th>
          </>
        );
    }
  };

  const renderTableRows = () => {
    switch (view) {
      case 'wishlist':
        return wishlists.length === 0 ? (
          <tr><td colSpan={6}>No wishlist entries found.</td></tr>
        ) : (
          wishlists.map((item, index) => (
            <tr key={index}>
              <td>{item.student_id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.product_name}</td>
              <td>₱{item.price}</td>
              <td>
                <img src={item.image_url ? `http://localhost:5000/uploads/${item.image_url}` : '/default-product.jpg'} alt={item.product_name} style={{ width: 60, height: 60, objectFit: 'cover' }} />
              </td>
            </tr>
          ))
        );
      case 'products': {
        const studentId = localStorage.getItem('registeredStudentId') || '-';
        const firstName = localStorage.getItem('registeredFirstName') || '-';
        const lastName = localStorage.getItem('registeredLastName') || '-';
        return localProducts.map((product, index) => (
          <tr key={index}>
            <td>{studentId}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{product.name} - {product.category}</td>
          </tr>
        ));
      }
      default:
        return users.length === 0 ? (
          <tr><td colSpan={8}>No users found.</td></tr>
        ) : (
          users.map((user, index) => (
            <tr key={index}>
              <td>{user.student_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{showAllPasswords ? (user.password || 'N/A') : '••••••••'}</td>
              <td>{user.role}</td>
              <td>{user.timestamp}</td>
            </tr>
          ))
        );
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />

        <div className="nav-menu">
          <button onClick={() => setView('user')}>User</button>
          <button onClick={() => setView('wishlist')}>Wishlist</button>
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
