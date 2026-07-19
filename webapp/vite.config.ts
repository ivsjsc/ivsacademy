import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/webapp-dist/',
  plugins: [react()],
  root: '.',
  build: {
    outDir: '../webapp-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html'
    }
  }
})
