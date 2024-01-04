// src/services/noteService.js
const Note = require('../models/noteModel');

const getAllNotes = async (userId) => {
  try {
    // Fetch all notes for the user
    const notes = await Note.find({ userId });
    return notes;
  } catch (error) {
    throw error;
  }
};

const getNoteById = async (noteId, userId) => {
  try {
    // Fetch a specific note for the user
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  } catch (error) {
    throw error;
  }
};

const createNote = async (noteData, userId) => {
  try {
    // Create a new note for the user
    const newNote = new Note({ ...noteData, userId });
    await newNote.save();
    return newNote;
  } catch (error) {
    throw error;
  }
};

const updateNote = async (noteId, noteData, userId) => {
  try {
    // Update an existing note for the user
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: noteData },
      { new: true }
    );

    if (!updatedNote) {
      throw new Error('Note not found');
    }

    return updatedNote;
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (noteId, userId) => {
  try {
    // Delete a note for the user
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!deletedNote) {
      throw new Error('Note not found');
    }

    return deletedNote;
  } catch (error) {
    throw error;
  }
};

const shareNote = async (noteId, targetUserId, userId) => {
  try {
    // Implement shareNote logic - update the note to include targetUserId
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $addToSet: { sharedWith: targetUserId } },
      { new: true }
    );

    if (!updatedNote) {
      throw new Error('Note not found');
    }

    return updatedNote;
  } catch (error) {
    throw error;
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
