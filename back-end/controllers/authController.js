//----------------------LOG_IN--------------------
// Temporary in-memory user for testing
const users = require('../models/userStore');
const pool = require('../models/userStore'); // ✅ should be importing pool
require('dotenv').config(); // Needed if not already present

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user exists in the DB
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials (email not found).' });
    }

    const user = rows[0];

    // Compare plain-text passwords (note: ideally use bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password).' });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      user: userWithoutPassword,
      token: 'mock-token-123' // Replace with real JWT later
    });

  } catch (err) {
    console.error('Login DB error:', err);
    return res.status(500).json({ message: 'Database error during login.' });
  }
};


//------------------SIGN_UP---------------------------

const signupUser = async (req, res) => {
  const { firstName, lastName, studentId, phoneNumber, email, password } = req.body;

  if (!firstName || !lastName || !studentId || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const studentIdRegex = /^\d{4}-\d{4,7}$/;
  if (!studentIdRegex.test(studentId)) {
    return res.status(400).json({ message: 'Student ID must be in the format YYYY-XXXXXX.' });
  }

  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must start with 09 and be 11 digits.' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@students\.national-u\.edu\.ph$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Use your @students.national-u.edu.ph email.' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'User already exists with that email.' });
    }

    const role = 'user';
    const isSeller = false;

    await pool.query(
      'INSERT INTO users (first_name, last_name, student_id, phone_number, email, password, role, is_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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
        isSeller,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('DB error:', err);
    return res.status(500).json({ message: 'Database error.' });
  }
};

// ------------------ GET USER PROFILE ---------------------
const getUserProfile = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const {
      first_name,
      last_name,
      student_id,
      phone_number,
      email: dbEmail,
      role,
      is_seller,
      password, // excluded below
    } = rows[0];

    const user = {
      firstName: first_name,
      lastName: last_name,
      studentId: student_id,
      phoneNumber: phone_number,
      email: dbEmail,
      role,
      isSeller: is_seller,
    };

    return res.json({ user });

  } catch (err) {
    console.error('Error fetching profile:', err);
    return res.status(500).json({ message: 'Database error.' });
  }
};


// ------------------ UPDATE USER PROFILE ---------------------
const updateUserProfile = async (req, res) => {
  const { email, firstName, lastName, studentId, phoneNumber, password } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    await pool.query(
      `UPDATE users SET first_name = ?, last_name = ?, student_id = ?, phone_number = ?, password = ?
       WHERE email = ?`,
      [firstName, lastName, studentId, phoneNumber, password, email]
    );

    const [updatedRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    const { password: _, ...user } = updatedRows[0];
    return res.json({ user });

  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ message: 'Database error during update.' });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};