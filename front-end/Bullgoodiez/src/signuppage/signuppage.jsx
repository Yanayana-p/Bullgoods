import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signuppage.scss";

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        studentId,
        phoneNumber,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Signup failed');
      return;
    }

    alert('Signup successful!');
    // Optionally redirect or clear form
    } catch (err) {
    console.error('Signup error:', err);
    alert('Failed to connect to server');
    }
};

  return (
    <div className="signup-page">
      <main className="signup-container">
        <div className="left-section">
          <img src="/Bullgoods.jpg" alt="Bullgoods" />
        </div>

        <div className="right-section">
          <div className="signup-box">
            <h2>Sign up</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>


              <div className="input-group">
                <input
                  type="email"
                  placeholder="School Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="signup-btn" type="submit">
                Register
              </button>
            </form>

            <p className="login-text">
               <Link to="/loginpage"> Already have an account? Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
