const { body, param, validationResult } = require('express-validator');

// Validation for registration
const validateRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 to 30 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),

  body('password')
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 to 100 characters'),

  // body('email')
  //   .isEmail()
  //   .withMessage('Must be a valid email address'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for login
const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for creating a step
const validateStep = [
  body('description')
    .notEmpty()
    .withMessage('Step description is required'),

  body('projectId')
    .isInt()
    .withMessage('Project ID must be an integer'),

  body('deadline')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format for deadline'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation for creating progress
const validateProgress = [
  // body('completion_percentage')
  //   .isInt({ min: 0, max: 100 })
  //   .withMessage('Completion percentage must be between 0 and 100'),

  // body('time_spent')
  //   .optional()
  //   .isInt({ min: 0 })
  //   .withMessage('Time spent must be a non-negative integer'),

  // body('comments')
  //   .optional()
  //   .isString()
  //   .withMessage('Comments must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegistration, validateLogin, validateStep, validateProgress };
