import React from 'react';
import './UProfile.css';

function UserProfile() {
  return (
    <div className="profile-page">
      {/* Left Profile Section */}
      <div className="profile-info">
        <h2>Profile</h2>
        <h4 className="subheading">USER INFORMATION</h4>
        <p>
          Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
        </p>
        <p>
          Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite...
        </p>
        <p className="bio">BIO EVEN THOUGH NOT A SELLER</p>
      </div>

      {/* Right Form Section */}
      <div className="user-form">
        <h2>All About Me</h2>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Identification number</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input type="email" placeholder="mail@janesfakedomain.net" />
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
    </div>
  );
}

export default UserProfile;
