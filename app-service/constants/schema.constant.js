const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

const TASK_PRIORITIES = Object.values(TASK_PRIORITY);

const TASK_STATUS = {
  COMPLETE: 'COMPLETE',
  INCOMPLETE: 'INCOMPLETE',
  CANCELLED: 'CANCELLED',
};

const TASK_STATUSES = Object.values(TASK_STATUS);

const TASK_NOTIFICATION_PREFERANCE = {
  ALERT: 'ALERT',
  NOTIFICATION: 'NOTIFICATION'
}

const TASK_NOTIFICATION_PREFERANCES = Object.values(TASK_NOTIFICATION_PREFERANCE)

module.exports = {
  TASK_PRIORITY, TASK_PRIORITIES, TASK_STATUS, TASK_STATUSES, TASK_NOTIFICATION_PREFERANCES
}