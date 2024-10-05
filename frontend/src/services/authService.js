import API from './api'; // Import the Axios instance from api.js

const API_URL = '/auth'; // Use a relative path since the base URL is handled in api.js

export const login = async (credentials) => {
  try {
    const response = await API.post(`${API_URL}/login`, credentials);
     console.log('Login response:', response.data);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    // Handle error accordingly
    throw new Error(error.response ? error.response.data.message : 'Login failed'); // Customize this message
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
