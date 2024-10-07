import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "config/postcss.config.js"
  },
  server: {
    open: "/"
  },
})
