// backend/config/database.js
const { Sequelize } = require('sequelize');

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Cambia esta ruta si la base de datos está en otro lugar
  logging: true, // Cambiar a `true` si quieres ver las consultas SQL en la consola
});

// Exportar la instancia de `sequelize`
module.exports = sequelize;
