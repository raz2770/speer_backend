// src/services/authService.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signup = async (userData) => {
  try {
    // Validate the email
    if (!userData.email) {
      throw new Error('Email is required');
    }
    // Validate the password
    if (!userData.password) {
      throw new Error('Password is required');
    }
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    // Create a new user
    const newUser = new User(userData);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, config.jwtSecret, { expiresIn: '1h' });

    return { token, userId: newUser._id, email: newUser.email };
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: credentials.email });

    // Check if the user exists and the password is correct
    if (!user || !(await user.comparePassword(credentials.password))) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    return { token, userId: user._id, email: user.email };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signup,
  login,
};
