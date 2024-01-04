// src/controllers/noteController.js
const noteService = require('../services/noteService');

const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    const notes = await noteService.getAllNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const note = await noteService.getNoteById(noteId, userId);
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.body);
    
    const noteData = req.body;
    const newNote = await noteService.createNote(noteData, userId);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const noteData = req.body;
    const updatedNote = await noteService.updateNote(noteId, noteData, userId);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const deletedNote = await noteService.deleteNote(noteId, userId);
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const shareNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const targetUserId = req.body.targetUserId; // Assuming targetUserId is provided in the request body
    await noteService.shareNote(noteId, targetUserId, userId);
    res.status(200).json({ message: 'Note shared successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
};
