// src/controllers/searchController.js
const searchService = require('../services/searchService');

const searchNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    const query = req.query.q; // Assuming the query is provided in the query string
    const searchResults = await searchService.searchNotes(userId, query);
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchNotes,
};
