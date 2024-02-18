import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { AuthContextProvider } from './context/autCtx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <CssBaseline />
    <AuthContextProvider>
      <SnackbarProvider autoHideDuration={1500}>
        <App />
      </SnackbarProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
