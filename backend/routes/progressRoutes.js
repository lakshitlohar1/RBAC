const express = require('express');

const {
  createProgress,
  getProgressByStepId,
  createStep,
  getStepsByProjectId,
} = require('../controllers/progressController');
const { validateProgress, validateStep } = require('../middleware/validation'); // Import validation middleware

const router = express.Router();

// Step routes
router.post('/steps', validateStep, createStep);
router.get('/steps/project/:projectId', getStepsByProjectId);

// Progress routes nested under steps
router.post('/steps/:stepId/progress', validateProgress, createProgress); // Creates progress for a specific step
router.get('/steps/:stepId/progress', getProgressByStepId); // Get progress for a specific step

module.exports = router;
