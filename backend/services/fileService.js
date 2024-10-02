import api from './api'; // Asegúrate de que esta ruta sea correcta

export const uploadFile = async (formData) => {
  try {
    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Asegúrate de que el tipo de contenido sea `multipart/form-data`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error alsubir el archivo:", error);
    return null;
  }
};

export const getFiles = async (processId) => {
  try {
    const response = await api.get(`/files/${processId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los archivos:", error);
    return [];
  }
};

export const downloadFile = async (fileId) => {
  try {
    const response = await api.get(`/files/download/${fileId}`, {
      responseType: 'blob', // Asegura que se maneje como un archivo descargable
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file'); // Nombre del archivo de descarga (puedes cambiarlo según el nombre original)
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  }
};