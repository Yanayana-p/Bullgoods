import React, { useState } from 'react';
import './Uprofile.css';

function UserProfile() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-info-box">
        <h2>Profile</h2>
        <h4 className="sub-heading">USER INFORMATION</h4>
        <p>
          Kyla Perez, 21 years old. Maganda tapos magastos hehe. Looking for boyf-... pre-loved items puh.
        </p>
        <p>
          A 2nd year computer science student with a love for technology, convenience, and smart online shopping. 
          I enjoy exploring new platforms to find great deals and useful items that make student life easier. 
          My interest in e-commerce fuels my curiosity about how digital marketplaces work — combining my passion for tech 
          with the thrill of finding the right product at the right time. Recommend ko sa friends ko pag nagustuhan ko products niyo guys, real. No cap.
        </p>
      </div>

      <div className="user-image-box">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
        ) : (
          <span className="placeholder-text">No image uploaded</span>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
