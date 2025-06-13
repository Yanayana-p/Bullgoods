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

    await pool.query('UPDATE users SET is_seller = ? WHERE email = ?', [true, email]);

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

    const users = rows.map(({ password, ...user }) => user); // Remove passwords from response
    return res.json({ users });

  } catch (error) {
    console.error('Get All Users Error:', error);
    return res.status(500).json({ message: 'Database error while retrieving users.' });
  }
};

// -------------------- EXPORTS --------------------
module.exports = {
  registerUser,
  setSellerRole,
  getAllUsers
};
