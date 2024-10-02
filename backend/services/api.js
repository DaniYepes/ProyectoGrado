// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Base URL ajustada para que use el proxy de Vite
});

export default api;
