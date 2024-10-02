const express = require('express');
const {
  login,
  register,
  resetPasswordRequest,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', login);

// Ruta para el registro de un nuevo usuario
router.post('/register', register);

// Ruta para enviar el correo de restablecimiento de contraseña
router.post('/reset-password', resetPasswordRequest);

// Ruta para confirmar el restablecimiento de la contraseña (cambiar la contraseña)
router.post('/reset-password/confirm', resetPassword);

module.exports = router;
