const logger = require('../utils/logger.util');

const createTask = (req, res) => {
  res.json({
    success: true,
    message: 'Task created successfully'
  });
}

const updateTask = (req, res) => {
  res.json({
    success: true,
    message: 'Task updated successfully'
  });
}

const deleteTask = (req, res) => {
  res.json({
    success: true,
    message: 'Task deleted successfully'
  });
}

const listTask = (req, res) => {
  res.json({
    success: true,
    message: 'All Tasks listed successfully'
  });
}



module.exports = { createTask, updateTask, deleteTask, listTask };