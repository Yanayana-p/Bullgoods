import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link
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
  {
    id: 3,
    name: 'NU ID Lace',
    image: '/product3.jpg',
    liked: false,
  },
  {
    id: 4,
    name: 'iPhone 15 pro',
    image: '/product4.jpg',
    liked: false,
  },
  {
    id: 5,
    name: '3 months Canva',
    image: '/product5.jpg',
    liked: false,
  },
  {
    id: 6,
    name: 'Pasta',
    image: '/product6.jpg',
    liked: false,
  },
  {
    id: 7,
    name: 'Traditional uniform',
    image: '/product5.jpg',
    liked: false,
  },
  {
    id: 8,
    name: 'Phone charm',
    image: '/product5.jpg',
    liked: false,
  },
  {
    id: 9,
    name: 'Drawing pad',
    image: '/product5.jpg',
    liked: false,
  },
  {
    id: 10,
    name: 'Spotify Premium',
    image: '/product5.jpg',
    liked: false,
  },
];

function Fproducts() {
  const [products, setProducts] = useState(sampleProducts);

  const toggleLike = (id, e) => {
    e.preventDefault(); // Prevent link navigation when clicking heart
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
          to={`/dproductpage/${product.id}`} // Navigate to product detail page
          key={product.id}
          className="product-card"
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div
            className="heart-icon"
            onClick={(e) => toggleLike(product.id, e)} // toggle like, no navigation
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
