import React, { useState } from 'react';
import './Pproduct.css';

function Pproduct() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="product-card">
      <div className="image-section">
        <label className="upload-area">
          {image ? (
            <img src={image} alt="Uploaded" className="main-image" />
          ) : (
            <span className="upload-placeholder">+</span>
          )}
          <input type="file" onChange={handleImageChange} accept="image/*" hidden />
        </label>
        <div className="thumbnail-row">
          {[...Array(4)].map((_, i) => (
            <div className="thumbnail-box" key={i}></div>
          ))}
        </div>
      </div>
      <div className="details-section">
        <h2>Product Name</h2>
        <h3 className="price">$100.00</h3>
        <p>Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:</p>
        <p>
          Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation...
        </p>
        <div className="button-row">
          <button className="btn">Wishlist</button>
          <button className="btn">Message Seller</button>
        </div>
      </div>
    </div>
  );
}

export default Pproduct;
