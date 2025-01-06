import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

import authService from '../services/auth.service.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMsg, setAuthMsg] = useState({ msg: '', success: false });
  const addAuthMsg = (msg, success) => {
    if (typeof msg !== 'string' || typeof success !== 'boolean')
      return console.log('Invalid authMsg...', msg, success);
    setAuthMsg({ msg: msg, success: success });
  };
  const clearAuthMsg = () => setAuthMsg({ msg: '', success: false });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.log('Érvénytelen token', error);
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      await authService.register(userData);
      addAuthMsg('Sikeres regisztráció!', true);
      return { ok: true, message: 'Sikeres regisztráció!' };
    } catch (error) {
      addAuthMsg(error.error, false);
      return { ok: false, message: error };
    }
  };

  const login = async (credentials) => {
    try {
      const token = await authService.login(credentials);
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      addAuthMsg('Minden szupi!', true);
      return { ok: true, message: 'Minden szupi!' };
    } catch (error) {
      addAuthMsg(error.error, false);
      return { ok: false, message: error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    addAuthMsg('Sikeresen kijelentkeztél!', true);
    setUser(null);
  };

  const value = { user, login, register, logout, authMsg, clearAuthMsg, addAuthMsg };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthContext;
