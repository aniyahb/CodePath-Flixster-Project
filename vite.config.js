import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: [
      (req, res, next) => {
        res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), microphone=(), geolocation=()');
        next();
      }
    ]
  }
})
