import React, { useState, useRef, useEffect } from 'react';
import './Sprofile.css';

function SellerProfile() {
  const [imageSrc, setImageSrc] = useState(null);
  const [bio, setBio] = useState(
    `A 2nd year computer science student with a love for technology, convenience, and smart online shopping. 
I enjoy exploring new platforms to find great deals and useful items that make student life easier. 
My interest in e-commerce fuels my curiosity about how digital marketplaces work — combining my passion for tech 
with the thrill of finding the right product at the right time. Recommend ko sa friends ko pag nagustuhan ko products niyo guys, real. No cap.`
  );

  const textareaRef = useRef(null);

  // Auto resize textarea height whenever bio changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // set height to scrollHeight
    }
  }, [bio]);

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
    <div className="seller-profile-container">
      <div className="seller-info-box">
        <h2>Profile</h2>
        <h4 className="sub-heading">SELLER INFORMATION</h4>
        <p>
        </p>
        <textarea
          ref={textareaRef}
          className="seller-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={1}   // start small, auto-resized
          style={{ overflow: 'hidden', resize: 'none' }} // hide scrollbar & disable resize
        />
      </div>

      <div className="seller-image-box">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
        ) : (
          <span className="placeholder-text">No image uploaded</span>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <button onClick={() => document.getElementById('fileInput').click()}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default SellerProfile;