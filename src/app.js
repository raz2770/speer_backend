// src/app.js
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const searchRoutes = require('./routes/searchRoutes');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
try {
  mongoose.connect(config.mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
}
catch (error) {
  console.log(error);
}

// Middleware for rate limiting
app.use(rateLimitMiddleware);
// Load routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/search', searchRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
