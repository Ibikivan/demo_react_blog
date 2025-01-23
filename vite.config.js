import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true, // Écoute sur toutes les interfaces réseau
      port: 3000,  // (Optionnel) Change le port si nécessaire
      proxy: {
        '/api': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Cache-Control': 'no-cache',
          'Accept': '*/*',
        },
      },
    },
  }
})
