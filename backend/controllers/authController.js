const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

// Controlador de inicio de sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username, nombre_completo: user.nombre_completo },
      config.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, username: user.username, nombre_completo: user.nombre_completo });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Controlador de registro de nuevo usuario
const register = async (req, res) => {
  const { username, password, role, email, nombre_completo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role, nombre_completo });
    res.json({ message: 'Usuario registrado con éxito', user: newUser });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

// Controlador para enviar el correo de restablecimiento de contraseña
const resetPasswordRequest = async (req, res) => {
  // Lógica para manejar la solicitud de restablecimiento de contraseña
};

// Controlador para confirmar el restablecimiento de contraseña
const resetPassword = async (req, res) => {
  // Lógica para cambiar la contraseña del usuario
};

// Exportar las funciones del controlador
module.exports = {
  login,
  register,
  resetPasswordRequest,
  resetPassword,
};
