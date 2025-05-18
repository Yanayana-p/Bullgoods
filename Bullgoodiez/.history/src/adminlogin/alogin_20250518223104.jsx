import React from 'react';
import './alogin.css';

const Alogin = () => {
  return (
    <div className="admin-login-page">
      <div className="admin-left-panel">
        <h2>One Stop.<br />Endless Shopping!</h2>
        <p>Welcome back, Admin! You are one step away to the database.</p>
      </div>

      <div className="admin-right-wrapper">
        <div className="admin-right-panel">
          <img src="/webcon.png" alt="Bullgoods" className="logo" />
          <h1>Admin Log In</h1>
          <form className="login-form">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <button type="submit">Log in</button>
          </form>

          <p className="connect-text">or connect with us</p>
          <div className="social-icons">
            <a href="#"><img src="/fb-icon.png" alt="Facebook" /></a>
            <a href="#"><img src="/linkedin-icon.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/youtube-icon.png" alt="YouTube" /></a>
            <a href="#"><img src="/instagram-icon.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
