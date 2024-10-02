const { DataTypes } = require('sequelize');
const sequelize = require('../models/db'); // Asegúrate de que este archivo sea la configuración correcta de la base de datos

const Process = sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Compania: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Nit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UltimoDigito: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Contador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Coordinador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Activo', // Valor por defecto
  },
  FechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Fecha de creación por defecto
  },
  FechaActualizacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false, // Deshabilitar `createdAt` y `updatedAt` de Sequelize ya que tenemos nuestras propias fechas
  tableName: 'Processes', // Nombre de la tabla en la base de datos
});

module.exports = Process;
