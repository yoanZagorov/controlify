import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
 
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: "config/postcss.config.js",
    // modules: {
    //   localsConvention: "camelCase",
    // }
  },
  server: {
    open: "/"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "logos": path.resolve(__dirname, "../src/assets/images/logos"),
      "services": path.resolve(__dirname, "../services"),
      // "pages": path.resolve(__dirname, '../src/pages'),
      // "components": path.resolve(__dirname, '../src/components'),
      // "styles": path.resolve(__dirname, '../src/styles'), 
    },
  },
})
