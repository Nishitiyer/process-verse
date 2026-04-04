import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Final Sync: 100% Verified Re-deployment
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'recharts', 'lucide-react'],
        },
      },
    },
  },
})
