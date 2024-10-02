import api from './api';

// Obtener todos los procesos o los específicos del contador (según el rol)
export const getProcesses = async () => {
  try {
    // Llamada a la API con el token en las cabeceras
    const response = await api.get('/processes/traer', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener procesos:", error);
    return [];
  }
};

  
  
  export const setProcess = async () => {
    try {
      const response = await api.get('/processes/crear');
      return response.data;
    } catch (error) {
      console.error("Error al obtener compañías:", error);
      return [];
    }
  };

  // backend/services/processesService.js

// Función para subir archivos asociados a un proceso
export const uploadFile = async (processId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('processId', processId);

  try {
    const response = await api.post(`/files/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    return null;
  }
};

// Función para obtener los archivos asociados a un proceso
export const getFiles = async (processId) => {
  try {
    const response = await api.get(`/files/${processId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    return [];
  }
};

// **Nueva Función**: Descargar archivos asociados a un proceso
export const downloadFile = async (fileId) => {
  try {
    const response = await api.get(`/files/download/${fileId}`, { responseType: 'blob' });
    // Crear un enlace temporal para la descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'archivo_proceso.pdf'); // Nombre del archivo que se descargará
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};

  