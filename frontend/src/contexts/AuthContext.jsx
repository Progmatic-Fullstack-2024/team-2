import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

import authService from '../services/auth.service.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMsg, setAuthMsg] = useState({ msg: '', success: false });

  const clearAuthMsg = () => setAuthMsg({ msg: '', success: false });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        setUser(undefined);
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      await authService.register(userData);
      setAuthMsg({ msg: 'Sikeres regisztráció!', success: true });
      return { ok: true, message: 'Sikeres regisztráció!' };
    } catch (error) {
      setAuthMsg({ msg: 'Ez az email cím már regisztrálva van!', success: false });
      return { ok: false, message: error };
    }
  };

  const login = async (credentials) => {
    try {
      const token = await authService.login(credentials);
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setAuthMsg({ msg: 'Minden szupi!', success: true });
      return { ok: true, message: 'Minden szupi!' };
    } catch (error) {
      setAuthMsg({ msg: 'Érvénytelen email vagy jelszó!', success: false });
      return { ok: false, message: error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthMsg({ msg: 'Sikeresen kijelentkeztél!', success: true });
    setUser(null);
  };

  const value = { user, login, register, logout, authMsg, clearAuthMsg };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthContext;
