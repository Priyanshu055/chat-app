import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      // Add websocket proxy if needed:
      // '/socket.io': {
      //   target: 'ws://localhost:5000',
      //   ws: true
      // }
    }
  }
})
