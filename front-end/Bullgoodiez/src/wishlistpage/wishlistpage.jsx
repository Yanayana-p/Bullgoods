import React, { useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import Unavbar from '../userpage/Unavbar'; 
import Ffooter from '../firstpage/Ffooter';
import './wishlistpage.css';
import axios from 'axios';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  // 🟡 Send updated wishlist to backend when it changes
  useEffect(() => {
    const sendWishlistToBackend = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // assuming user is stored here
      if (!user || !user.email) return;

      try {
        await axios.post('http://localhost:5000/api/user/update-wishlist', {
          email: user.email,
          wishlist: wishlist,
        });
        console.log('✅ Wishlist synced with backend.');
      } catch (error) {
        console.error('❌ Failed to sync wishlist:', error.response?.data || error.message);
      }
    };

    sendWishlistToBackend();
  }, [wishlist]);

  return (
    <>
      <Unavbar />
      <div className="wishlist-page">
        <h2>Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="empty-message">Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} className="wishlist-image" />
                <div className="wishlist-info">
                  <h3>{item.name}</h3>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Ffooter />
    </>
  );
};

export default WishlistPage;
