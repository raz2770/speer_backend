// src/middlewares/authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token not provided' });
  }

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = { id: user._id }; // Attach the user ID to the request for further use
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateUser;
