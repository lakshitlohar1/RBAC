const express = require('express');
const {
  createStep,
  updateStepProgress,
  getProjectSteps,
} = require('../controllers/stepController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Route to create a new step for a project (only Manager can create)
router.post('/', verifyToken, checkRole(['Manager']), createStep);

// Route to update progress of a specific step (only Team Member can update)
router.put('/:stepId', verifyToken, checkRole(['Team Member']), updateStepProgress);

// Route to get all steps for a specific project (accessible by Manager and Team Member)
router.get('/:projectId', verifyToken, checkRole(['Manager', 'Team Member']), getProjectSteps);

module.exports = router;
