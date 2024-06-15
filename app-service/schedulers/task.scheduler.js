const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger.util');

const { createOrUpdateTaskInDB } = require('../utils/db.util.js');

const scheduleTask = async (scheduler, data) => {
  logger.info(`Scheduling recurring task for taskId ${data.taskId} on ---> ${data.recurrence}`);
  const jobName = `rec_${data.taskId}`;
  scheduler.define(jobName, async (job) => {
    logger.info(`Processing job ---> ${job.attrs.name}`);
    const taskId = uuidv4();
    const taskInfo = { ...job.attrs.data, recurrence: '', taskId };

    await createOrUpdateTaskInDB(taskInfo);
  });

  scheduler.every(data.recurrence, jobName, data);
};

const unscheduleTask = async (scheduler, data) => {
  logger.info(`Unscheduling recurring task for taskId ${data.taskId}`);
  const jobName = `rec_${data.taskId}`;
  await scheduler.cancel({ name: jobName });
};

module.exports = { 
  scheduleTask, unscheduleTask
};