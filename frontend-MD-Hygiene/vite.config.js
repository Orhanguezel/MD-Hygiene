import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.VITE_API_URL": JSON.stringify(
        mode === "production"
          ? "https://md-hygienelogistik.de/api"
          : "http://localhost:5010/api"
      ),
    },
    server: {
      port: process.env.VITE_PORT || 3003,
    },
  };
});
