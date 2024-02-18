import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthContextProvider } from './context/autCtx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const theme = createTheme({
  palette: {
    primary: {
      light: '#9661f0',
      main: '#7C3AED',
      dark: '#5628a5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f6657e',
      main: '#f43f5e',
      dark: '#aa2c41',
      contrastText: '#000',
    },
  },
  typography: {
    body4: {
      fontSize: '0.85rem', // Set the font size you want
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
});

root.render(
  <BrowserRouter>
    <CssBaseline />
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          dense
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
