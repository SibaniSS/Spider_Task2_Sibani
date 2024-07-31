const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json(user);
});

// Get user profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Update user profile
router.put('/:id', async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(user);
});

// Upload profile picture
router.post('/:id/profile-picture', upload.single('profilePicture'), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { profilePicture: req.file.path }, { new: true });
  res.json(user);
});

// Change password
router.post('/:id/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.params.id);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (isMatch) {
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } else {
    res.status(400).json({ message: 'Incorrect old password' });
  }
});

module.exports = router;
