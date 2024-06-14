import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import TaskForm from './TaskForm';
import { Tooltip } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color: 'white',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UpdateTask({ taskData, user, fetchTasks }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title='Edit Task'>
        <IconButton aria-label="edit" onClick={handleOpen} >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-task"
        aria-describedby="update-task"
      >
        <Box sx={{ ...style, width: 400 }}>
        <h2>Edit Task</h2>
        <TaskForm 
          taskData={taskData} 
          user={user} 
          fetchTasks={fetchTasks} 
          handleClose={handleClose}
          action='update'
        />
        </Box>
      </Modal>
    </div>

  );
}
