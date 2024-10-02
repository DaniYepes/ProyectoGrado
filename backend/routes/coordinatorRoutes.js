// backend/routes/coordinatorRoutes.js

const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');

// Definir la ruta para obtener los contadores
router.get('/contadores', coordinatorController.getContadores);

// Definir la ruta para obtener las compañías
router.get('/companies', coordinatorController.getCompanies);

module.exports = router;
