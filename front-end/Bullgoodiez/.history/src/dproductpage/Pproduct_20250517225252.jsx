// src/dproductpage/Pproduct.jsx
import React from 'react';
import './Pproduct.css';

const sampleProducts = [
  { id: 1, name: 'Strawberry Cake', price: 100, description: 'Tasty layered cake with fresh strawberries and cream.', image: '/product1.jpg' },
  { id: 2, name: 'Leather Jacket', price: 200, description: 'Premium black leather jacket, stylish and warm.', image: '/product2.jpg' },
  { id: 2, name: 'Nu ID Lace', price: 150, description: 'Pre-loved ID Lace. Used but not abused! Dm me if interested.', image: '/product3.jpg' },
  { id: 2, name: 'iPhone 15 pro', price: 59000, description: 'Selling my 3 months-old phone. No issue. Can do meet up around NU - Manila only. ', image: '/product4.jpg' },
  { id: 2, name: '3 months Canva', price: 250, description: 'Premium black leather jacket, stylish and warm.', image: '/product5.jpg' },
];

function Pproduct({ productId }) {
  const id = Number(productId);
  const product = sampleProducts.find(p => p.id === id);

  if (!product) return <div className="product-not-found">Product not found</div>;

  return (
    <div className="page-container">
      <div className="product-container">
        <div className="image-section">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        <div className="details-section">
          <h2>{product.name}</h2>
          <h3 className="price">${product.price.toFixed(2)}</h3>
          <p>{product.description}</p>
          <div className="button-row">
            <button className="btn">Add to Wishlist</button>
            <button className="btn">Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pproduct;
