// backend/app.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes'); // Ruta para coordinadores
const fileRoutes = require('./routes/fileRoutes'); // Importa las rutas de archivos
const processRoutes = require('./routes/processRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar las rutas con prefijos
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/processes', processRoutes);
app.use('/api/coordinator', coordinatorRoutes); // Aquí registramos la ruta del coordinador
app.use('/api/files', fileRoutes); // Asegúrate de que esta línea esté presente

module.exports = app;
