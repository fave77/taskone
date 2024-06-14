import apiClient from '../utils/apiUtil';


const taskPayloadTransformer = (taskData) => {
  return {
    userId: taskData.username,
    taskId: taskData.taskId,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    status: taskData.status,
    reminder: taskData.reminder,
    recurrence: taskData.recurrence
  }

};

const taskService = {
  createTask: (taskData) => {
    const payload = taskPayloadTransformer(taskData);
    return apiClient.post('/create-task', payload);
  },

  updateTask: (taskData) => {
    const payload = taskPayloadTransformer(taskData);
    return apiClient.post('/update-task', payload);
  },

  deleteTask: (username, taskId) => {
    return apiClient.post('/delete-task', { userId: username, taskId });
  },

  listAllTask: (username) => {
    return apiClient.post('/list-all-task', { userId: username });
  },
};

export default taskService;