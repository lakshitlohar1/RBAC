const { body, validationResult } = require('express-validator');
const Progress = require('../models/Progress');
const Step = require('../models/Step');

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Create a new progress entry
const createProgress = asyncHandler(async (req, res) => {
  // Validate input
 
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { step_id, managerId, completion_percentage, time_spent, comments, status } = req.body;

  const progress = await Progress.create({
    step_id,
    managerId: managerId,
    completion_percentage,
    time_spent,
    comments,
    status,
  });
console.log(progress);

  res.status(201).json({ message: 'Progress entry created successfully', progress });
});

// Get progress by step ID
const getProgressByStepId = asyncHandler(async (req, res) => {
  const { stepId } = req.params;

  const progress = await Progress.findAll({ where: { stepId } });

  if (!progress.length) {
    return res.status(404).json({ message: 'No progress found for this step' });
  }

  res.status(200).json(progress);
});

// Create a new step
const createStep = asyncHandler(async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { projectId, description, deadline } = req.body;

  const step = await Step.create({ projectId, description, deadline });

  res.status(201).json({ message: 'Step created successfully', step });
});

// Get all steps by project ID
const getStepsByProjectId = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const steps = await Step.findAll({ where: { projectId } });

  if (!steps.length) {
    return res.status(404).json({ message: 'No steps found for this project' });
  }

  res.status(200).json(steps);
});

module.exports = {
  createProgress,
  getProgressByStepId,
  createStep,
  getStepsByProjectId,
};
