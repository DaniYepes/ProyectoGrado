// backend/controllers/coordinatorController.js

const { User, Company } = require('../models');

exports.getContadores = async (req, res) => {
  try {
    // Obtener todos los usuarios con rol 'Contador'
    const contadores = await User.findAll({ where: { role: 'Contador' } });
    res.json(contadores);
  } catch (error) {
    console.error('Error al obtener contadores:', error);
    res.status(500).json({ message: 'Error al obtener contadores.' });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    // Obtener todas las compañías
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error al obtener compañías:', error);
    res.status(500).json({ message: 'Error al obtener compañías.' });
  }
};
