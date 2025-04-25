import React from "react";
import "./SignupPage.scss";

function SignupPage() {
  return (
    <div className="signup-page">
      <main className="signup-container">
        <h2>Sign up</h2>

        <div className="input-group">
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" />
        </div>

        <button className="signup-btn">Sign up</button>
      </main>
    </div>
  );
}

export default SignupPage;
