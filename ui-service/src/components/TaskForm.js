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

import cronModule from '../utils/cronUtil';

import taskService from '../services/taskService';
import logger from '../utils/loggerUtil';


export default function TaskForm({ taskData, user, fetchTasks, handleClose, action }) {
  console.log(taskData)
  const [title, setTitle] = React.useState(taskData.title ?? '');
  const [description, setDescription] = React.useState(taskData.description ?? '');
  const [dueDate, setDueDate] = React.useState(
    taskData.dueDate 
      ? cronModule.convertIstToUtc(dayjs(taskData.dueDate))
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
      ? cronModule.convertUtcToIst(dayjs(cronModule.convertCronToDateTime(taskData.recurrence)))
      : dayjs()
  );

  const [frequency, setFrequency] = React.useState('daily');
  const [dayOfWeek, setDayOfWeek] = React.useState('0');

  const cancelledTask = taskData && taskData.status === 'CANCELLED';

  

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

  const handleRecurrenceChange = (value) => {
    setRecurrence(value);
  };

  const handleFrequencyChange = (event) => {
    console.log(event.target.value)
    setFrequency(event.target.value);
  }

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  }

  const handleSubmit = async () => {

    try {
      const newTaskData = { 
        username: user,
        title,
        description,
        dueDate: dueDate.format('YYYY-MM-DD HH:mm:ss'),
        priority,
        status,
        reminder: reminderEnable 
          ? (cancelledTask || status === 'CANCELLED' ? '' : reminder.format('YYYY-MM-DD HH:mm:ss'))
          : '',
        recurrence: recurrenceEnable 
          ? (cancelledTask || status === 'CANCELLED' ? '' : cronModule.generateCronPattern(cronModule.convertIstToUtc(recurrence), frequency, dayOfWeek))
          : ''
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
          inputProps={{ maxLength: 50 }}
          disabled={cancelledTask}
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
          inputProps={{ maxLength: 300 }}
          disabled={cancelledTask}
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
              disabled={cancelledTask}

             
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
            disabled={cancelledTask}

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
              disabled={cancelledTask}
            />
          }
          label="Enable Reminder for this task"
        />

        {
          reminderEnable
          ? <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker 
                  label="Reminder Time" 
                  value={reminder} 
                  onChange={handleReminderChange}
                  disabled={cancelledTask}
                />
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
              disabled={cancelledTask}
            />
          }
          label="Enable Recurring tasks"
        />

        {
          recurrenceEnable
          ? 
            <>  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker 
                    label="Time" 
                    value={recurrence} 
                    onChange={handleRecurrenceChange}
                    disabled={cancelledTask}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl fullWidth margin="dense">
                <InputLabel id="frequency"> Frequency </InputLabel>
                <Select
                  labelId="select-frequency"
                  id="frequency-to-select"
                  label="Frequency "
                  value = {frequency}
                  onChange={handleFrequencyChange}
                  disabled={cancelledTask}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="specific-day">Specific Day of the Week</MenuItem>
                </Select>
              </FormControl>

              {frequency === 'specific-day' && (

                <FormControl fullWidth margin="dense">
                  <InputLabel id="frequency"> Week Day </InputLabel>
                  <Select
                    labelId="select-day-of-week"
                    id="day-of-week-to-select"
                    label="Week Day"
                    value = {dayOfWeek}
                    onChange={handleDayOfWeekChange}
                    disabled={cancelledTask}
                  >
                      <MenuItem value="0">Sunday</MenuItem>
                      <MenuItem value="1">Monday</MenuItem>
                      <MenuItem value="2">Tuesday</MenuItem>
                      <MenuItem value="3">Wednesday</MenuItem>
                      <MenuItem value="4">Thursday</MenuItem>
                      <MenuItem value="5">Friday</MenuItem>
                      <MenuItem value="6">Saturday</MenuItem>
                    </Select>
                  </FormControl>
              )}
            </>
          
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
