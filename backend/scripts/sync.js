// backend/scripts/sync.js
const sequelize = require('../models/db'); // Cambia esta línea para apuntar a la ubicación de `db.js`

const Files = require('../models/files'); // Importar el modelo de Files si deseas sincronizar esta tabla
const Processes = require('../models/processes'); // Importar el modelo de Processes si es necesario

// Sincronizar las tablas con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Las tablas se han sincronizado correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });
