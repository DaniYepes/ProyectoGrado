// backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../models/db'); // Importar la instancia de `sequelize` desde `db.js`

// Definición del modelo de usuario
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Gerente', 'Coordinador', 'Contador'),
    allowNull: false,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true, // Incluye `createdAt` y `updatedAt`
  tableName: 'Users',
});

module.exports = User;
