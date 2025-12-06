import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.npm_lifecycle_event === 'build' ? '/index/' : '/',
  plugins: [react()],
})
