import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ Alias doğru
    },
  },
  server: {
    port: 5173,              // ✅ Port çakışmasını önlemek için sabitle
    strictPort: true,         // ✅ Port sorununu önler
    watch: {
      usePolling: true,       // ✅ Dosya değişikliklerini daha iyi algılar
    },
  },
});
