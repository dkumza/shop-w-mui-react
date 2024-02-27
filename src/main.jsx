import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './components/context/autCtx';
import { ProductsContextProvider } from './components/context/productsCtx';

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
      light: '#6573c3',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#000',
    },
  },
  typography: {
    body4: {
      fontSize: '0.85rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
});

root.render(
  <BrowserRouter>
    <CssBaseline />
    <AuthContextProvider>
      <ProductsContextProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            dense
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
