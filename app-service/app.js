const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');

const redisClient = require('./inits/cache.init');
require('./inits/db.init');
const swaggerSpec = require('./inits/docs.init');
const scheduler = require('./inits/scheduler.init');
const webpush = require('./inits/webpush.init');

const logger = require('./utils/logger.util')

const app = express();

// Setting required middlewares
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.cache = redisClient;
  req.scheduler = scheduler;
  req.webpush = webpush;
  next();
});
app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpec));

// Endpoint for health check
app.get('/', (req, res) => {
  res.send('The App Server is up!');
});

// Endpoint for subscribing to notification
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  setTimeout(() => {
    webpush.sendNotification(subscription, payload).catch(error => {
      logger.error(error);
    });
  }, 10000);

});

// Defined Routes
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/task.route'));

module.exports = app;
