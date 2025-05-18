import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- import Link now
import './Fproducts.css';

const sampleProducts = [
  {
    id: 1,
    name: 'Strawberry Cake',
    image: '/product1.jpg',
    liked: false,
  },
  {
    id: 2,
    name: 'Leather Jacket',
    image: '/product2.jpg',
    liked: false,
  },
];

function Fproducts() {
  const [products, setProducts] = useState(sampleProducts);

  const toggleLike = (id, e) => {
    e.preventDefault(); // prevent Link navigation when clicking heart
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link
          to={`/productpage/${product.id}`}
          key={product.id}
          className="product-card"
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div
            className="heart-icon"
            onClick={(e) => {
              toggleLike(product.id, e);
            }}
          >
            {product.liked ? <FaHeart color="#A03936" /> : <FaRegHeart />}
          </div>
          <div className="product-name">{product.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default Fproducts;
