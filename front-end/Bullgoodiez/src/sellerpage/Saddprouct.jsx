import React, { useState } from 'react';
import './Saddproduct.css';
import Unavbar from '../userpage/Unavbar';
import Ffooter from '../firstpage/Ffooter';
import { useProducts } from '../context/ProductContext'; // 👈 import this
import { useNavigate } from 'react-router-dom'; // 👈 for redirecting after add

export default function AddProductPage() {
  const { addProduct } = useProducts(); // 👈 use addProduct
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Accessories');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setMainImage(imageUrls[0]);
    setThumbnails(prev => [...prev, ...imageUrls]);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(), // simple unique ID
      name,
      description: desc,
      price: Number(price),
      category,
      image: mainImage || thumbnails[0],
    };
    addProduct(newProduct); // update context
    navigate('/firstpage'); // redirect to homepage
  };

  return (
    <>
      <Unavbar />
      <div className="add-product-container">
        <div className="header">
          <h2>Add New Product</h2>
          <div className="action-buttons">
            <button className="save-draft">Save Draft</button>
            <button className="add-product" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>

        <div className="form-sections">
          <div className="form-left">
            <div className="section">
              <h3>General Information</h3>
              <input placeholder="Name Product" value={name} onChange={(e) => setName(e.target.value)} />
              <textarea placeholder="Description Product" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>

            <div className="section">
              <h3>Pricing</h3>
              <input placeholder="Base Pricing" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <div className="form-right">
            <div className="section">
              <h3>Upload Image</h3>
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
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Accessories">Accessories</option>
                <option value="Appliances">Appliances</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
              <button className="add-category">Add Category</button>
            </div>
          </div>
        </div>
      </div>
      <Ffooter />
    </>
  );
}
