import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const data = await login(credentials);
      setUser(data);
      // Optionally save user data to localStorage
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
