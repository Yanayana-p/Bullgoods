const wishlistStore = require('../models/wishlistStore');

const addToWishlist = async (req, res) => {
  try {
    console.log('Add to wishlist request body:', req.body);
    const { user_id, user_firstname, user_lastname, product_id, product_name } = req.body;

    if (!user_id || !user_firstname || !user_lastname || !product_id || !product_name) {
      console.log('Missing required fields:', { user_id, user_firstname, user_lastname, product_id, product_name });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const wishlistData = {
      user_id,
      user_firstname,
      user_lastname,
      product_id,
      product_name
    };

    try {
      const newWishlistItem = await wishlistStore.addToWishlist(wishlistData);
      res.status(201).json(newWishlistItem);
    } catch (sqlError) {
      console.error('SQL error adding to wishlist:', sqlError);
      res.status(500).json({ message: 'Database error adding to wishlist', error: sqlError.message });
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
};

const getWishlistByUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const wishlistItems = await wishlistStore.getWishlistByUser(user_id);
    res.json(wishlistItems);
  } catch (error) {
    console.error('Error getting wishlist:', error);
    res.status(500).json({ message: 'Error getting wishlist' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await wishlistStore.removeFromWishlist(id);
    if (success) {
      res.json({ message: 'Item removed from wishlist successfully' });
    } else {
      res.status(404).json({ message: 'Wishlist item not found' });
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const allWishlists = await wishlistStore.getAllWishlists();
    res.json(allWishlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all wishlists' });
  }
};

module.exports = {
  addToWishlist,
  getWishlistByUser,
  removeFromWishlist,
  getAllWishlists
}; 