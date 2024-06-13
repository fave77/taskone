const logger = require('../utils/logger.util.js');
const { createUserInDB, deleteUserInDB } = require('../utils/db.util.js');

const accessUser = async (req, res) => {
  logger.info(`[accessUser] called with ---> ${JSON.stringify(req.body)}`);
  const userId = req.body.userId;

  // Check in the cache first
  const userExists = await req.cache.get(userId);
  if (userExists != 'true') {
    await createUserInDB(userId);
    await req.cache.set(userId, 'true');
  }

  res.json({
    success: true,
    data: { userId }
  });
};

const deleteUser = async (req, res) => {
  logger.info(`[deleteUser] called with ---> ${JSON.stringify(req.body)}`);
  const userId = req.body.userId;

  await req.cache.del(userId);
  const success = await deleteUserInDB(userId);

  res.json({
    success,
  });
};

module.exports = { accessUser, deleteUser };