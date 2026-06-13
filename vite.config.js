import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/mega-menu': {
        target: 'https://www.mega-mgccoffee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mega-menu/, '')
      }
    }
  }
})
