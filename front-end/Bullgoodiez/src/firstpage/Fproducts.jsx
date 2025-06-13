import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Fproducts.css';
import { useWishlist } from '../context/WishlistContext';
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
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const dbProducts = await response.json();

        // Map DB products to match the default product structure
        const mappedDbProducts = dbProducts.map((product) => ({
          ...product,
          id: product.id, // DB id
          name: product.name,
          image: product.image_url
  ? `http://localhost:5000/uploads/${product.image_url}`
  : product.image || '/default-product.jpg',
          liked: false,
          category: product.category,
        }));

        // Optionally merge with defaultProducts
        const allProducts = [...defaultProducts, ...mappedDbProducts];

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

        // Update liked status based on wishlist
        const updated = filtered.map((product) => ({
          ...product,
          liked: wishlist.some((item) => item.id === product.id),
        }));

        setProducts(updated);
      } catch (err) {
        setProducts(defaultProducts); // fallback
      }
    }

    fetchProducts();
  }, [selectedCategory, searchQuery, wishlist]);

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();

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
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
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
