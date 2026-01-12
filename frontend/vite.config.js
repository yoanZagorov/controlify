import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // transform svg-s to React components
import path from 'path'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    open: '/',
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      // Used to mimic subpath imports for bundled code (also set in the tsconfig). If there is an imports field in the package.json, imports would still work, but
      // it takes precedence and the IDE suggests Node-style ESM imports (a.k.a. includes, extensions, doesn't support index imports, etc.) which is not desired in bundled code.
      // Also, it should be used with a dash separator, since it should replace a path segment for Vite
      '#': path.resolve(__dirname, './src'),
    },
  },
})
