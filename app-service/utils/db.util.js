const User = require('../schemas/user.schema.js');
const logger = require('./logger.util.js');
/**
 * createUserInDB - This function gracefully creates a new user in db if it doesn't already exist
 * @param {string} userId 
 * @returns {Promise<object>}
 */
const createUserInDB = async (userId) => {
  // Find the user by userId and update or create if not exists
  const user = await User.findOneAndUpdate(
    { userId },
    { userId },
    { upsert: true, new: true }
  );
  if (user) {
    logger.debug(`User created successfully ---> ${JSON.stringify(user)}`);
  }
  return user;
};

/**
 * deleteUserInDB - This function gracefully deletes a user in db if it exists
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

module.exports = { createUserInDB, deleteUserInDB };