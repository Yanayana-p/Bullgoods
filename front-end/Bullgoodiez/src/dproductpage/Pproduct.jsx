import React, { useState, useEffect } from 'react';
import './Pproduct.css';
import { useParams } from 'react-router-dom'; // ✅ Get ID from route
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext'; // ✅ Import your context
import { useWishlist } from '../context/WishlistContext'; // <-- Import wishlist context

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

function Pproduct() {
  const { id } = useParams();
  const productId = Number(id);
  const { products: addedProducts } = useProducts();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { addToWishlist } = useWishlist(); // <-- Use wishlist context

  const allProducts = [...sampleProducts, ...addedProducts];

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct({
            ...data,
            image: data.image_url ? `http://localhost:5000/uploads/${data.image_url}` : '/default-product.jpg',
          });
        } else {
          // fallback to sampleProducts if not found in DB
          const fallback = sampleProducts.find(p => p.id === productId);
          setProduct(fallback || null);
        }
      } catch (err) {
        const fallback = sampleProducts.find(p => p.id === productId);
        setProduct(fallback || null);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) return <div className="product-not-found">Product not found</div>;

  // Get seller name from DB or fallback
  const sellerName = product.seller_name || 'Unknown Seller';

  const handleAddToWishlist = async () => {
    if (!user) {
      setPopupMessage('Please log in to add items to your wishlist');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }
    try {
      await addToWishlist(product); // Use context function
      setPopupMessage('✅ Added to wishlist!');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setPopupMessage('❌ Failed to add to wishlist');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="page-container">
      {showPopup && (
        <div className="popup-toast">
          {popupMessage}
        </div>
      )}
      <div className="product-container">
        <div className="image-section">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        <div className="details-section">
          <h2>{product.name}</h2>
          <h3 className="price">₱ {Number(product.price).toFixed(2)}</h3>
          <p>{product.description}</p>
          <p>
            <strong>Seller:</strong> {sellerName}
          </p>
          <div className="button-row">
            <button className="btn" onClick={handleAddToWishlist}>Add to Wishlist</button>
            <a href="https://www.facebook.com/slvjeo/" target="_blank" rel="noopener noreferrer">
              <button className="btn">Contact Seller</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pproduct;
