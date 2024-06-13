const mongoose = require('mongoose');
const logger = require('../utils/logger.util');

// Read environment variables
const databaseUrl = process.env.APP_DATABASE_URL;

// Connect to MongoDB
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('Could not connect to MongoDB', err));
