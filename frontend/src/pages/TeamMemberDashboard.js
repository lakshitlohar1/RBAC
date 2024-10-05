import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamMemberDashboard = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignedProjects = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.get(`/api/projects/team-member/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setAssignedProjects(response.data);
      } catch (err) {
        setError('Failed to fetch assigned projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedProjects();
  }, []);

  const handleProgressUpdate = async (projectId, progress) => {
    if (progress < 0 || progress > 100) {
      setError('Progress must be between 0 and 100.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    // Optimistically update the progress in the UI
    setAssignedProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, progress } : project
      )
    );

    try {
      await axios.put(
        `/api/projects/${projectId}/update-progress`,
        { progress },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      // Revert the optimistic update if the API call fails
      setAssignedProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === projectId ? { ...project, progress: project.progress } : project
        )
      );
      setError('Failed to update progress. Please try again.');
    }
  };

  if (loading) return <div>Loading assigned projects...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1>Team Member Dashboard</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {assignedProjects.map(project => (
          <li key={project.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{project.name}</strong> - Progress: {project.progress}%
            <input
              type="number"
              value={project.progress}
              onChange={(e) => handleProgressUpdate(project.id, Number(e.target.value))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberDashboard;
