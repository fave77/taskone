import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, green, blue, blueGrey } from '@mui/material/colors';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';


import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cardTheme = (status) => {
  if (status === 'INCOMPLETE')
    return { bgcolor: red[200] };
  else if (status === 'COMPLETE')
    return { bgcolor: green[200] };
  return { bgcolor: blueGrey[200] };
};

const priorityTheme = (priority) => {
  if (priority === 'LOW')
    return { color: 'info.main' };
  else if (priority === 'MEDIUM')
    return { color: 'warning.main' };
  return { color: 'error.main' };
};

export default function TaskCard({
  taskId,
  title,
  description,
  dueDate,
  priority,
  status,
  reminder,
  recurrence,
  user,
  fetchTasks,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hashStringToNumber = (str) =>{
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 10) - hash);
    }
    return (Math.abs(hash) % 9) + 1;
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: 2, marginBottom: 3, boxShadow: 3 }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500], fontWeight: 'bold' }} aria-label="task-icon">
            {user[0]}
          </Avatar>
        }
        sx ={{...cardTheme(status), '& .MuiCardHeader-title': { color: 'black', fontWeight: 'bold', fontSize: '1.2em' }}}
        title={title}
        subheader={`Due date: ${new Date(dueDate).toDateString()}`}
        subheaderTypographyProps={{
          sx: { color: 'black', fontWeight: 'bold' } // Change 'red' to any color you like
        }}
      />
      <CardMedia
        component="img"
        height="100"
        image={`${process.env.PUBLIC_URL}/static/images/placeholder${hashStringToNumber(title)}.jpg`}
        alt="task image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={priorityTheme(priority)}>
          {`Priority: ${priority}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Status: ${status}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <UpdateTask 
          taskData = {{  
            taskId,
            title,
            description,
            dueDate,
            priority,
            status,
            reminder,
            recurrence
          }}
          user = {user}
          fetchTasks={fetchTasks} 
        />
        
        <Tooltip title={reminder ? 'Reminder is on' : 'Reminder is off'}>
          <IconButton aria-label="notification">
            {reminder 
              ? <NotificationsActiveIcon style={{color: green[300]}}/> : <NotificationsIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title={recurrence ? 'Recurrence is on' : 'Recurrence is off'}>
          <IconButton aria-label="recurrence">
            {recurrence 
              ? <RepeatOnIcon style={{color: green[300]}}/> : <RepeatIcon />}
          </IconButton>
        </Tooltip>

        <DeleteTask user={user} taskId={taskId} fetchTasks={fetchTasks} />
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
