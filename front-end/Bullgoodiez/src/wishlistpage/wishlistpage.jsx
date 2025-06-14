import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './wishlistpage.css';
import Pnavbar from '../dproductpage/Pnavbar';

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('Fetching wishlist for user:', user.student_id);
        const response = await fetch(`http://localhost:5000/api/wishlist/user?user_id=${user.student_id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch wishlist');
        }
        
        const data = await response.json();
        console.log('Received wishlist data:', data);
        setWishlistItems(data);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError(err.message || 'Failed to fetch wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${wishlistId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from wishlist');
      }

      setWishlistItems(prevItems => prevItems.filter(item => item.id !== wishlistId));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      setError(err.message || 'Failed to remove item from wishlist');
    }
  };

  if (loading) return <div className="loading">Loading your wishlist...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div className="login-required">Please log in to view your wishlist</div>;

  return (
    <>
      <Pnavbar />
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p className="empty-message">Your wishlist is empty</p>
        ) : (
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img 
                  src={item.image_url ? `http://localhost:5000/uploads/${item.image_url}` : '/default-product.jpg'} 
                  alt={item.product_name} 
                  className="item-image" 
                />
                <div className="item-details">
                  <h3>{item.product_name}</h3>
                  <p className="price">₱{item.price}</p>
                  <p className="description">{item.description}</p>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default WishlistPage;
