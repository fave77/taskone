/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ResponsiveAppBar from '../components/Header';

import { useAuth } from '../contexts/AuthContext';
import taskService from '../services/taskService';

import TaskCard from '../components/Task';

import logger from '../utils/loggerUtil';


const TaskColumn = ({ title, tasks, user, fetchTasks }) => (
  <Grid item xs={12} sm={4}>
    <Typography 
      variant="h6"
      noWrap
      sx={{
        mt: 5,
        mb: 5,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
      gutterBottom 
      align="center"
    >
      {title.toUpperCase()}
    </Typography>
    <Grid container direction="column" alignItems="center" spacing={2}>
      {tasks.length > 0 
        ? tasks.map((task) => (
            <TaskCard 
              key={task.taskId}
              taskId={task.taskId}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              priority={task.priority}
              status={task.status}
              reminder={task.reminder}
              recurrence={task.recurrence}
              user={user}
              fetchTasks={fetchTasks} 
            />
          ))
        :  <Typography variant="h6" align="center">{'No Tasks 🥳'}</Typography>
      }
    </Grid>

    
  </Grid>
);

const TaskBoard = ({ tasks, user, fetchTasks }) => {

  const incompleteTasks = tasks.filter(task => task.status === 'INCOMPLETE');
  const completeTasks = tasks.filter(task => task.status === 'COMPLETE');
  const cancelledTasks = tasks.filter(task => task.status === 'CANCELLED');

  return (
    <Grid container spacing={2}>
      <TaskColumn 
        title="Incomplete Tasks"
        tasks={incompleteTasks}
        user={user} 
        fetchTasks={fetchTasks}
      />
      <TaskColumn 
        title="Completed Tasks"
        tasks={completeTasks} 
        user={user} 
        fetchTasks={fetchTasks} 
      />
      <TaskColumn 
        title="Cancelled Tasks" 
        tasks={cancelledTasks} 
        user={user} 
        fetchTasks={fetchTasks} 
      />
    </Grid>
  );
};



const TaskView = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await taskService.listAllTask(user);
      setTasks(response.data.data);
    } catch (error) {
      logger.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div>
      <ResponsiveAppBar user={user} fetchTasks={fetchTasks} />      
      <TaskBoard tasks={tasks} user={user} fetchTasks={fetchTasks} />
    </div>
  );
};

export default TaskView;
