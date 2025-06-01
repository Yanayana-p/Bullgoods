const express = require('express');
const router = express.Router();

const { updateUserProfile } = require('../controllers/userController');

// Define route to update user
router.put('/profile', updateUserProfile); // PUT /api/user/profile

module.exports = router;
