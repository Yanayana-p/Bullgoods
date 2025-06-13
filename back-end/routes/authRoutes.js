const express = require('express');
const router = express.Router();
const { signupUser,loginUser, getAllUsers, getUserProfile, updateUserProfile } = require('../controllers/authController');

router.post('/login', loginUser); // POST /api/auth/signup
router.post('/signup', signupUser); // POST /api/auth/login
//router.get('/all-users', getAllUsers);
router.get('/users/profile', getUserProfile); // <-- added
router.put('/users/profile', updateUserProfile); // <-- added


module.exports = router;
