import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  root: './', // Ensure the root is set to the directory containing index.html
  build: {
    outDir: 'dist', // The output directory for the build
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, 'Frontend'),
      '@backend': path.resolve(__dirname, 'Backend'),
      '@src': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    exclude: [
      'chunk-7ZYFG3L4.js?v=ca1385e6',
      'chunk-JWRYLV4P.js?v=ca1385e6',
      'chunk-ZCRPVQPG.js?v=ca1385e6',
    ]
  }
});