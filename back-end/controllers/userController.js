// controllers/userController.js

const updateUserProfile = (req, res) => {
  // Example logic — modify as needed
  const { firstName, lastName, phoneNumber, password } = req.body;

   if (!firstName && !lastName && !phoneNumber && !password) {
    return res.status(400).json({ message: 'Please provide at least one field to update.' });
  }

  // This is mock logic — replace with actual database update later
  return res.json({ message: 'Profile updated successfully!', data: { firstName, lastName, phoneNumber, password } });
};

module.exports = {
  updateUserProfile,
};
