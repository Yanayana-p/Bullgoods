import React, { useState } from 'react';
import './Saddproduct.css';

export default function AddProductPage() {
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setMainImage(imageUrls[0]);
    setThumbnails(prev => [...prev, ...imageUrls]);
  };

  return (
    <div className="add-product-container">
      <div className="header">
        <h2>Add New Product</h2>
        <div className="action-buttons">
          <button className="save-draft">Save Draft</button>
          <button className="add-product">Add Product</button>
        </div>
      </div>

      <div className="form-sections">
        <div className="form-left">
          <div className="section">
            <h3>General Information</h3>
            <input placeholder="Name Product" defaultValue="Puffer Jacket With Pocket Detail" />
            <textarea placeholder="Description Product" defaultValue="Cropped puffer jacket made of technical fabric..." />
            <div className="size-gender-row">
              <div>
                <label>Size</label>
                <div className="options">
                  {["XS", "S", "M", "XL", "XXL"].map(size => (
                    <button key={size}>{size}</button>
                  ))}
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="options">
                  {["Men", "Woman", "Unisex"].map(gender => (
                    <button key={gender}>{gender}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Pricing</h3>
            <input placeholder="Base Pricing" defaultValue="$47.55" />
          </div>
        </div>

        <div className="form-right">
          <div className="section">
            <h3>Upload Image </h3>
            <div className="image-preview">
              {mainImage && <img src={mainImage} alt="Preview" />}
              <div className="thumbnails">
                {thumbnails.map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`thumb-${index}`}
                    onClick={() => setMainImage(thumb)}
                  />
                ))}
                <label className="add-thumbnail">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Category</h3>
            <input placeholder="Product Category" defaultValue="Jacket" />
            <button className="add-category">Add Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}
