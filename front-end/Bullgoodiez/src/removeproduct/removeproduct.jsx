import React, { useEffect, useState } from 'react';
import Unavbar from '../userpage/Unavbar'; 
import Ffooter from '../firstpage/Ffooter';
import axios from 'axios';
import './removeproduct.css';

const RemoveProduct = () => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Get seller's studentId from localStorage
  const studentId = localStorage.getItem('studentId');

  // Fetch products for this seller
  useEffect(() => {
    async function fetchSellerProducts() {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products/seller?seller_id=${studentId}`);
        setSellerProducts(response.data);
      } catch (err) {
        setErrorMessage('Failed to fetch your products.');
      } finally {
        setLoading(false);
      }
    }
    if (studentId) fetchSellerProducts();
  }, [studentId]);

  // Remove product handler
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setSellerProducts(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setErrorMessage('Failed to remove product.');
    }
  };

  return (
    <>
      <Unavbar />
      <div className="wishlist-page">
        <h2>Your Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : sellerProducts.length === 0 ? (
          <p className="empty-message">You haven't added any products.</p>
        ) : (
          <div className="wishlist-grid">
            {sellerProducts.map(item => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.image_url ? `http://localhost:5000/uploads/${item.image_url}` : '/default-product.jpg'}
                  alt={item.name}
                  className="wishlist-image"
                />
                <div className="wishlist-info">
                  <h3>{item.name}</h3>
                  <p>₱{item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <Ffooter />
    </>
  );
};

export default RemoveProduct;
