const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust to your actual database config
const Step = require('./Step'); // Assuming Step model is defined
const User = require('./User'); // Assuming User model (for managerId) is defined

class Progress extends Model {}

// Define the Progress model fields according to your database structure
Progress.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  step_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Step,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  managerId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Set true if a step might not have a manager assigned initially
    references: {
      model: User, // Assuming 'User' model corresponds to 'users' table
      key: 'id',
    },
    onDelete: 'SET NULL', // Manager can be removed but keep progress
  },
  completion_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100, // Ensure percentage is between 0 and 100
    },
  },
  time_spent: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow it to be null if not tracked
    comment: 'Time spent in hours or minutes (depending on business logic)',
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed'),
    defaultValue: 'Pending',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Progress',
  tableName: 'progress',
  timestamps: true, // This enables createdAt and updatedAt fields
});

// Define associations (if needed)
Progress.belongsTo(Step, { foreignKey: 'step_id', onDelete: 'CASCADE' });
Progress.belongsTo(User, { foreignKey: 'managerId', onDelete: 'SET NULL' });

module.exports = Progress;
