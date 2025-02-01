import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    server: {
      host: "0.0.0.0",
      port: 3003, // ✅ Docker'daki `docker-compose.yml` ile eşleşmesi için 3003
    },
    preview: {
      port: 3003,
      host: "0.0.0.0",
    },
  };
});


