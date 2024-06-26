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

module.exports = {
  TASK_PRIORITY, TASK_PRIORITIES, TASK_STATUS, TASK_STATUSES,
}