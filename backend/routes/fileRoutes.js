// backend/routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController"); // Asegúrate de que esta importación sea correcta
const multer = require("multer");
const path = require("path");

// Configuración de `multer`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // Ruta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombrar el archivo con un timestamp
  },
});

const upload = multer({ storage });

// Rutas para la gestión de archivos
router.post("/upload", upload.single("file"), fileController.uploadFile); // `upload.single('file')` es el middleware de `multer`
router.get("/:process_id", fileController.getFiles);
router.get("/download/:fileId", fileController.downloadFile);
router.delete("/:fileId", fileController.deleteFile);

module.exports = router;
