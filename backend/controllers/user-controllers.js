const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const signup = async (req, res) => {
    const { name, email, password, username } = req.body; 
    console.log('Signup request received', req.body);
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
      console.log('Existing user check', existingUser);
    } catch (err) {
      console.error('Error finding user', err);
      return res.status(500).json({ message: 'Signup failed, please try again later.' });
    }
  
    if (existingUser) {
      console.warn('User already exists');
      return res.status(422).json({ message: 'User exists already, please login instead.' });
    }
  
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
      console.log('Password hashed');
    } catch (err) {
      console.error('Error hashing password', err);
      return res.status(500).json({ message: 'Could not create user, please try again.' });
    }
  
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      username: username ||"tom", 
      profilePicture: req.file ? req.file.path : null
    });
  
    try {
      await createdUser.save();
      console.log('User saved');
    } catch (err) {
      console.error('Error saving user', err);
      return res.status(500).json({ message: 'Signup failed, please try again later.' });
    }
  
    res.status(201).json({ userId: createdUser.id, email: createdUser.email });
    console.log(createdUser.id,createdUser.email)
  };
  
  module.exports = signup;
  const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received', req.body);
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
      console.log('Existing user check', existingUser);
    } catch (err) {
      console.error('Error finding user', err);
      return res.status(500).json({ message: 'Login failed, please try again later.' });
    }
  
    if (!existingUser) {
      console.warn('User not found');
      return res.status(403).json({ message: 'Invalid credentials, could not log you in.' });
    }
  
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
      console.log('Password check', isValidPassword);
    } catch (err) {
      console.error('Error checking password', err);
      return res.status(500).json({ message: 'Could not log you in, please check your credentials and try again.' });
    }
  
    if (!isValidPassword) {
      console.warn('Invalid password');
      return res.status(403).json({ message: 'Invalid credentials, could not log you in.' });
    }
  
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    } catch (err) {
      console.error('Error generating token', err);
      return res.status(500).json({ message: 'Login failed, please try again later.' });
    }
  
    res.status(200).json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token
    });
  };
  const getProfile = async (req, res, next) => {
    const userId = req.userId;
    console.log("Get profile request received for userId", userId);
  
    let user;
    try {
      user = await User.findById(userId);
      console.log("User fetched", user);
    } catch (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: 'Fetching user failed, please try again later.' });
    }
  
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found.' });
    }
  
    res.status(200).json({ userId: user.id, userName: user.name, userProfilePic: user.profilePicture });
  };
  
  const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, password } = req.body;
    console.log("Update user request received for userId", userId);
    console.log("Request Body:", req.body);
  
    let user;
    try {
      user = await User.findById(userId);
      console.log("User fetched", user);
    } catch (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: 'Fetching user failed, please try again later.' });
    }
  
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found.' });
    }
  
    user.name = name;
  
    if (password) {
      user.password = await bcrypt.hash(password, 12);
      console.log("Password updated");
    }
  
    if (req.file) {
      // Remove old profile picture if exists
      if (user.profilePicture) {
        fs.unlink(path.join(__dirname, '..', user.profilePicture), err => {
          if (err) console.error("Failed to delete old profile picture:", err);
        });
      }
      user.profilePicture = req.file.path;
      console.log("Profile picture updated");
    }
  
    try {
      await user.save();
      console.log("User updated", user);
    } catch (err) {
      console.error("Error updating user", err);
      return res.status(500).json({ message: 'Updating user failed, please try again.' });
    }
  
    res.status(200).json({ userId: user.id, userName: user.name, userProfilePic: user.profilePicture });
  };
  
  const uploadProfilePicture = async (req, res, next) => {
    const userId = req.params.id;
    console.log("Upload profile picture request received for userId", userId);
  
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: 'No file uploaded.' });
    }
  
    const profilePicturePath = req.file.path;
  
    let user;
    try {
      user = await User.findById(userId);
      console.log("User fetched", user);
    } catch (err) {
      console.error("Error fetching user", err);
      return res.status(500).json({ message: 'Fetching user failed, please try again later.' });
    }
  
    if (user.profilePicture && user.profilePicture !== profilePicturePath) {
      fs.unlink(path.join(__dirname, '..', user.profilePicture), err => {
        if (err) console.error("Failed to delete old profile picture:", err);
      });
    }
  
    user.profilePicture = profilePicturePath;
    console.log("Profile picture updated");
  
    try {
      await user.save();
      console.log("User updated", user);
    } catch (err) {
      console.error("Error updating profile picture", err);
      return res.status(500).json({ message: 'Updating profile picture failed, please try again.' });
    }
  
    res.status(200).json({ userId: user.id, userName: user.name, userProfilePic: user.profilePicture });
  };
  
  module.exports = {
    signup,
    login,
    getProfile,
    updateUser,
    uploadProfilePicture
  };