// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
