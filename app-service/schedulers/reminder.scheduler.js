const logger = require('../utils/logger.util');
const webpush = require('../inits/webpush.init');


const scheduleReminder = async (scheduler, subscription, data) => {
  logger.info(`Scheduling reminder for taskId ${data.taskId} on ---> ${data.reminder}`);
  const jobName = `rem_${data.taskId}`;
  scheduler.define(jobName, async (job) => {
    logger.info(`Processing job ---> ${job.attrs.name}`);
    const { subscription, taskInfo } = job.attrs.data;
    const payload = JSON.stringify({ ...taskInfo });
    await webpush.getInstance().sendNotification(subscription, payload);
  });

  scheduler.every(data.reminder, jobName, { subscription, taskInfo: data });
};

const unscheduleReminder = async (scheduler, data) => {
  logger.info(`Unscheduling reminder for taskId ${data?.taskId}`);
  const jobName = `rem_${data?.taskId}`;
  await scheduler.cancel({ name: jobName });
};

module.exports = { 
  scheduleReminder, unscheduleReminder
};