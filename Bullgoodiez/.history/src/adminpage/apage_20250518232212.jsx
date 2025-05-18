import React from 'react';
import './AdminPage.css';

const Adm = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />
        <nav className="nav-menu">
          <p>User</p>
          <p>Wishlist</p>
          <p>Seller</p>
          <p>Products</p>
          <p>Category</p>
        </nav>
        <div className="action-buttons">
          <button>CREATE</button>
          <button>READ</button>
          <button>UPDATE</button>
          <button>DELETE</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="logout-btn">LOG OUT</button>
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
          {[...Array(7)].map((_, index) => (
            <div key={index} className="table-row">
              {/* Replace with actual data if needed */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
