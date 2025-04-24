import React from "react";
import "./LoginPage.scss";
import Bullgoods from "../../assets/Bullgoods.jpg";
import { Link } from "react-router";

function LoginPage() {
  return (
    <div className="login-page">
      <header className="navbar">
        <div className="logo">Bullgoods</div>
        <nav>
          <ul>
            <li>
              <a href="#">HOME</a>

            </li>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">CONTACT US</a></li>
            <li className="active"><a href="#">LOG IN</a></li>
          </ul>
        </nav>
      </header>

      <main className="login-container">
        <div className="left-section">
          <img src={Bullgoods} alt="Bullgoods" />
        </div>

        <div className="right-section">
          <div className="login-box">
            <h2>Log in</h2>

            <div className="input-group">
              <span className="icon">👤</span>
              <input type="text" placeholder="School Email" />
            </div>

            <div className="input-group">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Password" />
            </div>

            <div className="options">
              <label><input type="checkbox" /> Remember Me</label>
              <a href="#">Forgot Password?</a>
            </div>

            <button className="login-btn">Log in</button>

            <p className="signup-text">
              or <a href="#">Sign up</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
