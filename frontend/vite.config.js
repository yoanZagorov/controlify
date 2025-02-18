import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: "config/postcss.config.js",
  },
  server: {
    open: "/"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "services": path.resolve(__dirname, "./src/services"),
    },
  },
})
