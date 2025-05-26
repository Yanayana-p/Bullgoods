import React from 'react';
import { useParams } from 'react-router-dom';
import './Pproduct.css';

const sampleProducts = [
  {
    id: 1,
    name: 'Strawberry Cake',
    price: 100,
    description: 'Description for Strawberry Cake...',
    image: '/product1.jpg',
  },
  {
    id: 2,
    name: 'Leather Jacket',
    price: 200,
    description: 'Description for Leather Jacket...',
    image: '/product2.jpg',
  },
];

function Pproduct() {
  const { id } = useParams();
  const product = sampleProducts.find(p => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

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
