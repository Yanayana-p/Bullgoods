import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";
import Bullgoods from "../../assets/Bullgoods.jpg";

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", { firstName, lastName, studentId, email, password });
    // Form submission logic here
  };

  return (
    <div className="signup-page">
      <main className="signup-container">
        <div className="left-section">
          <img src={Bullgoods} alt="Bullgoods" />
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
               <Link to="/login"> Already have an account? Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
