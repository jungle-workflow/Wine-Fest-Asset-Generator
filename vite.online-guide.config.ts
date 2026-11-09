import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-online-guide',
    rollupOptions: {
      input: 'online-guide.html',
    },
  },
})
