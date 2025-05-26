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

module.exports = { loginUser };
