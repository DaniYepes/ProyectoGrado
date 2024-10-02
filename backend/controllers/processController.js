const { Processes } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { Op, Sequelize } = require('sequelize'); // Importar `Op` y `Sequelize`

// Controlador para obtener todos los procesos o los procesos específicos del contador autenticado
const getProcesses = async (req, res) => {
  try {
    // Obtener el token desde las cabeceras de la solicitud
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No se proporcionó token' });

    // Decodificar el token para obtener la información del usuario
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const { role, nombre_completo } = decoded;

    console.log("Rol del usuario:", role, "Nombre completo:", nombre_completo);

    // Definir la condición de búsqueda según el rol del usuario
    let filterCondition = {};

    if (role === 'Contador') {
      // Aplicar un filtro con `LIKE` y `LOWER` para hacer insensible la búsqueda a mayúsculas y minúsculas
      console.log("Aplicando filtro para Contador:", nombre_completo);
      filterCondition = {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Contador')), {
            [Op.like]: `%${nombre_completo.toLowerCase()}%`,
          }),
        ],
      };
    }

    // Buscar los procesos según la condición definida
    const processes = await Processes.findAll({
      where: filterCondition,
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir las columnas `createdAt` y `updatedAt`
    });

    
    res.json(processes); // Enviar los procesos como respuesta JSON
  } catch (error) {
    console.error('Error al obtener los procesos:', error);
    res.status(500).json({ message: 'Error al obtener los procesos.' });
  }
};

// Controlador para añadir un nuevo proceso
const setProcess = async (req, res) => {
  const { Contador, Compania, Estado, nit, UltimoDigito, Coordinador } = req.body;

  try {
    const newProcess = await Processes.create({
      Compania,
      nit,
      UltimoDigito,
      Contador,
      Coordinador,
      Estado,
    });
    res.json({ message: 'Proceso creado con éxito', newProcess });
  } catch (error) {
    console.error('Error al crear el proceso:', error);
    res.status(500).json({ message: 'Error al crear el proceso.' });
  }
};

// Exportar las funciones como un objeto para que puedan ser usadas en `processRoutes.js`
module.exports = {
  getProcesses,
  setProcess,
};
