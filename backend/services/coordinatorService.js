// frontend/src/services/coordinatorService.js
import api from './api';

export const getContadores = async () => {
  try {
    const response = await api.get('/coordinator/contadores');
    return response.data;
  } catch (error) {
    console.error("Error al obtener contadores:", error);
    return [];
  }
};

export const getCompanies = async () => {
  try {
    const response = await api.get('/coordinator/companies');
    return response.data;
  } catch (error) {
    console.error("Error al obtener compañías:", error);
    return [];
  }
};
