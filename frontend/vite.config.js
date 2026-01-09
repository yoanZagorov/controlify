import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // Transform svg-s to React components

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    open: "/",
    host: "0.0.0.0",
  },
})
