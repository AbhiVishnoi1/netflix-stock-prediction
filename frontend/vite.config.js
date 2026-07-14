import { defineConfig } from 'vite'
import react from '@vitejs/react-vite-app' // or '@vitejs/plugin-react' depending on your setup

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'netflix-stock-app.onrender.com'
    ]
  }
})