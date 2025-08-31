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
  try {
    logger.info('Health check endpoint accessed');
    
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };
    
    res.status(200).json(healthCheck);
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Simple readiness probe
app.get('/ready', (req, res) => {
  res.status(200).send('OK');
});

// Database health check endpoint
app.get('/health/db', (req, res) => {
  try {
    // Test database connection
    db.ping((err) => {
      if (err) {
        logger.warn('Database health check failed:', err.message);
        return res.status(503).json({
          status: 'unhealthy',
          component: 'database',
          timestamp: new Date().toISOString(),
          error: err.message
        });
      }
      
      res.status(200).json({
        status: 'healthy',
        component: 'database',
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    logger.error('Database health check error:', error);
    res.status(503).json({
      status: 'unhealthy',
      component: 'database',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

/* Add your routes here */
// Initialize database connection with error handling and retry logic
let dbConnectionAttempts = 0;
const maxDbRetries = 5;
const dbRetryDelay = 5000; // 5 seconds

function connectDatabase() {
  dbConnectionAttempts++;
  
  db.connect((err) => {
    if (err) {
      logger.error(`Error connecting to MySQL (attempt ${dbConnectionAttempts}/${maxDbRetries}): ${err.stack}`);
      
      if (dbConnectionAttempts < maxDbRetries) {
        logger.info(`Retrying database connection in ${dbRetryDelay / 1000} seconds...`);
        setTimeout(connectDatabase, dbRetryDelay);
      } else {
        logger.warn('Max database connection attempts reached. Application will continue running without database connection');
        logger.warn('Database-dependent endpoints may not function properly');
      }
      return;
    }

    logger.info('Connected to MySQL Database successfully');
  });
}

// Start database connection process
connectDatabase();

app.use('/api', routes);

module.exports = app;
