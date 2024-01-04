// src/routes/searchRoutes.js
const express = require('express');
const searchController = require('../controllers/searchController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

const router = express.Router();

router.use(authenticationMiddleware); // Middleware for authentication

router.get('/', searchController.searchNotes);

module.exports = router;
