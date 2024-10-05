const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

// Define Project model
const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Project name must be unique',
    },
    validate: {
      len: {
        args: [1, 255], // Set max length for project name
        msg: 'Project name must be between 1 and 255 characters long',
      },
    },
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  managerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'SET NULL', // Set managerId to NULL if manager is deleted
    onUpdate: 'CASCADE',  // Update manager ID in projects if user ID changes
  },
  team_member_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    status:{
      type: DataTypes.ENUM('Development', 'Testing', 'Completed'),
      allowNull: false,
    },
    onDelete: 'SET NULL', // Set managerId to NULL if manager is deleted
    onUpdate: 'CASCADE',  // Update manager ID in projects if user ID changes
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Define associations if not done elsewhere
Project.belongsTo(User, { foreignKey: 'managerId' });
Project.belongsTo(User, { foreignKey: 'team_member_id' });
module.exports = Project;
