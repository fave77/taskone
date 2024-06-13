const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swagger = require('swagger-ui-express');

const redisClient = require('./inits/cache.init');
require('./inits/db.init');
const swaggerSpec = require('./inits/docs.init');

const app = express();
const port = process.env.APP_PORT || 8080;

// Setting required middlewares
app.use(cors());
app.use(helmet());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  req.cache = redisClient;
  next();
});
app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpec));

// Endpoint for health check
app.get('/', (req, res) => {
  res.send('The App Server is up!');
});

// Defined Routes
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/task.route'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});