import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth } from "../context/AuthContext";
import "./sellingpageregis.scss";

function SellingPageRegis() {
  const [email, setEmail] = useState('');
  const [text, setId] = useState ('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      name: "Demo User"
    };

    login(userData);
    navigate ("/sellerpage");
  };

  return (
    <div className="sellingpageregis-page">
      <main className="sellingpageregis-container">
        <div className="sellingpageregis-section">
          <img src="/Bullgoods.jpg" alt="Bullgoods" />
        </div>

        <div className="right-section">
          <div className="login-box">
            <h2>Seller Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <span className="icon">👤</span>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={text}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <span className="icon">👤</span>
                <input
                  type="email"
                  placeholder="Student Email"
                  value={email}
                  onChange={(e) => setEmail (e.target.value)}
                  required
                />
              </div>
              <button className="startselling-btn" type="submit">
                Start Selling
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellingPageRegis;
