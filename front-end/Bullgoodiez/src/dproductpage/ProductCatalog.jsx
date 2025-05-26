import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Pproduct.css';

const sampleProducts = [
  { id: 1, name: 'Strawberry Cake', category: 'Food', price: 100, description: 'Tasty layered cake with fresh strawberries and cream. Made with love...', image: '/product1.jpg' },
  { id: 2, name: 'Leather Jacket', category: 'Clothes', price: 650, description: 'Premium black leather jacket, once lang nagamit ( sa weather dito sa Ph? No) Bigyan ko kayo discount.', image: '/product2.jpg' },
  { id: 3, name: 'Nu ID Lace',category: 'Accessories', price: 150, description: 'Pre-loved ID Lace. Used but not abused! Dm me if interested.', image: '/product3.jpg' },
  { id: 4, name: 'iPhone 15 pro', category: 'Appliances',price: 59000, description: 'Selling my 3 months-old phone. No issue. Can do meet up around NU - Manila only. No to Joyjoy, irereport ko!', image: '/product4.jpg' },
  { id: 5, name: '3 months Canva', category: 'Subscriptions',price: 250, description: 'Selling a pro access to Canva for a very affordable price. This is a share account kung maarte, wag na mag-message. Thank u!', image: '/product5.jpg' },
  { id: 6, name: 'Pasta in a Box', category: 'Food', price: 150, description: 'Hi guyzz, bili na kayo, nasa school ako mon-fri. Sa garden na lang pick-up. Dm me for reservation. No cancellation, ako magca-cancel sainyo!', image: '/product6.jpg' },
  { id: 7, name: 'Traditional Uniform', category: 'Clothes', price: 750, description: 'Trying this app habang may access pa ako sa NU account ko. Bilhin niyo na to guys di ko naman pwede to gamitin sa work pslplspls. Pwede rin separate bilhin. Naga-accept din negotiation!', image: '/product7.jpg' },
  { id: 8, name: 'Phone charm', price: 75, category: 'Accesories',description: 'Selling phone charm, guys. Marami akong design kahit gumawa pa ako on the spot. Di kayo luge rito. Hindi rin mabilis mapigtas, promise. Sa iba 150 pa to. ', image: '/product8.jpg' },
  { id: 9, name: 'Drawing pad', price: 20000, category: 'Appliances',description: 'For sale! Never been used kasi hiniwalayan ako nung pagbibigyan ko. Di naman ako marunong mag-drawing. Bilhin niyo na para may pang tuition ako. Ibato ko na lang to.', image: '/product9.jpg' },
  { id: 10, name: 'Spotify Premium', price: 125, category: 'Subscriptions', description: 'Pagod ka na ba mag-commute? Avail ka na para di ka na pagod. May libreng dalawang kiss pag nag-avail. Limited offer!', image: '/product10.jpg' },
];
const categories = ['All', 'Food', 'Clothes', 'Accessories', 'Appliances', 'Subscriptions'];

function ProductCatalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-container">
      <div className="button-row" style={{ marginBottom: '20px' }}>
        {categories.map(category => (
          <button
            key={category}
            className={`btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginLeft: '10px' }}
        />
      </div>
      <div className="product-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="details-section">
            <img src={product.image} alt={product.name} className="main-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3 className="price">₱{product.price}</h3>
            <button className="btn" onClick={() => addToWishlist(product)}>Add to Wishlist</button>
          </div>
        ))}
        {filteredProducts.length === 0 && <div>No products found.</div>}
      </div>
    </div>
  );
}

export default ProductCatalog;
