import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import taskService from '../services/taskService';
import logger from '../utils/loggerUtil';


export default function TaskForm({ taskData, user, fetchTasks, handleClose, action }) {
  const [title, setTitle] = React.useState(taskData.title ?? '');
  const [description, setDescription] = React.useState(taskData.description ?? '');
  const [dueDate, setDueDate] = React.useState(
    taskData.dueDate 
      ? dayjs(taskData.dueDate) 
      : dayjs()
  );
  const [priority, setPriority] = React.useState(taskData.priority ?? '');
  const [status, setStatus] = React.useState(taskData.status ?? '');
  const [reminderEnable, setReminderEnable] = React.useState((taskData.reminder && taskData.reminder !== '') ? true : false);
  const [reminder, setReminder] = React.useState(
    (taskData.reminder && taskData.reminder !== '')
      ? dayjs(taskData.reminder)
      : dayjs()
  );
  const [recurrenceEnable, setRecurrenceEnable] = React.useState((taskData.recurrence && taskData.recurrence !== '') ? true : false);
  const [recurrence, setRecurrence] = React.useState(
    (taskData.recurrence && taskData.recurrence !== '') 
      ? dayjs(taskData.recurrence)
      : dayjs()
  );
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (value) => {
    setDueDate(value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  const handleRecurrenceChange = (event) => {
    setRecurrence(event.target.value);
  };

  const handleSubmit = async () => {

    try {
      const newTaskData = { 
        username: user,
        title,
        description,
        dueDate: dueDate.format('YYYY-MM-DD HH:mm:ss'),
        priority,
        status,
        reminder: reminderEnable ? reminder.format('YYYY-MM-DD HH:mm:ss') : '',
        recurrence: recurrenceEnable ? recurrence.format('YYYY-MM-DD HH:mm:ss') : ''
      };
      if (action === 'create') {
        await taskService.createTask(newTaskData);
      } else {
        await taskService.updateTask({ taskId: taskData.taskId, ...newTaskData});
      }
      
      fetchTasks(); // Refresh task list after creation
      handleClose();
    } catch (error) {
      logger.error('Error creating task:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>

        <TextField
          id="title"
          label="Title"
          margin="dense"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />

        <TextField
          id="description"
          label="Description"
          multiline
          maxRows={4}
          margin="dense" 
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
        />


        <LocalizationProvider 
          dateAdapter={AdapterDayjs} 
          margin="dense"
        >
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker 
              label="Due Date" 
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>


        <FormControl fullWidth margin="dense">
          <InputLabel id="priority">Priority</InputLabel>
          <Select
            labelId="select-priority"
            id="priority-to-select"
            label="Priority"
            value = {priority}
            onChange={handlePriorityChange}
          >
            <MenuItem value={'LOW'}>LOW</MenuItem>
            <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
            <MenuItem value={'HIGH'}>HIGH</MenuItem>
          </Select>
        </FormControl>


        <FormControl fullWidth margin="dense">
          <InputLabel id="priority">Status</InputLabel>
          <Select
            labelId="select-status"
            id="status-to-select"
            label="Status"
            value = {status}
            onChange={handleStatusChange}
          >
            <MenuItem value={'INCOMPLETE'}>INCOMPLETE</MenuItem>
            <MenuItem value={'COMPLETE'}>COMPLETE</MenuItem>
            <MenuItem value={'CANCELLED'}>CANCELLED</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          sx={{
            display: 'block',
          }}
          control={
            <Switch
              checked={reminderEnable}
              onChange={() => setReminderEnable(!reminderEnable)}
              name="loading"
              color="primary"
            />
          }
          label="Enable Reminder for this task"
        />

        {
          reminderEnable
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Reminder Time" value={reminder} onChange={handleReminderChange}/>
              </DemoContainer>
            </LocalizationProvider>
          : <></>
        }


        <FormControlLabel
          sx={{
            display: 'block',
          }}
          control={
            <Switch
              checked={recurrenceEnable}
              onChange={() => setRecurrenceEnable(!recurrenceEnable)}
              name="loading"
              color="primary"
            />
          }
          label="Enable Recurring tasks"
        />

        {
          recurrenceEnable
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Recurrence Time" value={recurrence} onChange={handleRecurrenceChange}/>
              </DemoContainer>
            </LocalizationProvider>
          : <></>
        }

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button 
            variant="contained" 
            disabled={!Boolean(title && description && dueDate && priority && status)}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>

      </div>
    </Box>
  );
}
