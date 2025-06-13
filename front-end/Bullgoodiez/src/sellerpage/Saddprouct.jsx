import React, { useState, useEffect } from 'react';
import './Saddproduct.css';
import Unavbar from '../userpage/Unavbar';
import Ffooter from '../firstpage/Ffooter';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddProductPage() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });

  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Load first and last name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, []);

  useEffect(() => {
    // Get student ID from localStorage
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
  }, []);

  useEffect(() => {
    console.log("Main image preview URL:", mainImage);
  }, [mainImage]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({
        ...prev,
        image_url: response.data.filename // store only the filename
      }));
      setMainImage(URL.createObjectURL(file)); // for preview
    } catch (err) {
      setErrorMessage('Image upload failed');
    }
  };
  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!formData.name || !formData.price || !formData.category) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
  
    try {
      console.log('Submitting product with image_url:', formData.image_url);
      const productData = {
        ...formData,
        seller_id: studentId,
        seller_name: `${firstName} ${lastName}`,
        price: parseFloat(formData.price)
      };
  
      const response = await axios.post('http://localhost:5000/api/products/add', productData);
  
      if (response.data) {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          image_url: ''
        });
        setMainImage(null);
        setThumbnails([]);
        navigate('/firstpage');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error adding product. Please try again.');
    }
  };

  const handleRemoveProduct = () => {
    navigate('/removeproduct');
  };

  return (
    <>
      <Unavbar />
      <div className="add-product-container">
        <div className="header">
          <h2>Add New Product</h2>
          <div className="action-buttons">
            <button className="add-product" onClick={handleAddProduct}>Add Product</button>
            <button className="save-draft" onClick={handleRemoveProduct}>Remove Product</button>
          </div>
        </div>

        <div className="form-sections">
          <div className="form-left">
            <div className="section">
              <h3>General Information</h3>

              <div
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  marginBottom: '10px',
                  fontSize: '14px'
                }}
              >
                <strong>Seller:</strong> {`${firstName} ${lastName}`}
              </div>

              <input
                placeholder="Name Product"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              <textarea
                placeholder="Description Product"
                value={formData.description}
                onChange={handleChange}
                name="description"
              />
            </div>

            <div className="section">
              <h3>Pricing</h3>
              <input
                placeholder="Base Pricing"
                value={formData.price}
                onChange={handleChange}
                name="price"
              />
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
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Category</h3>
              <select
                value={formData.category}
                onChange={handleChange}
                name="category"
              >
                <option value="Food">Food</option>
                <option value="Clothes">Clothes</option>
                <option value="Accessories">Accessories</option>
                <option value="Appliances">Appliances</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Ffooter />
    </>
  );
}
