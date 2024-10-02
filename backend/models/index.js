const sequelize = require('../models/db'); // Asegúrate de que db.js esté correctamente configurado
const { DataTypes } = require('sequelize');

// Definir el modelo de usuario
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Contador', 'Coordinador', 'Gerente'), allowNull: false },
  nombre_completo: { type: DataTypes.STRING, allowNull:false}
}, {
  tableName: 'Users'
});

// Definir el modelo de compañía
const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  nit: { type: DataTypes.STRING, allowNull: false }, // Se eliminó unique si no es necesario
  last_digit: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'Companies',
  timestamps: false,
});

// Definir el modelo de procesos
const Processes = sequelize.define('Processes', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Compania: { type: DataTypes.STRING, allowNull: false },
  nit: { type: DataTypes.STRING, allowNull: false },
  UltimoDigito: { type: DataTypes.INTEGER, allowNull: false },
  Contador: { type: DataTypes.STRING, allowNull: false },
  Coordinador: { type: DataTypes.STRING, allowNull: false },
  Estado: { type: DataTypes.ENUM('Activo', 'En proceso', 'Revisión', 'Completado'), allowNull: false },
}, { 
  tableName: 'Processes',
  timestamps: false,
});

// Definir el modelo de archivos
const Files = sequelize.define('Files', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fileName: { type: DataTypes.STRING, allowNull: false }, // Nombre del archivo
  filePath: { type: DataTypes.STRING, allowNull: false }, // Ruta de almacenamiento
  fileType: { type: DataTypes.STRING, allowNull: false }, // Tipo de archivo (ej: 'pdf')
  uploadDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Fecha de carga del archivo
  processId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Processes', key: 'id' } }, // Clave foránea
}, { 
  tableName: 'Files',
  timestamps: false,
});

// Definir relaciones entre modelos
Processes.hasMany(Files, { foreignKey: 'processId' }); // Un proceso puede tener muchos archivos
Files.belongsTo(Processes, { foreignKey: 'processId' }); // Cada archivo pertenece a un proceso

// Relación entre Process y Company
Company.hasMany(Processes, { foreignKey: 'Compania', sourceKey: 'name' });
Processes.belongsTo(Company, { foreignKey: 'Compania', targetKey: 'name' });

// Sincronizar las tablas con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

module.exports = { sequelize, User, Company, Processes, Files };
