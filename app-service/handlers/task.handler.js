const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger.util');
const { scheduleTask, unscheduleTask } = require('../schedulers/task.scheduler.js')

const { 
  createOrUpdateTaskInDB, 
  deleteTaskInDB, 
  listTaskInDB 
} = require('../utils/db.util.js');

const createTask = async (req, res) => {
  logger.info(`[createTask] called with ---> ${JSON.stringify(req.body)}`);
  const taskId = uuidv4();
  const taskInfo = { ...req.body, taskId };
  if (taskInfo.recurrence !== '') {
    await scheduleTask(req.scheduler, taskInfo);
  } else {
    await createOrUpdateTaskInDB(taskInfo);
  }

  res.json({
    success: true,
    data: taskInfo
  });
}

const updateTask = async (req, res) => {
  logger.info(`[updateTask] called with ---> ${JSON.stringify(req.body)}`);
  const taskInfo = { ...req.body };

  if (taskInfo.recurrence !== '') {
    await scheduleTask(req.scheduler, taskInfo);
  } else {
    await createOrUpdateTaskInDB(taskInfo);
    await unscheduleTask(req.scheduler, taskInfo);
  }

  res.json({
    success: true,
    data: taskInfo
  });
}

const deleteTask = async (req, res) => {
  logger.info(`[deleteTask] called with ---> ${JSON.stringify(req.body)}`);
  const { userId, taskId } = req.body;

  const result = await deleteTaskInDB(userId, taskId);
  if (result && result.recurrence !== '') {
    unscheduleTask(req.scheduler, result);
  }
  res.json({
    success: result ? true : false,
  });
}

const listTask = async (req, res) => {
  logger.info(`[listTask] called with ---> ${JSON.stringify(req.body)}`);
  const userId = req.body.userId
  const result =  await listTaskInDB(userId);

  res.json({
    success: true,
    data: result
  });
}



module.exports = { createTask, updateTask, deleteTask, listTask };