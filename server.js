// Backend server entry point - triggering deployment
const app = require('./app');
const port = process.env.PORT || 3200;
const logger = require('./utils/logger'); // Import logger

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server is running on port http://0.0.0.0:${port}`);
});
