const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TASK_PRIORITIES, TASK_STATUSES } = require('../constants/schema.constant');

// Define the task schema
const taskSchema = new Schema({
  userId: { type: String, required: true },
  taskId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true, enum: TASK_PRIORITIES  },
  status: { type: String, required: true, enum: TASK_STATUSES },
  reminder: { type: String },
  recurrence: { type: String }
}, { timestamps: true });

// Create a compound index on userId and taskId
taskSchema.index({ userId: 1, taskId: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
