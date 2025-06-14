const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlistByUser, removeFromWishlist, getAllWishlists } = require('../controllers/wishlistController');


// Add item to wishlist
router.post('/add', addToWishlist);

// Get user's wishlist
router.get('/user', getWishlistByUser);

// Remove item from wishlist
router.delete('/:id', removeFromWishlist);

// Get all wishlists for admin view
router.get('/all', getAllWishlists);

const wishlistController = require('../controllers/wishlistController');

// ... other routes ...
router.put('/:id', wishlistController.updateWishlistItem);

module.exports = router; 