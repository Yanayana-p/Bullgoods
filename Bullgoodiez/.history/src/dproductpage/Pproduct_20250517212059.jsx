import React from 'react';
import './Pproduct.css';

const sampleProducts = [
  { id: 1, name: 'Strawberry Cake', price: 100, description: 'Tasty cake...', image: '/product1.jpg' },
  { id: 2, name: 'Leather Jacket', price: 200, description: 'Cool jacket...', image: '/product2.jpg' },
];

function Pproduct({ productId }) {
  // Convert string id to number
  const id = Number(productId);
  const product = sampleProducts.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="main-image" />
      <h2>{product.name}</h2>
      <h3 className="price">${product.price.toFixed(2)}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default Pproduct;
