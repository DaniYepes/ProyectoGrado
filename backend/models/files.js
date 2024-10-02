// backend/models/Files.js
const { DataTypes } = require('sequelize');
const sequelize = require('../models/db'); // Ajusta esto según la configuración de tu base de datos

const Files = sequelize.define(
  'Files',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING, // Definición del tipo de archivo
      allowNull: false, // `file_type` no puede ser nulo, asegúrate de enviarlo correctamente
    },
  },
  {
    timestamps: true,
    tableName: 'Files', // Nombre de la tabla en la base de datos
  }
);

module.exports = Files;