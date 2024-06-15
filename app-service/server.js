const app = require('./app')
const port = process.env.APP_PORT || 8080;

const logger = require('./utils/logger.util');

app.listen(port, () => {
  logger.info(`App listening at ${port}`);
});