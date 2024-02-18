import { createContext, useContext, useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
  token: null,
  name: '',
  // email: '',
});

AuthContext.displayName = 'AuthCtx';

export const AuthContextProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('session_token');
  const nameFromStorage = localStorage.getItem('session_name');
  const [sessionToken, setSessionToken] = useState(tokenFromStorage || null);
  const [name, setName] = useState(nameFromStorage || null);

  const isUserLoggedIn = !!sessionToken;

  function login(token, name) {
    console.log(name);
    setSessionToken(token);
    setName(name);
    localStorage.setItem('session_token', token);
    localStorage.setItem('session_name', name);
  }

  function logout() {
    setSessionToken(null);
    setName('');
    localStorage.removeItem('session_token');
    localStorage.removeItem('session_name');
    enqueueSnackbar('See you soon!', { variant: 'success' });
  }

  const ctxValues = {
    token: sessionToken,
    isUserLoggedIn,
    login,
    logout,
    name,
    // email,
  };

  return <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
