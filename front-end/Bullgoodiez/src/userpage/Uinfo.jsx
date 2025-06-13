import React, { useEffect, useState } from 'react';
import './Uinfo.css';

function SellerProfile() {
  const [user, setUser] = useState({
    studentId: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '', // Added role to distinguish seller
  });

  const [editable, setEditable] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetch(`http://localhost:5000/api/auth/users/profile?email=${parsedUser.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user); // ✅ This works because backend now sends camelCase keys
          } else {
            setUser(parsedUser); // fallback
          }
        })
        .catch(err => {
          console.error("Failed to fetch user from DB:", err);
          setUser(parsedUser);
        });


      if (parsedUser.role === 'seller') {
        fetch(`http://localhost:5000/api/products?sellerId=${parsedUser.studentId}`)
          .then(res => res.json())
          .then(data => setProducts(data.products || []))
          .catch(err => console.error("Error fetching products:", err));
      }
    }
  }, []);

  const handleEdit = () => setEditable(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });


      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update profile.");
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user || user));
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
    // Optionally redirect user here
  };

  return (
    <div className="profile-layout">
      {/* New flex container for side-by-side layout */}
      <div className="profile-content-container">
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
      </div>
    </div>
  );
}

export default SellerProfile;