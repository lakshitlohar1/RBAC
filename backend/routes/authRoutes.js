const express = require('express');
const { register, login } = require('../controllers/authController'); 
const { validateRegistration, validateLogin } = require('../middleware/validation'); // Import validation middleware
const router = express.Router();

// Route to register a new user
router.post('/register', validateRegistration, register);

// Route to login a user
router.post('/login', validateLogin, login);

module.exports = router;
