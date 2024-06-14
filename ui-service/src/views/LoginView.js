import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ResponsiveAppBar from '../components/Header';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import logger from '../utils/loggerUtil';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const LoginView = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username);
    } catch (error) {
      logger.error('Login failed', error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}  // Full height of the viewport
      >
        <Grid item>
          <Item>
            <Typography variant='h4'>Login</Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <label>
                    <Typography variant="h6" >Pick a username!</Typography>
                  </label>
                </div>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <br />
              <Button type="submit" variant="contained" >Login</Button>
            </form>
          </Item>
        </Grid>
      </Grid>

      
    </div>
  );
};

export default LoginView;
