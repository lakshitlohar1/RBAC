const { body, validationResult } = require('express-validator');
const Step = require('../models/Step');
const Project = require('../models/Project');

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Create a new step for a project
const createStep = asyncHandler(async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { projectId, description, deadline } = req.body;
console.log('projectId', projectId);
console.log('description', description);
console.log('deadline', deadline);

  // Validate the project ID
  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  const step = await Step.create({ projectId, description, deadline });
  res.status(201).json({ message: 'Step created successfully', step });
});

// Update step progress
const updateStepProgress = asyncHandler(async (req, res) => {
  const { stepId } = req.params;
  const { completion, timeSpent, comments } = req.body;

  const step = await Step.findByPk(stepId);
  if (!step) {
    return res.status(404).json({ message: 'Step not found' });
  }

  // Validate completion
  if (completion < 0 || completion > 100) {
    return res.status(400).json({ message: 'Completion percentage must be between 0 and 100' });
  }

  // Update step details
  step.completion = completion;
  step.timeSpent = timeSpent;
  step.comments = comments;
  await step.save();

  res.status(200).json({ message: 'Step progress updated', step });
});

// Get steps for a project
const getProjectSteps = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Validate the project ID
  const project = await Project.findByPk(projectId);
  if (!project) {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  const steps = await Step.findAll({ where: { projectId } });
  if (!steps.length) {
    return res.status(404).json({ message: 'No steps found for this project' });
  }

  res.status(200).json({ message: 'Steps fetched successfully', steps });
});

module.exports = {
  createStep,
  updateStepProgress,
  getProjectSteps,
};
