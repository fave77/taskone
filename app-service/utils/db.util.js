const Task = require('../schemas/task.schema.js');
const User = require('../schemas/user.schema.js');
const logger = require('./logger.util.js');
/**
 * createOrUpdateUserInDB - This function creates or updates a new user in db
 * @param {string} userId 
 * @returns {Promise<object>}
 */
const createOrUpdateUserInDB = async (userId) => {
  // Find the user by userId and update or create if not exists
  const result = await User.findOneAndUpdate(
    { userId },
    { userId },
    { upsert: true, new: true }
  );
  if (result) {
    logger.debug(`User created/updated successfully ---> ${JSON.stringify(result)}`);
  }
  return result;
};

/**
 * deleteUserInDB - This function deletes a user in db if it exists
 * @param {string} userId 
 * @returns {Promise<object>}
 */
const deleteUserInDB = async (userId) => {
  const result = await User.findOneAndDelete({ userId });
  if (result) {
    logger.debug(`User '${userId}' deleted successfully`);
  } else {
    logger.debug(`User '${userId}' not found, nothing to delete`);
  }
  return result ? true : false;
};

/**
 * createOrUpdateTaskInDB - This function creates or updates a new task in db
 * @param {object} taskInfo - Same schema as Task
 * @returns {Promise<object>}
 */
const createOrUpdateTaskInDB = async (taskInfo) => {
  // Find the task by userId, taskId and update or create if not exists
  console.log(taskInfo, 'ito');
  const result = await Task.findOneAndUpdate(
    { userId: taskInfo.userId, taskId: taskInfo.taskId },
    { ...taskInfo },
    { upsert: true, new: true }
  );

  if (result) {
    logger.debug(`Task created/updated successfully ---> ${JSON.stringify(result)}`);
  }
  return result;
};

/**
 * deleteTaskInDB - This function deletes a task in db if it exists
 * @param {string} userId
 * @param {string} taskId
 * @returns {Promise<object>}
 */
const deleteTaskInDB = async (userId, taskId) => {
  const result = await Task.findOneAndDelete({ userId, taskId });
  if (result) {
    logger.debug(`Task '${taskId}' deleted successfully`);
  } else {
    logger.debug(`'Task '${taskId}' not found, nothing to delete`);
  }
  return result;
};

/**
 * listTaskInDB - This function lists all the tasks for an user
 * @param {string} userId
 * @returns {Promise<object>}
 */
const listTaskInDB = async (userId) => {
  const result = await Task.find({ userId });
  if (result) {
    logger.debug(`All Tasks fetched successfully for '${userId}'`);
  } else {
    logger.debug(`User '${userId}' not found, nothing to fetch`);
  }
  return result;
};

module.exports = { createOrUpdateUserInDB, deleteUserInDB, createOrUpdateTaskInDB, deleteTaskInDB, listTaskInDB };