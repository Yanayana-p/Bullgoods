import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './alogin.css';

const Alogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/adminlogin', { email, password });
      if (response.data && response.data.success) {
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        navigate('/adminpage');
      } else {
        alert("You're not an admin!");
      }
    } catch (err) {
      alert("You're not an admin!");
    }
  };

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
          <form className="login-form" onSubmit={handleLogin}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />

            <button type="submit">Log in</button>
            {error && <div className="error-message">{error}</div>}
          </form>

          <p className="connect-text">or connect with us</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/NationalUniversityPhilippines" target="_blank"><img src="/fb-icon.png" alt="Facebook" /></a>
            <a href="https://www.linkedin.com" target="_blank"><img src="/linkedin-icon.png" alt="LinkedIn" /></a>
            <a href="https://www.youtube.com/shorts/mLPEuB3rZbw" target="_blank"><img src="/youtube-icon.png" alt="YouTube" /></a>
            <a href="https://www.instagram.com" target="_blank"><img src="/instagram-icon.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alogin;
