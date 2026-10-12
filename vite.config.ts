import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Собираем прямо в папку сайта на GitHub Pages. base './' — чтобы пути работали из подпапки.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: '../site/quorvox', emptyOutDir: true }
});
