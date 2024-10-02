//backend/routes/userRoutes.js

const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
