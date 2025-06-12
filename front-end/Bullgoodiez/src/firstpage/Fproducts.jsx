import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Fproducts.css';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';  // <-- Import wishlist hook
import Fcategory from './Fcategory';

const defaultProducts = [
  { id: 1, name: 'Strawberry Cake', image: '/product1.jpg', liked: false, category: 'Food' },
  { id: 2, name: 'Leather Jacket', image: '/product2.jpg', liked: false, category: 'Clothes' },
  { id: 3, name: 'NU ID Lace', image: '/product3.jpg', liked: false, category: 'Accessories' },
  { id: 4, name: 'iPhone 15 pro', image: '/product4.jpg', liked: false, category: 'Appliances' },
  { id: 5, name: '3 months Canva', image: '/product5.jpg', liked: false, category: 'Subscriptions' },
  { id: 6, name: 'Pasta in a Box', image: '/product6.jpg', liked: false, category: 'Food' },
  { id: 7, name: 'Traditional uniform', image: '/product7.jpg', liked: false, category: 'Clothes' },
  { id: 8, name: 'Phone charm', image: '/product8.jpg', liked: false, category: 'Accessories' },
  { id: 9, name: 'Drawing pad', image: '/product9.jpg', liked: false, category: 'Appliances' },
  { id: 10, name: 'Spotify Premium', image: '/product10.jpg', liked: false, category: 'Subscriptions' },
];

function Fproducts({ searchQuery = '' }) {
  const context = useProducts();
  const addedProducts = context?.products || [];

  // Use wishlist context here
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = [...defaultProducts, ...addedProducts];

    // Remove duplicates
    const seen = new Set();
    const uniqueProducts = allProducts.filter((product) => {
      const key = `${product.name}-${product.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Filter by category and search
    const filtered = uniqueProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Set liked based on whether product is in wishlist
    const updated = filtered.map(product => ({
      ...product,
      liked: wishlist.some(item => item.id === product.id),
    }));

    setProducts(updated);
  }, [addedProducts, selectedCategory, searchQuery, wishlist]); // <-- re-run when wishlist changes

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent Link navigation when clicking heart

    const product = products.find(p => p.id === id);
    if (!product) return;

    if (product.liked) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="fproducts-container">
      <Fcategory selectedCategory={selectedCategory} onCategoryClick={setSelectedCategory} />

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              to={`/dproductpage/${product.id}`}
              key={product.id}
              className="product-card"
            >
              {product.images && product.images.length > 0 ? (
                <AutoImageCarousel images={product.images || [product.image]} />
              ) : (
                <img src={product.image} alt={product.name} className="product-image" />
              )}
              
              <div
                className="heart-icon"
                onClick={(e) => toggleLike(product.id, e)}
              >
                {product.liked ? <FaHeart color="#A03936" /> : <FaRegHeart />}
              </div>
              <div className="product-name">{product.name}</div>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Fproducts;