// src/services/searchService.js
const Note = require('../models/noteModel');

const searchNotes = async (userId, query) => {
  try {
    // Use MongoDB text search to find notes containing the query
    const searchResults = await Note.find({
      userId,
      $text: { $search: query },
    });

    return searchResults;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchNotes,
};
