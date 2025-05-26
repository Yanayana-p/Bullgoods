//----------------------LOG_IN--------------------
// Temporary in-memory user for testing
const demoUser = {
  email: 'student@national-u.edu.ph',
  password: 'bullgoods123', // In real apps, passwords should be hashed!
  name: 'Demo Student',
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check credentials (basic test only)
  if (email === demoUser.email && password === demoUser.password) {
    return res.json({
      user: {
        email: demoUser.email,
        name: demoUser.name,
      },
      token: 'mock-token-123' // Placeholder for JWT in the future
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

//------------------SIGN_UP---------------------------
const users = [];

const signupUser = (req, res) => {
  const { firstName, lastName, studentId, phoneNumber, email, password } = req.body;

  // ✅ Basic empty check
  if (!firstName || !lastName || !studentId || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
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
