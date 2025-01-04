
import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

import authService from '../services/auth.service';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      return { ok: true, message: 'Sikeres regisztráció!' };
    } catch (error) {
      console.log(error);
      return { ok: false, message: error };
    }
  };

  const login = async (credentials) => {
    try {
      const token = await authService.login(credentials);
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } catch (error) {
      console.log(error);
      return { ok: false, message: error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthContext;
