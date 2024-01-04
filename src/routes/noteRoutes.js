// src/routes/noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.use(authenticationMiddleware); // Middleware for authentication

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', validationMiddleware.validateNote, noteController.createNote);
router.put('/:id', validationMiddleware.validateNote, noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/share', noteController.shareNote);

module.exports = router;
