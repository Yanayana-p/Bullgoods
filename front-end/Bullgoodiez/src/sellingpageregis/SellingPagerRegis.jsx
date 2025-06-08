import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./sellingpageregis.scss";


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
  const storedUserStr = localStorage.getItem("user");

  if (!storedUserStr || storedUserStr === "undefined") return;

  try {
    const storedUser = JSON.parse(storedUserStr);

    if (storedUser?.isSeller === true) {
      navigate("/sellerpage"); // ✅ Already registered seller
    } else {
      // Prefill from existing user data
      setFirstName(storedUser.firstName || '');
      setLastName(storedUser.lastName || '');
      setPhoneNumber(storedUser.phoneNumber || '');
    }
  } catch (err) {
    console.error("Error parsing user in useEffect", err);
    localStorage.removeItem("user");
  }
}, [navigate]);


const handleSubmit = (e) => {
  e.preventDefault();

  const storedUserStr = localStorage.getItem("user");

  // First-time registration
  if (!storedUserStr || storedUserStr === "undefined") {
    if (!firstName || !lastName || !phoneNumber) {
      setErrorMessage("Missing profile data. Please refresh and try again.");
      return;
    }

    const newUser = {
      studentId,
      phoneNumber,
      firstName,
      lastName,
      email,
      isSeller: true, // ✅ New flag
      password: ''
    };


    try {
      localStorage.setItem("user", JSON.stringify(newUser));
      login(newUser);
      navigate("/sellerpage");
    } catch (err) {
      console.error("Failed to save new user:", err);
      setErrorMessage("Something went wrong while saving. Please try again.");
    }

    return;
  }

  // Returning user
  try {
    const registeredUser = JSON.parse(storedUserStr);

    // Validate structure of saved user
    if (
      !registeredUser ||
      !registeredUser.email ||
      !registeredUser.studentId ||
      !registeredUser.firstName ||
      !registeredUser.lastName ||
      !registeredUser.phoneNumber
    ) {
      throw new Error("Invalid user data");
    }

    if (
    email.trim() === registeredUser.email &&
    studentId.trim() === registeredUser.studentId
  ) {
    const updatedUser = { ...registeredUser, isSeller: true }; // ✅ ADD isSeller
    localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Save to localStorage
    login(updatedUser); // ✅ Update context
    navigate("/sellerpage");
  } else {
      setErrorMessage("Your Student ID or Email is incorrect. Please try again.");
    }
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
    // Reset broken localStorage entry
    localStorage.removeItem("user");
    setErrorMessage("Your data was corrupted. Please re-register.");
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
