import React, { useEffect, useState } from 'react'
import './Uinfo.css';

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

  // Load user data on component mount
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Update user data in localStorage
  //   localStorage.setItem('user', JSON.stringify(user));
  //   //console.log('Updated User Info:', user);
  //   localStorage.setItem("registeredFirstName", user.firstName);
  //   localStorage.setItem("registeredLastName", user.lastName);
  //   localStorage.setItem("registeredPhoneNumber", user.phoneNumber);
  //   //localStorage.setItem("registeredPassword", user.password);
  //   alert("Profile updated successfully!");
  //   setEditable(false);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user), // Send updated user
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update profile.");
        return;
      }

      // ✅ Update localStorage
      localStorage.setItem('user', JSON.stringify(data.user || user)); // Prefer backend response if available

      // ✅ Also update individual fields if you’re using them elsewhere
      localStorage.setItem("registeredFirstName", user.firstName);
      localStorage.setItem("registeredLastName", user.lastName);
      localStorage.setItem("registeredPhoneNumber", user.phoneNumber);
      localStorage.setItem("registeredStudentId", user.studentId);
      localStorage.setItem("registeredEmail", user.email);

      alert("Profile updated successfully!");
      setEditable(false);

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = () => {
    localStorage.removeItem("user");
    alert("Account deleted.");
    // You can redirect to login or registration page if needed
    // navigate("/register");
  };

  return (
    <div className="user-form-minimal">
      <h2>All About Me</h2>
      <form onSubmit={handleSubmit}> {/*handleSubmit inside*/}
        <div className="form-row">
          <div className="form-group">
            <label>Identification number</label>
            <input
              type="text"
              name="studentId"
              value={user.studentId}
              onChange={handleChange}
              disabled
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
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellerProfile;