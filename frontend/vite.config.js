// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // El backend está en el puerto 4000
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
