const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db'); // Import the db connection
const logger = require('./utils/logger'); // Import logger

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Health Checking - Independent of database connection
app.get('/health', (req, res) => {
  logger.info('Health check endpoint accessed');
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

/* Add your routes here */
// Initialize database connection with error handling
db.connect((err) => {
  if (err) {
    logger.error(`Error connecting to MySQL: ${err.stack}`);
    logger.warn('Application will continue running without database connection');
    return;
  }

  logger.info('Connected to MySQL Database');
});

app.use('/api', routes);

module.exports = app;
