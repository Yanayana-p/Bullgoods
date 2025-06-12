import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import Unavbar from '../userpage/Unavbar'; 
import Ffooter from '../firstpage/Ffooter';
import './removeproduct.css';

const RemoveProduct = () => {
  const { products, removeProduct } = useProducts();
  const [sellerName, setSellerName] = useState('');
  const [sellerProducts, setSellerProducts] = useState([]);

  // Get seller's name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`;
      setSellerName(fullName);
    }
  }, []);

  // Filter products based on current seller
  useEffect(() => {
    if (sellerName) {
      const filtered = products.filter(prod => prod.owner === sellerName);
      setSellerProducts(filtered);
    }
  }, [products, sellerName]);

  return (
    <>
      <Unavbar />
      <div className="wishlist-page">
        <h2>Your Products</h2>
        {sellerProducts.length === 0 ? (
          <p className="empty-message">You haven't added any products.</p>
        ) : (
          <div className="wishlist-grid">
            {sellerProducts.map(item => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-image" />
                <div className="wishlist-info">
                  <h3>{item.name}</h3>
                  <p>₱{item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeProduct(item.id)}
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Ffooter />
    </>
  );
};

export default RemoveProduct;
