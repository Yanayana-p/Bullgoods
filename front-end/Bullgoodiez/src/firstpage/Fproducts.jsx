import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Fproducts.css';
import { useProducts } from '../context/ProductContext'; // 👈 Import context

const defaultProducts = [
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
    name: 'Pasta in a Box',
    image: '/product6.jpg',
    liked: false,
  },
  {
    id: 7,
    name: 'Traditional uniform',
    image: '/product7.jpg',
    liked: false,
  },
  {
    id: 8,
    name: 'Phone charm',
    image: '/product8.jpg',
    liked: false,
  },
  {
    id: 9,
    name: 'Drawing pad',
    image: '/product9.jpg',
    liked: false,
  },
  {
    id: 10,
    name: 'Spotify Premium',
    image: '/product10.jpg',
    liked: false,
  },
];

function Fproducts() {
  const context = useProducts();
  const addedProducts = context?.products || []; // 🔄 get added products from context
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Merge sample + added products (optional)
    const allProducts = [...defaultProducts, ...addedProducts];
    setProducts(allProducts);
  }, [addedProducts]);

  const toggleLike = (id, e) => {
    e.preventDefault();
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
          to={`/dproductpage/${product.id}`}
          key={product.id}
          className="product-card"
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div
            className="heart-icon"
            onClick={(e) => toggleLike(product.id, e)}
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
