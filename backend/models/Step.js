const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Step = sequelize.define('Step', {
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // completion: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  // },
  // timeSpent: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // comments: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = Step;
