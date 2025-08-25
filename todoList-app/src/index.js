import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors'



const MyTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: 'rgba(255, 166, 2)',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: orange[900],
      dark: '#ba000d',
      contrastText: '#000',
    },
    add: {
      main: 'rgb(148, 36, 36)',
    }
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={MyTheme}>
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();