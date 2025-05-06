import React from 'react';
import './Uinfo.css';

function UserProfile() {
  return (
    <div className="user-form-minimal">
      <h2>All About Me</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>Identification number</label>
            <input type="text" placeholder="ID number" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Phone number" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First name</label>
            <input type="text" placeholder="First name" />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input type="text" placeholder="Last name" />
          </div>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="user@national-" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your new password" />
        </div>

        <button type="submit" className="submit-btn">Submit</button>

        <div className="action-buttons">
          <button type="button" className="edit-btn">Edit</button>
          <button type="button" className="delete-btn">Delete Account</button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
