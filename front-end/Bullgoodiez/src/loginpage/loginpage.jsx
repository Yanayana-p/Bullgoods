import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth } from "../context/AuthContext";
import "./loginpage.scss";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    // Use login from AuthContext
    login(data.user);
    // Store studentId and user in localStorage
    localStorage.setItem('studentId', data.user.student_id);
    localStorage.setItem('user', JSON.stringify(data.user));
    alert('Login Successful!');
    // Save token if you want: localStorage.setItem('token', data.token);
    navigate('/firstpage');
  } catch (err) {
    console.error('Login error:', err);
    alert('Failed to connect to server');
  }
};

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="left-section">
          <img src="/Bullgoods-remove.png" alt="Bullgoods" />
        </div>

        <div className="right-section">
          <div className="login-box">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <span className="icon">👤</span>
                <input
                  type="email"
                  placeholder="School Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <span className="icon">🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="options">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
                <Link to="#">Forgot Password?</Link>
              </div>
              <button className="login-btn" type="submit">
                Log in
              </button>
            </form>
            <p className="signup-text">
              or <Link to="/signup">Sign up</Link>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
