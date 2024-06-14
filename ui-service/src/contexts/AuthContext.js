import React, { createContext, useState, useContext, useEffect } from 'react';
import userService from '../services/userService';

import logger from '../utils/loggerUtil';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide auth state and methods
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = JSON.parse(localStorage.getItem('username'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (username) => {
    try {
      const response = await userService.accessProfile(username);
      const loggedInUser = response.data?.data?.userId;
      setUser(loggedInUser);
      localStorage.setItem('username', JSON.stringify(loggedInUser));
    } catch (error) {
      logger.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  const unregister = async (username) => {
    try {
      await userService.deleteProfile(username);
      setUser(null);
      localStorage.removeItem('username');
    } catch (error) {
      logger.error('Unregister failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, unregister }}>
      {children}
    </AuthContext.Provider>
  );
};
