const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Create a new project
const createProject = asyncHandler(async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, managerId,team_member_id, status } = req.body;

  // Validate manager
  const manager = await User.findByPk(managerId);
  if (!manager || manager.role !== 'Manager') {
    return res.status(400).json({ message: 'Invalid manager ID' });
  }

  // Create project
  const project = await Project.create({ name, description, managerId,team_member_id, status });
  res.status(201).json({ message: 'Project created successfully', project });
});

// Get all projects for a manager
const getManagerProjects = asyncHandler(async (req, res) => {
  const { managerId } = req.params;
  // console.log('managerId', managerId);
  // Validate manager
  const manager = await User.findByPk(managerId);
  console.log('manager-role', manager);
  
  if (!manager) {
    return res.status(400).json({ message: 'Invalid manager ID' });
  }
 
  const projects = await Project.findAll({ where: { managerId } });
  if (!projects.length) {
    return res.status(404).json({ message: 'No projects found for this manager' });
  }
  console.log(projects);
  
  res.status(200).json({ message: 'Projects fetched successfully', projects });
});

// Get projects assigned to a team member
const getTeamMemberProjects = asyncHandler(async (req, res) => {
  const { memberId } = req.params;

  // Validate team member
  const member = await User.findByPk(memberId);
  if (!member || member.role !== 'Team Member') {
    return res.status(400).json({ message: 'Invalid team member ID' });
  }

  const projects = await Project.findAll({
    include: [
      {
        model: User,
        where: { id: memberId },
      },
    ],
  });
  
  if (!projects.length) {
    return res.status(404).json({ message: 'No projects found for this team member' });
  }

  res.status(200).json({ message: 'Projects fetched successfully', projects });
});

module.exports = {
  createProject,
  getManagerProjects,
  getTeamMemberProjects,
};
