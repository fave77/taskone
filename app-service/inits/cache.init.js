const redis = require('redis');
const logger = require('../utils/logger.util');

// Read environment variables
const cacheUrl = process.env.CACHE_URL;

// Connect to Redis
const redisUrl = new URL(cacheUrl);
const redisClient = redis.createClient({
  url: cacheUrl,
  password: redisUrl.password
});

(async () => {
  redisClient.on('error', (err) => {
    logger.error('Redis Client Error', err);
  });
  redisClient.on('ready', () => logger.info('Redis is ready'));

  await redisClient.connect();
  await redisClient.ping();
})();

module.exports = redisClient;