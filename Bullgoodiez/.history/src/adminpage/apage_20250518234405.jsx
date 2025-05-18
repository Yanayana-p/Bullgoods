import React from 'react';
import './apage.css';

const Apage = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />
        
        <div className="nav-menu">
          <button>User</button>
          <button>Wishlist</button>
          <button>Seller</button>
          <button>Products</button>
          <button>Category</button>
        </div>

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
          
        </div>
      </main>
    </div>
  );
};

export default Apage;
