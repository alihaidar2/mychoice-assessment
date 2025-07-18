// frontend/vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load .env, .env.development, .env.production, etc.
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_URL; // e.g. "http://localhost:8000" locally or "http://backend:8000" in Docker

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
