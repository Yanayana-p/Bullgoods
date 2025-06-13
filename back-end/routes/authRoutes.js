const express = require('express');
const router = express.Router();
const { signupUser,loginUser, getAllUsers, getUserProfile, updateUserProfile, adminLogin } = require('../controllers/authController');

router.post('/login', loginUser); // POST /api/auth/signup
router.post('/signup', signupUser); // POST /api/auth/login
router.post('/adminlogin', adminLogin); // POST /api/auth/adminlogin
//router.get('/all-users', getAllUsers);
router.get('/users/profile', getUserProfile); // <-- added
router.put('/users/profile', updateUserProfile); // <-- added


module.exports = router;
