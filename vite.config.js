import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@adminpages': path.resolve(__dirname, 'src/pages/admin'),
      '@userpages': path.resolve(__dirname, 'src/pages/user'),
      '@admincomponents': path.resolve(__dirname, 'src/components/admin'),
      '@usercomponents': path.resolve(__dirname, 'src/components/user'),
      '@common': path.resolve(__dirname, 'src/components/common'),
    },
  },
})