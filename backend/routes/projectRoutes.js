const express = require('express');
const {
  createProject,
  getManagerProjects,
  getTeamMemberProjects,
} = require('../controllers/projectController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Route to create a new project (only Admin or Manager can create)
router.post('/', verifyToken, checkRole(['Admin', 'Manager']), createProject);

// Route to get all projects managed by a specific manager
router.get('/managers/:managerId', verifyToken, checkRole(['Admin', 'Manager','Team Member']), getManagerProjects);

// Route to get projects assigned to a specific team member
router.get('/members/:memberId', verifyToken, checkRole(['Admin', 'Manager', 'Team Member']), getTeamMemberProjects);

module.exports = router;
