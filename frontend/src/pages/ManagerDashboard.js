import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { downloadCSV } from '../utils/csvUtils';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 2); 
  const durationInDays = (endDate - startDate) / (1000 * 3600 * 24);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const decodedToken = jwtDecode(user.token);
  
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/managers/${decodedToken.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProjects(Array.isArray(response.data) ? response.data : response.data.projects || []); // Ensure projects is an array
      } catch (err) {
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      filter ? project.status === filter : true
    );
  }, [projects, filter]);

  const handleCSVDownload = () => {
    downloadCSV(filteredProjects, 'projects_report');
  };

  const offMode = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAssignClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleSettingsModalOpen = () => {
    setShowSettingsModal(true);
  };

  const handleSettingsModalClose = () => {
    setShowSettingsModal(false);
  };

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const user = JSON.parse(localStorage.getItem('user'));
  const decodedToken = jwtDecode(user.token);
  const userRole = decodedToken.role;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <nav className="navbar navbar-light bg-light">
        <span className='text-success' style={{ fontWeight: 'bold', padding: '10px', fontSize: '22px' }}>Admin Panel</span>
        <button onClick={offMode} className="btn btn-sm btn-danger">Logout</button>
      </nav>

      <h1 className="mt-4">{userRole} Dashboard</h1>

      <select value={filter} onChange={handleFilterChange} className="form-select" style={{ marginBottom: '20px' }}>
        <option value="">All Projects</option>
        <option value="development">Development</option>
        <option value="testing">Testing</option>
        <option value="completed">Completed</option>
      </select>

      <button 
        onClick={handleCSVDownload} 
        className="btn btn-sm btn-primary mb-3">
        Download CSV
      </button> &nbsp;
      {userRole !== 'Team Member' && (
              <button 
                className="text-white btn btn-sm btn-success mb-3"   
              >
                Add Project
              </button>
            )}
      {filteredProjects.map(project => (
        <div key={project.id} className="card mb-3">
          <div className="card-header" data-id={project.status}>
            <h5 className="card-title">{project.name}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{project.description}</p>
            <p className="card-text"><strong>Start Date:</strong> 05-10-2024</p>
            <p className="card-text"><strong>End Date:</strong> 05-12-2024</p>
            <p className="card-text"><strong>Manager Name/ID:</strong> Manager /{project.managerId}</p>
            <p className="card-text"><strong>Team Member Name/ID:</strong> Team Member/{project.team_member_id}</p>
            <p className="card-text"><strong>Status:</strong> {project.status} - Development</p>
            <p className="card-text"><strong>Created At:</strong> {project.createdAt}</p>
            
            {/* Conditionally render the Assign Project button */}
            {userRole !== 'Team Member' && (
              <button 
                className="btn btn-primary" 
                onClick={() => handleAssignClick(project)}
              >
                Assign Project
              </button>
            )}
            {/* Settings button */}
            {userRole === 'Team Member' && (
              <button 
                className="text-white btn btn-warning ms-2" 
                onClick={handleSettingsModalOpen}
              >
                Settings
              </button>
            )}
          </div>
          <div className="card-footer text-muted">
            Project Duration: {durationInDays} days
          </div>
        </div>
      ))}

      {/* Modal for Assigning Project */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="assignProjectModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="assignProjectModalLabel">Assign Project: {selectedProject?.name}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="teamMemberSelect" className="form-label">Select Team Member</label>
                    <select className="form-select" id="teamMemberSelect" required>
                      <option value="">Choose...</option>
                      {/* Add options for team members here */}
                      <option value="member1">Team Member 1</option>
                      <option value="member2">Team Member 2</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                <button type="button" className="btn btn-primary">Assign</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
       <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="settingsModalLabel">User Role: {userRole}</h5>
             <button type="button" className="btn-close" onClick={handleSettingsModalClose} aria-label="Close"></button>
           </div>
           <div className="modal-body">
             {/* Progress Update Inputs */}
             <form>
               <div className="mb-3">
                 <label htmlFor="completionPercentage" className="form-label">Completion Percentage</label>
                 <input type="number" className="form-control" id="completionPercentage" placeholder="Enter completion percentage" value="25"/>
               </div>
   
               <div className="mb-3">
                 <label htmlFor="timeSpent" className="form-label">Time Spent (hours)</label>
                 <input type="time" className="form-control" id="timeSpent" placeholder="Enter time spent" value="11:11:00"/>
               </div>
   
               <div className="mb-3">
                 <label htmlFor="comments" className="form-label">Comments</label>
                 <textarea className="form-control" id="comments" rows="3" placeholder="Enter your comments"></textarea>
               </div>
             </form>
           </div>
   
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" onClick={handleSettingsModalClose}>Close</button>
             {/* Submit and Complete Buttons */}
             <button type="button" className="btn btn-primary"  >Submit</button>
             <button type="button" className="btn btn-success"  >Complete</button>
           </div>
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
