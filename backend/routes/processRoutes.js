// backend/routes/processRoutes.js

const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

// Rutas para los procesos
router.post('/crear', processController.setProcess); // Crear un nuevo proceso
router.get('/traer', processController.getProcesses);   // Obtener todos los procesos

module.exports = router;
