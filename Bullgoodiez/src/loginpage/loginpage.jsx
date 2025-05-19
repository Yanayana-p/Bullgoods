import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth } from "../context/AuthContext";
import "./loginpage.scss";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      name: "Demo User"
    };

    login(userData);
    navigate ("/userpage");
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="left-section">
          <img src="/Bullgoods.jpg" alt="Bullgoods" />
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
