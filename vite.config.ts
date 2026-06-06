import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@sberbusiness/icons-next')) {
              return 'vendor-icons';
            }
            if (id.includes('@sberbusiness/triplex-next')) {
              return 'vendor-triplex';
            }
            return 'vendor-others';
          }
        },
      },
    },
  },
})
