import { useState } from 'react';
import { login, logout, getCurrentUser } from '../services/authService';

const useAuth = () => {
  const [user, setUser] = useState(getCurrentUser());

  const loginUser = async (credentials) => {
    const data = await login(credentials);
    setUser(data);
    return data; // Return user data for further use
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user; // Returns true if user is logged in
  };

  return { user, loginUser, logoutUser, isAuthenticated };
};

export default useAuth;
