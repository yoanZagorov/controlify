import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "config/postcss.config.js",
    modules: {
      localsConvention: "camelCase",
    }
  },
  server: {
    open: "/"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "logos": path.resolve(__dirname, "../src/assets/images/logos"),
      "pages": path.resolve(__dirname, '../src/pages'),
      "components": path.resolve(__dirname, '../src/components'),
      "styles": path.resolve(__dirname, '../src/styles'), 
      "layouts": path.resolve(__dirname, '../src/layouts'), 
    },
  },
})
