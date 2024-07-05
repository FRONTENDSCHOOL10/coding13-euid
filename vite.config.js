import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'docs'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        home: resolve(__dirname, 'src', '/pages/home/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
