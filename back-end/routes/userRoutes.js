const express = require('express');
const router = express.Router();

const { registerUser, updateUserProfile, getAllUsers, setSellerRole, updateUserWishlist, updateWishlist } = require('../controllers/userController');

// ✅ Fetch all users
router.get('/all-users', getAllUsers); // GET /api/user/all-users

// ✅ Update user profile
router.put('/profile', updateUserProfile); // PUT /api/user/profile

// ✅ Set seller status
router.post('/set-seller', setSellerRole); // POST /api/user/set-seller

router.post('/register', registerUser); // POST /api/user/register

router.post('/update-wishlist', updateUserWishlist); // POST /api/user/update-wishlist

router.post('/:id/wishlist', updateWishlist);

module.exports = router;
