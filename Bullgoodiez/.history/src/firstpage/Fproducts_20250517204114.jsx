import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // <-- add this
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
  const navigate = useNavigate(); // <-- hook

  const toggleLike = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );
  };

  const handleProductClick = (product) => {
    navigate(`/dproductpage/${product.id}`);
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => handleProductClick(product)}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div
            className="heart-icon"
            onClick={(e) => {
              e.stopPropagation();
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
