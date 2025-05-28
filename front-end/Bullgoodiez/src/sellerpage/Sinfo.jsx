import React, { useEffect, useState } from 'react';
import './Sinfo.css';

function SellerProfile() {
  const [user, setUser] = useState({
    studentId: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleEdit = () => setEditable(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated User Info:', user);
    setEditable(false);
  };

  return (
    <div className="user-form-minimal">
      <h2>All About Me</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Identification number</label>
            <input
              type="text"
              name="studentId"
              value={user.studentId}
              onChange={handleChange}
              disabled={!editable}
              placeholder="ID number"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              disabled={!editable}
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              disabled={!editable}
              placeholder="First name"
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              disabled={!editable}
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
            placeholder="user@national-u.edu.ph"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            disabled={!editable}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={!editable}>
          Submit
        </button>

        <div className="action-buttons">
          <button type="button" className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button type="button" className="delete-btn">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellerProfile;