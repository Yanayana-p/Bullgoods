import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./sellingpageregis.scss";

function SellingPageRegis() {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromDB = async () => {
      try {
        const storedUserStr = localStorage.getItem("user");
        if (storedUserStr) {
          const storedUser = JSON.parse(storedUserStr);
          if (storedUser.email) {
            const response = await fetch(
              `http://localhost:5000/api/auth/users/profile?email=${encodeURIComponent(storedUser.email)}`
            );
            const data = await response.json();

            if (response.ok && data.user) {
              setFirstName(data.user.firstName);
              setLastName(data.user.lastName);
              setPhoneNumber(data.user.phoneNumber);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserFromDB();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set seller role and status
      const response = await fetch("http://localhost:5000/api/user/set-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Failed to set seller role");
        return;
      }

      const updatedUser = {
        studentId,
        email,
        firstName,
        lastName,
        phoneNumber,
        isSeller: true,
        role: "seller"
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      login(updatedUser);
      navigate("/sellerpage");
    } catch (err) {
      console.error("Error in handleSubmit", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="sellingpageregis-page">
      <main className="sellingpageregis-container">
        <div className="sellingpageregis-section">
          <img src="/Bullgoods-remove.png" alt="Bullgoods" />
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
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="icon">📧</span>
                <input
                  type="email"
                  placeholder="Student Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="icon">🧑</span>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  readOnly
                />
              </div>

              <div className="input-group">
                <span className="icon">🧑</span>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  readOnly
                />
              </div>

              <div className="input-group">
                <span className="icon">📱</span>
                <input
                  type="text"
                  value={phoneNumber}
                  placeholder="Phone Number"
                  readOnly
                />
              </div>

              {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
              )}
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
