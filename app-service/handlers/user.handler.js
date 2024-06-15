const logger = require('../utils/logger.util.js');
const { unscheduleReminder } = require('../schedulers/reminder.scheduler.js');
const { unscheduleTask } = require('../schedulers/task.scheduler.js');

const {  
  createOrUpdateUserInDB, 
  deleteUserInDB, 
  deleteAllTaskInDB 
} = require('../utils/db.util.js');

const accessUser = async (req, res) => {
  logger.info(`[accessUser] called with ---> ${JSON.stringify(req.body)}`);
  const userId = req.body.userId;

  // Check in the cache first
  const userExists = await req.cache.get(userId);
  if (userExists != 'true') {
    await createOrUpdateUserInDB(userId);
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
  const { result, tasks } = await deleteAllTaskInDB(userId, req.scheduler);
  
  for (const task in tasks) {
    unscheduleReminder(scheduler, task);
    unscheduleTask(scheduler, task);
  }

  res.json({
    success: success && (result ? true : false),
  });
};

module.exports = { accessUser, deleteUser };