const pool = require('./userStore');

const productStore = {
  async addProduct(productData) {
    const { name, description, price, category, image_url, seller_id, seller_name } = productData;
    const query = `
      INSERT INTO products (name, description, price, category, image_url, seller_id, seller_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, price, category, image_url, seller_id, seller_name];
    
    try {
      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...productData };
    } catch (error) {
      throw error;
    }
  },

  async getAllProducts() {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getProductsBySeller(sellerId) {
    const query = 'SELECT * FROM products WHERE seller_id = ? ORDER BY created_at DESC';
    try {
      const [rows] = await pool.query(query, [sellerId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct(productId) {
    const query = 'DELETE FROM products WHERE id = ?';
    try {
      const [result] = await pool.query(query, [productId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = productStore; 