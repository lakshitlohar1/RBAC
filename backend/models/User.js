const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure usernames are unique
    validate: {
      len: [3, 30], // Username must be between 3 to 30 characters
      isAlphanumeric: true, // Ensure username is alphanumeric
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Password must be between 6 to 100 characters
    },
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Team Member'),
    allowNull: false,
  },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true, // Ensure emails are unique
  //   validate: {
  //     isEmail: true, // Ensure valid email format
  //   },
  // },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  hooks: {
    // Hash the password before saving the user
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

module.exports = User;
