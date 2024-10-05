const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

exports.register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['Admin', 'Manager', 'Team Member']).withMessage('Role must be either Admin, Manager, or Team Member'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword, role });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error registering user' });
    }
  },
];

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    // Debugging: Log user details to verify if user is found
    if (!user) {
      console.error('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Debugging: Verify the password comparison process
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.error('Password mismatch for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error during login' });
  }
};
