// backend/controllers/fileController.js

const { Files } = require('../models');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    const { process_id } = req.body; // Usar el nombre exacto que llega del frontend
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    // Extraer el nombre, la ruta y el tipo de archivo
    const { originalname, path: filePath, mimetype } = file; // `mimetype` contiene el tipo de archivo (image/png, application/pdf, etc.)

    // Crear una nueva entrada en la base de datos con `file_type`
    const newFile = await Files.create({
      process_id,          // ID del proceso asociado
      file_name: originalname,
      file_path: filePath,
      file_type: mimetype,  // Asegúrate de pasar `file_type` desde `file.mimetype`
    });

    res.json({ message: 'Archivo subido con éxito', newFile });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({ message: 'Error al subir el archivo.' });
  }
};



// Otros controladores necesarios...
const getFiles = async (req, res) => {
  const { processId } = req.params;

  try {
    const files = await Files.findAll({ where: { processId } });
    res.json(files);
  } catch (error) {
    console.error('Error al obtener los archivos:', error);
    res.status(500).json({ message: 'Error al obtener los archivos.' });
  }
};

const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await Files.findByPk(fileId);
    if (!file) return res.status(404).json({ message: 'Archivo no encontrado.' });

    const filePath = path.resolve(file.filePath);
    res.download(filePath);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    res.status(500).json({ message: 'Error al descargar el archivo.' });
  }
};

const deleteFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await Files.findByPk(fileId);
    if (!file) return res.status(404).json({ message: 'Archivo no encontrado.' });

    // Eliminar el archivo de la base de datos y del sistema de archivos si es necesario
    await file.destroy();
    res.json({ message: 'Archivo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).json({ message: 'Error al eliminar el archivo.' });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
};
