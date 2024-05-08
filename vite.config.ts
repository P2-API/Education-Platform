import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
console.log(__dirname)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, 'Frontend'),
      '@backend': path.resolve(__dirname, 'Backend')
    }
  }
});