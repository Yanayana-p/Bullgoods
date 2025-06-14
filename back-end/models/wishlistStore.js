const pool = require('./userStore');

const wishlistStore = {
  async addToWishlist(wishlistData) {
    const { user_id, user_firstname, user_lastname, product_id, product_name } = wishlistData;
    const query = `
      INSERT INTO wishlist (user_id, user_firstname, user_lastname, product_id, product_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [user_id, user_firstname, user_lastname, product_id, product_name];
    
    try {
      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...wishlistData };
    } catch (error) {
      throw error;
    }
  },

  async getWishlistByUser(userId) {
    const query = `
      SELECT w.*, p.price, p.image_url, p.description 
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ?
      ORDER BY w.added_at DESC
    `;
    try {
      const [rows] = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async removeFromWishlist(wishlistId) {
    const query = 'DELETE FROM wishlist WHERE id = ?';
    try {
      const [result] = await pool.query(query, [wishlistId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  async getAllWishlists() {
    const query = `
      SELECT w.*, u.first_name, u.last_name, u.student_id, p.name AS product_name, p.price, p.image_url
      FROM wishlist w
      JOIN users u ON w.user_id = u.student_id
      JOIN products p ON w.product_id = p.id
      ORDER BY w.user_id, w.added_at DESC
    `;
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = wishlistStore; 