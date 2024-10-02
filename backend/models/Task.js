const { DataTypes } = require('sequelize');
const sequelize = require('../models/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('En Proceso', 'En Espera de Revisión', 'Aceptado', 'Rechazado'),
    defaultValue: 'En Proceso'
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  coordinatorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accountantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Task;
