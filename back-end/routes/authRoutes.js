const express = require('express');
const router = express.Router();
const { signupUser,loginUser } = require('../controllers/authController');

router.post('/login', loginUser); // POST /api/auth/signup
router.post('/signup', signupUser); // POST /api/auth/login

module.exports = router;
