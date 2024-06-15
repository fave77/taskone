const app = require('./app')
const port = process.env.APP_PORT || 8080;

const logger = require('./utils/logger.util');

app.listen(port, '0.0.0.0', () => {
  logger.info(`App listening at http://localhost:${port}`);
});