import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import TaskForm from './TaskForm';

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

export default function CreateTask({ user, fetchTasks }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title='Create Task'>
        <IconButton aria-label="create" onClick={handleOpen} >
          <AddCircleOutlineIcon fontSize="large"/>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-task"
        aria-describedby="create-task"
      >
        <Box sx={{ ...style, width: 400 }}>
        <h2>Create Task</h2>
        <TaskForm 
          taskData={{}} 
          user={user} 
          fetchTasks={fetchTasks} 
          handleClose={handleClose}
          action = 'create'
        />
        </Box>
      </Modal>
    </div>

  );
}
