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

   const addToWishlist = async (product, userEmail) => {
    const updated = [...wishlist, product];
    setWishlist(updated);

    await fetch("http://localhost:5000/api/user/update-wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userEmail, wishlist: updated })
    });
  };

  const removeFromWishlist = async (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));

    try {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) throw new Error("User not logged in");

      await fetch(`http://localhost:5000/api/users/${studentId}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: { id }, action: 'remove' }),
      });
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
