//----------------------LOG_IN--------------------
// Temporary in-memory user for testing
const users = [];

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
    token: 'mock-token-123' // Replace with real JWT in production
  });
};


//------------------SIGN_UP---------------------------

const signupUser = (req, res) => {
  const { firstName, lastName, studentId, phoneNumber, email, password } = req.body;

  // ✅ Basic empty check
  if (!firstName || !lastName || !studentId || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

   // ✅ Validate studentId format: 4 digits - 6 digits
  const studentIdRegex = /^\d{4}-\d{6}$/;
  if (!studentIdRegex.test(studentId)) {
    return res.status(400).json({ message: 'Student ID must be in the format YYYY-XXXXXX (2000-123456).' });
  }

  // ✅ Validate phoneNumber (numbers only)
  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must contain only numbers. Please use the format 09xxxxxxxxx' });
  }

  // ✅ Validate email domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@students\.national-u\.edu\.ph$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please use your @students.national-u.edu.ph email.' });
  }

  // ✅ Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists with that email.' });
  }

  // ✅ Register user
  const newUser = { firstName, lastName, studentId, phoneNumber, email, password };
  users.push(newUser);

  return res.status(201).json({
    message: 'User registered successfully!',
    user: { firstName, lastName, email }, // Do not expose password
  });
};

module.exports = { loginUser, signupUser };
