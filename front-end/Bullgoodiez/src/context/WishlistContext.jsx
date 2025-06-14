import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [allUsersWishlist, setAllUsersWishlist] = useState([]); // For admin view

  useEffect(() => {
    fetchUserWishlist();
  }, []);

  const fetchUserWishlist = async () => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${studentId}/wishlist`);
      const data = await res.json();
      setWishlist(data || []);
    } catch (err) {
      console.error('Error fetching user wishlist:', err.message);
    }
  };

  const fetchAllUsersWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/all-wishlists`);
      const data = await res.json();
      setAllUsersWishlist(data || []);
    } catch (err) {
      console.error('Error fetching all users wishlist:', err.message);
    }
  };

  const addToWishlist = async (product) => {
    console.log('addToWishlist called with product:', product); // Debug log
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User object from localStorage in addToWishlist:', user); // Debug log
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    const { student_id, first_name, last_name } = user;
    console.log('Using user fields:', { user_id: student_id, user_firstname: first_name, user_lastname: last_name }); // Debug log
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: student_id,
          user_firstname: first_name,
          user_lastname: last_name,
          product_id: product.id,
          product_name: product.name
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to wishlist');
      }
      setWishlist(prev => [...prev, product]);
    } catch (err) {
      alert(err.message || 'Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));

    try {
      const studentId = localStorage.getItem('studentId') || (JSON.parse(localStorage.getItem('user'))?.student_id);
      if (!studentId) throw new Error('User not logged in');

      await fetch(`http://localhost:5000/api/users/${studentId}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: { id }, action: 'remove' }),
      });
      // Refresh wishlist from backend after removal
      await fetchUserWishlist();
    } catch (err) {
      console.error('Error removing from backend wishlist:', err.message);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      setWishlist,
      addToWishlist,
      removeFromWishlist,
      fetchAllUsersWishlist,
      allUsersWishlist,
      refreshWishlist: fetchUserWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
