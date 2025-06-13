const productStore = require('../models/productStore');


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productStore.getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image_url, seller_id, seller_name } = req.body;

    // Validate required fields
    if (!name || !price || !category || !seller_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const productData = {
      name,
      description,
      price,
      category,
      image_url,
      seller_id,
      seller_name
    };

    const newProduct = await productStore.addProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productStore.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Error getting products' });
  }
};

// Get products by seller
const getProductsBySeller = async (req, res) => {
  try {
    const { seller_id } = req.query;
    if (!seller_id) {
      return res.status(400).json({ message: 'Seller ID is required' });
    }

    const products = await productStore.getProductsBySeller(seller_id);
    res.json(products);
  } catch (error) {
    console.error('Error getting seller products:', error);
    res.status(500).json({ message: 'Error getting seller products' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await productStore.deleteProduct(id);
    
    if (success) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsBySeller,
  deleteProduct,
  getProductById
}; 