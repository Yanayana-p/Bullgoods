const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductsBySeller } = require('../controllers/productController');

// Add new product
router.post('/add', addProduct);

// Get all products
router.get('/', getAllProducts);

// Get products by seller
router.get('/seller', getProductsBySeller);

module.exports = router; 