import React from 'react';
import './Uprofile.css';

function UserProfile() {
  return (
    <div className="user-profile-container">
      <div className="user-info-box">
        <h2>Profile</h2>
        <h4 className="sub-heading">USER INFORMATION</h4>
        <p>
          I'm second year student from National - Manila Campus. Currently studying Computer Science.
        </p>
        <p>
        Hi! I’m Kyla, a computer science student with a love for technology, convenience, and smart online shopping. 
        I enjoy exploring new platforms to find great deals and useful items that make student life easier. 
        My interest in e-commerce fuels my curiosity about how digital marketplaces work — combining my passion for tech 
        with the thrill of finding the right product at the right time. M
        </p>
      </div>

      <div className="user-image-box">
        {/* You can add an image or a placeholder */}
      </div>
    </div>
  );
}

export default UserProfile;
