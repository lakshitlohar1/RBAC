import API from './api'; // Import the Axios instance from api.js

export const createProject = async (projectData, token) => {
  try {
    const response = await API.post('/projects', projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the response data for further use
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to create project'); // Customize this message
  }
};

export const getManagerProjects = async (managerId, token) => {
  try {
    const response = await API.get(`/projects/managers/${managerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the response data for further use
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch manager projects'); // Customize this message
  }
};

export const getTeamMemberProjects = async (memberId, token) => {
  try {
    const response = await API.get(`/projects/members/${memberId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the response data for further use
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch team member projects'); // Customize this message
  }
};
