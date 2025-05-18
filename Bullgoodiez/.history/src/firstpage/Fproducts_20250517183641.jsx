import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Fproducts.css';

const sampleProducts = [
  {
    id: 1,
    name: 'Strawberry Cake',
    image: "/product1.jpg",
    liked: false,
  },
  {
    id: 2,
    name: 'Leather Jacket',
    image: '/product2.jpg',
    liked: false,
  },
  // Add more sample products here
];

function Fproducts() {
  const [products, setProducts] = useState(sampleProducts);

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const handleProductClick = (productpage) => {
    // Replace this with routing or modal logic
    alert(`View details for: ${product.name}`);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => handleProductClick(productpage)}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div
            className="heart-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
              toggleLike(product.id);
            }}
          >
            {product.liked ? <FaHeart color="#A03936"/> : <FaRegHeart />}
          </div>
          <div className="product-name">{product.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Fproducts;
