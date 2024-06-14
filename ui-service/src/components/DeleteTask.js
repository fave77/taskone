import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Checkbox, Typography } from '@mui/material';
import taskService from '../services/taskService';


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

export default function DeleteTask({ user, taskId, fetchTasks }) {
  const [open, setOpen] = React.useState(false);
  const [consent, setConsent] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await taskService.deleteTask(user, taskId);
    fetchTasks();
  }

  return (
    <div>
      <Tooltip title='Delete Task'>
        <IconButton aria-label="delete" onClick={handleOpen} >
          <DeleteIcon style={{color: red[500]}}/>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-task"
        aria-describedby="delete-task"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Delete Task</h2>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
              <Typography>
                Are you sure you want to delete the task?
              </Typography>
              <Checkbox label='yes' onClick={() => setConsent(!consent)}/> Yes
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button 
                  variant="contained" 
                  disabled={!consent}
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
              </Box>

            </div>
          </Box>
        </Box>
      </Modal>
    </div>

  );
}
