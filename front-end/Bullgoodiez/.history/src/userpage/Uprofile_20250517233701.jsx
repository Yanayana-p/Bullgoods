import React from 'react';
import './Uprofile.css';

function UserProfile() {
  return (
    <div className="user-profile-container">
      <div className="user-info-box">
        <h2>Profile</h2>
        <h4 className="sub-heading">USER INFORMATION</h4>
        <p>
          I'm second year student from National
        </p>
        <p>
          Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content.
          Qui international first-class nulla ut. Punctual adipiscing, essential lovely queen tempor eiusmod irure.
          Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power partilur Melbourne coccaceat discerning.
          Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
        </p>
      </div>

      <div className="user-image-box">
        {/* You can add an image or a placeholder */}
      </div>
    </div>
  );
}

export default UserProfile;
