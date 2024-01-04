// src/controllers/authController.js
const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const userData = req.body; // Assuming user data is sent in the request body
    const result = await authService.signup(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const credentials = req.body; // Assuming login credentials are sent in the request body
    const result = await authService.login(credentials);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
