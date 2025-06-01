//----------------------LOG_IN--------------------
// Temporary in-memory user for testing
const users = require('../models/userStore');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Look for a matching user in the users array
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Return user info (excluding password)
  const { password: _, ...userWithoutPassword } = user;

  return res.json({
    user: userWithoutPassword,
    token: 'mock-token-123'
  });
};


//------------------SIGN_UP---------------------------

const signupUser = (req, res) => {
  const { firstName, lastName, studentId, phoneNumber, email, password } = req.body;

  if (!firstName || !lastName || !studentId || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const studentIdRegex = /^\d{4}-\d{4,7}$/;
  if (!studentIdRegex.test(studentId)) {
    return res.status(400).json({ message: 'Student ID must be in the format YYYY-XXXXXX (2000-123456).' });
  }

  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      message: 'Phone number must contain exactly 11 digits and start with 09 (09123456789).'
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@students\.national-u\.edu\.ph$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please use your @students.national-u.edu.ph email.' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists with that email.' });
  }

  const newUser = { firstName, lastName, studentId, phoneNumber, email, password };
  users.push(newUser);

  return res.status(201).json({
    message: 'User registered successfully!',
    user: { firstName, lastName, studentId, phoneNumber, email }, // no password!
  });
};

module.exports = { loginUser, signupUser };
