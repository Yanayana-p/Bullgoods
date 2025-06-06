import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import Unavbar from '../userpage/Unavbar'; 
import Ffooter from '../firstpage/Ffooter';
import './wishlistpage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

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