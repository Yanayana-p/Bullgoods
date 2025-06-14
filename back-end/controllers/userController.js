const pool = require('../models/userStore');

// -------------------- REGISTER USER --------------------
const registerUser = async (req, res) => {
  const { firstName, lastName, studentId, phoneNumber, email, password } = req.body;

  if (!firstName || !lastName || !studentId || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const role = 'user';
    const isSeller = false;

    await pool.query(
      `INSERT INTO users (first_name, last_name, student_id, phone_number, email, password, role, is_seller)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, studentId, phoneNumber, email, password, role, isSeller]
    );

    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        firstName,
        lastName,
        studentId,
        phoneNumber,
        email,
        role,
        isSeller
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Database error during registration.' });
  }
};

// -------------------- SET SELLER ROLE --------------------
const setSellerRole = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await pool.query(
      'UPDATE users SET role = ?, is_seller = ? WHERE email = ?', 
      ['seller', true, email]
    );

    const [updatedRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    const { password: _, ...userWithoutPassword } = updatedRows[0];
    return res.json({
      message: 'User role updated to seller.',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Set Seller Role Error:', error);
    return res.status(500).json({ message: 'Database error while setting seller role.' });
  }
};

// -------------------- GET ALL USERS --------------------
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    // For development/testing: include password in the response
    console.log('Fetched users from DB (with password):', rows);
    return res.json({ users: rows });
  } catch (error) {
    console.error('Get All Users Error:', error);
    return res.status(500).json({ message: 'Database error while retrieving users.' });
  }
};

// -------------------- UPDATE USER --------------------
const updateUser = async (req, res) => {
  const { student_id } = req.params;
  const { first_name, last_name, phone_number, email, role } = req.body;

  if (!student_id) {
    return res.status(400).json({ message: 'Student ID is required.' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ? WHERE student_id = ?`,
      [first_name, last_name, phone_number, email, role, student_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Also update wishlist and products tables
    await pool.query(
      `UPDATE wishlist SET user_firstname = ?, user_lastname = ? WHERE user_id = ?`,
      [first_name, last_name, student_id]
    );
    await pool.query(
      `UPDATE products SET seller_name = ? WHERE seller_id = ?`,
      [`${first_name} ${last_name}`, student_id]
    );
    const [updatedRows] = await pool.query('SELECT * FROM users WHERE student_id = ?', [student_id]);
    return res.json({ message: 'User updated successfully.', user: updatedRows[0] });
  } catch (error) {
    console.error('Update User Error:', error);
    return res.status(500).json({ message: 'Database error while updating user.' });
  }
};

// Add a trigger to update wishlist and products tables when a user is updated
const createUpdateTrigger = async () => {
  try {
    await pool.query(`DROP TRIGGER IF EXISTS after_user_update;`);
    await pool.query(`
      CREATE TRIGGER after_user_update
      AFTER UPDATE ON users
      FOR EACH ROW
      BEGIN
        UPDATE wishlist SET user_firstname = NEW.first_name, user_lastname = NEW.last_name WHERE user_id = NEW.student_id;
        UPDATE products SET seller_name = CONCAT(NEW.first_name, ' ', NEW.last_name) WHERE seller_id = NEW.student_id;
      END;
    `);
    console.log('Trigger created successfully.');
  } catch (error) {
    console.error('Error creating trigger:', error);
  }
};

// Call the function to create the trigger
createUpdateTrigger();

// -------------------- DELETE USER --------------------
const deleteUser = async (req, res) => {
  const { student_id } = req.params;
  try {
    // Delete related wishlist entries
    await pool.query('DELETE FROM wishlist WHERE user_id = ?', [student_id]);
    // Delete related products
    await pool.query('DELETE FROM products WHERE seller_id = ?', [student_id]);
    // Now delete the user
    const [result] = await pool.query('DELETE FROM users WHERE student_id = ?', [student_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// -------------------- EXPORTS --------------------
module.exports = {
  registerUser,
  setSellerRole,
  getAllUsers,
  updateUser,
  deleteUser
};
