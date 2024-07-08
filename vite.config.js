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
        category: resolve(__dirname, 'src', 'pages', 'category', 'index.html'),
        profile: resolve(__dirname, 'src', 'pages', 'profile', 'index.html'),
        editProfile: resolve(__dirname, 'src', 'pages', 'edit-profile', 'index.html'),
        exchange: resolve(__dirname, 'src', 'pages', 'exchange', 'index.html'),
        exchangeBoard: resolve(__dirname, 'src', 'pages', 'exchange-board', 'index.html'),
        start: resolve(__dirname, 'src', 'pages', 'start', 'index.html'),
        search: resolve(__dirname, 'src', 'pages', 'search', 'index.html'),
        signup: resolve(__dirname, 'src', 'pages', 'signup', 'index.html'),
        login: resolve(__dirname, 'src', 'pages', 'login', 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
