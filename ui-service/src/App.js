import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import LoginView from './views/LoginView';
import TaskView from './views/TaskView';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <AuthProvider>
      <Main className='app'/>
    </AuthProvider>
  );
}

function Main() {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        {user ? <TaskView /> : <LoginView />}
      </div>
    </ThemeProvider>
  );
}

export default App;
