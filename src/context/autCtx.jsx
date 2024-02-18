import { enqueueSnackbar } from 'notistack';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
  token: null,
  username: '',
  // email: '',
});

AuthContext.displayName = 'AuthCtx';

export const AuthContextProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('session_token');
  const usernameFromStorage = localStorage.getItem('session_username');
  const [sessionToken, setSessionToken] = useState(tokenFromStorage || null);
  const [username, setUserName] = useState(usernameFromStorage || null);

  const isUserLoggedIn = !!sessionToken;

  function login() {
    console.log('login');
    // setSessionToken(token);
    // setUserName(username);
    // localStorage.setItem('session_token', token);
    // localStorage.setItem('session_username', username);
    enqueueSnackbar('Login success', { vertical: 'top', variant: 'success' });
  }

  function logout() {
    console.log('logout');
    setSessionToken(null);
    setUserName('');
    localStorage.removeItem('session_token');
    localStorage.removeItem('session_username');
  }

  const ctxValues = {
    token: sessionToken,
    isUserLoggedIn,
    login,
    logout,
    username,
    // email,
  };

  return <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
