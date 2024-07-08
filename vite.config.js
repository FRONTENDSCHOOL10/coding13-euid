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
        profile: resolve(__dirname, 'src', 'pages', 'profile', 'index.html'),
        editProfile: resolve(
          __dirname,
          'src',
          'pages',
          'profile',
          'edit-profile.html'
        ),
        start: resolve(__dirname, 'src', 'pages', 'start', 'index.html'),
        category: resolve(__dirname, 'src', 'pages', 'start', 'category.html'),
        signup: resolve(__dirname, 'src', 'pages', 'start', 'signup.html'),
        login: resolve(__dirname, 'src', 'pages', 'start', 'login.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
