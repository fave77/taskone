import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Link from '@mui/material/Link'

import CreateTask from '../components/CreateTask';


import { useAuth } from '../contexts/AuthContext';

const settings = ['Logout', 'Delete Profile',];

function ResponsiveAppBar({ user, fetchTasks }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout, unregister } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSettings = (setting) => {
    const handlers = {
      'Logout': () => {
        logout();
      },
      'Delete Profile': () => {
        unregister(user);
      }
    }
    handlers[setting]()
  }

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (settings.includes(setting)) handleSettings(setting);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HistoryEduIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} fontSize="large"/>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TASKONE
          </Typography>

          {
            user 
            ? <>
                                  
                <CreateTask 
                  user = {user}
                  fetchTasks={fetchTasks} 
                />

                <Link href={`/api-docs`} target="_blank" rel="noopener noreferrer">
                  <Tooltip title='Check API Docs'>
                    <IconButton aria-label="create">
                      <LibraryBooksIcon fontSize="large"/>
                    </IconButton>
                  </Tooltip>
                </Link>

              </>
            : <></>
          }


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TASKONE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          { user 
            ? <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user} src="abc" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} 
                      onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box> 
              : <></>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
