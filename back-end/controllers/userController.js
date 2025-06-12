// controllers/userController.js

const users = require('../models/userStore'); // ✅ Required to access stored users

// 🔄 Fetch all users
const getAllUsers = (req, res) => {
  try {
    // Dynamically assign role based on isSeller
    const formattedUsers = users.map(user => ({
      ...user,
      role: user.isSeller ? 'seller' : 'user',
      timestamp: user.timestamp || 'N/A', // fallback if missing
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};


// 🛠️ Update user profile
const updateUserProfile = (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;

  if (!firstName && !lastName && !phoneNumber && !password) {
    return res.status(400).json({ message: 'Please provide at least one field to update.' });
  }

  // This is mock logic — replace with actual database update later
  return res.json({
    message: 'Profile updated successfully!',
    data: { firstName, lastName, phoneNumber, password },
  });
};


// ✅ Set user as seller
const setSellerRole = (req, res) => {
  const { studentId, email } = req.body;

  console.log("Received studentId:", studentId);
  console.log("Received email:", email);

  if (!studentId || !email) {
    return res.status(400).json({ message: 'Student ID and Email are required' });
  }

  const userIndex = users.findIndex(
    (u) => u.studentId === studentId && u.email === email
  );

  if (userIndex === -1) {
    console.warn("User not found with:", studentId, email);
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex].role = 'seller';
  users[userIndex].isSeller = true; // <-- also add this if you're using isSeller elsewhere

  console.log("User updated:", users[userIndex]);

  return res.status(200).json({ message: 'User role updated to seller', user: users[userIndex] });
};

// 📝 Register a new user
const registerUser = (req, res) => {
  const { studentId, email, firstName, lastName, phoneNumber } = req.body;

  if (!studentId || !email || !firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check for duplicate
  const existingUser = users.find(
    (u) => u.studentId === studentId && u.email === email
  );

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    studentId,
    email,
    firstName,
    lastName,
    phoneNumber,
    isSeller: false,
    role: 'user',
    timestamp: new Date().toISOString(),
    wishlist: [],
  };

  users.push(newUser);
  console.log("✅ Registered new user:", newUser);

  return res.status(201).json({ message: 'User registered successfully.', user: newUser });
};

const updateUserWishlist = (req, res) => {
  const { email, wishlist } = req.body;

  if (!email || !Array.isArray(wishlist)) {
    return res.status(400).json({ message: 'Invalid email or wishlist format.' });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.wishlist = wishlist;
  console.log(`✅ Wishlist updated for ${email}:`, wishlist);

  return res.status(200).json({ message: 'Wishlist updated successfully' });
};

const updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { wishlist } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { studentId: id },
      { wishlist },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllUsers,
  updateUserProfile,
  setSellerRole,
  registerUser,
  updateUserWishlist,
  updateWishlist
};
