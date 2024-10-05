import axios from 'axios';

// Create an instance of Axios
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',  // Use environment variable or default to localhost
});

// Add a request interceptor to include the token in headers if available
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Example: Redirect to login if unauthorized
      if (error.response.status === 401) {
        // Implement redirect logic here, e.g., window.location = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API services
export const authService = {
  login: (data) => API.post('/login', data),
};

export const projectService = {
  getManagerProjects: (id) => API.get(`/projects/managers/${id}`),
  getTeamMemberProjects: (id) => API.get(`/projects/members/${id}`),
  updateProjectProgress: (projectId, progress) => API.put(`/projects/${projectId}/update-progress`, { progress }),
};

// Add other services as needed

export default API;
