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
  const userIdFromStorage = localStorage.getItem('user_id');
  const [sessionToken, setSessionToken] = useState(tokenFromStorage || null);
  const [name, setName] = useState(nameFromStorage || null);
  const [userID, setUserID] = useState(userIdFromStorage || null);

  const isUserLoggedIn = !!sessionToken;

  function login(token, name, id) {
    setSessionToken(token);
    setName(name);
    setUserID(id);
    localStorage.setItem('session_token', token);
    localStorage.setItem('session_name', name);
    localStorage.setItem('user_id', id);
  }

  function logout() {
    setSessionToken(null);
    setName('');
    setUserID('');
    localStorage.removeItem('session_token');
    localStorage.removeItem('session_name');
    localStorage.removeItem('user_id');
  }

  const ctxValues = {
    token: sessionToken,
    isUserLoggedIn,
    login,
    logout,
    name,
    userID,
    // email,
  };

  return <AuthContext.Provider value={ctxValues}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
