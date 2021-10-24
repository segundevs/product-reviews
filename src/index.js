import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './contexts/authContext/AuthContext';

import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f72af'
    },
    secondary: {
      main: '#112d4e'
    }
  }
})



ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
       <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
