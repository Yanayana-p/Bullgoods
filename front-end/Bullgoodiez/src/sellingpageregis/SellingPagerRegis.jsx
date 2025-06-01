import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./sellingpageregis.scss";
//import { useEffect } from "react"; // <-- Add useEffect here


function SellingPageRegis() {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    setFirstName(localStorage.getItem("registeredFirstName") || '');
    setLastName(localStorage.getItem("registeredLastName") || '');
    setPhoneNumber(localStorage.getItem("registeredPhoneNumber") || '');
  }, []);
  
  const handleSubmit = (e) => {
  e.preventDefault();

  // Retrieve all stored registration data
  const registeredEmail = localStorage.getItem("registeredStudentEmail");
  const registeredStudentId = localStorage.getItem("registeredStudentId");
  const registeredFirstName = localStorage.getItem("registeredFirstName");
  const registeredLastName = localStorage.getItem("registeredLastName");
  const registeredPhoneNumber = localStorage.getItem("registeredPhoneNumber");

  // Check if all inputs match
  if (
    email === registeredEmail &&
    studentId === registeredStudentId &&
    firstName === registeredFirstName &&
    lastName === registeredLastName &&
    phoneNumber === registeredPhoneNumber
  ) {
    const userData = {
      studentId,
      phoneNumber,
      firstName,
      lastName,
      email,
      password: ''
    };

    localStorage.setItem('user', JSON.stringify(userData));
    login(userData);
    navigate("/sellerpage");
  } else {
    setErrorMessage("Your details do not match the registration. Please check all fields.");
  }
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
                  placeholder="First Name"
                  value={firstName}
                  readOnly
                />
              </div>


              <div className="input-group">
                <span className="icon">🧑</span>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  readOnly
                />
              </div>

              <div className="input-group">
                <span className="icon">📱</span>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
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
